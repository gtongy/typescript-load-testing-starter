import { Options } from 'k6/options';
import { group } from 'k6';
import { randomUser } from '../lib/test-data.helpers';
import { setSleep } from '../lib/sleep.helpers';
import { createRequestConfigWithTag } from '../lib/request.helpers';
import * as adminActions from '../actions/roles/admin.role';
import * as ownerActions from '../actions/roles/owner.role';
import { Counter } from 'k6/metrics';

// {@link https://docs.k6.io/docs/options}
export let options: Partial<Options> = {
  stages: [{ target: 5, duration: '15s' }],
  // {@link https://docs.k6.io/docs/thresholds}
  thresholds: {
    http_req_duration: ['avg<1000', 'p(95)<1500'],
  },
};

let numberOfCrocodilesCreated = new Counter('NumberOfCrocodilesCreated');

const BASE_URL = 'https://test-api.loadimpact.com';

// {@link https://k6.io/docs/using-k6/test-life-cycle#setup-and-teardown-stages}
export function setup() {
  const user = randomUser();
  adminActions.signup(user, BASE_URL);
  const authToken = ownerActions.login(user, BASE_URL);
  return authToken;
}

// {@link https://k6.io/docs/using-k6/test-life-cycle#init-and-vu-stages}
export default (authToken: string) => {
  group('Create Crocodile Scenario', () => {
    let URL = `${BASE_URL}/my/crocodiles/`;
    ownerActions.createCrocodile(createRequestConfigWithTag(authToken), URL, numberOfCrocodilesCreated);
  });
  // {@link https://docs.k6.io/docs/sleep-t-1}
  setSleep();
};
