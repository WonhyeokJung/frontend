## Variables

### 목차

---

1. [변수(Variable)](#변수(Variable))
   1. [선언과 초기화](#Variable(Identifier) Declaration & Initialization)
   2. 
2. [변수 호이스팅](#Variable Hoisting)
3. 

---

### 변수(Variable)

**하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름**

즉 ,**값의 위치를 가리키는 상징적인 이름**이다.

```javascript
var userId = 1;
var userName = 'Kim';

var user = { id: 1, name: 'Lee' };

var users = [
  { id: 1, name: 'Jung' },
  { id: 2, name: 'Kim' }
];
```

#### Variable(Identifier) Declaration & Initialization

- 변수 이름을 등록하고, 값을 저장한 메모리 공간을 확보한다.

```javascript
// let, var의 변수명(식별자) 선언 & 초기화
var foo;  // undefined
let foo2;  // undefined

const foo3;  // ReferenceError; value should be assigned.
// declaration & initialization(Assignment)
const foo3 = function () { return console.log('Hello World!')};
```

#### Assignment & Reassignment

- 할당/재할당이 이루어질 때마다 **새로운 메모리 공간**에 값을 저장한다.
- **상수(constant)**인 const는 값의 재할당이 불가능하다.

```javascript
var foo = 30;  // 값의 할당
foo = 40;  // 값의 재할당

const foo2 = 20;
foo2 = 100;  // TypeError: Assignment to constant variable.
// const는 상수이므로 재할당이 불가능하다.
```

#### Reference

```javascript
var foo = 10;
> foo
<- 30  // 값의 참조
```



### Variable Hoisting

**변수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징**

```javascript
console.log(score);  // undefined

var score;
```

- Runtime(실행 시점)에는 코드가 순차적으로 한줄씩 시행되기 때문에, *Reference Error*가 발생해야 할 것으로 보이지만, undefined가 발생
- 자바스크립트는 Runtime 이전에 **모든 선언문(변수 선언문, 함수 선언문)**을 소스코드에서 찾아내 **먼저 실행**하기 때문이다. 이를 **Variable Hoisting**이라고 한다.

```javascript
console.log(score)  // undefined

score = 80;
var score;
console.log(score)  // 80
```

