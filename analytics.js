/* Forma demo analytics. GA4 only receives anonymous product events. */
(function () {
  const measurementId = 'G-Y8617TLMYK';
  const debug = new URLSearchParams(location.search).get('debug') === 'true';
  const sent = [];
  window.formaAnalytics = { measurementId, sent };
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
    gtag('event', name, safe);
  };
  window.formaTrack('demo_view', { view_name: 'treatment_workspace' });
})();
