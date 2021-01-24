import { User } from '../lib/types/user';

export function randomString(length: number): string {
  const charset = 'abcdefghijklmnopqrstuvwxyz';
  let res = '';
  while (length--) res += charset[(Math.random() * charset.length) | 0];
  return res;
}

export function randomCrocodile() {
  return {
    name: `Name ${randomString(10)}`,
    sex: 'M',
    date_of_birth: '2001-01-01',
  };
}

export function randomUser(): User {
  return {
    first_name: randomString(10),
    last_name: randomString(10),
    username: randomString(10),
    password: randomString(8),
  };
}
