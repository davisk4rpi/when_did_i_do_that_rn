import { Realm } from '@realm/react';

export class Tracker extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  status!: TTrackerStatus;
  createdAt!: Date;
  trackerInstances!: Realm.List<TrackerInstance>;
  mostRecentTrackerInstance?: TrackerInstance;

  static generate(name: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      name,
      status: 'active',
      createdAt: new Date(),
      trackerInstances: [] as TrackerInstance[],
      mostRecentTrackerInstance: undefined,
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Tracker',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      status: 'string',
      createdAt: 'date',
      trackerInstances: 'TrackerInstance[]',
      mostRecentTrackerInstance: 'TrackerInstance?',
    },
  };
}

export class TrackerInstance extends Realm.Object {
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
    name: 'TrackerInstance',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      dateTime: 'date',
    },
  };
}

type TTrackerStatus = 'active' | 'archived' | 'deleted';
