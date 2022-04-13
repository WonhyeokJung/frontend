# Slide(Mobile + PC)

## html

### 구조

**head**

```html
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SlideV3</title>
  <script src="https://kit.fontawesome.com/f9b81a46dc.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="slide-v3.css">
</head>
```

- 슬라이드 넘기기 화살표 구현 위한 font awesome 사용
- \<link> 태그로 css 연결



**body**

```html
<body>
  <div class="slide-container">
    <div class="slide-images">
    </div>
    <button class="slide-arrow slide-left" href="javascript:;"><i class="fa-solid fa-angle-left"></i></button>
    <button class="slide-arrow slide-right" href="javascript:;"><i class="fa-solid fa-angle-right"></i></button>
    <div class="slide-page-number">
      <div class="slide-page-number__content">
      </div>
    </div>
  </div>
  <div class="slide-pagination">
    
  </div>
  <!-- <script src="preload.js"></script> -->
  <script src="slide-v3-test.js" async></script>
</body>
```

- .slide-container
  - Slide의 모든 element를 감싸는 외부 Div
- .slide-images
  - Slide 내 이미지들을 가지고 있는 Div이며, Slide 동작이 이 Div에서 이루어짐.
- .slide-arrow
  - 슬라이드를 mouse click event로 제어하게 해주는 두 화살표
- .slide-page-number
  - 현재 이미지 페이지를 알려주는 페이지 넘버 컨텐츠 Div를 감싸고 있는 외부 Div
- .slide-page-number__content
  - 페이지 번호를 표시하는 div
- .slide-pagination(새로 개발중)
  - 페이지네이션의 bullet들을 가지고 있는 페이지네이션 Div
  - .slide-container 안으로 들어가야 하지만, 이미지와 겹친경우 bullet들이 잘 보이지 않아 일단 외부에 선언.



## CSS

**전체 CSS 파일**

```css
:root {
  --slide-pagination-dot-width: 10px;
  --slide-pagination-dot-height: 10px;
  --slide-pagination-dot-inactive-color: #000;
  --slide-pagination-dot-inactive-opacity: 0.2;
}

html {
  height: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  height: 100%;
  padding: 0;
  margin: 0;
}

h1 {
  margin-top: 0;
  text-align: center;
}

.slide-container {
  overflow: hidden;
  position: relative;
  left: 50%;
  /* 이미지 사이즈 조절 */
  min-width: 300px;
  max-width: 900px;
  height: 600px;
  border-radius: 5px;
  transform: translateX(-50%);
}

.slide-images {
  display: flex;
  /* position: relative; */
  height: 100%;
  transition: transform 300ms ease;
}

/* canvas {
  min-width: 100%;
  border-radius: 5px;
  backface-visibility: hidden;
} */

img {
  min-width: 100%;
  border-radius: 5px;
  /* image flickering 방지 */
  backface-visibility: hidden;
  /* height는 자동조절되므로 정렬 필요없음. */
  /* 언론사라 이미지가 짤리는걸 싫어하지 않을지? */
  /* object-fit: cover; */
}

/* .slide-active {
  animation-name: slideIn;
  animation-duration: 300ms;
  animation-iteration-count: infinite;
} */

.slide-arrow {
  position: absolute;
  width: 3rem;
  height: 3rem;
  /* margin: auto; */
  border: none;
  border-radius: 50%;
  background: none;
  /* background-color: black; */
  color: rgba(255, 255, 255, 1);
  font-size: 2rem;
  z-index: 2;
  cursor: pointer;
  animation-name: fadeOut;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}

.slide-arrow:hover {
  animation: fadeIn 0s 1 0s;
}

.slide-left {
  top: 50%;
  left: 5%;
  transform: translate(-50%, -50%);
}

.slide-right {
  top: 50%;
  left: 95%;
  transform: translate(-50%, -50%);
}

div.slide-page-number {
  position: relative;
  margin: 0px auto;
}

.slide-page-number__content {
  display: flex;
  white-space: nowrap;
  position: absolute;
  right: 10px;
  bottom: 20px;
  width: 50px;
  height: 20px;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.15);
  color: white;
  font-size: 12px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

/* @keyframes slideIn {
  from {
    transform: translateX(-300%);
  }
  to {
    transform: translateX(-700%);
  }
} */

.slide-pagination {
  overflow: hidden;
  position: absolute;
  left: 50%;
  /* bottom: 5%; */
  width: 90px;
  white-space: nowrap;
  transform: translateX(-50%);
  z-index: 50;
}

.slide-pagination__dot {
  /* width, height적용 */
  display: inline-block;
  /* left적용위함 */
  position: relative;
  left: 36px;
  width: var(--slide-pagination-dot-width);
  height: var(--slide-pagination-dot-height);
  margin: 0px 4px;
  border-radius: 50%;
  background: var(--slide-pagination-dot-inactive-color);
  /* cursor: pointer; */
  opacity: var(--slide-pagination-dot-inactive-opacity);
  transform: scale(0.50);
  transition: .2s transform, .1s left;
}

.slide-pagination__dot--prev--prev {
  transform: scale(.50);
}

.slide-pagination__dot--prev {
  transform: scale(.75);
}

.slide-pagination__dot--active {
  background-color: skyblue;
  opacity: 1;
  transform: scale(1);
}

.slide-pagination__dot--next {
  transform: scale(.75);
}

.slide-pagination__dot--next--next {
  transform: scale(.50);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }  
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

/* @media only screen and (max-width:768px) {
  .slide-arrow {
    visibility: hidden;
  }
} */

/* touch시 slide-arrow hide */
@media (pointer:coarse) {
  .slide-arrow {
    visibility: hidden;
  }
}
```

- 간단하게 BEM 적용을 시도했으나, B부분 구현이 제대로 되지 못함.
  - Block(블록), Element(요소), Modifier(속성)의 3구조로, 재사용 가능한 독립 구성요소 / 내부 구성요소 / 기능 혹은 속성의 3단위 네이밍 컨벤션

**:root**

```css
:root {
  --slide-pagination-dot-width: 10px;
  --slide-pagination-dot-height: 10px;
  --slide-pagination-dot-inactive-color: #000;
  --slide-pagination-dot-inactive-opacity: 0.2;
}
```

- 변수 선언에 사용. :root에 선언되어 있어, 모든 하위 요소에 상속되어 사용이 가능하다.
- Pagination 개발 중 테스트 용으로 임시 사용.

**html, body**

```css
html {
  height: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  height: 100%;
  padding: 0;
  margin: 0;
}
```

- padding과 border를 width에 포함하는 border-box 사용으로 이후 다른 박스와 컬럼 붕괴 문제 방지 가능(현재는 html에 적용하여 큰 의미는 없음.)
- chrome 창크기를 body크기로 설정하고 싶어서 큰 이유없이 세팅

**h1**

```css
h1 {
  margin-top: 0;
  text-align: center;
}
```

- 구현한 기능명 / 위에 공간 남는게 싫어 마진을 없애고, 텍스트 가운데 정렬함.

**.slide-container**

```css
.slide-container {
  overflow: hidden;
  position: relative;
  left: 50%;
  /* 이미지 사이즈 조절 */
  min-width: 300px;
  max-width: 900px;
  height: 600px;
  border-radius: 5px;
  transform: translateX(-50%);
}
```

- container에 속하게 될 컴포넌트들의 position:absolute 사용을 용이하기 위해 relative 설정
- Flex로 이미지를 정렬하여 넘치는 이미지들을 가리기 위해 overflow: hidden
- max, min 사이즈로 컴포넌트 최소/최대 너비 조절 가능
- height는 차후 컴포넌트 배치 위해 고정값을 사용 + 이미지들의 height 통일 위함(다른 컴포넌트와 하위속성으로 슬라이드가 들어갔을때 높이가 제각각이 되어 배치가 망가짐을 막기 위함)
- left와 transform으로 가운데 정렬 및 border-radius 이용한 모서리 처리

**.slide-images**

```css
.slide-images {
  display: flex;
  height: 100%;
  transition: transform 300ms ease;
}
```

- flex로 이미지 가로 정렬
- 이미지 크기 조절위해 상위 height 상속
- transition으로 transform 속도 및 움직임 조절

**img**

```css
img {
  min-width: 100%;
  border-radius: 5px;
  /* image flickering 방지 */
  backface-visibility: hidden;
  /* height는 자동조절되므로 정렬 필요없음. */
  /* 언론사라 이미지가 짤리는걸 싫어하지 않을지? */
  /* object-fit: cover; */
}
```

- min-width를 100%로 설정하여 width를 상위 컴포넌트 크기만큼 꽉 채울 수 있게 함.
- img에도 border-radius 적용(없으면 이미지 좌우로 넘어갈때 어색함)
- 이미지가 짤리지 않는 것이 중요한 것으로 보여 object-fit 제외

**.slide-arrow**

```css
.slide-arrow {
  position: absolute;
  width: 3rem;
  height: 3rem;
  /* margin: auto; */
  border: none;
  border-radius: 50%;
  background: none;
  /* background-color: black; */
  color: rgba(255, 255, 255, 1);
  font-size: 2rem;
  z-index: 2;
  cursor: pointer;
  animation-name: fadeOut;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
```

- 슬라이드 좌우로 넘기는 화살표로, **absolute**로 위치 조정
- html 요소의 크기를 상속받는 rem으로 width, height 조절
- background에 이미지를 씌우기 위한 border, border-radius, background-color사용했으나 디자인상 맘에 들지 않아 삭제
- 우선순위 문제로 z-index:2 부여
- 마우스 아웃시 fadeOut animation 적용

**.slide-arrow:hover**

```css
.slide-arrow:hover {
  animation: fadeIn 0s 1 0s;
}
```

- arrow에 마우스 호버시 애니메이션 적용

**.slide-arrow-left**

```css
.slide-arrow__left {
  top: 50%;
  left: 5%;
  transform: translate(-50%, -50%);
}
```

- 좌측 화살표 위치 설정 후 중앙정렬

**.slide-arrow-right**

```css
.slide-arrow__right {
  top: 50%;
  left: 95%;
  transform: translate(-50%, -50%);
}
```

- 우측 화살표 위치 설정 후 중앙정렬

**div.slide-page-number**

```css
div.slide-page-number {
  position: relative;
  margin: 0px auto;
}
```

- 하위 컴포넌트 위한 relatvie position
- 마진 제거(디자인 위해)

**.slide-page-number__content**

```css
.slide-page-number__content {
  display: flex;
  white-space: nowrap;
  position: absolute;
  right: 10px;
  bottom: 20px;
  width: 50px;
  height: 20px;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.15);
  color: white;
  font-size: 12px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  z-index: 3;
}
```

- flex 통하여 justify-content 이용한 페이지 text 가운데정렬
- 100장 이상 이미지의 경우 글자가 2줄이 되는것을 방지하기 위해 white-space; nowrap;
- right, bottom 이용한 Slide컴포넌트 내 위치 설정
- 겉 테두리에 border-radius를 주어 타원형의 컴포넌트로 디자인 수정
- 폰트 사이즈와 칼라 및 폰트 굵기를 읽기 쉽게 수정

**@keyframes fadeIn**

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }  
}
```

- 애니메이션 구현

**@keyframes fadeOut**

```css
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

- 애니메이션 구현

**@media (pointer:coarse)**

```css
@media (pointer:coarse) {
  .slide-arrow {
    visibility: hidden;
  }
}
```

- touch device에선 양쪽 애로우 숨기기 위해 구현



### 미완성 기능

**.slide-pagination**

```css
.slide-pagination {
  overflow: hidden;
  position: absolute;
  left: 50%;
  /* bottom: 5%; */
  width: 90px;
  white-space: nowrap;
  transform: translateX(-50%);
  z-index: 5;
}
```

- 좌우에 밖으로 나간 점들 숨기기 위해 overflow hidden
- 컨텐츠내 위치 조절을 위한 position:absolute 및 left, transform
- 슬라이드 내부로 Pagination이 들어갈 경우 하단에 공간을 띄우기 위한 bottom : 5%
- 내부 컴포넌트를 한줄로 정렬하기 위한 white-space:nowrap;
- 최상단에 보이기 위한 z-index

**.slide-pagination__dot**

```css
.slide-pagination__dot {
  /* width, height적용 */
  display: inline-block;
  /* left적용위함 */
  position: relative;
  left: 36px;
  width: var(--slide-pagination-dot-width);
  height: var(--slide-pagination-dot-height);
  margin: 0px 4px;
  border-radius: 50%;
  background: var(--slide-pagination-dot-inactive-color);
  /* cursor: pointer; */
  opacity: var(--slide-pagination-dot-inactive-opacity);
  transform: scale(0.50);
  transition: .2s transform, .1s left;
}
```

- width, height 적용 위하여 inline-block 설정
- left 적용 위하여 relative 설정
- left 이용한 위치조절

- width, height로 bullet 크기 설정
- 좌우 마진으로 간격 조절
- border-radius 50%로 원형으로 조작
- background 색으로 bullet 컬러 변경
- opacity로 bullet 색깔 조절
- scale로 이동시 dynamic bullet 효과 적용
- transition으로 left와 transform의 시간을 제어하여 애니메이션과 비슷한 효과를 줌

**.slide-pagination__dot--active**

```css
.slide-pagination__dot--active {
  background-color: skyblue;
  opacity: 1;
  transform: scale(1);
}
```

- 현재 페이지를 나타내는 active bullet
- 불투명도를 100%로, 색은 skyblue를 주었으며, scale을 100%로 한다.

**.slide-pagination__dot--prev, --next**

```css
.slide-pagination__dot--prev--prev {
  transform: scale(.50);
}

.slide-pagination__dot--prev {
  transform: scale(.75);
}

.slide-pagination__dot--next {
  transform: scale(.75);
}

.slide-pagination__dot--next--next {
  transform: scale(.50);
}
```

- active bullet으로부터 멀어질 수록 스케일이 작아지게 설정하였다.
- 스케일말고 다른 기능을 추가할 것을 고려해 --next--next / --prev--prev까지 넣었으나 현재로는 없어도 무방한 클래스이다.



## JavaScript

### 전체 코드

```javascript
// %로 주지 않고, 값을 측정하면 window resizing이 일어날 때 옆 사진이 돌출되는 문제가 있어
// %로 코드 변경 착수함.
const container = document.querySelector('.slide-container');
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
let url = 'https://picsum.photos/v2/list?page=54&limit=10';
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
  dots[1].classList.add('slide-pagination__dot--next');
  dots[2].classList.add('slide-pagination__dot--next--next');

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
  container.addEventListener('touchstart', touchStart);
  container.addEventListener('touchmove', slideMove, { passive: false });
  container.addEventListener('touchend', touchEnd);
  
  container.onmousedown = mouseDown;
  container.onmousemove = slideMove;
  container.onmouseup = mouseUp;
  container.addEventListener('mouseenter', stopSlide);
  container.addEventListener('mouseleave', autoSlide);
  
  // container.addEventListener('transitionstart', transitionStart);
  container.addEventListener('transitionend', transitionEnd);
  
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
    isTransitionEnd = false;
  }
  
  function touchStart(event) {
    stopSlide();
    startX = event.touches[0].pageX;
  }
  
  let curX;
  function slideMove(event) {
    event.preventDefault();
    if (!isTransitionEnd) return;
    // 마우스용
    if (event.pageX) {
      stopSlide();
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


```

### 상수

```javascript
// Slide
const slideContainer = document.querySelector('.slide-container');
// Images div
const slideImages = document.querySelector('.slide-images');
// Arrow
const slideLeftButton = document.querySelector('.slide-arrow__left');
const slideRightButton = document.querySelector('.slide-arrow__right');
// Page Number
const slidePageContent = document.querySelector('.slide-page-number__content');
// Pagination
const slidePagination = document.querySelector('.slide-pagination');
```

### 이미지 불러오기 및 초기 세팅

```javascript
// 1. local
// 이미지 길이
let imgLength;
imgLength = document.querySelectorAll('img').length - 2;
// 페이지 넘버 세팅
slidePageContent.innerHTML = `1 / ${imgLength}`;
```

```javascript
// 2. 외부서버 이용한 랜덤이미지
let imgLength;
// url
let url = 'https://picsum.photos/v2/list?page=54&limit=10';
// 이미지 불러오기
let images = new XMLHttpRequest();

images.open("GET", url);
// GET요청으로 header는 없음
images.send();

images.onreadystatechange = async function () {
  // 응답 준비 완료시
  if (images.readyState === XMLHttpRequest.DONE) {
    // 200status가 왔는 지
    if (images.status === 200) {
      // Json으로 응답 내용 parsing
      images = JSON.parse(images.responseText);
      // 이미지가 있는 경우 이미지 로드
      if (images) {
        await preloadImg(images);
        // 동기적 수행후 imgLength 적용
        imgLength = images.length;
        // Page Number 생성
        slidePageContent.innerHTML = `1 / ${imgLength}`;
        // pagination
        await createDots(imgLength);
      } else {
        // 이미지가 없는 경우 이미지가 없음을 알려주는 창 but 테스트 아직 하지 못함.
        let empty = document.createAttribute('div');
        empty.innerHTML = '<h1>이미지가 없습니다.</h1>';
        slideImages.appendChild(empty);
      }
    }
  }
}

function loadImg(imgSrc) {
  // 이미지 preload 위해 new Image() 이용
  let img = new Image();
  img.src = imgSrc;
  img.setAttribute('crossOrigin', 'anonymous');
  // slideImages내에 투입
  slideImages.appendChild(img);
}
  
async function preloadImg(arr) {
  // 이미지 투입 순서를 위해 async/await 적용
  await loadImg(arr[arr.length-1].download_url);
  
  for (let i = 0; i < arr.length; i++) {
    await loadImg(arr[i].download_url);
  }
  
  await loadImg(arr[0].download_url);
}
```

- 이미지 로드와 함께, Page Number와 Pagination이 세팅된다.