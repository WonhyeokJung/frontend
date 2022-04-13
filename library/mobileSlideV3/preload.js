const items = document.querySelector('.slide-images');
// Images
const url = 'https://picsum.photos/v2/list?page=7&limit=25';
let images = new XMLHttpRequest();
let imgLength;
images.open("GET", url);
images.send();

images.onreadystatechange = async function() {
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
  // img.onload = function() {
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