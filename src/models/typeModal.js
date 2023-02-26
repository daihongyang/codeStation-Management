import { deleteTypeById, getTypes, addType, updateTypeById } from "../services/type"
export default {
    namespace: 'type',
    state: {
        typeList: []
    },
    reducers: {
        //初始化类型数组
        initTypeList(state, { payload }) {
            const newState = { ...state }
            newState.typeList = payload
            return newState
        },
        deleteTypeById(state, { payload }) {
            const newState = { ...state }
            const index = newState.typeList.indexOf(payload)
            const arr = [...newState.typeList]
            if (index !== -1) {
                arr.splice(index, 1)
            }
            newState.typeList = arr
            return newState
        },
        addType(state, { payload }) {
            const newState = { ...state }
            const arr = [...state.typeList]
            arr.push(payload)
            newState.typeList = arr
            return newState
        },
        updateType(state, { payload }) {
            // console.log(payload.id)
            const newState = { ...state }
            const arr = [...state.typeList]
            const index = arr.findIndex(item=>{
                return item._id === payload.id
            })
            for(let key in payload.data){
                if(payload.data.hasOwnProperty(key)){
                    arr[index][key] = payload.data[key]
                }
            }
            newState.typeList = arr
            // console.log(arr)
            return newState
        }
    },
    effects: {
        *_initTypeList(_, { put, call }) {
            const { data } = yield call(getTypes)
            // console.log(data)
            yield put({
                type: 'initTypeList',
                payload: data
            })
        },
        *_deleteType({ payload }, { put, call }) {
            yield call(deleteTypeById, payload._id)
            yield put({
                type: 'deleteTypeById',
                payload
            })
        },
        *_addType({ payload }, { put, call }) {
            const { data } = yield call(addType, payload)
            // console.log(data)
            yield put({
                type: 'addType',
                payload: data
            })
        },
        *_updateType({ payload }, { put, call }) {
            yield call(updateTypeById, payload.id, payload.data)
            // console.log(data)
            //更改仓库数据
            yield put({
                type: 'updateType',
                payload: {
                    id: payload.id,
                    data:{
                        typeName:payload.data.typeName
                    }
                }
            })
        },
    }
}