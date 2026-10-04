// Add new photos here after copying them into assets/img/outdoors/.
// Example:
// { src: 'assets/img/outdoors/half-dome.jpg', title: 'Half Dome', meta: 'Yosemite · Oct 2025', alt: 'View from Half Dome' }
const outdoorPhotos = [
  {
    src: 'assets/img/outdoors/mt-whitney.jpg',
    title: 'Mount Whitney',
    meta: 'Sierra Nevada · Sep 2026 · 14,505 ft',
    alt: 'Amit Thakur standing on Mount Whitney holding a summit sign'
  },
  {
    src: 'assets/img/outdoors/koip.jpg',
    title: 'Kuna-Koip Peaks (With Mono Lake in the background)',
    meta: 'Sierra Nevada · Aug 2026 · 13,000 ft',
    alt: 'Amit Thakur standing on Mount Koip taking a selfie.'
  },
  {
    src: 'assets/img/outdoors/conness.jpeg',
    title: 'Mount Conness',
    meta: 'Sierra Nevada · Aug 2026 · 12,590 ft',
    alt: 'Amit Thakur standing on Mount Conness holding a summit sign board.'
  }
];

function renderOutdoorAlbum() {
  const album = document.querySelector('#outdoor-album');
  if (!album) return;

  const escapeHtml = (s = '') => s.replace(/[&<>'"]/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[c]));

  album.innerHTML = outdoorPhotos.map(photo => `
    <figure class="album-item">
      <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt)}" loading="lazy">
      <figcaption>
        <strong>${escapeHtml(photo.title)}</strong>
        <span>${escapeHtml(photo.meta)}</span>
      </figcaption>
    </figure>
  `).join('');

  const prev = document.querySelector('[data-album-prev]');
  const next = document.querySelector('[data-album-next]');
  const step = () => Math.max(280, album.clientWidth * 0.82);

  prev?.addEventListener('click', () => album.scrollBy({ left: -step(), behavior: 'smooth' }));
  next?.addEventListener('click', () => album.scrollBy({ left: step(), behavior: 'smooth' }));
}

document.addEventListener('DOMContentLoaded', renderOutdoorAlbum);
