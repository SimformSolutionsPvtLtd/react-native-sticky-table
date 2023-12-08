import { isEmpty } from 'lodash';
import React from 'react';
import {
  View,
  type NativeSyntheticEvent,
  type TextLayoutEventData,
} from 'react-native';
import Animated from 'react-native-reanimated';
import useTitle from './hooks/useTitle';
import styles, { getLastNameStyle, setWidthStyle } from './styles';
import type { TitleHookType, TitleProps } from './types';

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
  flaxValue,
  removeProperty = '',
  titleBackgroundColor,
  firstIndexContainerStyle,
  containerStyle,
  otherIndexContainerStyle,
  containerProps,
  separatorViewStyle,
  firstWordContainerStyle,
  firstWordTextProps,
  lastWordContainerStyle,
  lastWordTextProps,
  firstWordContainerProps,
  lastWordContainerProps,
  rowTitleSeparatorViewStyle,
  rowTitleSeparatorViewProps,
}: TitleProps) => {
  const {
    firstName,
    lastName,
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
    flaxValue,
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
            {`${firstName} `}
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={[
            shouldRemove ? translateLastTextStyle : {},
            index !== 0 && styles.lastNameBackgroundColor,
            getLastNameStyle(shouldRemove, flaxValue),
            !isEmpty(titleBackgroundColor) && {
              backgroundColor: titleBackgroundColor,
            },
            lastWordContainerStyle,
          ]}
          {...lastWordContainerProps}>
          <Animated.Text
            numberOfLines={1}
            ellipsizeMode="tail"
            {...lastWordTextProps}>
            {lastName}
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
