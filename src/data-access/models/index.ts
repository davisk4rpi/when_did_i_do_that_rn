import { createRealmContext } from '@realm/react';

import { Tracker, TrackerInstance } from './Tracker';

export { Tracker, TrackerInstance };

export const RealmContext = createRealmContext({
  schema: [Tracker, TrackerInstance],
  schemaVersion: 2,
});

export const {
  useRealm,
  useQuery: useRealmQuery,
  useObject: useRealmObject,
} = RealmContext;
