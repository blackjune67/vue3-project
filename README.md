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

**반응성(reactivity)**  
반응성의 대표적인 예는 엑셀의 스프레드 시트이다.
각각의 셀에 숫자를 입력하고 나중에 SUM 함수를 요청하면 그 결과를 제공하는데, 이는 첫번째 숫자를 변경하면 SUM에서는 자동적으로 변경이 된다. 이것이 반응성, 반응형이라고 얘기한다.  
➡  [vue3 반응성 Document](https://v3.ko.vuejs.org/guide/reactivity.html#%E1%84%87%E1%85%A1%E1%86%AB%E1%84%8B%E1%85%B3%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC-reactivity-%E1%84%8B%E1%85%B5%E1%84%85%E1%85%A1%E1%86%AB)  

자바스크립트 자체에서는 이렇게 반응성에 대해서 동작하지 않는다.  

vue에서 반응성으로 동작하는 원리.  

1) 자바스립트 객체를 data 옵션 or 컴포넌트 인스턴스에 전달  
2) 객체의 모든 프로퍼티를 Proxt로 변환(ES6 이상에서만 지원, IE에서도 가능은 함.)
***프락시는 다른 객체나 함수를 감싸는 Wrapper객체를 의미, 원본으로의 호출을 중간에 가로채서 처리함.***  


> computed  
➡  [vue3 Computed Document](https://v3.vuejs.org/guide/computed.html#computed-caching-vs-methods)

computed()와 일반메서드의 차이점  
1. Computed는 인자로 받을 수 없다. reactive state가 있을 때만 변경될 때만 값을 저장한다.
2. Computed는 캐쉬를 한다.

```
<template>
  <h4>duble count: {{ doubleCount }}</h4>
  <h4>duble count: {{ doubleCount }}</h4>

  <h4>dubleMethod count: {{ doubleCountMethod() }}</h4>
  <h4>dubleMethod count: {{ doubleCountMethod() }}</h4>
</template>

<script>
    const count = ref(1);
    const doubleCount = computed(() => {
      console.log('computed')
      return count.value *2;
    })

    const doubleCountMethod = () => {
      console.log('method')
      return count.value * 2;
    }
</script>
```

```
결과 :   
computed//Computed는 캐싱되어 한번만 호출되는 것을 알 수 있다.
method //메서드는 콘솔 method를 두번 호출하는 것을 볼 수 있다.
method
```

### 8. To-Do 검색기능 추가하기

**자바스크립트 Method**  
filter: 특정 조건을 만족할 때 새로운 배열을 만든다.  
includes: 특정 요소를 포함하고 있는지 판별.  

### 9. sample-database 연동하기 (json-server)  

➡  [json-server 설치](https://www.npmjs.com/package/json-server)  
➡  [axios 설치](https://www.npmjs.com/package/axios)  

### 10. async / await  

async/await 문법 적용 전
```
  const res = await axios.post('http://localhost:3000/todos', {
    subject: todo.subject,
    completed: todo.completed
  }).then(res => {
    console.log('성공, response : ' + JSON.stringify(res.data))
    todos.value.push(res.data);
  }).catch(err => {
    console.log('실패, ERROR : ' + JSON.stringify(err.data))
    error.value = '어떤 에러가 발생했습니다.'
  })
```

async/await 문법 적용 후
```
  try {
    const res = await axios.post('http://localhost:3000/todos', {
      subject: todo.subject,
      completed: todo.completed
  });
    todos.value.push(res.data);
  } catch(err) {
    console.log('실패, ERROR : ' + JSON.stringify(err.data))
    error.value = '어떤 에러가 발생했습니다.';
  }
```

### 11. json-server를 통해서 get, post 요청 처리하기.  
➡  [json-server Document](https://www.npmjs.com/package/json-server)  

REST API 형태를 통해서 POST, GET, PATCH, DELETE를 통해서 DB에 있는 데이터를 트랜잭션해본다.  

GET을 통해서 To-Do 데이터 갖고오기.  
```
  const getTodos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/todos')
      // todos.value.push(res.data);
      todos.value = res.data;
    } catch (err) {
      console.log('>>> erro : ' + err)
      error.value = '어떤 에러가 발생했습니다.';
    }
  };
```

POST를 통해서 To-Do 데이터 추가하기.  
```
  const addTodo = async (todo) => {
    error.value = '';
    //데이터베이스 todo를 저장한다.
    try {
    //post request요청 => response응답
    const res = await axios.post('http://localhost:3000/todos', {
      subject: todo.subject,
      completed: todo.completed
    });
      todos.value.push(res.data);
    } catch(err) {
      console.log('>>> error : ' + JSON.stringify(err.data))
      error.value = '어떤 에러가 발생했습니다.';
    }
  };
```

PACH를 통해서 To-Do 데이터 업데이트하기.  
```
  const toggleTodo = async (index) => {
    error.value = '';
    const id = todos.value[index].id;

    try {
      const res = await axios.patch('http://localhost:3000/todos/' + id, {
        completed: !todos.value[index].completed
      });

      console.log('>>> res : ', JSON.stringify(res));
      todos.value[index].completed = !todos.value[index].completed;
    } catch(err) {
      console.log('>>> error : ' + JSON.stringify(err));
    }
  };
```

DELETE를 통해서 To-Do 데이터 삭제하기.  
```
    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;

      try {
        const res = await axios.delete('http://localhost:3000/todos/' + id);
        
        console.log('>>> res : ' + JSON.stringify(res))
        todos.value.splice(index, 1);
      } catch(err) {
          console.log('>>> error : ' + JSON.stringify(err.data))
          error.value = '어떤 에러가 발생했습니다.';
      }
    }
```  
### 12. watchEffect, watch  
➡  [vue3 watchEffect, watch Document](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watch)

watchEffect는 처음 컴포넌트가 랜더될 때 최초 1회 실행됩니다.  
그 이후 watchEffect 내부에 있는 변수가 바뀔 때마다 재실행됩니다.  

  
부모에 선언된 ref는 ***reactive***한 객체 및 원시타입(primitive)값을 포함한 여러 타입의 값을 받을 수 있다.  
그래서 watchEffect는 이 reactivity한 값을 받아서 watchEffect에 console.log()에 찍힐 수 있는 것이다.
부모 컴포넌트(App.vue)
```
const todos = ref([]);
```  

자식 컴포넌트(TodoList.vue)  
```
  setup(props, { emit }) {
    watchEffect(() => {
      console.log(props.todos.length)
  })
```

reactive를 사용한 것도 위와 동일하게 반응성있는 값에 대한 변화를 볼 수 있다.
```
  const a = reactive({
    b : 1
  });

  watchEffect(() => {
    console.log(a.b);
  })

  a.b = 4;
```

반면에 limit은 reactivity한 값이 아니라서 최초에 한번 실행된 5가 노출될 뿐 값이 3으로 바뀌지는 않는다.
```
  let limit = 5

  watchEffect(() => {
    console.log('>>>>>>>>> ' + limit);
  })

  limit = 3;
```

reactive를 사용했을 때 b의 값을 watch를 하고 있는데, 이때 a의 값을 100으로 변경했기 때문에 console.log에 100과 prev의 값이 찍히는 것.
```
  const currentPage = ref(1);

  const a = reactive({
    b: 1
  });

  watch(() => a.b, (currentPage, prev) => {
    console.log(currentPage, prev);
  })

  a.b = 100;
```

watching multiple을 하는 방법은 watching할 것을 Array로 변경하면 된다.
```
  const currentPage = ref(1);

  const a = reactive({
    b: 1
    c: 2
  });

  watch(() => [a.b, a.c], (currentPage, prev) => {
    console.log(currentPage, prev);
  })

  a.b = 100;
```

[결론]  
watch, watchEffect는 reactive한 값이 변경되면 그 값을 인지하고 보여준다.  
다만 watchEffect는 처음 컴포넌트가 랜더될 때 최초에 1회 실행이 된다.  

### 13. vue router  

➡  [vue router Documen](https://next.router.vuejs.org/api/#createrouter)  


라우터를 사용한 index.js
```
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/index.vue';
import Todos from '../pages/todos/index.vue';
import Todo from '../pages/todos/';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        //하나하나의 객체가 라우터
        {
            path: '/',
            name: 'home',
            component: Home
        }, 
        {
            path: '/todos',
            name: 'Todos',
            component: Todos
        }, 
        {
            path: '/todos/:id', //URI resource의 값을 나타낼 때, routes에서는 파라미터표시를 :을 이용한다.
            name: 'Todo',
            component: Todo
        }
    ]
});

// 1. /home 2. /todos 3. /todos/create 4. /todos/:id
export default router;
```

페이지를 이동할 때 parameter를 바로 받아서 하는 방법과 이름으로 이동하는 방법이 있다.  

index.js에 각각의 라우터 객체에는 name속성이 들어 있다.
```
const router = createRouter({
    history: createWebHistory(),
    routes: [
        //하나하나의 객체가 라우터
        {
            path: '/',
            name: 'home',
            component: Home
        }, 
        {
            path: '/todos',
            name: 'Todos',
            component: Todos
        }, 
        {
            path: '/todos/:id',
            name: 'Todo',
            component: Todo
        }
    ]
});
```

1. 파라미터로 접근하는 방법.
```
  const moveToPage = (vTodoId) => {
    console.log('>> ' + vTodoId);
    //router.push('/todos/' + vTodoId);
  }
```

2. name으로 접근하는 방법.
```
  const moveToPage = (vTodoId) => {
    router.push({
        name: 'Todo',
        params: {
          id: vTodoId
        }
    });
  }
```

3. tamplate에는 router-link에 :to를 이용해서 이름으로 접근할 수 있다.
```
<li class="nav-item">
    <router-link
      class="nav-link active"
      aria-current="page"
      :to="{ name: 'Todos' }"
      >Todos</router-link
    >
  </li>
```  

useRoute, useRouter  
useRoute : 현재 경로 위치를 반환하는 것.
useRouter : 라우터 인스턴스를 반환하는 것.
```
/**
 * Returns the current route location. Equivalent to using `$route` inside
 * templates.
 */
export declare function useRoute(): RouteLocationNormalizedLoaded;

/**
 * Returns the router instance. Equivalent to using `$router` inside
 * templates.
 */
export declare function useRouter(): Router;
```

무슨 말일까?? 콘솔로 찍어본다.
```
const route = useRoute();
  const router = useRouter();
  const todo = ref(null);

  console.log('route : ' + JSON.stringify(route));
  console.log('router : ' + JSON.stringify(router));
```

콘솔 결과
```
route : {
  "path":"/todos/4","name":"Todo","params":{"id":"4"},"query":{},"hash":"","fullPath":"/todos/4","matched":[{"path":"/todos/:id","name":"Todo","meta":{},"props":{"default":false},"children":[],"instances":{"default":null},"leaveGuards":{},"updateGuards":{},"enterCallbacks":{},"components":{"default":{"__file":"src/pages/todos/_id.vue","__hmrId":"713b03c4"}}}],"meta":{}
  }

router : {
  "currentRoute":{"_shallow":true,"dep":{"w":0,"n":0},"__v_isRef":true,"_rawValue":{"fullPath":"/todos/4","path":"/todos/4","query":{},"hash":"","name":"Todo","params":{"id":"4"},"matched":[{"path":"/todos/:id","name":"Todo","meta":{},"props":{"default":false},"children":[],"instances":{"default":null},"leaveGuards":{},"updateGuards":{},"enterCallbacks":{},"components":{"default":{"__file":"src/pages/todos/_id.vue","__hmrId":"713b03c4"}}}],"meta":{},"href":"/todos/4"},"_value":{"fullPath":"/todos/4","path":"/todos/4","query":{},"hash":"","name":"Todo","params":{"id":"4"},"matched":[{"path":"/todos/:id","name":"Todo","meta":{},"props":{"default":false},"children":[],"instances":{"default":null},"leaveGuards":{},"updateGuards":{},"enterCallbacks":{},"components":{"default":{"__file":"src/pages/todos/_id.vue","__hmrId":"713b03c4"}}}],"meta":{},"href":"/todos/4"}},"options":{"history":{"location":"/todos/4","base":"","state":{"back":null,"current":"/todos/4","forward":null,"position":49,"replaced":true,"scroll":null}},"routes":[{"path":"/","name":"home","component":{"__file":"src/pages/index.vue","__hmrId":"57509004"}},{"path":"/todos","name":"Todos","component":{"components":{"TodoSimpleForm":{"emmit":["add-todo"],"__file":"src/components/TodoSimpleForm.vue","__hmrId":"9d72c2a8"},"TodoList":{"emits":["toggle-todo","toggle-delete"],"props":{"todos":{"required":true}},"__file":"src/components/TodoList.vue","__hmrId":"3de47834"}},"__file":"src/pages/todos/index.vue","__hmrId":"3e721a5c"}},{"path":"/todos/:id","name":"Todo","component":{"__file":"src/pages/todos/_id.vue","__hmrId":"713b03c4"}}]},"__hasDevtools":true
  }
```

**[결론]**  
route는 현재 클라이언트가 바라보고 있는 URI를 의미한다. 그래서 route.params.id를 해서 게시판의 id를 물고 들어올 수 있다.
```
  const getTodosDetail = async () => {
    const res = await axios.get(
      `http://localhost:3000/todos/` + route.params.id
    );
    todo.value = res.data;
    loading.value = false;
  };
```

useRouter를 까보면 Router를 상속 받고 있고, useRoute는 RouteLocationNormalizedLoaded에 _RouteLocationBase라는 위치참조하는 객체를 상속하고만 있다.  
어쨌든 useRouter는 useRoute랑 비슷하지만 조금 더 넓은 의미를 갖고 있다.  




### 14. 이벤트 버블링  

특정 화면 요소에서 이벤트가 발생했을 때 해당 이벤트가 더 상위의 화면 요소들로 전달되어 가는 특성을 의미한다.  
이 부분은 vue js의 특성이라기 보다는 Vanilla JS의 특징이다.  
➡ [이벤트 버블링 사진](https://joshua1988.github.io/images/posts/web/javascript/event/event-bubble.png)  


Vanilla JS
```
function stopBubble(event) {
  event.stopPropagation()
}
```

Vue JS
```
<button class="btn btn-danger btn-sm" @click.stop="deleteTodo(index)">
          삭제
</button>
```

이렇게 @change.stop을 하게 되면 먹히지 않는다.
```
<input
  class="form-check-input"
  type="checkbox"
  :checked="vTodo.completed"
  @change.stop="toggleTodo(index)"
/>
```

때에 따라서 @click.stop을 줘서 막는 경우도 있다.
```
<input
  class="form-check-input"
  type="checkbox"
  :checked="vTodo.completed"
  @change="toggleTodo(index)"
  @click.stop
/>
```

@change vs @click  
@change는 값이 변하는 걸 감지한  이후에 실행되고, @click은 바로 함수가 실행되는 것이라서
위 처럼 하지 않고 아래와 같이 @click 이벤트로 변경해도 된다.
```
<input
  class="form-check-input"
  type="checkbox"
  :checked="vTodo.completed"
  @click.stop="toggleTodo(index)"
/>
```


### 15. 클릭 저장하기  

subject 내용과 상태(완료, 미완료)값을 변경 후 저장하는 로직

```
<input type="text" class="form-control" v-model="todo.subject" />
  ...
<button
              class="btn"
              type="button"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click='toggleTodoStatus'
            >
              {{ todo.completed ? '완료' : '미완료' }}
            </button>
```

이렇게해서 넣어줬음.
```
    const saveTodoDetail = async () => {
       const res = axios.put('http://localhost:3000/todos/' + route.params.id, {
         subject: todo.value.subject,
         completed: todo.value.completed
       })
       console.log('==> save : ' + res);
    }
```

예제에서 한 방법.
```
<form v-else @submit.prevent="onSave">
```

```
const toDoId = route.params.id;
    ...
const onSave = async () => {
  const res = axios.put(`http://localhost:3000/todos/${toDoId}`, {
    subject: todo.value.subject,
    completed: todo.value.completed,
  });

  console.log('==> save : ' + JSON.stringify(res));
};
```

### 16. 스스로 학습해보자.  
watch => reactivity한 값이 아니면 찍히지 않는다.  
javascript는 Array로 보내도 .으로 프로퍼티를 바로 접근하게 되면 Object로 인식한다.

부모 컴포넌트에서는 배열로 보내고 있다.
```
const toastMessage = reactive([ //배열로 보냄.
  {
    viewMessage: '',
    idx: null,
  },
]);
    ...

const triggerToast = (message) => {
    console.log('true!!! ' + isShow.value);

    if (isShow.value === true) {
      toastMessage.viewMessage = message; //값을 배열에 넣지 않았다.
    } else {
      console.log('failed');
    }
        ...
  };
}
```

자식 컴포넌트에서 props로 type이 Array지만 아래와 같이 콘솔로그를 찍으면 결과가 특이하게 나온다.
```
export default {
  props: {
    message: {
      type: Array, //배열로 받고 있다.
      required: false,
    },
      ...
```

**[콘솔 로그]**
```
console.log('>> 1 : ' + JSON.stringify(props.message));
console.log('>> 2 : ' + JSON.stringify(props.message.viewMessage));
```

**[콘솔 결과]**
```
>> 1 : [{"viewMessage":"","idx":null}]
>> 2 : "success!!"
```

v-if랑 v-for이랑 한 태그에 같이 사용은 불가한다.

### 17. vue 컴포넌트 Lifecycle Hooks  
vue3 에서는 beforeMoune가 아닌 onBeforeMount를 한다.  
즉, 모든 라이프사이클 훅 앞에 전치사 on을 붙인다.

* onBeforeMount -장착이 시작되기 전에 호출 됨
* onMounted -컴포넌트가 마운트 될 때 호출됩니다.
* onBeforeUpdate -반응 형 데이터가 변경 될 때와 다시 렌더링하기 전에 호출됩니다.
* onUpdated -다시 렌더링 후 호출
* onBeforeUnmount -Vue 인스턴스가 파괴되기 전에 호출됩니다.
* onUnmounted -인스턴스가 파괴 된 후 호출됩니다.
* onActivated -연결 유지 구성 요소가 활성화되면 호출됩니다.
* onDeactivated -연결 유지 구성 요소가 비활성화 될 때 호출됩니다.
* onErrorCaptured -하위 구성 요소에서 오류가 캡처 될 때 호출됩니다.

```
    onBeforeMount(() => {
      console.log('1 ' + document.querySelector('#june'));
    }); //component DOM이 실제로 렌더링되고 마운트되기 직전에 호출된다.

    onMounted(() => {
      console.log('2 ' + document.querySelector('#june'));
    }); //component를 처음 렌더링 한 후 호출.

    onBeforeUpdate(() => { console
      console.log('before update');
    }) //업데이트 되기 전에 실행.

    onUpdated(() => {
      console.log('updaTe');
    }) //업데이트 된 후 실행.

    onUnmounted(() => {
      console.log('befor unmount');
    }) //컴포넌트를 빠져나가기 전에 메모리 누수가 발생되지 않게 onUnmounted를 사용한다, 메모리 정리할 때 사용하면 좋다.

    onBeforeUnmount(() => {
      console.log('onBeforeUnmount');
    }) //이벤트리스너를 제거할 때 사용한다.
```

