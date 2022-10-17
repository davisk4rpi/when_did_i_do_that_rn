import { createRealmContext } from '@realm/react';
import { Habit, HabitInstance } from './Habit';

export const RealmContext = createRealmContext({
  schema: [Habit, HabitInstance],
});
