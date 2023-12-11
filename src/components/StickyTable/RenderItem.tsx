import { isNil, sortBy } from 'lodash';
import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  Text,
  View,
  type NativeSyntheticEvent,
  type TextLayoutEventData,
} from 'react-native';
import { AppConst } from '../../constants';
import styles, { getDynamicWidth, getWidth } from './styles';
import type { RenderItemProps, WidthType } from './types';

/**
 * This component is used to render the item of the table
 * @param {RenderItemProps} props
 * @returns {React.FC<RenderItemProps>}
 */
const RenderItem = ({
  item,
  index,
  defaultMaxWidth,
  renderItemContainerStyle,
  renderItemContainerProps,
  separatorViewStyle,
  separatorViewProps,
  columnTitleStyle,
  columnItemStyle,
  columnCommonItemStyle,
  columnItemContainerProps,
  columnItemTextStyle,
  columnItemTextProps,
}: RenderItemProps) => {
  const [maxWidths, setMaxWidths] = useState<Array<WidthType>>([]);

  /**
   * Get the max width of the text
   */
  const width: number = useMemo(() => {
    return maxWidths
      ? sortBy(maxWidths, 'width')[maxWidths?.length - 1]?.width
      : 0;
  }, [maxWidths]);

  /**
   * Calculate the width of the text and set it to the maxWidths array
   */
  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>, innerIndex: number) => {
      setMaxWidths(
        Array.from(
          new Map(
            [
              ...maxWidths,
              {
                width:
                  e.nativeEvent.lines[0].width + AppConst.paddingHorizontal, // 32 is the padding of the text which is 16 on each side
                index: index,
                innerIndex: innerIndex,
              },
            ].map(widths => [widths.innerIndex, widths])
          ).values()
        )
      );
    },
    [index, maxWidths]
  );

  return (
    <View
      style={[
        getDynamicWidth(maxWidths, width),
        !isNil(defaultMaxWidth) && getWidth(defaultMaxWidth),
        renderItemContainerStyle,
      ]}
      {...renderItemContainerProps}>
      {item ? (
        item?.data?.map((innerItem: string, innerIndex: number) => {
          return (
            <>
              <View
                key={`${innerItem}-${innerIndex}`}
                {...columnItemContainerProps}
                style={[
                  innerIndex === 0
                    ? styles.tableRowTitleView
                    : styles.tableRowItemText,
                  styles.tableRowView,
                  innerIndex === 0 ? columnTitleStyle : columnItemStyle,
                  columnCommonItemStyle,
                  !isNil(defaultMaxWidth) && getWidth(defaultMaxWidth),
                ]}>
                <Text
                  numberOfLines={1}
                  style={[
                    columnItemTextStyle,
                    !isNil(defaultMaxWidth) &&
                      getWidth(defaultMaxWidth, AppConst.paddingHorizontal), // 32 is the padding of the text which is 16 on each side
                  ]}
                  {...columnItemTextProps}
                  onTextLayout={(
                    e: NativeSyntheticEvent<TextLayoutEventData>
                  ) => {
                    onTextLayout(e, innerIndex);
                  }}>
                  {innerItem}
                </Text>
              </View>
              <View
                style={[styles.separatorView, separatorViewStyle]}
                {...separatorViewProps}
              />
            </>
          );
        })
      ) : (
        <></>
      )}
    </View>
  );
};

export default memo(RenderItem);
