//DOM Elements
const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const title = document.getElementById('title');
const cover = document.getElementById('cover');


// Song Titles:

const songs = ['hey', 'summer', 'ukulele'];

//Keep track of song  
let songIndex = 2;

//Load song details into the DOM 
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `musicFiles/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

//Play and Pause Song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}


function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
}

//Previous Song
function previousSong() {
  songIndex--;
  //If it is the first song we don't want to just stop or crash, revert to last song in list. 
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
  
}

//Next Song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  
  playSong();
}


//Update the time progress for Song;
function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;

  // console.log(duration, currentTime);

  const progressPercent = (currentTime / duration) * 100;
  // console.log(progressPercent);

  progress.style.width = `${progressPercent}%`;

  
  
  let timeStamp = document.querySelector('#timestamp');
  
  if (!timeStamp) {
    timeStamp = document.createElement('p');
    timeStamp.id = 'timestamp';
    progress.insertAdjacentElement('afterend', timeStamp);
  }
  
  let pleasingElapsed = Math.floor(currentTime);
  let pleasingDuration = Math.floor(duration);
  console.log(`Time Elapsed: ${pleasingElapsed} / Total Duration: ${pleasingDuration}`);
  
  timeStamp.textContent = `Time Elapsed: ${pleasingElapsed}`;

  

}

//EVENT LISTERNERS

//Play Song
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//Change Song
prevBtn.addEventListener('click', previousSong);
nextBtn.addEventListener('click', nextSong);

//Time-Song Update
audio.addEventListener('timeupdate', updateProgress);