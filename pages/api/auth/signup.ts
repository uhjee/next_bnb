import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import Data from '../../../lib/data';
import { StoredUserType } from '../../../types/user';
import jwt from 'jsonwebtoken';

/**
 * 회원을 추가한다.(회원가입)
 *    1. api method 가 POST 인지 확인
 *    2. req.body에 필요한 파라미터가 들어있는지 확인
 *    3. email duplication check
 *    4. password encode
 *    5. 유저 정보 추가
 *    6. 추가된 유저의 정보와 token 전달
 * @author  uhjee
 * @param   {NextApiRequest}   req  [req description]
 * @param   {NextApiResponse}  res  [res description]
 *
 * @return  {[NextApiResponse]}                [return description]
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // 파라미터 확인
    const { email, firstname, lastname, password, birthday } = req.body;
    if (!email || !firstname || !lastname || !password || !birthday) {
      res.statusCode = 400;
      return res.send('필수 데이터가 없습니다.');
    }

    // email 중복 확인
    const userExist = Data.user.exist({ email });
    if (userExist) {
      res.statusCode = 409;
      res.send('이미 가입된 이메일입니다.');
    }

    // 비밀번호 복호화
    const salt = bcrypt.genSaltSync(10); // hash 해킹 방지 값
    const hashedPassword = bcrypt.hashSync(password, salt);

    // 유저 정보 추가
    const users = Data.user.getList();
    let userId;
    if (users.length === 0) {
      userId = 1;
    } else {
      userId = users[users.length - 1].id + 1;
    }

    const newUser: StoredUserType = {
      id: userId,
      email,
      firstname,
      lastname,
      birthday,
      password: hashedPassword,
      profileImage: '/static/image/user/default_user_profile_image.jpg',
    };

    Data.user.write([...users, newUser]);

    // JWT - cookie 세팅
    const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);

    res.setHeader(
      'Set-Cookie',
      `access_token=${token}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 24 * 3 * 1000, // 3일
      )}; httponly`,
    );

    return res.end();
  }
  res.statusCode = 405;

  return res.end();
};
