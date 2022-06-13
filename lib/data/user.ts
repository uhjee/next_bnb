import { readFileSync, writeFileSync } from 'fs';
import { StoredUserType } from '../../types/user';

/**
 * User fs 함수들
 */

/**
 * 유저 리스트 데이터 불러오기
 *
 * @return  {[StoredUserType[]]}  [return description]
 */
const getList = () => {
  const filePath = 'data/user.json';
  const usersBuffer = readFileSync(filePath);
  const userString = usersBuffer.toString();

  if (!userString) {
    return [];
  }

  const users: StoredUserType[] = JSON.parse(userString);
  return users;
};

/**
 * 특정 email을 가진 유저가 있는지 확인하기
 *
 * @param   {string}  email  [email description]
 *
 * @return  {[boolean]}         [return description]
 */
const exist = ({ email }: { email: string }): boolean => {
  const users = getList();
  return users.some(user => user.email === email);
};

/**
 * 유저 리스트 저장하기
 *
 * @param   {StoredUserType[]}  users  [users description]
 *
 */
const write = async (users: StoredUserType[]) => {
  writeFileSync('data/users.json', JSON.stringify(users));
};

export default {
  getList,
  exist,
  write,
};
