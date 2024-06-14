{/* <script>
  const myImage = document.getElementById('img2');
  const myAudio = new Audio('songs/Dekhte Dekhte - Atif Aslam.m4a');

  img2.addEventListener('click', () => {
    myAudio.play();
  });
</script> */}

<img src="your-image.jpg" id="myImage" alt="Click me">

  <script>
    const myImage = document.getElementById('myImage');
    const myAudio = new Audio('your-sound-file.mp3');

  myImage.addEventListener('click', () => {
      myAudio.play();
  });
  </script>
