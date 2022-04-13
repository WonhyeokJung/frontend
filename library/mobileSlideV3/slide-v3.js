// %로 주지 않고, 값을 측정하면 window resizing이 일어날 때 옆 사진이 돌출되는 문제가 있어
// %로 코드 변경 착수함.
const container = document.querySelector('.swipe-container');
// getElementByClassName은 array 반환
const items = document.querySelector('.swipe-items');
const swipeLeftButton = document.querySelector('.swipe-left');
const swipeRightButton = document.querySelector('.swipe-right');

// Test Image 추가
let imgFiles = new XMLHttpRequest();
imgFiles.open("GET", 'https://picsum.photos/v2/list');
imgFiles.send();

imgFiles.onreadystatechange = function() {
  if (imgFiles.readyState === XMLHttpRequest.DONE) {
    imgFiles = JSON.parse(imgFiles.responseText);
    console.log(imgFiles);
    imgPreload(imgFiles);
  }
}

// preload 추가
function imgPreload(imgArr) {
  let img = new Image();
  img.classList.add('last-img');
  img.src = imgArr[imgArr.length - 1].download_url;
  items.appendChild(img);

  for (let i = 0; i < imgArr.length; i++) {
    img = new Image();
    img.src = imgArr[i].download_url;
    items.appendChild(img);
    img.onload = function() {
      console.log('onload');
    }
  }

    img = new Image();
    img.classList.add('first-img');
    img.src = imgArr[0].download_url;
    items.appendChild(img);
}

// const IMAGE_WIDTH = 375;
let screenWidth = items.clientWidth;
// 연속된 느낌을 주기 위해서 앞뒤로 마지막/첫 이미지 추가함.
// 앞뒤 이미지 추가로 첫 이미지 1 / x = -100%;
let curIdx = 1;
let position = -100;
items.style.transform = `translateX(${position}%)`;
let startX, endX;
// transitionend 함수 동기 실행 제어
let isTransitionEnd = true;

window.onload = function() {
  
  container.addEventListener('touchstart', touchStart);
  container.addEventListener('touchmove', touchMove, { passive: false });
  container.addEventListener('touchend', touchEnd);
  container.addEventListener('transitionend', transitionEnd);
  container.addEventListener('mousedown', mouseDown);
  container.addEventListener('mousemove', mouseMove);
  container.addEventListener('mouseup', mouseUp);
  container.addEventListener('mouseenter', mouseEnter);
  container.addEventListener('mouseleave', mouseLeave);

  swipeLeftButton.addEventListener('click', prev);
  swipeRightButton.addEventListener('click', next);

  function prev() {
    if (curIdx === 0) {
      isTransitionEnd = false;
    }
    if (isTransitionEnd) {
      position += 100;
      items.style.transition = 'transform 300ms ease-in-out';
      items.style.transform = `translateX(${position}%)`;
      curIdx -= 1;
    }
  }

  function next() {
    if (curIdx === imgFiles.length + 1) {
      isTransitionEnd = false;
    }
    position -= 100;
    items.style.transition = 'transform 300ms ease-in-out';
    items.style.transform = `translateX(${position}%)`;
    curIdx += 1;

  }

  function touchStart(event) {
    stopSilde();
    startX = event.touches[0].pageX;
  }

  function touchMove(event) {
    // event.preventDefault();
    curX = (event.targetTouches[0].pageX - startX) / items.clientWidth * 100;
    if (isTransitionEnd && -100 < curX && curX < 100) {
      items.style.transitionDuration = '0ms';
      items.style.transform = `translateX(${curX + position}%)`;
    }
  }
    
  function touchEnd(event) {
    endX = event.changedTouches[0].pageX;
    if (isTransitionEnd) {
      if (startX > endX) {
        next();
      } else if (startX < endX) {
        prev();
      }
    }
    autoSlide();
  }
  
  function transitionEnd(event) {
    // 자연스런 움직임을 위해 추가한 중복 이미지에 도달하면, transition 효과를 없애고,
    // 자연스럽게 translate값을 변경하여 이미지를 덮어씌운다.
    if (curIdx === 0) {
      curIdx = imgFiles.length;
      position = -100*(imgFiles.length);
      items.style.transitionDuration = '0ms';
      items.style.transform = `translateX(${position}%)`;
    } else if (curIdx === imgFiles.length+1) {
      curIdx = 1;
      position = -100;
      items.style.transitionDuration = '0ms';
      items.style.transform = `translateX(${position}%)`;
    }
    isTransitionEnd = true;
  }

  // pc용 이벤트 설정
  let isMouseDown = false;
  function mouseDown(event) {
    isMouseDown = true;
    startX = event.pageX;
  }

  function mouseMove(event) {
    if (!isMouseDown) return;

    // mouseup event발생시 멈추도록
    event.preventDefault();
    curX = (event.pageX - startX) / items.clientWidth * 100;
    if (isTransitionEnd && -100 < curX && curX < 100) {
      items.style.transitionDuration = '0ms';
      items.style.transform = `translateX(${curX + position}%)`;
    }
  }

  function mouseUp(event) {
    isMouseDown = false;
    endX = event.pageX;
    if (isTransitionEnd) {
      if (startX > endX) {
        next();
      } else if (startX < endX) {
        prev();
      }
    }
  }

  // 버블링 방지 위해 mouseenter/ mouseleave
  function mouseEnter() {
    stopSilde();
  }

  function mouseLeave(event) {
    // 클릭했을 경우에만 작동하도록.
    if (isMouseDown) {
      mouseUp(event);
    }
    // 다시 mouseenter시 mousemove 방지
    isMouseDown = false;
    autoSlide();
  }

  // 자동재생
  let mySwiper;
  function autoSlide() {
    mySwiper = setInterval(next, 3500);
  }

  function stopSilde() {
    clearInterval(mySwiper);
  }

  // 초기 로딩시 next 한번 자동 실행함
  autoSlide();

  // active tab 확인
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      stopSilde();
    } else {
      autoSlide();
    }
  })
}