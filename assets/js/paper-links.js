// Publication destinations are resolved on click rather than exposed as href values.
// Public arXiv papers use their arXiv abstract pages directly.

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

  if (!target) {
    return null;
  }

  if (target.url) {
    return target.url;
  }

  if (target.encoded) {
    try {
      return atob(target.encoded);
    } catch (error) {
      console.error('Could not decode paper URL:', paperId, error);
      return null;
    }
  }

  return null;
}


function openPaperLink(paperId) {
  const url = resolvePaperUrl(paperId);

  if (!url || !url.startsWith('https://')) {
    console.error('Invalid paper URL:', paperId);
    return;
  }

  const newWindow = window.open(
    url,
    '_blank',
    'noopener,noreferrer'
  );

  if (newWindow) {
    newWindow.opener = null;
  }
}


function updatePaperLabels(root = document) {
  root.querySelectorAll('[data-paper-pdf]').forEach(button => {
    const target = paperTargets[button.dataset.paperPdf];

    if (target && target.label) {
      button.textContent = target.label;
    }
  });
}


// Handle clicks on publication buttons.
document.addEventListener('click', event => {
  const element = event.target;

  if (!(element instanceof Element)) {
    return;
  }

  const button = element.closest('[data-paper-pdf]');

  if (!button) {
    return;
  }

  const paperId = button.dataset.paperPdf;

  if (!paperId) {
    return;
  }

  openPaperLink(paperId);
});


// Update labels once after the page loads.
// Do not use a MutationObserver here because repeatedly changing
// button text can create a mutation feedback loop.
document.addEventListener('DOMContentLoaded', () => {
  updatePaperLabels();
});