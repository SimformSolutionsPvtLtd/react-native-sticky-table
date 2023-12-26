import React from 'react';
import { ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { AppConst } from '../../constants';
import ListItem from './ListItem';
import Title from './Title';
import { useStickyTable } from './hooks';
import styles from './StickyTableStyles';
import type {
  ListItemProps,
  StickyTableHookType,
  StickyTableProps,
} from './StickyTableTypes';

/**
 * This component is used to render the sticky table
 * @param data - data to render the table
 * @param maxWidth - max width of the title
 * @param minWidth - min width of the title
 * @param removeProperty - property to remove from the title
 * @returns -React Element
 */
const StickyTable = ({
  data,
  maxWidth = AppConst.maxWidth,
  minWidth = AppConst.minWidth,
  rowTitleProps,
  scrollViewProps,
  containerStyle,
  containerProps,
  flatListProps,
  tableItemProps,
}: StickyTableProps) => {
  const {
    flatListRef,
    onScroll,
    animatedWidthStyle,
    translateFirstTextStyle,
    flexValue,
    setFirstWordWidths,
    firstWordWidths,
    translationX,
  }: StickyTableHookType = useStickyTable({ maxWidth, minWidth });

  return (
    <ScrollView style={styles.screen} {...scrollViewProps}>
      <View style={[styles.container, containerStyle]} {...containerProps}>
        <View>
          {data?.titleData?.map((item: string, index: number) => {
            return (
              <Title
                key={`${index}-${item}`}
                {...{
                  item,
                  index,
                  animatedWidthStyle,
                  translateFirstTextStyle,
                  setFirstWordWidths,
                  firstWordWidths,
                  maxWidth,
                  minWidth,
                  translationX,
                  flexValue,
                }}
                {...rowTitleProps}
              />
            );
          })}
        </View>
        <Animated.FlatList
          ref={flatListRef}
          renderItem={({
            item,
            index,
          }: Pick<ListItemProps, 'index' | 'item'>) => {
            return (
              <ListItem
                item={item}
                index={index}
                {...(item?.maxWidth && { defaultMaxWidth: item?.maxWidth })}
                {...tableItemProps}
              />
            );
          }}
          keyExtractor={(_item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          {...flatListProps}
          data={data?.tableData}
          horizontal
          nestedScrollEnabled
          bounces={false}
          overScrollMode={'never'}
          onScroll={onScroll}
        />
      </View>
    </ScrollView>
  );
};

export default StickyTable;
