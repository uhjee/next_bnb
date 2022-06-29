import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // * 로그아웃 하기
    if (req.method === 'DELETE') {
      // 쿠키 삭제
      res.setHeader(
        'Set-Cookie',
        'access_token=; path=/; expires:Thu, 01 Jan 1970 00:00:00 GMT; httponly',
      );
      res.statusCode = 204; // No Content
      return res.end();
    }
  } catch (e) {
    console.log(e);
    return res.send(e);
  }
  res.statusCode = 405;
  return res.end();
};
