import axios from '.';
import { UserType } from '../../types/user';

/**
 * react 컴포넌트에서 API 호출을 위해 호출하는 함수들
 */

// 회원가입 body
interface SignUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

// 회원가입 API 요청
export const signupAPI = (body: SignUpAPIBody) =>
  axios.post<UserType>('/api/auth/signup', body);

// 로그인 API 요청
export const loginAPI = (body: { email: string; password: string }) =>
  axios.post<UserType>('/api/auth/login', body);

// header.cookie에 token이 있는지 확인 API 요청
export const meAPI = () => axios.get<UserType>('/api/auth/me');
