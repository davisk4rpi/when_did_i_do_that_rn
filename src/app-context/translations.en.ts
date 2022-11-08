// TODO implement i18next and update this const object to comply if necessary.

export const Translation = {
  activityLog: 'Activity Log',
  add: 'Add',
  addANewTracker: 'Add a New Tracker',
  ago: 'ago',
  date: 'Date',
  dismiss: 'Dismiss',
  errors: {
    dateCannotBeInTheFuture: 'Date cannot be in the future!',
    unknownErrorYikes: 'Unknown Error... Yikes :(',
  },
  name: 'Name',
  youHaventLoggedAnythingYet: "You haven't logged anything yet",
  pageXOfY: (x: number, y: number) => `page ${x} of ${y}`,
  perPage: 'per page',
  sorryCouldntFindThat: (thing: string) =>
    `Sorry, couldn't find that ${thing}.`,
  tapIconToRecordActivity: 'Tap icon to record first activity',
  tracker: 'Tracker',
  trackerNamePlaceholder: 'ex: Slept for 7+ hours',
  view: 'View',
  xAlreadyExists: (x?: string) =>
    x === undefined ? 'Already exists' : `${x} already exists`,
  whenDidIDoThat: 'When did I do that?',
} as const;
