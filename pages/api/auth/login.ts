import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';

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
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      return res.send(e);
    }
  }
  res.statusCode = 405;

  return res.end();
};
