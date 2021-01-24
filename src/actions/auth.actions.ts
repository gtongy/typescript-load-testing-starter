import http, { RefinedResponse } from 'k6/http';
import { check, group } from 'k6';

import { User } from '../lib/types/user';
import { LoginResponseBody } from '../lib/types/login';
import { setSleep } from '../lib/sleep.helpers';

export function signup(user: User, url: string) {
  group('Register a New User', () => {
    let res = http.post(`${url}/user/register/`, user as {});
    check(res, { 'created user': (r: { status: number }) => r.status === 201 });
  });

  setSleep(0.5, 1);
}

export function login(_user: User, _url: string): string {
  let loginRes: RefinedResponse<'text'> = http.post(`${_url}/auth/token/login/`, {
    username: _user.username,
    password: _user.password,
  });
  const loginData: LoginResponseBody = JSON.parse(loginRes.body);
  let authToken = loginData.access;
  check(authToken, { 'logged in successfully': () => authToken !== '' });
  setSleep(0.5, 1);
  return authToken;
}
