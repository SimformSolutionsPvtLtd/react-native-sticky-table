import { StyleSheet } from 'react-native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
  Colors,
} from '../../theme';
import type { WidthType } from './StickyTableTypes';
import type { SharedValue } from 'react-native-reanimated';

/**
 * @param maxWidth - The max width of the table.
 * @returns - A StyleSheet object containing the width of the table.
 */
export const setWidthStyle = (maxWidth: number) => {
  return {
    paddingLeft: horizontalScale(16),
    paddingRight: horizontalScale(8),
    maxWidth: horizontalScale(maxWidth),
    flexDirection: 'row',
    width: horizontalScale(maxWidth),
  };
};

/**
 * @param shouldRemove - Whether or not to remove the flex property.
 * @param flexValue - The flex value.
 * @returns - A StyleSheet object containing the flex property.
 */
export const getRestSentenceStyle = (
  shouldRemove: boolean,
  flexValue: SharedValue<number>
) => {
  return {
    maxWidth: horizontalScale(80),
    flex: shouldRemove ? flexValue.value : 1,
  };
};

/**
 * @param maxWidths - The max widths of the table.
 * @param width - The width of the table.
 * @returns - A StyleSheet object containing the width of the table.
 */
export const getDynamicWidth = (maxWidths: Array<WidthType>, width: number) => {
  return {
    width: maxWidths ? width : 0,
  };
};

/**
 * @param defaultMaxWidth - The default max width of the table.
 * @returns - A StyleSheet object containing the width of the table.
 */
export const getWidth = (defaultMaxWidth: number, removeValue: number = 0) => {
  return { maxWidth: horizontalScale(defaultMaxWidth - removeValue) };
};

/**
 * A StyleSheet object that contains all of the home screen styles.
 * @param {ThemeMode} theme - The theme to use for the styles.
 * @returns {StyleSheet} A StyleSheet object containing all of the home screen styles.
 */
const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  separatorContainer: { backgroundColor: Colors.cream },
  separatorView: {
    backgroundColor: Colors.lightGray,
    height: verticalScale(2),
  },
  tableRowItemText: {
    paddingVertical: verticalScale(22),
  },
  tableRowTitleView: {
    paddingVertical: verticalScale(14),
  },
  tableRowView: {
    alignItems: 'center',
  },
  tableRowViewTitle: {
    backgroundColor: Colors.cream,
    paddingVertical: verticalScale(22),
    shadowColor: Colors.black,
    shadowOffset: {
      width: horizontalScale(2),
      height: 0,
    },
    shadowOpacity: moderateScale(0.1),
    shadowRadius: moderateScale(5),
  },
  restSentenceBackgroundColor: {
    backgroundColor: Colors.cream,
  },
  screen: { flex: 1 },
  rowTitleSeparatorView: {
    width: horizontalScale(2),
    backgroundColor: Colors.lightGray,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    shadowColor: Colors.lightGray,
    shadowOffset: {
      width: horizontalScale(10),
      height: 0,
    },
    shadowOpacity: moderateScale(5),
    shadowRadius: moderateScale(10),
    overflow: 'visible',
    elevation: 10,
  },
});

export default styles;
