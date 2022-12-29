import { createRealmContext } from '@realm/react';

import { Tracker, TrackerLog } from './Tracker';

export { Tracker, TrackerLog };

export const RealmContext = createRealmContext({
  schema: [Tracker, TrackerLog],
  schemaVersion: 1,
});

export const {
  useRealm,
  useQuery: useRealmQuery,
  useObject: useRealmObject,
} = RealmContext;
