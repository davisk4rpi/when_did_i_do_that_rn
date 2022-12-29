import React from 'react';
import { StyleSheet } from 'react-native';
import { List, ListItemProps } from 'react-native-paper';

export type ListMenuItem<ItemId extends string> = Pick<
  ListItemProps,
  'left' | 'titleStyle'
> & {
  title: string;
  id: ItemId;
};

interface ListMenuProps<ItemId extends string> {
  items: ListMenuItem<ItemId>[];
  onItemPress: (id: ItemId) => void;
}

export const ListMenu = <MenuItem extends string>({
  items,
  onItemPress,
}: ListMenuProps<MenuItem>) => {
  return (
    <List.Section style={styles.container}>
      {items.map(({ id, title, left, titleStyle }) => {
        const handlePress = () => onItemPress(id);
        return (
          <List.Item
            key={id}
            title={title}
            titleStyle={titleStyle}
            left={left}
            onPress={handlePress}
          />
        );
      })}
    </List.Section>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
});
