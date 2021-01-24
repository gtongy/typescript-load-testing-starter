import { JSONValue } from 'k6';

export function createRequestConfigWithTag(authToken: JSONValue) {
  return (tag: { [key: string]: string }) => ({
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    tags: Object.assign(
      {},
      {
        name: 'PrivateCrocs',
      },
      tag
    ),
  });
}
