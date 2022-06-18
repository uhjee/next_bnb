import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonState } from '../types/reduxState';

// * 초기 상태
const initialState: CommonState = {
  validateMode: false,
};

// createSlice 함수 호출 - Action 및 reducer 선언 후 생성해줌 Slice 반환
// Slice 인터페이스는 actions, reducer, getInitailState 등을 속성으로 갖는다.
const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    // * validateMode 변경하기
    setValidateMode(state, action: PayloadAction<boolean>) {
      state.validateMode = action.payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common;
