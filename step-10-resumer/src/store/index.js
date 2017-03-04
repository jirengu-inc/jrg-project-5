import Vuex from 'vuex'
import Vue from 'vue' // 思考：在多个文件 import vue ，会怎样
import objectPath from "object-path"


Vue.use(Vuex) // 不写这句话浏览器控制台就会报错，于是我就写了

export default new Vuex.Store({
  state: {
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },
    resume: {
      config: [
        { field: 'profile', icon: 'id', keys: ['name','city', 'title', 'birthday']},
        { field: 'workHistory', icon: 'work', type: 'array', keys: ['company', 'details'] },
        { field: 'education', icon: 'book',type: 'array',  keys: ['school', 'details'] },
        { field: 'projects', icon: 'heart',type: 'array',  keys: ['name', 'details']  },
        { field: 'awards', icon: 'cup' ,type: 'array',  keys: ['name', 'details'] },
        { field: 'contacts', icon: 'phone' ,type: 'array',  keys: ['contact', 'content'] },
      ],
      profile: { },
      workHistory: [ ],
      education: [ ],
      projects: [ ],
      awards: [ ],
      contacts: [ ],
    }
  },
  mutations: {
    initState(state, payload){
      Object.assign(state, payload)
    },
    switchTab(state, payload) {
      state.selected = payload // 关于 payload 看这里 http://vuex.vuejs.org/zh-cn/mutations.html#提交载荷（payload）
      localStorage.setItem('state', JSON.stringify(state))
    },
    updateResume(state, {path, value}){
      objectPath.set(state.resume, path, value)
      localStorage.setItem('state', JSON.stringify(state))
    },
    setUser(state, payload){
      Object.assign(state.user, payload)
    },
    removeUser(state){
      state.user.id = null
    }

  }
})
