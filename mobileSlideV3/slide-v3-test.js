// %로 주지 않고, 값을 측정하면 window resizing이 일어날 때 옆 사진이 돌출되는 문제가 있어
// %로 코드 변경 착수함.
const slideContainer = document.querySelector('.slide-container');
// getElementByClassName은 array 반환하지만 live htmlcollection이므로 값의 변화가 일어나, 사용을 지양할 것.
const slideImages = document.querySelector('.slide-images');
// 좌우 버튼
const slideLeftButton = document.querySelector('.slide-arrow__left');
const slideRightButton = document.querySelector('.slide-arrow__right');
// Page Number
const slidePageContent = document.querySelector('.slide-page-number__content');
// transitionend 함수 동기 실행 제어
let isTransitionEnd = false;

//이미지
let url = 'https://picsum.photos/v2/list?page=75&limit=3';
let images = new XMLHttpRequest();
let imgLength;

// pagination 관련
const slidePagination = document.querySelector('.slide-pagination');
let dots;
let dotIdx;

// local image 사용
// imgLength = document.querySelectorAll('img').length - 2;
// slidePageContent.innerHTML = `1 / ${imgLength}`;

// image 외부서버 연결 후 삽입
images.open("GET", url);
images.send();

images.onreadystatechange = async function () {
  if (images.readyState === XMLHttpRequest.DONE) {
    if (images.status === 200) {
      images = JSON.parse(images.responseText);
      if (images) {
        await preloadImg(images);
        imgLength = images.length;
        slidePageContent.innerHTML = `1 / ${imgLength}`;
        await createDots(imgLength);
      } else {
        let empty = document.createAttribute('div');
        empty.innerHTML = '<h1>이미지가 없습니다.</h1>';
        slideImages.appendChild(empty);
      }
    }
  }
}

function loadImg(imgSrc) {
  let img = new Image();
  img.src = imgSrc;
  img.setAttribute('crossOrigin', 'anonymous');
  slideImages.appendChild(img);
}
  
async function preloadImg(arr) {
  await loadImg(arr[arr.length-1].download_url);
  
  for (let i = 0; i < arr.length; i++) {
    await loadImg(arr[i].download_url);
  }
  
  await loadImg(arr[0].download_url);
}
// 이미지 외부 연결 후 삽입 end

// Pagination
function createDots(imgLength) {
  for (let i = 0; i < imgLength; i++) {
    let dot = document.createElement('span');
    dot.setAttribute('class', 'slide-pagination__dot');
    dot.dataset.index = i+1;
    // dot.addEventListener('click', function() {
    // });
    slidePagination.appendChild(dot);
  }
  dots = document.querySelectorAll('.slide-pagination > .slide-pagination__dot');
  dots[0].classList.add('slide-pagination__dot--active');
  if (dots.length >= 2) {
    dots[1].classList.add('slide-pagination__dot--next');
  }
  if (dots.length >= 3) {
    dots[2].classList.add('slide-pagination__dot--next--next');
  }
}

let slideWidth = slideImages.clientWidth;
// 연속된 느낌을 주기 위해서 앞뒤로 마지막/첫 이미지 추가함.
// 앞뒤 이미지 추가로 첫 이미지 1 / x = -100%;
let curIdx = 1;
let position = -100;
slideImages.style.transform = `translateX(${position}%)`;
let startX, endX;

window.addEventListener('resize', function() {
  slideWidth = slideImages.clientWidth;
})

// window.onload = function () {
  slideContainer.addEventListener('touchstart', touchStart);
  slideContainer.addEventListener('touchmove', slideMove, { passive: false });
  slideContainer.addEventListener('touchend', touchEnd);
  
  slideContainer.onmousedown = mouseDown;
  slideContainer.onmousemove = slideMove;
  slideContainer.onmouseup = mouseUp;
  slideContainer.addEventListener('mouseenter', stopSlide);
  slideContainer.addEventListener('mouseleave', autoSlide);
  
  // slideContainer.addEventListener('transitionstart', transitionStart);
  slideContainer.addEventListener('transitionend', transitionEnd);
  
  slideLeftButton.addEventListener('click', prevSlide);
  slideRightButton.addEventListener('click', nextSlide);

  function prevSlide() {
    if (!isTransitionEnd) return;

    position += 100;
    slideImages.style.transitionDuration = '300ms';
    slideImages.style.transform = `translateX(${position}%)`;
    curIdx -= 1;

    // dots 제어
    if (curIdx == 0) {
      dots[curIdx+1-1].setAttribute('class', 'slide-pagination__dot');
      dots[curIdx+2-1].setAttribute('class', 'slide-pagination__dot');
      dots[curIdx+3-1].setAttribute('class', 'slide-pagination__dot');
      dotIdx = imgLength;
    } else {
      dotIdx = curIdx;
    }
    for (let i = dots.length-1; i > -1; i--) {
      dots[i].style.left = `${36 - 18*(dotIdx-1)}px`;
    }
    // dots index는 0에서 시작
    dots[dotIdx-1].setAttribute('class', 'slide-pagination__dot');
    dots[dotIdx-1].classList.add('slide-pagination__dot--active');
    if (dotIdx <= imgLength - 2) {
      dots[dotIdx+2-1].setAttribute('class', 'slide-pagination__dot');
      dots[dotIdx+2-1].classList.add('slide-pagination__dot--next--next');
    }
    if (dotIdx <= imgLength - 1) {
      dots[dotIdx+1-1].setAttribute('class', 'slide-pagination__dot');
      dots[dotIdx+1-1].classList.add('slide-pagination__dot--next');
    }
    if (dotIdx >= 2) {
      dots[dotIdx-1-1].setAttribute('class', 'slide-pagination__dot');
      dots[dotIdx-1-1].classList.add('slide-pagination__dot--prev');
    }
    if (dotIdx >= 3) {
      dots[dotIdx-2-1].setAttribute('class', 'slide-pagination__dot');
      dots[dotIdx-2-1].classList.add('slide-pagination__dot--prev--prev');
    }
    // 이전거 원상복구
    if (dotIdx <= imgLength-3) {
      dots[dotIdx+3-1].setAttribute('class', 'slide-pagination__dot');
    }


    // 슬라이드 번호 제어
    if (curIdx == 0) {
      slidePageContent.innerHTML = `${imgLength} / ${imgLength}`;
    } else {
      slidePageContent.innerHTML = `${curIdx} / ${imgLength}`;
    }
    isTransitionEnd = false;
  }
  
  function nextSlide() {
    if(!isTransitionEnd) return;
 
    position -= 100;
    // slideImages.style.transition = 'transform 500ms ease';
    slideImages.style.transitionDuration = '300ms';
    slideImages.style.transform = `translateX(${position}%)`;
    curIdx += 1;

    // dots 제어
    if (curIdx == imgLength + 1) {
      dots[curIdx-1-1].setAttribute('class', 'slide-pagination__dot');
      dots[curIdx-2-1].setAttribute('class', 'slide-pagination__dot');
      dots[curIdx-3-1].setAttribute('class', 'slide-pagination__dot');
      
      dotIdx = 1;
    } else {
      dotIdx = curIdx;
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].style.left = `${36 - 18*(dotIdx-1)}px`;
    }
    // dots index는 0에서 시작
    dots[dotIdx-1].setAttribute('class', 'slide-pagination__dot');
    dots[dotIdx-1].classList.add('slide-pagination__dot--active');
    if (dotIdx <= imgLength - 2) {
      dots[dotIdx+2-1].setAttribute('class', 'slide-pagination__dot');
      dots[dotIdx+2-1].classList.add('slide-pagination__dot--next--next');
    }
    if (dotIdx <= imgLength - 1) {
      dots[dotIdx+1-1].setAttribute('class', 'slide-pagination__dot');
      dots[dotIdx+1-1].classList.add('slide-pagination__dot--next');
    }
    if (dotIdx >= 2) {
      dots[dotIdx-1-1].setAttribute('class', 'slide-pagination__dot');
      dots[dotIdx-1-1].classList.add('slide-pagination__dot--prev');
    }
    if (dotIdx >= 3) {
      dots[dotIdx-2-1].setAttribute('class', 'slide-pagination__dot');
      dots[dotIdx-2-1].classList.add('slide-pagination__dot--prev--prev');
    }
    // 이전거 원상복구
    if (dotIdx >= 4) {
      dots[dotIdx-3-1].setAttribute('class', 'slide-pagination__dot');
    }

    // 슬라이드 번호 제어
    if (curIdx == imgLength + 1) {
      slidePageContent.innerHTML = `1 / ${imgLength}`;
    } else {
      slidePageContent.innerHTML = `${curIdx} / ${imgLength}`;
    }
    // 너무 빠른 클릭시 transition 중 isTransitionEnd = true; 되는 것 방지
    isTransitionEnd = false;
  }
  
  function touchStart(event) {
    stopSlide();
    startX = event.touches[0].pageX;
  }
  
  let curX;
  function slideMove(event) {
    stopSlide();
    event.preventDefault();
    if (!isTransitionEnd) return;
    // 마우스용
    if (event.pageX) {
      if (!isMouseDown) return;
      curX = (event.pageX - startX) / slideWidth * 100;
    } else if (event.targetTouches[0]) {
      curX = (event.targetTouches[0].pageX - startX) / slideWidth * 100;
    }
    
    // 빠르게 움직일 경우 슬라이드 변경 전 움직임 방지
    // if (curIdx === imgLength + 1 || curIdx === 0) {
    //   isTransitionEnd = false;
    // }
    if (-100 < curX && curX < 100) {
      slideImages.style.transitionDuration = '0ms';
      slideImages.style.transform = `translateX(${curX + position}%)`;
    }
  }
  
  function touchEnd(event) {
    endX = event.changedTouches[0].pageX;
    
    if (isTransitionEnd && startX > endX && (startX - endX)/slideWidth > 0.2) {
      nextSlide();
    } else if (isTransitionEnd && startX < endX && (endX - startX)/slideWidth > 0.2) {
      prevSlide();
    } else {
      slideImages.style.transitionDuration = '300ms';
      slideImages.style.transform = `translateX(${position}%)`;
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
    if (isTransitionEnd && startX > endX && (startX - endX)/slideWidth > 0.3) {
      nextSlide();
    } else if (isTransitionEnd && startX < endX && (endX - startX)/slideWidth > 0.3) {
      prevSlide();
    } else {
      slideImages.style.transitionDuration = '300ms';
      slideImages.style.transform = `translateX(${position}%)`;
    }
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
    
    autoSlideControl = setInterval(nextSlide, 3300);
  }
  
  function stopSlide() {
    clearInterval(autoSlideControl);
  }
  
  // active tab 확인
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopSlide();
      isTransitionEnd = false;
    } else {
      autoSlide();
      isTransitionEnd = true;
    }
  })
  
  // 초기 로딩시 autoSlide 적용
  autoSlide();

  // 빠른 움직임 방지
  // function transitionStart(event) {
  //   isTransitionEnd = false;
  // }
  
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
    slideImages.style.transitionDuration = '0ms';
    slideImages.style.transform = `translateX(${position}%)`;
    // 너무 빠른 이동 제어
    // prev next에 isTransitionEnd 적용 후 더 사용할 필요는 없지만, 균일한 속도의 슬라이드 이동 UX를 위해 추가한다.
    // setTimeout(function () {
    isTransitionEnd = true;
    // }, 150);
  }
// }

