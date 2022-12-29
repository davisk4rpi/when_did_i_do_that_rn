import React, { useCallback, useMemo } from 'react';
import { List } from 'react-native-paper';

import { useTheme } from '../../../app-context';
import { ListMenu, ListMenuItem } from '../../../components';

type TrackerMenuProps = {
  onEditPress: () => void;
  onDeletePress: () => void;
};
type TrackerMenuItemId = 'edit' | 'delete';

export const TrackerMenu = ({
  onDeletePress,
  onEditPress,
}: TrackerMenuProps) => {
  const { colors } = useTheme();
  const trackerMenuItems: ListMenuItem<TrackerMenuItemId>[] = useMemo(
    () => [
      {
        id: 'edit',
        title: 'Edit Name',
        left: ({ color, style }) => (
          <List.Icon icon="pencil" color={color} style={style} />
        ),
      },
      {
        id: 'delete',
        title: 'Delete',
        left: ({ style }) => (
          <List.Icon icon="delete" color={colors.error} style={style} />
        ),
        titleStyle: { color: colors.error },
      },
    ],
    [colors],
  );

  const handleItemPress = useCallback(
    (id: TrackerMenuItemId) => {
      if (id === 'edit') {
        onEditPress();
      } else if (id === 'delete') {
        onDeletePress();
      }
    },
    [onDeletePress, onEditPress],
  );

  return <ListMenu items={trackerMenuItems} onItemPress={handleItemPress} />;
};
