import { isEmpty } from 'lodash';
import React from 'react';
import {
  View,
  type NativeSyntheticEvent,
  type TextLayoutEventData,
} from 'react-native';
import Animated from 'react-native-reanimated';
import useTitle from './hooks/useTitle';
import styles, {
  getRestSentenceStyle,
  setWidthStyle,
} from './StickyTableStyles';
import type { TitleHookType, TitleProps } from './StickyTableTypes';

/**
 * This component is used to render the title of the table
 * @param {TitleProps} props
 * @returns {React.FC<TitleProps>}
 */
const Title = ({
  item,
  index,
  animatedWidthStyle,
  translateFirstTextStyle,
  setFirstWordWidths,
  firstWordWidths,
  maxWidth = 132,
  minWidth = 104,
  translationX,
  flexValue,
  removeProperty = '',
  titleBackgroundColor,
  firstIndexContainerStyle,
  containerStyle,
  otherIndexContainerStyle,
  containerProps,
  separatorViewStyle,
  firstWordContainerStyle,
  firstWordTextProps,
  restSentenceContainerStyle,
  restSentenceTextProps,
  firstWordContainerProps,
  restSentenceContainerProps,
  rowTitleSeparatorViewStyle,
  rowTitleSeparatorViewProps,
}: TitleProps) => {
  const {
    firstWord,
    restSentence,
    shouldRemove,
    translateLastTextStyle,
    onTextLayout,
  }: TitleHookType = useTitle({
    item,
    removeProperty,
    translationX,
    index,
    firstWordWidths,
    maxWidth,
    minWidth,
    flexValue,
    setFirstWordWidths,
  });

  return (
    <>
      <Animated.View
        style={[
          index === 0 ? styles.tableRowTitleView : styles.tableRowViewTitle,
          setWidthStyle(maxWidth),
          animatedWidthStyle,
          !isEmpty(titleBackgroundColor) && {
            backgroundColor: titleBackgroundColor,
          },
          index === 0 ? firstIndexContainerStyle : otherIndexContainerStyle,
          containerStyle,
        ]}
        key={index}
        {...containerProps}>
        <Animated.View
          style={[
            index !== 0 ? shouldRemove && translateFirstTextStyle : {},
            firstWordContainerStyle,
          ]}
          {...firstWordContainerProps}>
          <Animated.Text
            numberOfLines={1}
            {...firstWordTextProps}
            onTextLayout={(e: NativeSyntheticEvent<TextLayoutEventData>) => {
              onTextLayout(e);
            }}>
            {`${firstWord} `}
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={[
            shouldRemove ? translateLastTextStyle : {},
            index !== 0 && styles.restSentenceBackgroundColor,
            getRestSentenceStyle(shouldRemove, flexValue),
            !isEmpty(titleBackgroundColor) && {
              backgroundColor: titleBackgroundColor,
            },
            restSentenceContainerStyle,
          ]}
          {...restSentenceContainerProps}>
          <Animated.Text
            numberOfLines={1}
            ellipsizeMode="tail"
            {...restSentenceTextProps}>
            {restSentence}
          </Animated.Text>
        </Animated.View>
        {index !== 0 && (
          <View
            style={[styles.rowTitleSeparatorView, rowTitleSeparatorViewStyle]}
            {...rowTitleSeparatorViewProps}
          />
        )}
      </Animated.View>
      <View
        style={[
          styles.separatorContainer,
          !isEmpty(titleBackgroundColor) && {
            backgroundColor: titleBackgroundColor,
          },
        ]}>
        <View style={[styles.separatorView, separatorViewStyle]} />
      </View>
    </>
  );
};

export default Title;
