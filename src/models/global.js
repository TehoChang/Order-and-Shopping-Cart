
export default {
  namespace: 'global',

  state: {
    userInfo: {
      email: null,
      pwd: null,
      key: null
    }
  },

  subscriptions: {},

  effects: {
    // dispatch 用戶資訊
    *setUserInfo({ payload }, { put }) {
      // eslint-disable-line
      yield put({ type: 'set_userinfo', payload });
    }
  },

  reducers: {
    // 設置用戶資訊 userInfo的state
    set_userinfo(state, { payload }) {
      return { ...state, userInfo: payload };
    }
  }
};
