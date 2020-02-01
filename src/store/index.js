import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userStorage : 'http://188.225.47.187/api/jsonstorage/f1447a62dcaba92ed1ddd2d652b63a8a',
    postStorage : 'http://188.225.47.187/api/jsonstorage/ba3c33e494c72686bff15526dee0199f',
    curID : 0,
    users : () => {
      this.axios.get(userStorage).then(res => {return res.data} ).catch( ()=>{ return [] } )
    },
    posts : () => {
      this.axios.get(postStorage).then(res => {return res.data} ).catch( ()=>{ return [] } )
    },
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
        await this.axios.put(ctx.state.postStorage, ctx.state.posts)
      }
      else if(u_data[0] === 'addUser'){
        await this.axios.put(ctx.state.postStorage, ctx.state.users)
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
