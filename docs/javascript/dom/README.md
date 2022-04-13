## DOM

### 목차

---

1. [Get Elements](#Get Elements)

---

### Get Elements

| 방식                       | 부모 노드                  | 반환값         | 없을시반환       |
| -------------------------- | -------------------------- | -------------- | ---------------- |
| **getElementById**         | document.prototype         | First Element  | null             |
| **getElementsByTagName**   | document/element.prototype | HTMLCollection | 빈HTMLCollection |
| **getElementsByClassName** | document/element.prototype | HTMLCollection | 빈HTMLCollection |



**By Id**

- document.prototype.getElementById('${ID}')
- 동일 아이디 존재해도 **에러 미발생**, **첫 번째 요소만** 반환
- 없을 시 **null**반환
- ID 속성 선언시 암묵적으로 ID 값의 전역 변수가 생성되나, script 내에 같은 이름의 전역 변수 생성시 노드는 할당되지 않는다.

```html
<!-- Parent Node -->
document.prototype
<!-- return : first element -->
<!DOCTYPE html>
<html>
  <body>
    <ul id="foo">
      <li id="banana">apple</li>
      <li id="banana">banana</li>
      <li id="banana">strawberry</li>
    </ul>
    <script>
    	const $elem = document.getElementById('banana');
      $elem.style.color = 'red';
      // <li id="banana" style="red">apple</li>
      console.log(foo === document.getElementById('foo'));  // true
      
      let foo = 1
      console.log(foo)  // 1
    </script>
  </body>
</html>
```



**By Tag**

- Document.prototype/Element.prototype.getElementsByTagName

- HTMLCollection 반환

- *****을 사용하여 모든 Element node를 취득 가능

  ```javascript
  const $all = document.getElementsByTagName('*');
  ```

- 찾는 태그 요소가 없을 시 빈 HTMLCollection을 반환한다.

```html
<html>
  <body>
    <ul id="fruits">
      <li>apple</li>
      <li>banana</li>
      <li>orange</li>
    </ul>
    <ul>
      <li>HTML</li>
    </ul>
    <script>
      // DOM 전체에서 태그 이름이 li인 element node 반환
    	const $lisFromDocument = document.getElementsByTagName('li');
      console.log($lisFromDocument);  // HTMLCollection(4) [li, li, li, li]
      
      // ul#fruits element의 child node 중 tag name이 li인 element node를 반환
      const $fruits = document.getElementById('fruits');
      const $lisFromFruits = $fruits.getElementsByTagName('li');
      console.log($lisFromFruits);  // HMTLCollection(3) [li, li, li]
    </script>
  </body>
</html>
```



**By Class**

- Document.prototype/Element.prototype.getElementsByClassName
- HTMLCollection 반환
- 찾는 태그 요소가 없을 시 빈 HTMLCollection을 반환한다.

```html
<html>
  <body>
    <ul>
      <li id="fruit apple">apple</li>
      <li id="fruit banana">banana</li>
      <li id="fruit orange">orange</li>
    </ul>
    <script>
    	const $elems = document.getElementsByClassName('fruit');
      [...elems].forEach(elem => { elem.style.color = 'red'; });
      const $apples = document.getElementsByClassName('fruit apple');
      [...$apples].forEach(elem => { elem.style.color = 'blue'; });
    </script>
  </body>
</html>
```

