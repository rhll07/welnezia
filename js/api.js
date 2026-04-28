/* api.js — Affirmations via Quotable API
   Used on: mental.html
   No API key needed. Free and unlimited. Works locally + GitHub Pages.
*/

document.addEventListener('DOMContentLoaded', () => {

  const affirmationBtn     = document.getElementById('affirmationBtn');
  const affirmationBox     = document.getElementById('affirmationBox');
  const affirmationText    = document.getElementById('affirmationText');
  const affirmationLoading = document.getElementById('affirmationLoading');
  const affirmationError   = document.getElementById('affirmationError');

  if (!affirmationBtn) return;

  affirmationBtn.addEventListener('click', async () => {
    affirmationBox.style.display     = 'none';
    affirmationError.style.display   = 'none';
    affirmationLoading.style.display = 'block';
    affirmationBtn.disabled          = true;
    affirmationBtn.textContent       = 'Fetching...';

    try {
      const response = await fetch('https://zenquotes.io/api/random');
      const data     = await response.json();
      affirmationLoading.style.display = 'none';
      affirmationText.textContent      = '\u201C' + data[0].q + '\u201D \u2014 ' + data[0].a;
      affirmationBox.style.display     = 'block';
    } catch (error) {
      affirmationLoading.style.display = 'none';
      affirmationError.textContent     = '\u26A0\uFE0F Could not fetch. Please check your connection and try again.';
      affirmationError.style.display   = 'block';
    } finally {
      affirmationBtn.disabled    = false;
      affirmationBtn.textContent = '\u2728 Get Another Affirmation';
    }
  });

});