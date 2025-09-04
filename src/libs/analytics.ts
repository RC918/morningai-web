// Google Analytics 4 configuration with language dimension tracking

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_TRACKING_ID) {
    console.warn('Google Analytics ID not found');
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views with language dimension
export const trackPageView = (url: string, locale: string) => {
  if (!GA_TRACKING_ID || typeof window.gtag === 'undefined') {
    return;
  }

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    custom_map: {
      custom_dimension_1: 'language',
    },
  });

  // Send page view with language dimension
  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: url,
    language: locale,
    custom_dimension_1: locale,
  });
};

// Track language switching events
export const trackLanguageSwitch = (fromLocale: string, toLocale: string) => {
  if (!GA_TRACKING_ID || typeof window.gtag === 'undefined') {
    return;
  }

  window.gtag('event', 'language_switch', {
    event_category: 'i18n',
    event_label: `${fromLocale} -> ${toLocale}`,
    from_language: fromLocale,
    to_language: toLocale,
    custom_dimension_1: toLocale,
  });
};

// Track CTA button clicks with language context
export const trackCTAClick = (buttonName: string, locale: string, location: string) => {
  if (!GA_TRACKING_ID || typeof window.gtag === 'undefined') {
    return;
  }

  window.gtag('event', 'cta_click', {
    event_category: 'engagement',
    event_label: buttonName,
    button_name: buttonName,
    language: locale,
    page_location: location,
    custom_dimension_1: locale,
  });
};

// Track demo interactions with language context
export const trackDemoInteraction = (action: string, locale: string) => {
  if (!GA_TRACKING_ID || typeof window.gtag === 'undefined') {
    return;
  }

  window.gtag('event', 'demo_interact', {
    event_category: 'engagement',
    event_label: action,
    demo_action: action,
    language: locale,
    custom_dimension_1: locale,
  });
};

// Track signup clicks with language context
export const trackSignupClick = (source: string, locale: string) => {
  if (!GA_TRACKING_ID || typeof window.gtag === 'undefined') {
    return;
  }

  window.gtag('event', 'signup_click', {
    event_category: 'conversion',
    event_label: source,
    signup_source: source,
    language: locale,
    custom_dimension_1: locale,
  });
};

// Get user's preferred language from browser
export const getBrowserLanguage = (): string => {
  if (typeof navigator === 'undefined') {
    return 'en';
  }

  const lang = navigator.language || 'en';

  // Map browser language to our supported locales
  if (lang.startsWith('zh-TW') || lang.startsWith('zh-Hant')) {
    return 'zh-TW';
  } else if (lang.startsWith('zh-CN') || lang.startsWith('zh-Hans') || lang.startsWith('zh')) {
    return 'zh-CN';
  } else {
    return 'en';
  }
};

// Analytics utility functions
export const analytics = {
  init: initGA,
  trackPageView,
  trackLanguageSwitch,
  trackCTAClick,
  trackDemoInteraction,
  trackSignupClick,
  getBrowserLanguage,
};
