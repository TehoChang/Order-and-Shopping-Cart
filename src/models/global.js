//这个js文件是一个完整的 管理store.global的文件
//在里面我们做了以下几件事
//1 namespace：取名
//2 state:{}定义数据结构
//3 effect, reducer的编写
export default {
  namespace: 'global',

//定义state的数据结构
  state: {
    userInfo: {
      email: null,
      pwd: null,
      key: null
    }
  },

  subscriptions: {},

  // 当此类行为会改变数据的时候可以通过 dispatch 发起一个 action，
  // 如果是同步行为会直接通过 Reducers 改变 State ，
  // 如果是异步行为（副作用）会先触发 Effects 然后流向 Reducers 最终改变 State
  effects: {
    // dispatch 用户信息
    *setUserInfo({ payload }, { put }) {
      // eslint-disable-line
      yield put({ type: 'set_userinfo', payload });
    }
  },

  reducers: {
    // 设置用户信息 userInfo的state
    set_userinfo(state, { payload }) {
      return { ...state, userInfo: payload };
    }
  }
};
