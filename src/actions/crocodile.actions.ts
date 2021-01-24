import { group, check, fail } from 'k6';
import http from 'k6/http';

import { randomCrocodile } from '../lib/test-data.helpers';
import { setSleep } from '../lib/sleep.helpers';
import { Crocodile } from '../lib/types/crocodile.api';
import { Counter } from 'k6/metrics';

export function createCrocodile(createRequestConfigWithTag: any, url: string, count: Counter): string {
  group('Create Crocodiles', () => {
    const payload: Crocodile = randomCrocodile();
    const res = http.post(url, payload as {}, createRequestConfigWithTag({ name: 'Create' }));
    const crocodile: Crocodile = JSON.parse(res.body as string);
    if (check(res, { 'Crocodile created correctly': (r) => r.status === 201 })) {
      url = `${url}${crocodile.id}/`;
      count.add(1);
    } else {
      fail(`Unable to create a Crocodile ${res.status} ${res.body}`);
    }
    setSleep(0.5, 1);
  });

  return url;
}
