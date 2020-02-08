import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userStorage : 'http://188.225.47.187/api/jsonstorage/958dea570a05b8340764e3f33491cab7',
    postStorage : 'http://188.225.47.187/api/jsonstorage/18dac9e8448e881a0d3e1ab8c55f552a',
    curID : -1,
    users : [],
    posts : [],
  },
  mutations: {
    CID(state, data){
      state.curID = data
    },
    AUsers(state, data){
      state.users = data
    },
    APosts(state, data){
      state.posts = data
    },
    addPost(state, data){
      state.posts.push(data)
    },
    addUser(state, data){
      state.users.push(data)
    }
  },
  actions: {
    updateState(ctx, u_data){
      ctx.commit(u_data[0], u_data[1])

      if(u_data[0] === 'addPost'){
        axios.put(ctx.state.postStorage, ctx.state.posts).then(res => console.log(res) )
      }
      else if(u_data[0] === 'addUser'){
        axios.put(ctx.state.userStorage, ctx.state.users).then(res => console.log(res) )
      }
    }
  },
  getters:{
    getCID    : state => state.curID,
    getUsers  : state => state.users,
    getPosts  : state => state.posts,
    postURL   : state => state.postStorage,
    userURL   : state => state.userStorage,
  }
})
