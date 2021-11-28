# vue3-project
___ 
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

___
## Vue3 JS를 학습합니다.

➡ [vue3 Document](https://v3.vuejs.org/guide/installation.html)

### 1. Component
Component를 만들 때는 확장자가 .vue로 해서 만들면 됨.

> #### Component 구성

1. `<template> </template>`  
템플릿태그 안에 `html` 태그를 작성할 수 있음.

2. `<script></script>`  
스크립트 작성을 할 수 있음.

3. `<style></style>`  
CSS도 적용이 가능하게 되어 있음.

4. composition API  
`<script></script>` 문에 `setup()` 함수가 들어가게 됨.

```
export default {
  setup() { //setup function안에 로직이 들어감.

  }      
```

### 2. Fragment
vue2에서는 div태그를 무조건 한번 감싸야했음.  
vue3 에서는 이 부분이 개선됨.

### 3. 함수사용
아래와 같이 함수를 사용할 수 있으며, 지정된 함수는 return을 해서 사용해줘야함.
```
export default {
  setup() {
    const name = '곰돌이푸'
    const greeting = (name) => {
      return 'hello';
    };

    return {
      name,
      greeting
    };
  },
};

```

### 4. ref와 reactive

**ref** 같은 경우 숫자, String, Object, Array가 사용 가능하다.  
접근은 .value로 가능.

**reactive** 는 오브젝트나 Array만 사용 가능하다.
접근은 해당 오브젝트의 속성(?)접근이 가능하다.
아래 코드를 보면 name2 오브젝트의 id로 접근할 수 있다.

```
import { ref, reactive } from 'vue';

const name2 = reactive({
      id : 1
    })

let sString = ref('');
let sInt = ref(1);
let sArray = ref([]);
let sObject = ref({});

const updateName = () => {
    name2.id = 2; //id로 접근이 가능!
}

```