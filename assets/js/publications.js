const publications = [
  {
    year: 2027,
    type: 'Conference',
    title: 'What Must Be Learned to Adapt? Decision-Directed Identification Under Environment Shift',
    authors: 'Amit Thakur and Mukesh Singhal',
    venue: 'ICLR 2027',
    status: 'Under review',
    summary: 'Decision-directed identification and adaptation under environment shift.',
    paperId: 'decision-shift'
  },
  {
    year: 2027,
    type: 'Conference',
    title: 'LexiDet-OVD: Benchmarking Lexical Sensitivity in Open-Vocabulary Object Detection',
    authors: 'Amit Thakur and Mukesh Singhal',
    venue: 'WACV 2027',
    status: 'Under review',
    summary: 'A benchmark for lexical sensitivity in open-vocabulary object detection.',
    paperId: 'lexidet-ovd'
  },
  {
    year: 2027,
    type: 'Conference',
    title: 'OrchSmart: Intelligent Control and Long-Term In-Field Test of Smart Irrigation in Orchards',
    authors: 'Fan Zhao, Amit Thakur, Zhiyu An, Brady E Holder, Keith C Byrum, Khaled M Bali, Stefano Carpin, and Wan Du',
    venue: 'SenSys 2027',
    status: 'Conditionally accepted',
    summary: 'Intelligent irrigation control and long-term in-field evaluation in orchards.',
    paperId: 'orchsmart'
  },
  {
    year: 2026,
    type: 'Preprint',
    title: 'Turnover-Orthogonal Credit Assignment for Open-Team Multi-Agent Reinforcement Learning',
    authors: 'Amit Thakur and Mukesh Singhal',
    venue: 'arXiv',
    status: '2026',
    summary: 'Credit assignment for open-team multi-agent reinforcement learning under team turnover.',
    paperId: 'toca',
    linkLabel: 'arXiv ↗'
  },
  {
    year: 2026,
    type: 'Preprint',
    title: 'Permutation Robustness Is Not Enough: Action Collapse in Multi-Agent Transformer Policies',
    authors: 'Amit Thakur and Mukesh Singhal',
    venue: 'arXiv',
    status: '2026',
    summary: 'An investigation of action collapse despite permutation robustness in multi-agent transformer policies.',
    paperId: 'action-collapse',
    linkLabel: 'arXiv ↗'
  },
  {
    year: 2025,
    type: 'Thesis',
    title: 'Design and Implementation of an Automated System for AI-Agent based Optimized Irrigation in Almond Farms',
    authors: 'Amit Thakur',
    venue: 'M.S. Thesis, Electrical Engineering and Computer Science, University of California, Merced',
    status: '2025',
    summary: 'M.S. thesis on AI-agent-based optimized irrigation in almond farms.',
    paperId: 'ms-thesis'
  }
];

function renderPublications() {
  const list = document.querySelector('#publication-list');
  if (!list) return;

  const search = document.querySelector('#publication-search');
  const chips = [...document.querySelectorAll('[data-pub-filter]')];
  const empty = document.querySelector('#publication-empty');
  let filter = 'All';

  const escapeHtml = (s = '') => s.replace(/[&<>'"]/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[c]));

  const formatAuthors = (s = '') =>
    escapeHtml(s).replaceAll('Amit Thakur', '<strong>Amit Thakur</strong>');

  function draw() {
    const q = (search?.value || '').trim().toLowerCase();
    const rows = publications
      .filter(p => filter === 'All' || p.type === filter)
      .filter(p => [p.title, p.authors, p.venue, p.status, p.summary, String(p.year)].join(' ').toLowerCase().includes(q))
      .sort((a, b) => b.year - a.year);

    list.innerHTML = rows.map(p => `
      <article class="pub-card">
        <div>
          <div class="pub-year">${p.year}</div>
          <div class="pub-type">${escapeHtml(p.type)}</div>
        </div>
        <div>
          <h2>${escapeHtml(p.title)}</h2>
          <p class="pub-authors">${formatAuthors(p.authors)}</p>
          <p class="pub-venue">${escapeHtml(p.venue)}${p.status ? `<span class="pub-status">${escapeHtml(p.status)}</span>` : ''}</p>
          ${p.summary ? `<p class="pub-summary">${escapeHtml(p.summary)}</p>` : ''}
          ${p.paperId ? `<div class="pub-links"><button class="pdf-view-button" type="button" data-paper-pdf="${escapeHtml(p.paperId)}">${escapeHtml(p.linkLabel || 'View PDF ↗')}</button></div>` : ''}
        </div>
      </article>
    `).join('');

    if (empty) empty.style.display = rows.length ? 'none' : 'block';
  }

  search?.addEventListener('input', draw);
  chips.forEach(chip => chip.addEventListener('click', () => {
    filter = chip.dataset.pubFilter;
    chips.forEach(c => c.classList.toggle('active', c === chip));
    draw();
  }));
  draw();
}

document.addEventListener('DOMContentLoaded', renderPublications);
