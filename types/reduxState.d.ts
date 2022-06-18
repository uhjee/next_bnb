import { UserType } from './user';

//*  유저 redux State - Intersection Type 사용 - 두 타입 합치기
export type UserState = UserType & {
  isLogged: boolean;
};

// * 공통 redux state
export type CommonState = {
  validateMode: boolean; // 화면에 유효성 검사 결과를 띄울지 여부
};
