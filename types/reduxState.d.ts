import { UserType } from './user';

//*  유저 redux State - Intersection Type 사용 - 두 타입 합치기
export type UserState = UserType & {
  isLogged: boolean;
};
