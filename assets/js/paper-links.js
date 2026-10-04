// Publication PDF destinations are intentionally not exposed as direct href values.
// This reduces casual crawling/discovery, but it is not a security or guaranteed no-index mechanism.
const paperPdfTargets = Object.freeze({
  'decision-shift': 'aHR0cHM6Ly91Y21lcmNlZC5ib3guY29tL3MveDRuZjQ3Yzl2Y3hyOWRmcGxieXc4bHlreG1iN3doN24=',
  'lexidet-ovd': 'aHR0cHM6Ly91Y21lcmNlZC5ib3guY29tL3MvY3VndjMxbDRvcmliaXBwN2xpZWN5bTgzZjAybTQzbXA=',
  'orchsmart': 'aHR0cHM6Ly91Y21lcmNlZC5ib3guY29tL3Mvd2VoZ3o5cGhpczZtdXh2b256eWt6eWJtY2s2ejFtZzE=',
  'toca': 'aHR0cHM6Ly91Y21lcmNlZC5ib3guY29tL3MvbDVjMzR5aWt1dTZ1djlveHF3dWJzMzEwYmkzYXNpcTU=',
  'action-collapse': 'aHR0cHM6Ly91Y21lcmNlZC5ib3guY29tL3MvaGFvNjdjMTFvMXFyZjIyZzNzcGR6aDNnbW9pMDhmbjA=',
  'ms-thesis': 'aHR0cHM6Ly91Y21lcmNlZC5ib3guY29tL3MvemthYm1iYzN5OTEwY3o4bG84dHVyc2xkaHQycW8zYTc=',
});

function openPaperPdf(paperId) {
  const token = paperPdfTargets[paperId];
  if (!token) return;

  let url;
  try {
    url = atob(token);
  } catch {
    return;
  }

  if (!url.startsWith('https://')) return;
  window.open(url, '_blank', 'noopener,noreferrer');
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-paper-pdf]');
  if (!button) return;
  openPaperPdf(button.dataset.paperPdf);
});
