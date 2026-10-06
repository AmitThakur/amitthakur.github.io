// Publication destinations are resolved on click rather than exposed as href values.
// The two public preprints below now point to their arXiv abstract pages.
const paperTargets = Object.freeze({
  'decision-shift': {
    encoded: 'aHR0cHM6Ly91Y21lcmNlZC5ib3guY29tL3MveDRuZjQ3Yzl2Y3hyOWRmcGxieXc4bHlreG1iN3doN24='
  },
  'lexidet-ovd': {
    encoded: 'aHR0cHM6Ly91Y21lcmNlZC5ib3guY29tL3MvY3VndjMxbDRvcmliaXBwN2xpZWN5bTgzZjAybTQzbXA='
  },
  'orchsmart': {
    encoded: 'aHR0cHM6Ly91Y21lcmNlZC5ib3guY29tL3Mvd2VoZ3o5cGhpczZtdXh2b256eWt6eWJtY2s2ejFtZzE='
  },
  'toca': {
    url: 'https://arxiv.org/abs/2610.02847',
    label: 'arXiv ↗'
  },
  'action-collapse': {
    url: 'https://arxiv.org/abs/2610.02848',
    label: 'arXiv ↗'
  },
  'ms-thesis': {
    encoded: 'aHR0cHM6Ly91Y21lcmNlZC5ib3guY29tL3MvemthYm1iYzN5OTEwY3o4bG84dHVyc2xkaHQycW8zYTc='
  }
});

function resolvePaperUrl(paperId) {
  const target = paperTargets[paperId];
  if (!target) return null;

  if (target.url) return target.url;

  if (target.encoded) {
    try {
      return atob(target.encoded);
    } catch {
      return null;
    }
  }

  return null;
}

function openPaperLink(paperId) {
  const url = resolvePaperUrl(paperId);
  if (!url || !url.startsWith('https://')) return;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function updatePaperLabels(root = document) {
  root.querySelectorAll('[data-paper-pdf]').forEach(button => {
    const target = paperTargets[button.dataset.paperPdf];
    if (target?.label) button.textContent = target.label;
  });
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-paper-pdf]');
  if (!button) return;
  openPaperLink(button.dataset.paperPdf);
});

document.addEventListener('DOMContentLoaded', () => {
  updatePaperLabels();

  // publications.js renders its entries dynamically after DOMContentLoaded.
  // Observe the page so arXiv buttons receive the correct label there too.
  const observer = new MutationObserver(() => updatePaperLabels());
  observer.observe(document.body, { childList: true, subtree: true });
});
