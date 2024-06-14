document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburgerContainer');
  const leftPanel = document.querySelector('.left');
  const songListElement = document.querySelector('.songList ul');
  const mainPlayButton = document.getElementById('play');
  const prevButton = document.getElementById('previous');
  const nextButton = document.getElementById('next');
  const currentTimeSpan = document.querySelector('.current-time');
  const totalTimeSpan = document.querySelector('.total-time');
  const playlistCards = document.querySelectorAll('.card');
  let currentAudio = null;
  let currentPlayButton = null;
  let songIndex = 0;
  let songList = [];

  // Playlist data
  const playlists = [
      {
          title: "Romantic Mood",
          songs: [
              { title: "Love Song 1", artist: "Artist 1", source: "path/to/song1.mp3", cover: "path/to/cover1.jpg" },
              { title: "Love Song 2", artist: "Artist 2", source: "path/to/song2.mp3", cover: "path/to/cover2.jpg" }
          ]
      },
      {
          title: "Happy Mood!",
          songs: [
              { title: "Happy Song 1", artist: "Artist 3", source: "path/to/song3.mp3", cover: "path/to/cover3.jpg" },
              { title: "Happy Song 2", artist: "Artist 4", source: "path/to/song4.mp3", cover: "path/to/cover4.jpg" }
          ]
      }
  ];

  // Function to format time in mm:ss
  function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Function to toggle play/pause icon
  function togglePlayPause(playButton, isPlaying) {
      playButton.src = isPlaying ? 'img/pause.svg' : 'img/play.svg';
      playButton.classList.toggle('playing', isPlaying);
  }

  // Function to play the song
  function playSong(songSource, playButton) {
      if (!currentAudio || currentAudio.getAttribute('src') !== songSource) {
          if (currentAudio && !currentAudio.paused) {
              currentAudio.pause();
              togglePlayPause(currentPlayButton, false);
              togglePlayPause(mainPlayButton, false);
          }
          currentAudio = new Audio(songSource);
          currentAudio.play();
          currentAudio.addEventListener('timeupdate', function() {
              const pos = (currentAudio.currentTime / currentAudio.duration) * 100;
              const circle = document.querySelector('.circle');
              circle.style.left = `${pos}%`;

              currentTimeSpan.textContent = formatTime(currentAudio.currentTime);
              totalTimeSpan.textContent = formatTime(currentAudio.duration);
          });

          currentAudio.addEventListener('ended', playNextSong); // Add ended event listener

          currentPlayButton = playButton;
          togglePlayPause(playButton, true);
          togglePlayPause(mainPlayButton, true);
      } else {
          if (currentAudio.paused) {
              currentAudio.play();
              togglePlayPause(playButton, true);
              togglePlayPause(mainPlayButton, true);
          } else {
              currentAudio.pause();
              togglePlayPause(playButton, false);
              togglePlayPause(mainPlayButton, false);
          }
      }
  }

  // Fetch and display songs
  fetch('js/list.json') // Ensure the correct path
      .then(response => response.json())
      .then(data => {
          songList = data; // Save the song list for next/prev functionality
          displaySongs(data);
          loadAlbum(data[0]);
      })
      .catch(error => console.error('Error fetching the JSON data:', error));

  // Function to display songs in the sidebar
  function displaySongs(data) {
      songListElement.innerHTML = ''; // Clear existing songs
      data.forEach((song, index) => {
          const songItem = document.createElement('li');
          songItem.innerHTML = `
              <img class="invert" src="img/music.svg" alt="Music">
              <div class="songinfo">
                  <div style="color: #ccc;">${song.title}</div>
                  <div style="color: #ccc;">${song.artist}</div>
              </div>
              <div class="playnow">
                  <span style="color: #ccc;">Play Now</span>
                  <img class="invert play-button" src="img/play.svg" alt="Play" data-src="${song.source}" data-index="${index}">
              </div>
          `;
          songListElement.appendChild(songItem);
      });

      document.querySelectorAll('.play-button').forEach(playButton => {
          playButton.addEventListener('click', () => {
              const songSource = playButton.getAttribute('data-src');
              playSong(songSource, playButton);
              songIndex = parseInt(playButton.getAttribute('data-index'));
              loadAlbum(songList[songIndex]);
          });
      });
  }

  // Function to load album data
  function loadAlbum(song) {
      const albumArt = document.getElementById('album-art');
      const albumTitle = document.getElementById('album-title');
      const albumArtist = document.getElementById('album-artist');

      albumArt.src = song.cover || 'img/default-cover.jpg'; // Assuming there's a cover property in the song object
      albumTitle.textContent = song.title;
      albumArtist.textContent = song.artist;
  }

  // Main play button functionality
  mainPlayButton.addEventListener('click', function() {
      if (currentAudio) {
          if (currentAudio.paused) {
              currentAudio.play();
              togglePlayPause(mainPlayButton, true);
              togglePlayPause(currentPlayButton, true);
          } else {
              currentAudio.pause();
              togglePlayPause(mainPlayButton, false);
              togglePlayPause(currentPlayButton, false);
          }
      }
  });

  // Seekbar functionality
  const seekbar = document.querySelector('.seekbar');
  const circle = document.querySelector('.circle');

  seekbar.addEventListener('click', function(e) {
      if (currentAudio) {
          const rect = seekbar.getBoundingClientRect();
          const pos = (e.clientX - rect.left) / rect.width;
          currentAudio.currentTime = pos * currentAudio.duration;
          circle.style.left = `${pos * 100}%`;
      }
  });

  // Volume control
  const volumeControl = document.querySelector('.volume input[type="range"]');

  volumeControl.addEventListener('input', function() {
      if (currentAudio) {
          currentAudio.volume = this.value / 100;
      }
  });

  // Next song functionality
  nextButton.addEventListener('click', function() {
      playNextSong();
  });

  // Previous song functionality
  prevButton.addEventListener('click', function() {
      playPrevSong();
  });

  // Function to play the next song in the playlist
  function playNextSong() {
      songIndex = (songIndex + 1) % songList.length;
      const nextSong = songList[songIndex];
      playSong(nextSong.source, document.querySelectorAll('.play-button')[songIndex]);
      loadAlbum(nextSong);
  }

  // Function to play the previous song in the playlist
  function playPrevSong() {
      songIndex = (songIndex - 1 + songList.length) % songList.length;
      const prevSong = songList[songIndex];
      playSong(prevSong.source, document.querySelectorAll('.play-button')[songIndex]);
      loadAlbum(prevSong);
  }

  // Playlist card click functionality
  playlistCards.forEach(card => {
      card.addEventListener('click', function() {
          const index = parseInt(card.getAttribute('data-index'));
          const selectedPlaylist = playlists[index];
          songList = selectedPlaylist.songs;
          songIndex = 0;
          displaySongs(songList);
          loadAlbum(songList[songIndex]);
      });
  });
});
