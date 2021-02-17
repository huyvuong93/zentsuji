import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueApollo from "vue-apollo";
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
Vue.config.productionTip = false
Vue.use(VueApollo, gql);

const apolloProvider = new VueApollo({
  defaultClient : new ApolloClient({
    uri: 'https://zentsuji.hasura.app/v1/graphql'
  })
})



new Vue({
  router,
  apolloProvider,
  store,
  render: h => h(App)
}).$mount('#app')
