# Frontend 코드 기록

## 목차

---

1. [기재된 기술](#기재된-기술)
2. [CSS](#CSS)
   1. [Selector](#Selector)
   2. [CSS Property](#CSS-Property)
3. [JavaScript](#JavaScript)

## 기재된 기술

<img src="https://img.shields.io/badge/-PHP-yellow?logo=PHP&logoColor=#777BB4"> <img src="https://img.shields.io/badge/-Laravel-critical?logo=LARAVEL&logoColor=white"> <img src="https://img.shields.io/badge/-Bootstrap-blueviolet?logo=Bootstrap&logoColor=white"> <img src="https://img.shields.io/badge/-jQuery-important?logo=jQuery&logoColor=white"> <img src="https://img.shields.io/badge/-JavaScript-green?logo=JavaScript&logoColor=white"> <img src="https://img.shields.io/badge/-HTML5-blue?logo=HTML5&logoColor=white"> <a href="https://developer.mozilla.org/ko/docs/Learn/Getting_started_with_the_web/CSS_basics"><img src="https://img.shields.io/badge/-CSS3-gray?logo=CSS3&logoColor=white"></a> <img src="https://img.shields.io/badge/-Python-white?logo=Python&logoColor=blue"> 



## CSS

### Selector

#### 선택자란?

```css
p {color: red; padding: 5px;}
Selector {Declaration (property: property-value);} <- Declaration block
```

#### 종류

| 선택자명                         | 선언방식       | 내용                                                  |
| -------------------------------- | -------------- | ----------------------------------------------------- |
| 전체 선택자(Universal Selector)  | * { }          | HTML 페이지 내부의 모든 태그                          |
| 태그 선택자(Type Selector)       | tag { }        | 태그명 선택                                           |
| 클래스 선택자(Class Selector)    | .className { } | .클래스명 / 중복 사용에 주로 이용. 글자색, 굵기 등    |
| 아이디 선택자(ID Selector)       | #id { }        | #아이디 / 요소 배치에 주로 이용                       |
| 복합 선택자(Combinator)          | E F            | 하위 선택자. 모든 F 요소                              |
|                                  | E > F          | 하위 선택자. 바로 아래 자식 F.                        |
| 형제 선택자(Sibling Combinators) | E+F            | 인접 형제 선택자. 같은 레벨 중 E 바로 다음에 오는 F만 |
|                                  | E-F            | 일반 형제 선택자. E 다음의 모든 동생 F.               |
|                                  |                |                                                       |
### CSS Property
#### Css Property style 적용 순서

**참고** [*CSS Triggers*](https://csstriggers.com/)

1. Styles

   - 브라우저가 객체에 적용할 스타일의 값을 계산, 재계산

2. Layout

   - 브라우저가 객체의 모양과 위치를 생성

   |             |             |                |              |
   | ----------- | ----------- | -------------- | ------------ |
   | position    | display     | overflow       | overflow-y   |
   | width       | height      | min-width      | min-height   |
   | padding     | margin      | border         | border-width |
   | top         | bottom      | left           | right        |
   | font        | font-family | font-size      | font-weight  |
   | white-space | line-height | vertical-align | float        |
   | clear       |             |                |              |

3. Paint

   - 브라우저가 객체 영역의 픽셀들을 채움

   |                  |                     |                   |                 |
   | ---------------- | ------------------- | ----------------- | --------------- |
   | color            | background          | visibility        | text-decoration |
   | background-image | background-position | background-repeat | background-size |
   | outline          | outline-color       | outline-style     | outline-width   |
   | border-radius    | border-style        | box-shadow        |                 |

4. Composite

   - 브라우저가 레이어(z-index)순서대로 객체를 화면에 그림

   |           |         |
   | --------- | ------- |
   | transform | opacity |

   

#### CSS Property 기술 추천 순서

1. Mozilla 제안 순서

   ```markdown
   1. display
   2. list-style
   3. position
   4. float
   5. clear
   6. width / height
   7. padding / margin
   8. border / background
   9. color / font
   10. text-decoration
   11. text-align / vertical-align
   12. white-space
   13. other text
   14. content
   ```

2. Naver

   ```markdown
   1. display
   2. overflow
   3. float
   4. position
   5. width / height
   6. padding / margin
   7. border
   8. background
   9. color/font
   10. animation
   ```



#### 기타 참고 사항

##### Transition 성능 향상

- Css Property style 적용 순서에 따르면, 'Layout' 속성을 바꾸면 'Paint', 'Composite' 순서를 거치기 때문에 **Reflow**성능 저하가 일어나고, 'Paint' 속성을 바꿀 경우 'Composite' 순서를 거치기 때문에 **Repaint** 성능 저하가 일어난다.
- 따라서 성능을 최대한 발휘하기 위해선, 'Composite' 속성만 변경하는 것이 최고이다.

**BAD**

```javascript
function prev() {
      position += 100;
      items.style.transition = 'left 0.3s ease-out';
      items.style.left = `${position}%`;
      curPos -= 1;

      if (curPos === 0) {
        isTransitionEnd = false;
      }
  }
```

**GOOD**

```javascript
function prev() {
      position += 100;
      items.style.transition = 'transform 0.3s ease-out';
      items.style.transform = `${position}%`;
      curPos -= 1;

      if (curPos === 0) {
        isTransitionEnd = false;
      }
  }
```



## JavaScript

### Style Guide

#### Rules by identifier type

1. Package names
   - lowerCamelCase
2. File names
   - kebab-case
3. Class names
   - UpperCamelCase
4. Method names
   - lowerCamelCase
5. Enum names
   - UpperCamelCase
6. Constant names
   - CONSTANT_NAME ( all uppercase letters with words separated by underscores)
7. Non-constant field names(static or otherwise)
   - lowerCamelCase
8. Parameter names
   - lowerCamelCase
     **Exception**: When required by a third-party framework, parameter names may begin with a `$`. This exception does not apply to any other identifiers (e.g. local variables or properties).
9. Local variable names
   - lowerCamelCase

#### css의 kebab-case를 사용할 경우

- 다음과 같은 코드가 있다고 하자.

  ```html
  <div data-index="1">
      hi
  </div>
  <!-- 자바스크립트에서 이를 활용하고 싶다면 어떻게 할까? -->
  ```

  ```javascript
  // kebab-case는 자바스크립트에서 camelCase로 대체된다.
  /* Wrong */
  div.dataset.dataIndex  // data-data-index를 반환
  
  /* Right */
  div.dataset.index  // data-index 반환
  ```



### This

> This는 나를 호출한 객체를 부르는 객체이며, 함수를 호출한 방법에 의해 결정된다.

- JavaScript의 This는 기본적으로 전역객체(window)를 가리킨다.(호출한 객체가 없는 경우)

  ```javascript
  console.log(this); // window
  ```

- 함수 호출 시, this는 window를 가리킨다.

  ```javascript
  var foo = function () {
      console.log(this);
  }
  
  function foo2() {
      console.log(this);
  }
  foo(); // window
  foo2(); // window
  // window.foo();
  ```

- 메서드 호출시(객체의 프로퍼티로 호출), this는 객체를 가리킨다.

  ```javascript
  var foo = function () {
      console.log(this);
  }
  
  var obj = {
      foo: foo
  };
  
  obj.foo(); // obj
  ```

- 단, 메서드의 내부함수는 전역객체(window)를 가리킨다.

  ```javascript
  var value = 1;
  var obj = {
      value: 100,
      foo: function() {
          console.log(this, this.value);  // obj, 100
          function bar() {
              console.log(this, this.value);  // window, 1
          }
          bar();
      }
  }
  obj.foo();
  ```

- 메서드의 내부함수와 같이, 콜백함수는 전역객체(window)를 가리킨다.

  ```javascript
  let person = {
      name: 'jane doe',
      age: 20,
      hello: function () {
          setTimeout(function () {
              console.log(this);  // window
              console.log(this.name);  // undefined
              console.log(this.age);  // undefined
          }, 1000);
      },
  }
  
  person.hello(); // undefined
  ```

- 내부함수가 전역 객체를 가리키는 것은 **설계상의 오류**이며, 이를 회피하는 방법은 보통 아래와 같다.

  ```javascript
  // 1. That 선언
  var value = 1;
  var obj = {
      value: 100,
      foo: function() {
          var that = this;  // this === obj
          console.log(this)  // obj
          console.log(this.value)  // 100
          function bar() {
              console.log(this, this.value)  // window, 1
              console.log(that, that.value)  // obj, 100
          }
          bar();
      }  // foo end
  }  // obj end
  
  // 2. Bind 이용
  let obj = {
      name: 'jane doe',
      age: 20,
      foo: function() {
          setTimeout(function () {
              console.log(this, this.name, this.age);
          }.bind(this), 1000); // bind로 this === obj를 binding한다.
      }
  }
  obj.foo();
  
  // 3. 화살표 함수 이용
  var obj = {
      name: 'jane doe',
      foo: () => {
          console.log(this);  // window
      },
      hello: function() {
          setTimeout(() => {
              console.log(this);
          }, 1000);  // 외부 scope인 hello의 this가 가리키는 obj === this
      },
  }
  
  obj.hello();
  ```

- Bind 호출시, 메서드 호출과 같이 this는 호출한 객체를 가리킨다.

  - 단, Bind는 **단 한번**만 적용된다.

  ```javascript
  function foo() {
      console.log(this);
  }
  var obj = {
      name: 'jane doe'
  }
  var obj2 = {
      name: 'john doe'
  }
  
  var bar = foo.bind(obj);
  bar(); // obj
  var bar2 = bar.bind(obj2);
  bar2(); // obj, 한번만 적용되므로 obj2는 무시됨.
  ```
  
- ES6에 새로 추가된 화살표 함수는 **자신을 포함하고 있는 외부 Scope**에서 This를 계승받는다.

  - 따라서, 화살표 함수는 **객체의 메서드 선언시** 사용하면 오류가 발생할 수 있어 **사용하지 않는다**.
  ```javascript
  var obj = {
    name: 'jane doe',
    foo: () => {
        console.log(this);  // window
    },
    hello: function() {
        setTimeout(() => {
            console.log(this);
        }, 1000);  // 외부 scope인 hello의 this가 가리키는 obj === this
    },
  }
  obj.hello();
  
  // 오류의 발생
  let person = {
      name: 'john doe',
      age: 20,
      foo: () => {
          console.log(this.name);  // undefined, 기대했던 person.name이 아니다!
          console.log(this);  // window
      }
  }
  person.foo();
  ```

- addEventListener의 경우도 똑같이 적용되므로, 화살표 함수의 사용은 지양하는 것이 좋다.

  ```javascript
  let btn = document.querySelector('button');
  btn.addEventListener('click', function() {
  console.log(this);  // 클릭시, btn
  })
  btn.addEventListener('click', () => {
  console.log(this);  // 클릭시, window
  })
  ```

- Strict Mode(엄격모드)에서는 호출한 객체가 없을 경우, this를 window가 아닌 **undefined**로 간주한다.

  ```javascript
  'use strict';
  function printThis() {
      console.log(this);
  }
  printThis();  // ~~~window~~~, undefined
  ```

  

## PHP, Laravel & blade

### 문법

| 코드                                       | 상세내용                                                     |  Vue   |
| :----------------------------------------- | :----------------------------------------------------------- | :----: |
| @if  @elseif @endif                        | if문                                                         |        |
| @foreach                                   | for문                                                        |        |
| @forelse @empty @endforelse                | @if와 @foreach의 결합문                                      |        |
| @include & @require('.blade.php의 파일명') | 코드를 불러와 적용시킨다.<br />include는 Error가 발생해도 코드를 실행하지만, require은 Fatal error를 일으켜 코드를 실행하지 않는다. |        |
| @extends                                   | 상속 / 상속한 위치에서 상속한 컴포넌트를 전체 출력한다.      | Props? |
| @section @endsection                       | 섹션 생성. @yield와 같이 쓰여 섹션 내용을 출력한다.          | $emit  |
| @yield                                     | 섹션을 출력할 때 사용하며, 보통 하위 컴포넌트에서 @section을 선언하고 @extends되는 상위 컴포넌트에 @yield를 사용하여 자식 컴포넌트를 부모 컴포넌트에 적용한다. | $emit  |
| @show                                      | section을 자식에게 상속하고 싶을 때 사용(@section @show) / 자식은 @parent 키워드로 불러온다. |        |
| @stack<br />@push                          | 별도의 css나 script 혹은 컨텐츠를 추가할 때 사용한다.<br />@push @endpush 내에 정의된 것을 불러오며, Section과 다른 점은 **하나의 뷰에 여러번 호출이 가능하다 **는 점이다. |        |

#### Route / Controller / View

1. Route
   - Define URL & connect Controller and View
   - `Route::<HTTP Methods>('/subpath/{Variable routing}', 'Closure Function/Controller@specific method') -> name('naming')`
2. Controller
   - Get data from Database & send to Template
   - Route list : `php artisan route:list`
   - 

#### compact()

- 개별 변수들을 가지고 하나의 배열을 생성하는 PHP 함수

  ```php
  $city  = 'San Francisco';
  $state = 'CA';
  $event = 'SIGGRAPH';
  
  $location_vars = ['city', 'state'];
  
  $result = compact('event', $location_vars);
  print_r($result);
  /*
  	Array
  	(
  		[event] => SIGGRAPH
  		[city] => San Francisco
  		[state] => CA
  	)
  */
  ```

  