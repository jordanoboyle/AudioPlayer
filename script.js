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

const songs = ['hey', 'summer', 'ukulele', 'night-detective'];

//Keep track of song  
let songIndex = 3;

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

  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;

  //Display Dynamic Time Stamp
  let timeStamp = document.querySelector('#timestamp');
  
  if (!timeStamp) {
    timeStamp = document.createElement('p');
    timeStamp.id = 'timestamp';
    progress.insertAdjacentElement('afterend', timeStamp);
  }
  
  let minDuration = Math.floor(duration / 60);
  let secondDuration = Math.floor(duration % 60);

  let minCurrent = Math.floor(currentTime / 60);
  let secondCurrent = Math.floor(currentTime % 60);
  // console.log("Showing dynam current min:sec", minCurrent, secondCurrent);
  
  

  timeStamp.textContent = `
      ${minCurrent < 10 ? '0' + minCurrent : minCurrent}:${secondCurrent < 10 ? '0' + secondCurrent : secondCurrent} 
      / 
      ${isNaN(minDuration) ? '00' : minDuration}:${isNaN(secondDuration) ? '00' : secondDuration}
    `;
}

//Set Song Progress
function setSongProgress(e) {
  const width = this.clientWidth;
  //This gets us the total width of the progress bar. 
  const clickX = e.offsetX;
  //This gets us the value of where we are clicking on the progress bar. 
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;

  console.log(width);
  console.log(clickX);
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



//Making the Song Title Squigle
let SOURCE_TEXT = "Audio File Player";
const $characters = []; //This is meant to signify special variable.
SOURCE_TEXT.split('').forEach((char, idx) => {
  const $char = document.createElement('span');
  $char.textContent = char;

  //We want an animation delay based on index
  //Staggering the wiggle, and neg value
  //Neg val for the purposes of no delay.

  $char.style.setProperty('animation-delay',
    `${idx * -150}ms`
  );
  $characters.push($char);
});
//Inserting the spans into the output node
document.getElementById('wiggle').replaceChildren(...$characters);




//Change Song
prevBtn.addEventListener('click', previousSong);
nextBtn.addEventListener('click', nextSong);

//Time-Song Update
audio.addEventListener('timeupdate', updateProgress);

//Change Song Progress
progressContainer.addEventListener('click', setSongProgress);

//Song End, next song
audio.addEventListener('ended', nextSong);