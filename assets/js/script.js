const audio = document.getElementById('audio');
const playPause = document.getElementById('playPause');
const rewind = document.getElementById('rewind');
const fastForward = document.getElementById('forward');
const stop = document.getElementById('stop');

// Set audio current time from local storage
if (localStorage.getItem('playback') != null) {
  audio.currentTime = parseFloat(localStorage.getItem('playback'));
} else {
  audio.currentTime = 0;
}

// Play / Pause treck
playPause.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPause.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M6 3a1 1 0 00-1 1v16a1 1 0 001 1h4a1 1 0 001-1V4a1 1 0 00-1-1zm1 2h2v14H7zm7-2a1 1 0 00-1 1v16a1 1 0 001 1h4a1 1 0 001-1V4a1 1 0 00-1-1zm1 2h2v14h-2z"/>
    </svg>
    `;
  } else {
    audio.pause();
    playPause.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        d="M5.541 2.159A1 1 0 004 3v18a1 1 0 001.541.841l14-9a1 1 0 000-1.682zM6 4.832L17.151 12 6 19.168z"
      />
    </svg>
    `;
  }
});

// Rewind 10 seconds
rewind.addEventListener('click', () => {
  audio.currentTime -= 10;
});

// Fastforward 30 seconds
fastForward.addEventListener('click', () => {
  audio.currentTime += 30;
});

// Stop the track and go back to the beginning
stop.addEventListener('click', () => {
  // Reset current time
  audio.currentTime = 0;

  // Stop playing
  audio.pause();

  // Switch icon to play
  playPause.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        d="M5.541 2.159A1 1 0 004 3v18a1 1 0 001.541.841l14-9a1 1 0 000-1.682zM6 4.832L17.151 12 6 19.168z"
      />
    </svg>
    `;
});

// Update progress bar
const progressBar = document.querySelector('.progress-bar');
const progressFilled = document.querySelector('.progress-filled');

// Update progress bar
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressFilled.style.width = `${percent}%`;

  // save current playback time to local storage
  localStorage.setItem('playback', JSON.stringify(audio.currentTime));

  document.querySelector('.current-time').innerHTML = convertTimeToString(
    audio.currentTime
  );
});

// Rewind using progress bar
progressBar.addEventListener('click', (e) => {
  const scrubTime = (e.offsetX / progressBar.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
});

function convertTimeToString(time) {
  totalNumberOfSeconds = Math.floor(time);
  const hours = parseInt(totalNumberOfSeconds / 3600);
  const minutes = parseInt((totalNumberOfSeconds - hours * 3600) / 60);
  const seconds = Math.floor(
    totalNumberOfSeconds - (hours * 3600 + minutes * 60)
  );
  const result =
    hours +
    ':' +
    (minutes < 10 ? +minutes : minutes) +
    ':' +
    (seconds < 10 ? '0' + seconds : seconds);

  return result;
}

audio.addEventListener('loadedmetadata', () => {
  document.querySelector('.duration').innerHTML = convertTimeToString(
    audio.duration
  );
});
