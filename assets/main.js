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

  $$('[data-lang-switch]').forEach((switcher) => {
    const toggle = $('[data-lang-toggle]', switcher);
    const menu = $('[data-lang-menu]', switcher);
    if (!toggle || !menu) return;
    const setOpen = (open) => {
      switcher.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
    };
    setOpen(false);
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(menu.hidden);
    });
    $$('a', menu).forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target || !switcher.contains(target)) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });
  });

  $$('[data-before-after-slider]').forEach((slider) => {
    const input = $('.before-after-range', slider);
    if (!input) return;
    const update = () => slider.style.setProperty('--split', input.value + '%');
    input.addEventListener('input', update);
    update();
  });

  let imageLightbox = null;
  let imageLightboxLastFocused = null;
  const ensureImageLightbox = () => {
    if (imageLightbox) return imageLightbox;
    const pageLang = document.documentElement.lang || 'de-CH';
    const closeLabel = pageLang.startsWith('uk') ? 'Закрити' : pageLang.startsWith('en') ? 'Close' : 'Schliessen';
    const modal = document.createElement('div');
    modal.className = 'image-lightbox';
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = '<button class="image-lightbox-backdrop" type="button" data-image-lightbox-close aria-label="' + closeLabel + '"></button><figure class="image-lightbox-panel"><button class="image-lightbox-close" type="button" data-image-lightbox-close aria-label="' + closeLabel + '">&times;</button><img alt="" loading="eager" decoding="async"><figcaption class="image-lightbox-caption"></figcaption></figure>';
    document.body.appendChild(modal);
    $$('[data-image-lightbox-close]', modal).forEach((button) => button.addEventListener('click', closeImageLightbox));
    imageLightbox = modal;
    return modal;
  };
  const openImageLightbox = ({ src, alt = '', caption = '', trigger = null }) => {
    if (!src) return;
    const modal = ensureImageLightbox();
    const img = $('img', modal);
    const captionEl = $('.image-lightbox-caption', modal);
    const resolvedSrc = new URL(src, document.baseURI).href;
    imageLightboxLastFocused = trigger instanceof HTMLElement ? trigger : document.activeElement;
    img.decoding = 'async';
    img.loading = 'eager';
    img.src = resolvedSrc;
    img.alt = alt || caption || '';
    captionEl.textContent = caption || alt || '';
    captionEl.hidden = !(caption || alt);
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('image-lightbox-open');
    $('[data-image-lightbox-close]', modal)?.focus();
  };
  function closeImageLightbox() {
    if (!imageLightbox || imageLightbox.hidden) return;
    const img = $('img', imageLightbox);
    imageLightbox.hidden = true;
    imageLightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('image-lightbox-open');
    if (img) img.removeAttribute('src');
    imageLightboxLastFocused?.focus?.();
    imageLightboxLastFocused = null;
  }
  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const zoomButton = target.closest('[data-image-lightbox-src]');
    if (zoomButton) {
      event.preventDefault();
      event.stopPropagation();
      openImageLightbox({
        src: zoomButton.dataset.imageLightboxSrc,
        alt: zoomButton.dataset.imageLightboxAlt,
        caption: zoomButton.dataset.imageLightboxCaption,
        trigger: zoomButton
      });
      return;
    }
    const lightboxLink = target.closest('a[data-lightbox]');
    if (lightboxLink) {
      event.preventDefault();
      openImageLightbox({
        src: lightboxLink.href,
        alt: $('img', lightboxLink)?.getAttribute('alt') || '',
        caption: lightboxLink.getAttribute('aria-label') || $('img', lightboxLink)?.getAttribute('alt') || '',
        trigger: lightboxLink
      });
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !imageLightbox || imageLightbox.hidden) return;
    event.preventDefault();
    event.stopPropagation();
    closeImageLightbox();
  }, true);

  $$('[data-image-carousel]').forEach((carousel) => {
    const slides = $$('[data-carousel-track] > img', carousel);
    const dots = $$('[data-carousel-dot]', carousel);
    const prev = $('[data-carousel-prev]', carousel);
    const next = $('[data-carousel-next]', carousel);
    if (slides.length < 2) return;
    let index = 0;
    let timer = 0;
    let startX = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const go = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      carousel.style.setProperty('--carousel-index', String(index));
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === index);
        dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
      });
    };
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = 0;
    };
    const play = () => {
      if (reducedMotion || timer) return;
      timer = window.setInterval(() => go(index + 1), 5200);
    };
    prev?.addEventListener('click', () => { stop(); go(index - 1); play(); });
    next?.addEventListener('click', () => { stop(); go(index + 1); play(); });
    dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => { stop(); go(dotIndex); play(); }));
    carousel.addEventListener('pointerdown', (event) => { startX = event.clientX; stop(); });
    carousel.addEventListener('pointerup', (event) => {
      const delta = event.clientX - startX;
      if (Math.abs(delta) > 42) go(index + (delta < 0 ? 1 : -1));
      play();
    });
    carousel.addEventListener('pointercancel', play);
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', play);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', play);
    go(0);
    play();
  });

  const caseModal = $('[data-case-modal]');
  if (caseModal) {
    const panels = $$('[data-case-panel]', caseModal);
    const closeButtons = $$('[data-case-close]', caseModal);
    let lastFocused = null;
    const loadCaseImages = (panel) => {
      $$('img', panel).forEach((img) => {
        img.loading = 'eager';
        img.decoding = 'async';
        const src = img.getAttribute('src');
        if (!src) return;
        if (!img.currentSrc) img.src = src;
        img.decode?.().catch(() => {});
        if (img.complete) return;
        const preload = new Image();
        preload.decoding = 'async';
        preload.src = new URL(src, document.baseURI).href;
      });
    };
    const openCase = (id) => {
      const activePanel = panels.find((panel) => panel.dataset.casePanel === id);
      if (!activePanel) return;
      lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      panels.forEach((panel) => { panel.hidden = panel !== activePanel; });
      caseModal.hidden = false;
      caseModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('case-modal-open');
      loadCaseImages(activePanel);
      $('[data-case-close]', caseModal)?.focus();
    };
    const closeCase = () => {
      caseModal.hidden = true;
      caseModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('case-modal-open');
      panels.forEach((panel) => { panel.hidden = true; });
      lastFocused?.focus?.();
      lastFocused = null;
    };
    $$('[data-case-open]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        openCase(button.dataset.caseOpen);
      });
    });
    closeButtons.forEach((button) => button.addEventListener('click', closeCase));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !caseModal.hidden && !document.body.classList.contains('image-lightbox-open')) closeCase();
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
  const bindConsentChoice = (selector, status) => {
    const button = $(selector);
    if (!button) return;
    const handler = (event) => {
      event.preventDefault();
      event.stopPropagation();
      applyConsentChoice(status);
    };
    button.addEventListener('click', handler);
    button.addEventListener('pointerup', handler);
    button.addEventListener('touchend', handler, { passive: false });
  };
  bindConsentChoice('[data-consent-accept]', 'accepted');
  bindConsentChoice('[data-consent-deny]', 'rejected');

  const toast = $('[data-toast]');
  const currentLang = document.documentElement.lang || 'de-CH';
  const formMessages = currentLang.startsWith('uk')
    ? {
        loading: 'Надсилається...',
        success: 'Дякуємо - я звʼяжуся з вами якнайшвидше.',
        error: 'Запит зараз не вдалося надіслати. Будь ласка, скористайтеся WhatsApp або спробуйте пізніше.'
      }
    : currentLang.startsWith('en')
      ? {
          loading: 'Sending...',
          success: 'Thank you - I will get back to you as soon as possible.',
          error: 'The request could not be sent right now. Please use WhatsApp or try again later.'
        }
      : {
          loading: 'Wird gesendet...',
          success: 'Danke - ich melde mich schnellstmöglich.',
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

  const HERO_VARIANT_KEY = 'viktor_hero_variant';
  const hero = $('[data-hero-root]');
  const heroSwitcher = hero ? $('[data-hero-switcher]') : null;
  if (hero && heroSwitcher) {
    const desktopImage = $('[data-hero-desktop-image]', hero);
    const mobileImage = $('[data-hero-mobile-image]', hero);
    const toggle = $('[data-hero-switcher-toggle]', heroSwitcher);
    const options = $('[data-hero-variant-options]', heroSwitcher);
    const activeLabel = $('[data-hero-active-label]', heroSwitcher);
    const buttons = $$('[data-hero-variant-option]', heroSwitcher);
    const validVariants = new Set(buttons.map((button) => button.dataset.heroVariantOption));
    const setSwitcherOpen = (open) => {
      heroSwitcher.classList.toggle('is-open', open);
      toggle?.setAttribute('aria-expanded', String(open));
      if (options) options.hidden = !open;
    };
    const readStoredHeroVariant = () => {
      try {
        const stored = window.localStorage.getItem(HERO_VARIANT_KEY);
        return validVariants.has(stored) ? stored : null;
      } catch (error) {
        return null;
      }
    };
    const writeStoredHeroVariant = (variant) => {
      try {
        window.localStorage.setItem(HERO_VARIANT_KEY, variant);
      } catch (error) {
        // Storage can be disabled in private browsing; the current page still switches.
      }
    };
    const applyHeroVariant = (variant, { persist = true, announce = false } = {}) => {
      if (!validVariants.has(variant)) return;
      const activeButton = buttons.find((button) => button.dataset.heroVariantOption === variant);
      if (!activeButton) return;
      hero.dataset.heroVariant = variant;
      hero.style.setProperty('--active-hero-variant', variant);
      if (desktopImage && activeButton.dataset.heroDesktopSrc && desktopImage.getAttribute('src') !== activeButton.dataset.heroDesktopSrc) {
        desktopImage.setAttribute('src', activeButton.dataset.heroDesktopSrc);
      }
      if (mobileImage && activeButton.dataset.heroMobileSrc && mobileImage.getAttribute('src') !== activeButton.dataset.heroMobileSrc) {
        mobileImage.setAttribute('src', activeButton.dataset.heroMobileSrc);
      }
      if (activeButton.dataset.heroAlt) {
        desktopImage?.setAttribute('alt', activeButton.dataset.heroAlt);
        mobileImage?.setAttribute('alt', activeButton.dataset.heroAlt);
      }
      buttons.forEach((button) => {
        const isActive = button === activeButton;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });
      if (activeLabel) activeLabel.textContent = variant;
      if (persist) writeStoredHeroVariant(variant);
      if (announce) showToast('Hero V' + variant);
    };
    const requestedHeroVariant = new URLSearchParams(window.location.search).get('hero');
    const initialHeroVariant = validVariants.has(requestedHeroVariant) ? requestedHeroVariant : readStoredHeroVariant() || hero.dataset.heroVariant || '1';
    applyHeroVariant(initialHeroVariant, { persist: validVariants.has(requestedHeroVariant), announce: false });
    setSwitcherOpen(false);
    toggle?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setSwitcherOpen(options ? options.hidden : true);
    });
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        applyHeroVariant(button.dataset.heroVariantOption, { persist: true, announce: true });
        setSwitcherOpen(false);
        toggle?.focus?.();
      });
    });
    document.addEventListener('click', (event) => {
      if (!heroSwitcher.contains(event.target)) setSwitcherOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setSwitcherOpen(false);
    });
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
