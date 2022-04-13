## JavaScript Runtime Environment

### 목차

---

1. [Web Browser](#Web Browser)
   1. [Dev Tools](#Dev Tools)
2. [주석](#주석)

---

### Web Browser

#### Dev Tools

**How To Open**

- Window `F12` / `Ctrl + Shift + I`
- MacOS `command + option + I`

**Example**[^1]

- example.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter</title>
</head>
<body>
    <div id="counter">0</div>
    <button id="increase">+</button>
    <button id="decrease">-</button>
    <script>
        // Error. div id is 'counter', not 'counter-x'
        const $counter = document.getElementById('counter-x');
        const $increase = document.getElementById('increase');
        const $decrease = document.getElementById('decrease');

        let num = 0;
        const render = function () { $counter.innerHTML = num; }

        $increase.onclick = function () {
            num++;
            console.log('increase 버튼 클릭', num);
            render();
        }

        $decrease.onclick = function () {
            num--;
            console.log('decrease 버튼 클릭', num);
            render();
        }
    </script>
</body>
</html>
```

- **Console**

![devToolsEx1](C:\Users\ami3\Desktop\wonhyeokJung\study\javascript\runtimeEnvironment\README.assets\devToolsEx1.png)

- **Source(Debugging)**

![devToolsEx2](C:\Users\ami3\Desktop\wonhyeokJung\study\javascript\runtimeEnvironment\README.assets\devToolsEx2.png)



---

![devToolsEx3](C:\Users\ami3\Desktop\wonhyeokJung\study\javascript\runtimeEnvironment\README.assets\devToolsEx3.png)





---

### 주석

[^1]: [Example](./example.html)
