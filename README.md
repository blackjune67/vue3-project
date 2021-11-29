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

### 5. v-bind, v-on
***v-bind***와 ***v-on***이 있다.  
v-bind는 데이터 바인딩을 하는 경우에 사용하며, v-on:click은 클릭 이벤트를 사용할 때 가능하다.  
v-bind, v-on은 축약해서 사용이 가능하다.

* v-bind ➡ :
* v-on:click ➡ @click


```
<input
    v-bind:type="type"
    v-bind:value="name"
>

⬇ 축약이 가능하다.[1]

<input
    :type="type"
    :value="name"
>

<button 
      class="btn btn-primary"
      v-on:click="updateName"
    >Click
</button>

⬇ 축약이 가능하다.[2]

<button 
      class="btn btn-primary"
      @click="updateName"
    >Click
</button>
```

### 6. 양방향 바인딩 (v-model)
사용자가 검색을 했을 때 데이터가 표시된다거나, input박스에 값을 넣어서 기존 데이터를 변경한다거나 등을 양방향 데이터 바인딩이라 한다.

이 부분을 아래 코드로 간단히 구현해봤다.

```
<template>
    <input
     type="text"
     :value="name"
     @input="updateName"
     >
    <button 
      class="btn btn-primary"
      @click="onSubmit"
    >Click</button>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const name = ref('최하준');

    const onSubmit = () => {
      console.log(name.value);
    }

     const updateName = (e) => {
      name.value = e.target.value;
    }

    return {
      name,
      onSubmit,
      updateName
    };
  },
};
</script>

```
위의 코드를 v-model을 사용함으로 코드를 줄일 수 있다.

```
<template>
    <input
     type="text"
     v-model="name"
     >
    <button 
      class="btn btn-primary"
      @click="onSubmit"
    >Click</button>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const name = ref('최하준');

    const onSubmit = () => {
      console.log(name.value);
    }

    return {
      name,
      onSubmit,
    };
  },
};
</script>
```
### 7. To-Do List 만들기
`<form></form>` 태그는 submit하게 되면 화면을 리로딩(r)하게 된다 html form 태그의 특징.  
`e.preventDefault();` 를 사용해서 화면 리로딩을 막는다.  
vue 에서는 `@submit.prevent="onSubmit"`을 사용하면 위와 같은 효과를 볼 수 있다.  
➡  [vue3 onSubmit Document](https://v3.vuejs.org/guide/template-syntax.html#dynamic-arguments)
