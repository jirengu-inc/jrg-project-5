import Vuex from 'vuex'
import Vue from 'vue' // 思考：在多个文件 import vue ，会怎样
import objectPath from "object-path"
import AV from '../lib/leancloud'
import getAVUser from '../lib/getAVUser'


Vue.use(Vuex) // 不写这句话浏览器控制台就会报错，于是我就写了

export default new Vuex.Store({
  state: {
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },
    resumeConfig: [
      { field: 'profile', icon: 'id', keys: ['name', 'city', 'title', 'birthday'] },
      { field: 'workHistory', icon: 'work', type: 'array', keys: ['company', 'details'] },
      { field: 'education', icon: 'book', type: 'array', keys: ['school', 'details'] },
      { field: 'projects', icon: 'heart', type: 'array', keys: ['name', 'details'] },
      { field: 'awards', icon: 'cup', type: 'array', keys: ['name', 'details'] },
      { field: 'contacts', icon: 'phone', type: 'array', keys: ['contact', 'content'] },
    ],
    resume: {
      id: ''
    }
  },
  mutations: {
    initState(state, payload) {
      state.resumeConfig.map((item) => {
        if (item.type === 'array') {
          //state.resume[item.field] = [] // 这样写 Vue 无法监听属性变化
          Vue.set(state.resume, item.field, [])
        } else {
          //state.resume[item.field] = {} // 这样写 Vue 无法监听属性变化
          Vue.set(state.resume, item.field, {})
          item.keys.map((key) => {
            //state.resume[item.field][key] = '' // 这样写 Vue 无法监听属性变化
            Vue.set(state.resume[item.field], key, '')
          })
        }
      })
      if(payload){
        Object.assign(state, payload)
      }
    },
    switchTab(state, payload) {
      state.selected = payload // 关于 payload 看这里 http://vuex.vuejs.org/zh-cn/mutations.html#提交载荷（payload）
    },
    updateResume(state, { path, value }) {
      objectPath.set(state.resume, path, value)
      localStorage.setItem('resume', JSON.stringify(state.resume))
    },
    setUser(state, payload) {
      Object.assign(state.user, payload)
    },
    removeUser(state) {
      state.user.id = ''
    },
    addResumeSubfield(state, { field }) {
      let empty = {}
      state.resume[field].push(empty)
      state.resumeConfig.filter((i) => i.field === field)[0].keys.map((key) => {
        Vue.set(empty, key, '')
      })
    },
    removeResumeSubfield(state, { field, index }) {
      state.resume[field].splice(index, 1)
    },
    setResumeId(state, { id }) {
      state.resume.id = id
    },
    setResume(state, resume){
      console.log('s')
      state.resumeConfig.map(({field})=>{
        Vue.set(state.resume, field, resume[field])
      }) 
      state.resume.id = resume.id
    }
  },
  actions: {
    saveResume({ state, commit }, payload) {
      // 新建一个帖子对象
      var Resume = AV.Object.extend('Resume')
      var resume = new Resume()
      if (state.resume.id) {
        resume.id = state.resume.id  
      }
      resume.set('profile', state.resume.profile)
      resume.set('workHistory', state.resume.workHistory)
      resume.set('education', state.resume.education)
      resume.set('projects', state.resume.projects)
      resume.set('awards', state.resume.awards)
      resume.set('contacts', state.resume.contacts)
      resume.set('owner_id', getAVUser().id)

      var acl = new AV.ACL()
      acl.setPublicReadAccess(true)
      acl.setWriteAccess(AV.User.current(), true)

      resume.setACL(acl)
      resume.save().then(function (response) {
        if(!state.resume.id){
          commit('setResumeId', { id: response.id })
        }
      }).catch(function (error) {
        console.log(error)
      })

    },
    fetchResume({commit},payload){
      var query = new AV.Query('Resume');
      query.equalTo('owner_id', getAVUser().id)
      query.first().then((resume)=>{
        if(resume){
          commit('setResume', {id: resume.id, ...resume.attributes})
        }
      })
    }
  }
})
