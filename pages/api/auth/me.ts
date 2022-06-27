import { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';
import Data from '../../../lib/data';
import { StoredUserType } from '../../../types/user';
/**
 * [async description]
 *
 * @param   {NextApiRequest}   req  [req description]
 * @param   {NextApiResponse}  res  [res description]
 *
 * @return  {[type]}                [return description]
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const accessToken = req.headers.cookie;
      if (!accessToken) {
        res.statusCode = 400;
        return res.send('access_token이 없습니다.');
      }
      const userId = jwt.verify(accessToken, process.env.JWT_SECRET!);
      // user fs에서 찾아오기
      const user = Data.user.find({ id: Number(userId) });
      if (!user) {
        res.statusCode = 404;
        return res.send('해당 유저가 없습니다.');
      }

      // 비밀번호 삭제
      const newUserWithoutPassword: Partial<Pick<StoredUserType, 'password'>> =
        user;
      delete newUserWithoutPassword.password;
      res.statusCode = 200;
      return res.send(newUserWithoutPassword);
    } catch (e) {
      res.statusCode = 500;
      return res.send(e);
    }
  }
  res.statusCode = 405;
  return res.end();
};
