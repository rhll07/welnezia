/* api.js — Affirmations API (affirmations.dev)
   Used on: mental-wellness.html
   No API key needed. Completely free and unlimited.
*/

document.addEventListener('DOMContentLoaded', () => {

  const affirmationBtn     = document.getElementById('affirmationBtn');
  const affirmationBox     = document.getElementById('affirmationBox');
  const affirmationText    = document.getElementById('affirmationText');
  const affirmationLoading = document.getElementById('affirmationLoading');
  const affirmationError   = document.getElementById('affirmationError');

  if (!affirmationBtn) return; // only runs on mental-wellness.html

  affirmationBtn.addEventListener('click', async () => {
    // Reset state
    affirmationBox.style.display     = 'none';
    affirmationError.style.display   = 'none';
    affirmationLoading.style.display = 'block';
    affirmationBtn.disabled          = true;
    affirmationBtn.textContent       = 'Fetching...';

    try {
      const response = await fetch('https://www.affirmations.dev/');
      const data     = await response.json();
      affirmationText.textContent = '\u201C' + data.affirmation + '\u201D';
      affirmationBox.style.display     = 'block';
    } catch (error) {
      affirmationLoading.style.display = 'none';
      affirmationError.textContent     = '\u26A0\uFE0F Could not fetch affirmation. Please check your connection and try again.';
      affirmationError.style.display   = 'block';
    } finally {
      affirmationBtn.disabled    = false;
      affirmationBtn.textContent = '\u2728 Get Another Affirmation';
    }
  });

});
