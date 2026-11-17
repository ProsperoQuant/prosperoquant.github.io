(() => {
  // Delay assembling the inbox until a visitor chooses to write.
  // This deters basic address scraping; it does not provide secrecy.
  const inboxParts = ['Y29udGFjdA==', 'cHJvc3F1YW50LmNvbQ=='];
  document.addEventListener('click', event => {
    const button = event.target instanceof Element
      ? event.target.closest('.contact-action')
      : null;
    if (!button) return;
    const address = inboxParts.map(part => atob(part)).join('@');
    const subject = button.getAttribute('data-email-subject');
    const query = subject ? '?subject=' + encodeURIComponent(subject) : '';
    window.location.href = 'mailto:' + address + query;
  });
})();
