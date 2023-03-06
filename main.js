// Select All Elements You Might Need
let sliderHeader = document.querySelector(".slider-number");
let indicators = document.querySelector(".indicators");
let imageArray = Array.from(document.querySelectorAll(".slider-container img"));
let prevButton = document.querySelector(".prev");
let nextButton = document.querySelector(".next");

// Set The CurrentSlide
let CurrentSlide = 0;

checker(CurrentSlide);

// [1] Create Bullets Spans

function createBullets() {
  for (let i = 0; i < imageArray.length; i++) {
    // Create Bullets Spans With Index Attributes
    let bulletSpan = document.createElement("span");
    bulletSpan.dataset.index = i + 1;
    let bulletSpanText = document.createTextNode(i + 1);
    bulletSpan.appendChild(bulletSpanText);

    // Checks If This Element is CurrentSlide && Add Active Class To It;
    if (i === CurrentSlide) {
      bulletSpan.classList.add("active");
    }
    indicators.appendChild(bulletSpan);
  }
}
createBullets();

// [2] Set The #Header And #Image Sliders
function headerAndSliders() {
  // Set The Header Using CurrentSlide
  sliderHeader.textContent = `Slider #${CurrentSlide + 1}`;

  //Loop On Images And Remove Active Class From All
  imageArray.forEach((img) => {
    img.classList.remove("active");
  });

  // Set The Active Class On The Current Slide Image
  imageArray[CurrentSlide].classList.add("active");
}
headerAndSliders();

// [3] Set The Onclick Function Which Occur On PrevButton And NextButton
prevButton.onclick = previousSlider;
nextButton.onclick = nextSlider;

// [4] Set Previous And Next Functions
function previousSlider() {
  if (CurrentSlide > 0) {
    CurrentSlide--;
    headerAndSliders();
    colorCurrentBullet(CurrentSlide);
    checker(CurrentSlide);
  }
}
function nextSlider() {
  if (CurrentSlide < imageArray.length - 1) {
    CurrentSlide++;
    headerAndSliders();
    colorCurrentBullet(CurrentSlide);
    checker(CurrentSlide);
  }
}

// [5] Loop On All Bullets, Add Active Class To CurrentSlide Bullet
function colorCurrentBullet(CurrentSlide) {
  let indicatorsSpans = document.querySelectorAll(".indicators span");

  // Loop On All Bullets And Remove Active Class
  indicatorsSpans.forEach((bullet) => {
    bullet.classList.remove("active");
  });

  // Set The Active Class To The Current Bullet
  indicatorsSpans[CurrentSlide].classList.add("active");
}

// [5] Set Function Occurs After Clickin On Bullet
function clickBullet() {
  let indicatorsSpans = document.querySelectorAll(".indicators span");
  indicatorsSpans.forEach((span) => {
    // Set Click On Bullet Function
    span.addEventListener("click", (e) => {
      CurrentSlide = e.target.dataset.index - 1;
      checker(CurrentSlide);
      colorCurrentBullet(CurrentSlide);
      headerAndSliders();
    });
  });
}
clickBullet();

// [6] Set The Checker Function Which Will Control The CurrentSlid Is First Or Last Or Not
function checker(CurrentSlid) {
  // Add Disabled To Previous Button If CurrentSlide Is 0
  if (CurrentSlid == 0) {
    prevButton.classList.add("disabled");
  } else {
    prevButton.classList.remove("disabled");
  }

  // Add Disabled To Next Button If CurrentSlide Is Last
  if (CurrentSlid == imageArray.length - 1) {
    nextButton.classList.add("disabled");
  } else {
    nextButton.classList.remove("disabled");
  }
}
