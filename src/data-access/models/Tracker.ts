import { Realm } from '@realm/react';

import { Translation } from '../../app-context';
import {
  DuplicateError,
  InputError,
  NotFoundError,
} from '../../libs/utililities';

export class Tracker extends Realm.Object {
  readonly id!: Realm.BSON.ObjectId;
  name!: string;
  status!: TTrackerStatus;
  readonly createdAt!: Date;
  lastUpdatedAt!: Date;
  logs!: Realm.List<TrackerLog>;

  static generate(name: string) {
    const now = new Date();
    return {
      id: new Realm.BSON.ObjectId(),
      name: name.trim(),
      status: 'active',
      createdAt: now,
      lastUpdatedAt: new Date(now),
      logs: [] as TrackerLog[],
    };
  }

  updateName(name: string) {
    this.name = name;
    this.lastUpdatedAt = new Date();
  }

  addLog(trackerLog: TrackerLog) {
    const now = new Date();
    if (trackerLog.dateTime > now) {
      throw new InputError(Translation.errors.dateCannotBeInTheFuture);
    }
    this.insertLog(trackerLog);
    this.lastUpdatedAt = new Date(trackerLog.createdAt);
    return trackerLog;
  }

  updateLog(oldDateTime: Date, newDateTime: Date) {
    const now = new Date();
    if (newDateTime > now) {
      throw new InputError(Translation.errors.dateCannotBeInTheFuture);
    }
    const logIdx = this.findLogIdx(oldDateTime);
    if (logIdx === undefined) {
      throw new NotFoundError(
        Translation.errors.couldNotFindLogFrom(oldDateTime),
      );
    }
    const log = this.logs[logIdx];
    log.lastUpdatedAt = new Date(now);
    log.dateTime = newDateTime;
    log.timestamp = newDateTime.getTime();

    this.logs.splice(logIdx, 1);
    this.insertLog(log);
    this.lastUpdatedAt = now;
    return log;
  }

  private insertLog(log: TrackerLog) {
    const count = this.logs.length;
    if (count === 0) {
      this.logs.push(log);
      return;
    }

    let lowerBound = 0;
    let upperBound = count - 1;

    while (lowerBound !== upperBound) {
      const currentIdx = Math.floor((upperBound + lowerBound) / 2);
      const pointerLog = this.logs[currentIdx];

      if (log.dateTime < pointerLog.dateTime) {
        lowerBound = currentIdx + 1;
      } else if (log.dateTime > pointerLog.dateTime) {
        upperBound = currentIdx === 0 ? 0 : currentIdx - 1;
      } else {
        throw new DuplicateError(
          Translation.errors.aLogAlreadyExistsForThisTime,
        );
      }
    }
    // upperBound === lowerBound === Target Idx
    this.logs.splice(lowerBound, 0, log);
  }

  private findLogIdx(dateTime: Date) {
    let lowerBound = 0;
    let upperBound = this.logs.length - 1;
    while (lowerBound <= upperBound) {
      const currentIdx = Math.floor((upperBound + lowerBound) / 2);
      const pointerLog = this.logs[currentIdx];
      if (dateTime < pointerLog.dateTime) {
        lowerBound = currentIdx + 1;
      } else if (dateTime > pointerLog.dateTime) {
        upperBound = currentIdx - 1;
      } else {
        return currentIdx;
      }
    }
    return undefined;
  }

  static schema = {
    name: 'Tracker',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      name: 'string',
      status: 'string',
      createdAt: 'date',
      lastUpdatedAt: 'date',
      logs: 'TrackerLog[]',
    },
  };
}
export class TrackerLog extends Realm.Object {
  timestamp!: number;
  dateTime!: Date;
  readonly createdAt!: Date;
  lastUpdatedAt!: Date;
  tracker!: Realm.Results<Tracker>;

  static generate(dateTime?: Date) {
    const now = new Date();
    const finalDateTime = dateTime ?? now;
    return {
      timestamp: finalDateTime.getTime(),
      dateTime: finalDateTime,
      createdAt: new Date(now),
      lastUpdatedAt: new Date(now),
    };
  }

  static schema = {
    name: 'TrackerLog',
    primaryKey: 'timestamp',
    properties: {
      timestamp: 'int',
      dateTime: 'date',
      createdAt: 'date',
      lastUpdatedAt: 'date',
      tracker: {
        type: 'linkingObjects',
        objectType: 'Tracker',
        property: 'logs',
      },
    },
  };
}

type TTrackerStatus = 'active' | 'archived' | 'deleted';
