document.addEventListener('DOMContentLoaded', () => {
  const closeSponsor = document.getElementById('close-sponsor');
  const sponsorBox = document.getElementById('sponsor-box');
  const playoffImage = document.getElementById('playoff-image');
  const menuButton = document.querySelector('.menu-button');
  const siteMenu = document.getElementById('site-menu');

  const showSponsor = () => {
    document.body.classList.add('sponsor-ready');
  };

  if (sponsorBox && playoffImage) {
    if (playoffImage.complete) {
      window.requestAnimationFrame(showSponsor);
    } else {
      playoffImage.addEventListener('load', () => window.requestAnimationFrame(showSponsor), { once: true });
      playoffImage.addEventListener('error', showSponsor, { once: true });
    }
  }

  if (closeSponsor && sponsorBox) {
    closeSponsor.addEventListener('click', () => {
      sponsorBox.style.display = 'none';
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
