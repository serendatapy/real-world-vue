import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/*
NEEDED FOR AUTOMATIC COMPONENT REGISTRATION - from docs
*/
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/   //ONLY files that start with BASE and end with .VUE
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})
/*
END OF AUTOMATIC REGISTRATION
*/

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
