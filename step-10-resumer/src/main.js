// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'

var locales = {
  en: {
    resume: {
      profile: {
        name: 'Name',
        city: 'City',
        title: 'Job Title',
        birthday: 'Birthday'
      }
    }
  },
  zh_CN: {
    resume: {
      profile: {
        name: '名称',
        city: '城市',
        title: '职位',
        birthday: '生日'
      },
      workHistory: {
        _: '工作经历',
        company: '工作单位',
        details: '详情'
      },
      education: {
        _: '教育经历',
        school: '毕业院校',
        details: '详情'
      },
      projects: {
        _: '项目经历',
        name: '项目名称',
        details: '项目介绍'
      },
      awards: {
        _: '获奖经历',
        name: '奖项名称',
        details: '详情'
      },
      contacts: {
        _: '联系方式',
        contact: '途径',
        content: '内容'
      }
    }
  }
}

Vue.use(VueI18n)
Vue.config.lang = 'zh_CN'

Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
