import { useEffect, useRef, useState } from 'react';
import type Animated from 'react-native-reanimated';
import {
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AppConst } from '../../../constants';
import { globalMetrics } from '../../../theme';
import type {
  StickyTableHookType,
  StickyTableProps,
  TableData,
} from '../StickyTableTypes';

export default function useStickyTable({
  maxWidth = AppConst.maxWidth,
  minWidth = AppConst.minWidth,
}: Pick<StickyTableProps, 'maxWidth' | 'minWidth'>): StickyTableHookType {
  const flatListRef = useRef<Animated.FlatList<TableData>>(null);
  const [scrollOffsetX, setScrollOffsetX] = useState<number>(0);
  const translationX = useSharedValue<number>(0);
  const flexValue = useSharedValue<number>(1);
  const [firstWordWidths, setFirstWordWidths] = useState<number[]>([]);

  useEffect(() => {
    if (scrollOffsetX <= AppConst.autoScrollValue && scrollOffsetX > 0) {
      //@ts-ignore
      flatListRef?.current?.scrollToOffset({ animated: false, offset: 0 });
    } else if (scrollOffsetX > AppConst.autoScrollValue) {
      //@ts-ignore
      flatListRef?.current?.scrollToOffset({
        animated: false,
        offset: maxWidth - minWidth,
      });
    }
  }, [maxWidth, minWidth, scrollOffsetX]);

  /**
   * This style is used to animate the width of the title
   */
  const animatedWidthStyle = useAnimatedStyle(() => {
    const widths = interpolate(
      translationX.value,
      [0, maxWidth - minWidth],
      [maxWidth, minWidth]
    );

    return {
      minWidth: minWidth,
      width:
        widths < 0
          ? minWidth
          : globalMetrics.isAndroid
          ? withTiming(widths, {
              duration: 100,
            })
          : widths,
    };
  });

  /**
   * This style is used to animate of the first title
   */
  const translateFirstTextStyle = useAnimatedStyle(() => {
    const value: number = interpolate(
      translationX.value,
      [0, maxWidth - minWidth],
      [1, 0]
    );
    return {
      opacity: value < 0 ? withTiming(0) : withTiming(value),
      transform: [{ scaleX: value < 0 ? withTiming(0) : withTiming(value) }],
    };
  });

  /**
   * On Animated scroll handler
   * @param event - scroll event
   */
  const onScroll = useAnimatedScrollHandler(
    {
      onScroll: event => {
        flexValue.value = 0;
        translationX.value = event.contentOffset.x;
      },
      onEndDrag: event => {
        if (
          event.contentOffset.x < maxWidth - minWidth &&
          event.contentOffset.x > 0
        ) {
          runOnJS(setScrollOffsetX)(event.contentOffset.x);
        }
        if (event.contentOffset.x <= AppConst.minOffsetThreshold) {
          flexValue.value = 1;
        } else {
          flexValue.value = 0;
        }
      },
      onMomentumEnd: event => {
        if (event.contentOffset.x <= AppConst.minOffsetThreshold) {
          flexValue.value = 1;
        } else {
          flexValue.value = 0;
        }
      },
    },
    []
  );

  return {
    flatListRef,
    onScroll,
    animatedWidthStyle,
    translateFirstTextStyle,
    flexValue,
    setFirstWordWidths,
    firstWordWidths,
    translationX,
  };
}
