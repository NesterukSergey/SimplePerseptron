import Vue from 'vue'
import App from './App.vue'


//Storage
import {store} from "./store/store";


//Components
import Panel from './components/Panel.vue';
import Digit from './components/Digit.vue';
import TrainingSet from './components/TrainingSet.vue';
import TrainingParams from './components/TrainingParams.vue';
import RecognizingDigit from './components/RecognizingDigit.vue';

Vue.component('panel', Panel);
Vue.component('digit', Digit);
Vue.component('trainingSet', TrainingSet);
Vue.component('trainingParams', TrainingParams);
Vue.component('recognizingDigit', RecognizingDigit);


new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
