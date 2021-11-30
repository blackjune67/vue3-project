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

>form 태그 특성  
➡  [vue3 onSubmit Document](https://v3.vuejs.org/guide/template-syntax.html#dynamic-arguments)  
  
`<form></form>` 태그는 submit하게 되면 화면을 리로딩(r)하게 된다 html form 태그의 특징.  
`e.preventDefault();` 를 사용해서 화면 리로딩을 막는다.  
vue 에서는 `@submit.prevent="onSubmit"`을 사용하면 위와 같은 효과를 볼 수 있다.  


>v-for  

➡  [vue2 v-for document](https://kr.vuejs.org/v2/guide/list.html)  
  
자바스크립트의 for...in과 비슷하다.  
`todo in todos` 에서 **todo**는 별칭으로 개발자가 임의의 alias로 지정이 가능하다.   
다만 v-for를 하게 되면 :key 값을 바인딩해줘야한다. (v-for에 key를 추가하는 것이 좋다고 한다.)  
  
```
  <div
    v-for="todo in todos"
    :key="todo.id"
    class="card mt-2">
```

>v-show vs v-if  

* v-if
```
<div v-if="toggle">true</div>
<div v-else>false</div>
<button @click="onToggle">toggle</button>
```

* v-show
```
<div v-show="toggle">true</div>
<div v-show="!toggle">false</div>
<button @click="onToggle">toggle</button>
```
  
***document 설명***  
일반적으로 v-if토글 비용 v-show이 높지만 초기 렌더링 비용이 더 높습니다.  
따라서 v-show무언가를 매우 자주 토글해야 하는 v-if경우 선호 하고 런타임에 조건이 변경되지 않을 경우 선호 합니다.  
   
😫 v-if와 v-for함께 사용하는 것은 권장되지 않습니다 . 자세한 내용은 스타일 가이드 를 참조 하세요.  
➡  [vue3 v-if, v-show document](https://v3.vuejs.org/guide/conditional.html#v-show)  
  
> style binding  

➡  [vue3 Class and Style Bindings document](https://v3.vuejs.org/guide/class-and-style.html#binding-html-classes)  

스타일을 바인딩하는 방법에는 여러가지가 있지만 여기서는 ***object바인딩***과 ***class바인딩***을 실습해본다.

* 오브젝트 바인딩
```
<label 
  class="form-check-label"
  :style="todo.completed ? todoStyle : {}"
>
```

* 클래스 바인딩  

여기서 todo는 v-for문에 vTodo 키값을 의미한다.  

```
 <div v-for="(vTodo, index) in todos" 
        ...

<label 
  class="form-check-label"
  :class="{ vTodo: vTodo.completed }"
>

<style>
.vTodo {
  text-decoration: line-through;
  color: gray;
}
</style>
```

   
> v-for index  

➡  [vue3 v-for index document](https://v3.vuejs.org/guide/list.html#mapping-an-array-to-elements-with-v-for)  

v-for문에는 index를 지정해서 사용이 가능하다.

```
<div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
```

> emit  

***자식 컴포넌트***에 있는 이벤트로직을 ***부모 컴포넌트***에서 사용 가능하게 하는 방법. (자식 ➡ 부모 데이터 이동)  

emit을 하기 전에 먼저 ***Composition API***에는 ***Setup()*** 이라는 것이 있다.  
setup 펑션에는 2가지 전달인자를 가진다.  
1. proops  
2. context  
  
context는 3가지 컴포넌트 프로퍼티를 갖는 일반 JavaScript 객체이다.  
context 객체는 일반적인 JavaScript 객체라서 ***반응성***이 존재하지 않는다.  
(여기서 반응성은 props에서 내용을 이어가겠다.)  

***context  
  └ attr  
  └ slots  
  └ emit***

예제에서는 context를 인자로 바로 사용했으나, [vue3 문서](https://v3.vuejs-korea.org/guide/composition-api-setup.html#context)에서는 Es6 구조분해할당을 통해서 사용할 수 있다고 나와있다.  
또한 이렇게 사용하게 되면 코드의 단순화와 함께 메모리 최적화의 효과도 볼 수 있다.

```
예제소스에서 사용하는 방식.  
setup(props, context) {

}

아래와 같이 사용할 수 있다.  
setup(props, { attrs, slots, emit }) {

}
```
예제 소스를 구조분해할당을 이용해서 아래와 같이 변경이 가능하다.  

```
기존 소스.
  setup(props, context) { //context를 이용했다. [1]
    const todo = ref("");
    const hasError = ref(false);

    const onSubmit = () => {
      if (todo.value === "") {
        hasError.value = true;
      } else {
        context.emit("add-todo", { //context를 이용했다. [2]
          id: Date.now(),
          subject: todo.value,
          completed: false, //완료 여부
        }); //이벤트 이름을 전달.
        
        hasError.value = false;
        todo.value = "";
      }
    };

    return {
      todo,
      hasError,
      onSubmit,
    };
  },
```

```
구조 분해 할당을 이용한 방법
  setup(props, { emit }) { //ES6 구조분해할당을 통해서 emit 프로퍼티만 뽑아서 사용한다. [1]
    const todo = ref("");
    const hasError = ref(false);

    const onSubmit = () => {
      if (todo.value === "") {
        hasError.value = true;
      } else {
        emit("add-todo", { //코드의 간략화.
          id: Date.now(),
          subject: todo.value,
          completed: false, //완료 여부
        }); //이벤트 이름을 전달.
        
        hasError.value = false;
        todo.value = "";
      }
    };

    return {
      todo,
      hasError,
      onSubmit,
    };
  },
```

**자식 컴포넌트에서 부모컴포넌트로 올려주는 방법.**

1. 자식 컴포넌트에서 emit프로퍼티를 선언 후 첫번째로 이름을 넣고 두번째로는 오브젝트의 프로퍼티를 작성해서 넣으면 된다.  
```
자식 컴포넌트  
  ...
  emit("add-todo", {
    id: Date.now(),
    subject: todo.value,
    completed: false, //완료 여부
  }); //이벤트 이름을 전달.
```

2. 부모 컴포넌트에서 자식 컴포넌트를 import하고 부모 컴포넌트에서 컴포넌트를 등록한다.  
```
<tamplate>
  <TodoSimpleForm 
    @add-todo="addTodo" <!-- 자식컴포넌트에서 보낸 emit프로퍼티, 키값 -->
  />
<tamplate>

<script>
import { ref } from "vue";
import TodoSimpleForm from "./components/TodoSimpleForm.vue";

export default {
  components: {
    TodoSimpleForm, //import된 컴포넌트를 등록.
  },
  setup() {
    const todos = ref([]); //배열을 선언.

    const addTodo = (todo) => { //
      todos.value.push(todo); //array에 넣는다.
    };

    return {
      todos,
      addTodo
    };
  },
};
</script>
```

[emit 주의]  
커스텀 이벤트를 사용할 때는 emit에 대해서 명시해줘야함.  
[vue3 커스텀 이벤트 emit Documents](https://v3.vuejs.org/guide/component-custom-events.html#defining-custom-events)

명시를 하지 않으면 아래와 같은 warinng 메시지를 확인할 수 있음.  

***runtime-core.esm-bundler.js?5c40:6591 [Vue warn]: Extraneous non-emits event listeners (toggleTodo, toggleDelete) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.***  

```
  emits: ['toggle-todo', 'toggle-delete'], //명시해줘야함.
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const toggleTodo = (index) => {
      emit('toggle-todo', index); //emit의 키 값 [1]
    };

    const deleteTodo = (index) => {
      emit('toggle-delete', index); //emit의 키 값 [2]
    };

    return {
      toggleTodo,
      deleteTodo,
    };
  },
};
```

> props  

➡  [vue3 props Documents](https://v3.vuejs-korea.org/guide/component-props.html#prop-%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8)


자식컴포넌트에서 props로 데이터를 받을 때 [] 배열로도 가능하며, {} 오브젝트로도 가능하다.  


부모컴포넌트에서 todos를 Array로 보내고 있다.  
```
const todos = ref([]); //배열 형태.
```

배열 형식.  
```
export default {
    props: ['todos'], //배열 형식.
    setup() {


        return {

        }
    }
}
```

오브젝트 형식.  
```
export default {
    props: { //오브젝트 형식.
        todos: {
            type: Array, //todos오브젝트의 프로퍼티, 받는 타입을 Array로 지정해야한다.
            required: true
        }
    },
    setup() {


        return {

        }
    }
}
```

보내는 쪽과 받는 쪽의 type이 다를 경우 아래와 같이 warning message가 출력된다.  

[error message]   
***runtime-core.esm-bundler.js?5c40:6591 [Vue warn]: Invalid prop: type check failed for prop "todos". Expected String with value "", got Array***  

**[props 주의점]**  
모든 props는 아래로 단방향 바인딩(one-way-down binding)이다. 즉, 부모에서 자식으로만 데이터를 내려준다.  
하위 컴포넌트에서 prop를 변경하려고 시도해서는 안된다.  
(props로 받은 데이터를 자식컴포넌트에서 변경하면 안된다.)  


v-model은 양방향 바인딩이다.  
v-model에 사용되는 todo의 completed는 결과적으로 todos의 프로퍼티를 업데이트하기때문에 부모 컴포넌트를 사용하는 것이다. 즉, props에 위반되는 행위를 하고 있는 것이다.  
```
  <input
    class="form-check-input"
    type="checkbox"
    v-model="todo.completed"
  />
```
