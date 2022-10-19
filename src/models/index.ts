import { createRealmContext } from '@realm/react';

import { Tracker, TrackerInstance } from './Tracker';

export { Tracker, TrackerInstance };

export const RealmContext = createRealmContext({
  schema: [Tracker, TrackerInstance],
});

export const {
  useRealm,
  useQuery: useRealmQuery,
  useObject: useRealmObject,
} = RealmContext;
