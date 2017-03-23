import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Resume from 'components/Resume'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Resume',
      component: Resume
    }
  ]
})
