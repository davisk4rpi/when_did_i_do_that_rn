export type RootStackParamList = {
  Home: undefined;
  NewTracker: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
