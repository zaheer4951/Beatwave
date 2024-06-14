let containerFront = document.querySelector(`.containerFront`);
let containerBack = document.querySelector(`.containerBack`);

let newUser = document.querySelector('.newUser');
let existingUser = document.querySelector('.existingUser');

newUser.addEventListener("click", function() {
    containerFront.style.zIndex = 1;
    containerBack.style.zIndex = 2;
  });
  
existingUser.addEventListener("click", function() {
    containerFront.style.zIndex = 2;
    containerBack.style.zIndex = 1;
  });


