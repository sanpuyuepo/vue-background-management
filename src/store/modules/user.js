import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router, { asyncRoutes, resetRouter, anyRoutes, constantRoutes } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    // 菜单信息
    routes: [],
    // 角色信息
    roles: [],
    // 按钮权限
    buttons: [],
    // 项目配置的异步路由和服务器根据不同角色返回的路由对比后计算的最终需要的异步路由
    resultAsyncRoutes: [],
    // 最终需要的所有路由
    resultAllRoutes: []
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  // 存储用户信息
  SET_USERINFO: (state, userInfo) => {
    state.name = userInfo.name;
    state.avatar = userInfo.avatar;
    state.routes = userInfo.routes;
    state.buttons = userInfo.buttons;
    state.roles = userInfo.roles;
  },
  // 最终需要的所有路由
  SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
    state.resultAsyncRoutes = asyncRoutes;
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes)
    router.addRoutes(state.resultAllRoutes)
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          //获取用户信息:返回数据包含：用户名name、用户头像avatar、routes[返回的标志:不同的用户应该展示哪些菜单的标记]、roles（用户角色信息）、buttons【按钮的信息：按钮权限用的标记】
          const { data } = response;
          //vuex存储用户全部的信息
          commit("SET_USERINFO", data);
          commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, data.routes))
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

const computedAsyncRoutes = (asyncRoutes, routes) => {
  // 过滤当前用户需要展示的异步路由
  return asyncRoutes.filter(item => {
    if (routes.indexOf(item.name) != -1) {
      // 递归处理多级路由的情况
      if (item.children && item.children.length) {
        item.children = computedAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
