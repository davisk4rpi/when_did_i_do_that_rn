import { StyleSheet } from 'react-native';

export const AppStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  rowAlignItemsCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowFlexEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  flex1: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexNoGrow: {
    flexGrow: 0,
  },
  invisible: {
    opacity: 0,
  },
});
