document.addEventListener('DOMContentLoaded', () => {
  const closeAd = document.getElementById('close-sponsor');
  const adBox = document.getElementById('sponsor-box');
  const playoffImage = document.getElementById('playoff-image');
  const menuButton = document.querySelector('.menu-button');
  const siteMenu = document.getElementById('site-menu');

  if (menuButton && siteMenu) {
    menuButton.addEventListener('click', () => {
      const isOpen = siteMenu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
      if (!siteMenu.classList.contains('is-open')) return;
      if (siteMenu.contains(event.target) || menuButton.contains(event.target)) return;
      siteMenu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  }

  const showAd = () => {
    document.body.classList.add('sponsor-ready');
  };

  if (adBox && playoffImage) {
    if (playoffImage.complete) {
      window.requestAnimationFrame(showAd);
    } else {
      playoffImage.addEventListener('load', () => window.requestAnimationFrame(showAd), { once: true });
      playoffImage.addEventListener('error', showAd, { once: true });
    }
  }

  if (closeAd && adBox) {
    closeAd.addEventListener('click', () => {
      adBox.style.display = 'none';
    });
  }
});

function trackSponsorClick(event, link) {
  event.preventDefault();

  const href = link.href;
  let didRedirect = false;

  const redirect = () => {
    if (didRedirect) return;
    didRedirect = true;
    window.location.href = href;
  };

  window.setTimeout(redirect, 700);

  if (typeof gtag === 'function') {
    gtag('event', 'click_ad_sportsmemo', {
      ad_name: link.dataset.sponsorName || 'sportsmemorabilia',
      location: link.dataset.sponsorLocation || 'sponsor_box',
      event_callback: redirect,
      event_timeout: 700
    });
  } else {
    redirect();
  }
}
