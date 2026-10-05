/* Forma demo analytics. GA4 only receives anonymous product events. */
(function () {
  const measurementId = 'G-Y8617TLMYK';
  const clarityId = 'pmp4efispy';
  const posthogKey = 'phc_poY0XlVu6WBmOsIKW4OwRT60oDXKjJrMhPz1tqhvK6U';
  const debug = new URLSearchParams(location.search).get('debug') === 'true';
  const sent = [];
  window.formaAnalytics = { measurementId, sent };
  window.digitalData = window.digitalData || {
    page: { pageName: 'Forma | Treatment Studio', siteSection: 'Treatment coordination', pageType: 'treatment_workspace', language: 'en-US' },
    user: { authenticationStatus: 'anonymous' }, eventData: {}, events: []
  };
  window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
  const clarityScript = document.createElement('script');
  clarityScript.async = true;
  clarityScript.src = 'https://www.clarity.ms/tag/' + clarityId;
  document.head.appendChild(clarityScript);
  window.posthog = window.posthog || [];
  window.posthog.init = window.posthog.init || function () { window.posthog._i = window.posthog._i || []; window.posthog._i.push(arguments); };
  window.posthog.capture = window.posthog.capture || function (name, props) { window.posthog.push(['capture', name, props]); };
  const posthogScript = document.createElement('script');
  posthogScript.async = true;
  posthogScript.src = 'https://us-assets.i.posthog.com/static/array.js';
  document.head.appendChild(posthogScript);
  window.posthog.init(posthogKey, { api_host: 'https://us.i.posthog.com', person_profiles: 'always', capture_pageview: true });
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', measurementId, { send_page_view: true, page_title: document.title, page_location: location.origin + location.pathname, debug_mode: debug });
  window.formaTrack = function (name, params) {
    const safe = Object.assign({ site_name: 'forma_treatment_studio', demo_mode: true }, params || {});
    delete safe.query; delete safe.search_term; delete safe.email; delete safe.name;
    sent.push({ name, params: safe, at: new Date().toISOString() });
    window.digitalData.events.push({ event: name, eventData: safe, timestamp: new Date().toISOString() });
    window.digitalData.eventData = safe;
    window.clarity('event', name);
    window.posthog.capture(name, safe);
    gtag('event', name, safe);
  };
  window.formaTrack('demo_view', { view_name: 'treatment_workspace' });
})();
