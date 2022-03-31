// %로 주지 않고, 값을 측정하면 window resizing이 일어날 때 옆 사진이 돌출되는 문제가 있어
// %로 코드 변경 착수함.
const container = document.querySelector('.slide-container');
// getElementByClassName은 array 반환
const items = document.querySelector('.slide-images');
const slideLeftButton = document.querySelector('.slide-left');
const slideRightButton = document.querySelector('.slide-right');
const slidePageContent = document.querySelector('.slide-page-number__content');

// Images
const url = 'https://picsum.photos/v2/list?page=9&limit=5';
let images = new XMLHttpRequest();
let imgLength;
images.open("GET", url);
images.send();

images.onreadystatechange = async function () {
  if (images.readyState === XMLHttpRequest.DONE) {
    images = JSON.parse(images.responseText);
    if (images) {
      await preloadImg(images);
      imgLength = images.length;
      slidePageContent.innerHTML = `1 / ${imgLength}`;
    }
  }
}
function loadImg(imgSrc) {
  let img = new Image();
  img.src = imgSrc;
  // img.onload = function () {
  items.appendChild(img);
  // }
  // img.onerror ={() => console.log("에러시 출력");}
}

async function preloadImg(arr) {
  await loadImg(arr[arr.length-1].download_url);

  for (let i = 0; i < arr.length; i++) {
    await loadImg(arr[i].download_url);
  }

  await loadImg(arr[0].download_url);
}

let slideWidth = items.clientWidth;
// 연속된 느낌을 주기 위해서 앞뒤로 마지막/첫 이미지 추가함.
// 앞뒤 이미지 추가로 첫 이미지 1 / x = -100%;
let curIdx = 1;
let position = -100;
items.style.transform = `translateX(${position}%)`;
let startX, endX;
// transitionend 함수 동기 실행 제어
let isTransitionEnd = true;

window.addEventListener('resize', function() {
  slideWidth = items.clientWidth;
})

window.onload =  function () {
  container.addEventListener('touchstart', touchStart);
  container.addEventListener('touchmove', slideMove, { passive: false });
  container.addEventListener('touchend', touchEnd);
  
  container.onmousedown = mouseDown;
  container.onmousemove = slideMove;
  container.onmouseup = mouseUp;
  container.addEventListener('mouseenter', stopSlide);
  container.addEventListener('mouseleave', autoSlide);
  
  container.addEventListener('transitionstart', transitionStart);
  container.addEventListener('transitionend', transitionEnd);

  slideLeftButton.addEventListener('click', prevSlide);
  slideRightButton.addEventListener('click', nextSlide);

  // 빠른 움직임 방지
  function transitionStart() {
    isTransitionEnd = false;
  }
  
  function transitionEnd(event) {
    // 자연스런 움직임을 위해 추가한 중복 이미지에 도달하면, transition 효과를 없애고,
    // 자연스럽게 translate값을 변경하여 이미지를 덮어씌운다.
    if (curIdx === 0) {
      curIdx = imgLength;
      position = -100*(imgLength);
    } else if (curIdx === imgLength+1) {
      curIdx = 1;
      position = -100;
    }
    items.style.transitionDuration = '0ms';
    items.style.transform = `translateX(${position}%)`;
    // 너무 빠른 이동 제어
    setTimeout(function () {
      isTransitionEnd = true;
    }, 150);
  }
  
  function prevSlide() {
    if (isTransitionEnd) {
      position += 100;
      items.style.transitionDuration = '300ms';
      items.style.transform = `translateX(${position}%)`;
      curIdx -= 1;
    }
    if (curIdx == 0) {
      slidePageContent.innerHTML = `${imgLength} / ${imgLength}`;
    } else {
      slidePageContent.innerHTML = `${curIdx} / ${imgLength}`;
    }
  }
  
  function nextSlide() {
    if (isTransitionEnd) {
      position -= 100;
      // items.style.transition = 'transform 300ms ease';
      items.style.transitionDuration = '300ms';
      items.style.transform = `translateX(${position}%)`;
      curIdx += 1;
    }
    if (curIdx == imgLength + 1) {
      slidePageContent.innerHTML = `1 / ${imgLength}`;
    } else {
      slidePageContent.innerHTML = `${curIdx} / ${imgLength}`;
    }
  }
  
  function touchStart(event) {
    stopSlide();
    startX = event.touches[0].pageX;
  }
  
  function slideMove(event) {
    // 마우스용
    if (event.pageX) {
      stopSlide();
      event.preventDefault();
      if (!isMouseDown) return;
      curX = (event.pageX - startX) / slideWidth * 100;
    } else if (event.targetTouches[0]) {
      curX = (event.targetTouches[0].pageX - startX) / slideWidth * 100;
    }
  
    // 빠르게 움직일 경우 슬라이드 변경 전 움직임 방지
    if (curIdx === imgLength + 1 || curIdx === 0) {
      isTransitionEnd = false;
    }
    if (isTransitionEnd && -100 < curX && curX < 100) {
      items.style.transitionDuration = '0ms';
      items.style.transform = `translateX(${curX + position}%)`;
    }
  }
    
  function touchEnd(event) {
    endX = event.changedTouches[0].pageX;
    
    if (startX > endX && (startX - endX)/slideWidth > 0.2) {
      nextSlide();
    } else if (startX < endX && (endX - startX)/slideWidth > 0.2) {
      prevSlide();
    } else {
      items.style.transitionDuration = '300ms';
      items.style.transform = `translateX(${position}%)`;
    }
    autoSlide();
  }
  
  // pc용 이벤트 설정
  let isMouseDown = false;
  function mouseDown(event) {
    isMouseDown = true;
    startX = event.pageX;
  }
  
  function mouseUp(event) {
    isMouseDown = false;
    endX = event.pageX;
    // if (isTransitionEnd) {
      if (startX > endX && (startX - endX)/slideWidth > 0.3) {
        nextSlide();
      } else if (startX < endX && (endX - startX)/slideWidth > 0.3) {
        prevSlide();
      } else {
        items.style.transitionDuration = '300ms';
        items.style.transform = `translateX(${position}%)`;
      }
    // }
  }
  
  // 자동재생
  let autoSlideControl;
  // mouseleave용 event 위해 null 설정
  function autoSlide(event=null) {
    // drag중 mouseleave시 제어용 이벤트
    if (isMouseDown) {
      mouseUp(event);
    }
    isMouseDown = false;
    //
    autoSlideControl = setInterval(nextSlide, 3300);
  }
  
  function stopSlide() {
    clearInterval(autoSlideControl);
  }
  
  // active tab 확인
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopSlide();
    } else {
      autoSlide();
    }
  })
  
  // 초기 로딩시 autoSlide 적용
  autoSlide();
}
