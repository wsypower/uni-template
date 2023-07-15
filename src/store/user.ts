/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-07-15 15:10:30
 * @LastEditTime: 2023-07-15 17:05:31
 * @LastEditors: wsy
 */
export default defineStore({
  id: 'user',
  persist: {
    enabled: true
  },
  state: () => {
    return {
      userInfo: {
        token: 'token',
        user_id: 111
      }
    } as {
      userInfo: User.UserInfo;
    };
  },
  getters: {
    logged: (state) => {
      const { token, user_id } = state.userInfo;
      return !!(token && user_id);
    },
    token: (state) => {
      return state.userInfo.token;
    },
    userId: (state) => {
      return state.userInfo.user_id;
    }
  },
  actions: {
    setUserInfo(userInfo: User.UserInfo) {
      Object.assign(this.userInfo, userInfo);
    }
  }
});
