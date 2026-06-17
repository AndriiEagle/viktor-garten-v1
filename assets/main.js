(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const navToggle = $('[data-nav-toggle]');
  const nav = $('[data-nav]');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      document.body.classList.toggle('menu-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  $$('[data-before-after-slider]').forEach((slider) => {
    const input = $('.before-after-range', slider);
    if (!input) return;
    const update = () => slider.style.setProperty('--split', input.value + '%');
    input.addEventListener('input', update);
    update();
  });

  const presentationToggle = $('[data-presentation-toggle]');
  if (presentationToggle) {
    const params = new URLSearchParams(location.search);
    const stored = window.localStorage.getItem('viktorPresentationClean') === '1';
    const setClean = (clean) => {
      document.body.classList.toggle('presentation-clean', clean);
      presentationToggle.setAttribute('aria-pressed', String(clean));
      presentationToggle.textContent = clean ? presentationToggle.dataset.labelShow : presentationToggle.dataset.labelHide;
      window.localStorage.setItem('viktorPresentationClean', clean ? '1' : '0');
    };
    setClean(params.has('clean') || stored);
    presentationToggle.addEventListener('click', () => {
      setClean(!document.body.classList.contains('presentation-clean'));
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  const GA_ID = 'G-XXXXXXX';
  const ADS_ID = 'AW-XXXXXXX';
  const isRealId = (id) => id && !id.includes('X') && !id.includes('PLACEHOLDER');
  const loadScript = (src) => {
    if ($('script[src="' + src + '"]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  };
  const enableTags = () => {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
    if (isRealId(GA_ID)) {
      loadScript('https://www.googletagmanager.com/gtag/js?id=' + GA_ID);
      window.gtag('js', new Date());
      window.gtag('config', GA_ID);
    }
    if (isRealId(ADS_ID)) {
      window.gtag('config', ADS_ID);
    }
  };

  const consentBanner = $('[data-consent-banner]');
  const storedConsent = localStorage.getItem('viktor-consent');
  if (storedConsent === 'granted') enableTags();
  if (!storedConsent && consentBanner) consentBanner.hidden = false;
  $('[data-consent-accept]')?.addEventListener('click', () => {
    localStorage.setItem('viktor-consent', 'granted');
    consentBanner.hidden = true;
    enableTags();
  });
  $('[data-consent-deny]')?.addEventListener('click', () => {
    localStorage.setItem('viktor-consent', 'denied');
    consentBanner.hidden = true;
  });

  const toast = $('[data-toast]');
  const currentLang = document.documentElement.lang || 'de-CH';
  const formInactiveMessage = currentLang.startsWith('uk')
    ? 'Форма неактивна: потрібно підключити Formspree endpoint. Будь ласка, скористайтеся WhatsApp.'
    : currentLang.startsWith('en')
      ? 'Form inactive: the Formspree endpoint still needs to be configured. Please use WhatsApp.'
      : 'Formular inaktiv: Formspree-Endpunkt muss noch eingesetzt werden. Bitte WhatsApp nutzen.';
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.setTimeout(() => { toast.hidden = true; }, 4200);
  };

  const track = (name, params = {}) => {
    window.gtag('event', name, params);
    if ((name === 'cta_whatsapp_click' || name === 'contact_form_submit') && isRealId(ADS_ID)) {
      window.gtag('event', 'conversion', { send_to: ADS_ID + '/PLACEHOLDER' });
    }
  };
  window.trackSiteEvent = track;

  $$('[data-event]').forEach((el) => {
    if (el.tagName === 'FORM') return;
    el.addEventListener('click', () => {
      track(el.dataset.event, { label: el.dataset.eventLabel || el.textContent.trim(), path: location.pathname });
    });
  });

  $$('form[data-event]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.reportValidity()) return;
      track(form.dataset.event, { path: location.pathname });
      if (form.action.includes('/REPLACE')) {
        event.preventDefault();
        showToast(formInactiveMessage);
      }
    });
  });

  const vision = $('[data-event-section="vision_section_view"]');
  if ('IntersectionObserver' in window && vision) {
    let seen = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!seen && entry.isIntersecting) {
          seen = true;
          track('vision_section_view', { path: location.pathname });
          observer.disconnect();
        }
      });
    }, { threshold: 0.35 });
    observer.observe(vision);
  }

  $$('[data-theme-option]').forEach((button) => {
    button.addEventListener('click', () => {
      const theme = button.dataset.themeOption;
      const link = $('#theme-link');
      if (!link || !theme) return;
      const prefix = link.getAttribute('href').replace(/assets\/theme-v\d\.css$/, '');
      link.setAttribute('href', prefix + 'assets/' + theme);
      showToast('Theme switched to ' + theme.replace('.css', '').toUpperCase());
    });
  });
})();
