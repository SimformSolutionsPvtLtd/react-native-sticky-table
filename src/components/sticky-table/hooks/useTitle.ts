import { useCallback } from 'react';
import type { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';
import {
  interpolate,
  useAnimatedStyle,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import type { TitleHookType, TitleProps } from '../StickyTableTypes';

export default function useTitle({
  item,
  removeProperty = '',
  translationX,
  index,
  firstWordWidths,
  maxWidth,
  minWidth,
  flexValue,
  setFirstWordWidths,
}: Pick<
  TitleProps,
  | 'item'
  | 'removeProperty'
  | 'translationX'
  | 'index'
  | 'firstWordWidths'
  | 'maxWidth'
  | 'minWidth'
  | 'flexValue'
  | 'setFirstWordWidths'
>): TitleHookType {
  const name: Array<string> = item?.split(' ') ?? [];
  const firstWord: string = name?.[0] ?? '';
  const restSentence: string =
    name?.length > 1 ? item?.substring(item?.indexOf(' ') + 1) ?? '' : '';
  const shouldRemove: boolean =
    firstWord?.toLowerCase()?.includes(removeProperty?.toLowerCase()) &&
    firstWord?.length === removeProperty?.length;

  /**
   * This worklet is used to translate the last word of the title
   */
  const translateWorkLet = (
    translationXValue: SharedValue<number>,
    indexValue: number,
    firstWordWidthsValues: number[],
    maxWidthValue: number,
    minWidthValue: number,
    flaxSharedValue: SharedValue<number>
  ) => {
    'worklet';
    const xValue: number = interpolate(
      translationXValue.value,
      [0, maxWidthValue - minWidthValue],
      [
        0,
        firstWordWidthsValues.length > 0
          ? -firstWordWidthsValues[indexValue - 1]
          : 0,
      ]
    );

    return {
      flex: flaxSharedValue.value,
      transform: [
        {
          translateX:
            xValue < -firstWordWidthsValues[indexValue - 1]
              ? withTiming(-firstWordWidthsValues[indexValue - 1])
              : withTiming(xValue),
        },
      ],
    };
  };

  /**
   * This style is used to animate of the last title
   */
  const translateLastTextStyle = useAnimatedStyle(() => {
    return translateWorkLet(
      translationX,
      index,
      firstWordWidths,
      maxWidth,
      minWidth,
      flexValue
    );
  }, [translationX, index, firstWordWidths, maxWidth, minWidth, flexValue]);

  /**
   * Calculate the width of the first word width and set it to the firstWordWidths array
   */
  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (index !== 0)
        setFirstWordWidths([...firstWordWidths, e.nativeEvent.lines[0].width]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [firstWordWidths, index]
  );

  return {
    firstWord,
    restSentence,
    shouldRemove,
    translateLastTextStyle,
    onTextLayout,
  };
}
