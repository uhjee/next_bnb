import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Data from '../../../lib/data';
import { StoredUserType } from '../../../types/user';

/**
 * 로그인을 처리한다.
 *    1. api method 가 POST 인지 확인
 *    2. req.body에 필요한 파라미터가 들어있는지 확인
 *    4. password 확인
 *    6. 로그인된 유저의 정보와 token 전달
 * @author  uhjee
 * @param   {NextApiRequest}   req  [req description]
 * @param   {NextApiResponse}  res  [res description]
 *
 * @return  {[NextApiResponse]}                [return description]
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      // parameter validation
      if (!email || !password) {
        res.statusCode = 400;
        return res.send('필수 데이터가 없습니다.');
      }

      // email을 가진 user 찾기
      const user = Data.user.find({ email });
      if (!user) {
        res.statusCode = 405;
        return res.send('해당 이메일을 가진 유저가 없습니다.');
      }

      // bcrypt 사용해 비밀번호가 일치하는지 확인 (복호화하지 않은 상태에서 확인)
      const isPasswordMatched = bcrypt.compareSync(password, user.password);
      if (!isPasswordMatched) {
        res.statusCode = 403;
        return res.send('비밀번호가 일치하지 않습니다.');
      }

      // * 비밀번호가 일치하는 경우, password 제거 후, token 전달
      const token = jwt.sign(String(user.id), process.env.JWT_SECRET!);
      res.setHeader(
        'Set-Cookie',
        `access_token=${token}; path=/; expires=${new Date(
          Date.now() + 60 * 60 * 24 * 1000 * 3, // 3일
        )}; httponly`,
      );

      const newUserWithoutPassword: Partial<Pick<StoredUserType, 'password'>> =
        user;

      delete newUserWithoutPassword.password;
      res.statusCode = 200;
      return res.send(user);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      return res.send(e);
    }
  }
  res.statusCode = 405;

  return res.end();
};
