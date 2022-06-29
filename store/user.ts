import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types/reduxState';
import { UserType } from '../types/user';

// * 초기 상태값
const initialState: UserState = {
  id: 0,
  email: '',
  lastname: '',
  firstname: '',
  birthday: '',
  isLogged: false,
  profileImage: '',
};

// createSlice 함수 호출 - Action 및 reducer 선언 후 생성해줌 Slice 반환
// Slice 인터페이스는 actions, reducer, getInitailState 등을 속성으로 갖는다.
const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // * 로그인한 유저 변경하기
    // payload를 갖는 Action 타입 - generic으로 payload 타입 지정
    setLoggedUser(state, action: PayloadAction<UserType>) {
      state = { ...action.payload, isLogged: true };
      return state;
    },
    // * redux user 초기화하기
    initUser(state) {
      state = initialState;
      return state;
    },
  },
});

export const userActions = { ...user.actions };

export default user;
