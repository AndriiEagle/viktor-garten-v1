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

  const CONSENT_KEY = 'viktor_cookie_consent';
  const LEGACY_CONSENT_KEY = 'viktor-consent';
  const consentBanner = $('[data-consent-banner]');
  const readConsent = () => {
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.version === 1 && (parsed.status === 'accepted' || parsed.status === 'rejected')) return parsed;
      }
      const legacy = window.localStorage.getItem(LEGACY_CONSENT_KEY);
      if (legacy === 'granted' || legacy === 'denied') {
        const migrated = {
          status: legacy === 'granted' ? 'accepted' : 'rejected',
          version: 1,
          timestamp: new Date().toISOString()
        };
        window.localStorage.setItem(CONSENT_KEY, JSON.stringify(migrated));
        window.localStorage.removeItem(LEGACY_CONSENT_KEY);
        return migrated;
      }
    } catch (error) {
      return null;
    }
    return null;
  };
  const writeConsent = (status) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ status, version: 1, timestamp: new Date().toISOString() }));
    } catch (error) {
      // If storage is blocked, keep the privacy-safe default and still close the banner for this page view.
    }
  };
  const setConsentBannerVisible = (visible) => {
    if (!consentBanner) return;
    consentBanner.hidden = !visible;
    consentBanner.setAttribute('aria-hidden', String(!visible));
  };
  const storedConsent = readConsent();
  if (storedConsent?.status === 'accepted') enableTags();
  setConsentBannerVisible(!storedConsent);
  const applyConsentChoice = (status) => {
    writeConsent(status);
    setConsentBannerVisible(false);
    if (status === 'accepted') enableTags();
  };
  $('[data-consent-accept]')?.addEventListener('click', (event) => {
    event.preventDefault();
    applyConsentChoice('accepted');
  });
  $('[data-consent-deny]')?.addEventListener('click', (event) => {
    event.preventDefault();
    applyConsentChoice('rejected');
  });

  const toast = $('[data-toast]');
  const currentLang = document.documentElement.lang || 'de-CH';
  const formMessages = currentLang.startsWith('uk')
    ? {
        loading: 'Надсилається...',
        success: 'Дякуємо - Віктор звʼяжеться з вами якнайшвидше.',
        error: 'Запит зараз не вдалося надіслати. Будь ласка, скористайтеся WhatsApp або спробуйте пізніше.'
      }
    : currentLang.startsWith('en')
      ? {
          loading: 'Sending...',
          success: 'Thank you - Viktor will get back to you as soon as possible.',
          error: 'The request could not be sent right now. Please use WhatsApp or try again later.'
        }
      : {
          loading: 'Wird gesendet...',
          success: 'Danke - Viktor meldet sich schnellstmöglich.',
          error: 'Die Anfrage konnte gerade nicht gesendet werden. Bitte nutzen Sie WhatsApp oder versuchen Sie es später erneut.'
        };
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

  $$('form[data-contact-form]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const submit = form.querySelector('button[type="submit"]');
      const originalText = submit?.textContent || '';
      const fields = new FormData(form);
      const payload = Object.fromEntries(fields.entries());
      payload.sourceUrl = location.href;
      payload.language = currentLang;
      payload.kind = form.dataset.contactKind || 'contact';
      track(form.dataset.event || 'contact_form_submit', { path: location.pathname, kind: payload.kind });
      if (submit) {
        submit.disabled = true;
        submit.textContent = formMessages.loading;
      }
      try {
        const response = await fetch(form.getAttribute('action') || '/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.ok) throw new Error(result.error || 'contact_failed');
        form.reset();
        showToast(formMessages.success);
      } catch (error) {
        showToast(formMessages.error);
      } finally {
        if (submit) {
          submit.disabled = false;
          submit.textContent = originalText;
        }
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
