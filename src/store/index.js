import { createStore } from "vuex";
import modules from "./modules";


export default createStore({
    //modules: modules //앞이랑 뒤랑 같아서 생략가능.
    modules
});