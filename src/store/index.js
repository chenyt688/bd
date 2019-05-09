import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//先声明一个state变量，并赋值一个空对象给它,定义属性
const state={//要设置的全局访问的state对象

  userId: sessionStorage.getItem('userId'),
  userAccount:sessionStorage.getItem('userAccount'),
  userName:sessionStorage.getItem('userName'),
  roleId:sessionStorage.getItem('roleId')
  //localStorage 永久保存
  /*userId: localStorage.getItem('userId'),
  userAccount:localStorage.getItem('userAccount'),
  userName:localStorage.getItem('userName'),
  roleId:localStorage.getItem('roleId')*/
  //要设置的初始属性值
};

//可以用this.$store.state.getUserId或this.$store.state.getUserAccount在任何一个组件里面获取userId和userAccount定义的值了，但这不是理想的获取方式；
//vuex官方API提供了一个getters，和vue计算属性computed一样，来实时监听state值的变化(最新状态)，并把它也仍进Vuex.Store里面，
const getters = {        //实时监听state值的变化(最新状态)
  getUserId(state) {    //方法主要是来承载变化的getUserId的值
    return state.userId
  },
  getUserAccount(state){     //方法主要是用来承载变化的getUserAccount的值
    return state.userAccount
  },
  getUserName(state) {  //方法名随意,主要是来承载变化的getUserName的值
    return state.userName
  },
  getRoleId(state){          //方法主要是用来承载变化的getRoleId的值
    return state.roleId
  }
};

//mutattions也是一个对象，这个对象里面可以放改变state的初始值的方法，具体的用法就是给里面的方法传入参数state或额外的参数,
// 然后利用vue的双向数据驱动进行值的改变，同样的定义好之后也把这个mutations扔进Vuex.Store里面
const mutations = {
  changeState(state,userId,userAccount,userName,roleId){  //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.userId = userId;
    state.userAccount =userAccount;
    state.userName =userName;
    state.roleId = roleId;
  },

};

//vuex官方API还提供了一个actions，这个actions也是个对象变量，最大的作用就是里面的Action方法 可以包含任意异步操作，
// 这里面的方法是用来异步触发mutations里面的方法，actions里面自定义的函数接收一个context参数和要变化的形参，
// context与store实例具有相同的方法和属性，所以它可以执行context.commit(' '),然后也不要忘了把它也扔进
/*const actions = {
  saveUserInfo(context) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit('changeState',userId,userAccount,userName,roleId);
  },

};*/

//实例化的Vuex.Store里面传入一个空对象，并把刚声明的变量state放里面：
const store = new Vuex.Store({
  state,getters,mutations
});


//而在外部组件里进行全局执行actions里面方法的时候，你只需要用执行
//
// this.$store.dispatch('saveUserInfo',?,?,?,?)
 //?要变化的实参
//
// 这样就可以全局改变改变 userId
//   userAccount
//   userName
//   roleId的值了
export default store;
