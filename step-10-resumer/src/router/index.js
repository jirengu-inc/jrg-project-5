import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Resume from 'components/Resume'
import Preview from 'components/Preview'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Resume',
      component: Resume
    },
    {
      path: '/preview',
      name: 'Preview',
      component: Preview
    }
  ]
})
