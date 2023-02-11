//admin模块仓库
import {
  deleteAdiminById,
  getAdmins,
  updateAdminInfo,
  addAdmin,
} from '../services/admin';
export default {
  //命名空间
  namespace: 'admin',
  state: {
    adminList: [], //所有用户信息列表
    adminInfo: null, //当前用户信息
  },
  reducers: {
    //更新本地仓库
    initAdminList(state, { payload }) {
      const newState = { ...state };
      newState.adminList = payload;
      return newState;
    },
    deleteAdiminById(state, { payload }) {
      const newState = { ...state };
      const index = newState.adminList.indexOf(payload);
      const arr = [...newState.adminList];
      if (index !== -1) {
        arr.splice(index, 1);
      }
      newState.adminList = arr;
      return newState;
    },
    //更新管理员信息
    editAdmin(state, { payload }) {
      const newState = { ...state };
      const index = newState.adminList.findIndex((item) => {
        return item._id === payload.id;
      });
      for (let key in payload.newInfo) {
        if (payload.newInfo.hasOwnProperty(key)) {
          newState.adminList[index][key] = payload.newInfo[key];
        }
      }
      return newState;
    },
    //添加新管理员
    addNewAdmin(state, { payload }) {
      const newState = { ...state };
      const newArr = [...newState.adminList];
      newArr.push(payload);
      newState.adminList = newArr;
      // console.log(newState)
      return newState;
    },
  },
  effects: {
    //初始化管理员列表
    *_initAdminList(_, { put, call }) {
      //请求远程数据
      const { data } = yield call(getAdmins);
      // console.log(data)
      //更新本地仓库
      yield put({
        type: 'initAdminList',
        payload: data,
      });
    },
    //删除管理员
    *_deleteAdmin({ payload }, { put, call }) {
      // console.log(payload)
      yield call(deleteAdiminById, payload._id);
      yield put({
        type: 'deleteAdiminById',
        payload,
      });
    },
    //更改管理员信息
    *_editAdmin({ payload }, { put, call }) {
      yield call(updateAdminInfo, payload.id, payload.newInfo);
      yield put({
        type: 'editAdmin',
        payload,
      });
    },
    //添加新管理员
    *_addAdmin({ payload }, { put, call }) {
      const { data } = yield call(addAdmin, payload);
      // console.log(data)
      yield put({
        type: 'addNewAdmin',
        payload: data,
      });
    },
  },
};
