// %로 주지 않고, 값을 측정하면 window resizing이 일어날 때 옆 사진이 돌출되는 문제가 있어
// %로 코드 변경 착수함.
const container = document.querySelector('.slide-container');
const contents = document.querySelector('.slide-contents');
const slideLeftButton = document.querySelector('.slide-left');
const slideRightButton = document.querySelector('.slide-right');

// Test Image 추가
let screenWidth = container.clientWidth;
let images = new XMLHttpRequest();
const url = 'https://picsum.photos/v2/list?page=9&limit=5'
images.open("GET", url);
images.send();

images.onreadystatechange = function () {
  if (images.readyState === XMLHttpRequest.DONE) {
    images = JSON.parse(images.responseText);
    contents.style.width = `${(images.length + 2)* screenWidth}px`;
    for (let i = 0; i < images.length; i++) {
      let img = new Image();
      img.src = images[i].download_url;
      images[i] = img;
    }
    loadImg(images);
  }
}

// preload 추가
function preloadImg(imgSrc) {
  const div = document.createElement('div');
  div.classList.add('slide-img');
  div.style.width = `${screenWidth}px`;
  const backgroundImg = document.createElement('a');
  backgroundImg.style.backgroundImage = `url('${imgSrc}')`;
  div.appendChild(backgroundImg);
  contents.appendChild(div);
}

async function loadImg(images) {
  await preloadImg(images[images.length-1].src);

  for (let i = 0; i < images.length; i++) {
    await preloadImg(images[i].src);
  }

  await preloadImg(images[0].src);
}

// 연속된 느낌을 주기 위해서 앞뒤로 마지막/첫 이미지 추가함.
let curPos = 1;
let position = -screenWidth;
contents.style.transform = `translate3d(${position}px, 0, 0)`;
let startX, endX;
// transitionend 함수 동기 실행 제어
let isTransitionEnd = true;

window.addEventListener('resize', function (e) {
  screenWidth = container.clientWidth;
  contents.style.width = `${(images.length + 2)* screenWidth}px`;
  let slideImg = document.getElementsByClassName('slide-img'); 
  for (let i = 0; i < slideImg.length; i++) {
    slideImg[i].style.width = `${screenWidth}px`;
  }

  position = -curPos * screenWidth;
  contents.style.transitionDuration = '0ms';
  contents.style.transform = `translate3d(${position}px, 0, 0)`;

});

window.onload = function() {
  contents.addEventListener('touchstart', slideStart);
  contents.addEventListener('touchmove', slideMove);
  contents.addEventListener('touchend', slideEnd);
  contents.addEventListener('mousedown', slideStart);
  contents.addEventListener('mousemove', slideMove);
  contents.addEventListener('mouseup', slideEnd);
  contents.addEventListener('transitionend', transitionEnd);
  contents.addEventListener('mouseenter', stopSlide);
  contents.addEventListener('mouseleave', autoSlide);

  slideLeftButton.addEventListener('mouseenter', stopSlide);
  slideRightButton.addEventListener('mouseenter', stopSlide);
  slideLeftButton.addEventListener('click', prevSlide);
  slideRightButton.addEventListener('click', nextSlide);

  function prevSlide() {
    curPos -= 1;
    if (curPos === 0) {
      isTransitionEnd = false;
    }

    position += screenWidth;
    contents.style.transitionDuration = '300ms';
    contents.style.transform = `translate3d(${position}px, 0, 0)`;
  }

  function nextSlide() {
    curPos += 1;
    if (curPos === images.length + 1) {
      isTransitionEnd = false;
    }

    position -= screenWidth;
    contents.style.transitionDuration = '300ms';
    contents.style.transform = `translate3d(${position}px, 0, 0)`;
  }
  

  let isMouseDown = false;
  function slideStart(event) {
    stopSlide();
    if (event.pageX) {
      isMouseDown = true;
      startX = event.pageX;
    } else {
      startX = event.touches[0].pageX;
    }
  }

  function slideMove(event) {
    if (event.pageX) {
      event.preventDefault();
      if (!isMouseDown) return;
      curX = (event.pageX - startX);
    } else if (event.targetTouches[0]) {
      curX = (event.targetTouches[0].pageX - startX);
    }
    // transitionend 끝나야 움직이도록 방지
    if (isTransitionEnd && -screenWidth < curX && curX < screenWidth) {
      contents.style.transitionDuration = '0ms';
      contents.style.transform = `translate3d(${position + curX}px, 0, 0)`;
    }
  }
    
  function slideEnd(event) {
    if (event.pageX) {
      isMouseDown = false;
      endX = event.pageX;
    } else {
      endX = event.changedTouches[0].pageX;
      autoSlide();
    }

    if (isTransitionEnd) {
      contents.style.transitionDuration = '300ms';
      if (startX > endX) {
        nextSlide();
      } else if (startX < endX) {
        prevSlide();
      }
    }
  }
  
  function transitionEnd(event) {
    // 자연스런 움직임을 위해 추가한 중복 이미지에 도달하면, transition 효과를 없애고,
    // 자연스럽게 translate값을 변경하여 이미지를 덮어씌운다.
    if (curPos === 0) {
      curPos = images.length;
      position = -screenWidth*curPos;
    } else if (curPos === images.length+1) {
      curPos = 1;
      position = -screenWidth;
    }
    contents.style.transitionDuration = '0ms';
    contents.style.transform = `translate3d(${position}px, 0, 0)`;
    isTransitionEnd = true;
  }


  // 자동재생
  let autoSlideControl;
  function autoSlide(event=null) {
    // 클릭중 mouseleave시 슬라이드 움직이도록
    if (isMouseDown) {
      slideEnd(event);
    }
    isMouseDown = false;
    autoSlideControl = setInterval(nextSlide, 3300);
  }

  function stopSlide() {
    clearInterval(autoSlideControl);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopSlide();
    } else {
      autoSlide();
    }
  })

  autoSlide();
}
