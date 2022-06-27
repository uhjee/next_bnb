/**
 * 문자열로 된 cookie를 parsing 한다.
 *
 * @param   {string}  cookieString  [cookieString description]
 *
 * @return  {string}                [return description]
 */
export const cookieStringToObject = (cookieString: string | undefined) => {
  const cookies: { [key: string]: string } = {};
  if (cookieString) {
    //* 'token = value
    const itemString = cookieString?.split(/\s*;\s*/); // \s은 스페이스
    itemString.forEach(pairs => {
      //* [token, value]
      const pair = pairs.split(/\s*=\s*/);
      cookies[pair[0]] = pair.splice(1).join('=');
    });
  }
  return cookies;
};
