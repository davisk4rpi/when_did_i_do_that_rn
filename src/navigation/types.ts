export type RootStackParamList = {
  Home: undefined;
  NewTracker: undefined;
  Tracker: {
    id: string;
    name: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
