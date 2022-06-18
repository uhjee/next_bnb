import { HYDRATE, createWrapper, MakeStore } from 'next-redux-wrapper';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './user';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';
import common from './common';

const rootReducer = combineReducers({
  common: common.reducer,
  user: user.reducer,
});

// * Store의 타입
export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
  // Hydrate: 서버에서 생성된 리덕스 스토어를 클라이언트에서 사용할 수 있도록 전달
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return state;
  }
  return rootReducer(state, action);
};

// 타입 지원하는 useSelector로 커스텀 하기
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore<any> = () => {
  // configureStore 로 store 설정
  const store = configureStore({
    reducer,
    devTools: true,
  });

  initialRootState = store.getState();
  return store;
};

export const wrapper = createWrapper(initStore);
