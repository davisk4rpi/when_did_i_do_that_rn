import { Realm } from '@realm/react';

export class Habit extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  status!: THabitStatus;
  createdAt!: Date;
  habitInstances!: HabitInstance[];

  static generate(name: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      name,
      status: 'active',
      createdAt: new Date(),
      habitInstances: [],
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Habit',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      status: 'string',
      createdAt: 'date',
      habitInstances: 'HabitInstance[]',
    },
  };
}

export class HabitInstance extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  dateTime!: Date;

  static generate(dateTime?: Date) {
    return {
      _id: new Realm.BSON.ObjectId(),
      dateTime: dateTime ?? new Date(),
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'HabitInstance',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      dateTime: 'date',
    },
  };
}

type THabitStatus = 'active' | 'archived' | 'deleted';
