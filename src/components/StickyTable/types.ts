import type {
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps,
  StyleProp,
  TextLayoutEventData,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';
import type Animated from 'react-native-reanimated';
import type {
  AnimateProps,
  AnimatedStyleProp,
  SharedValue,
} from 'react-native-reanimated';

/**
 * @typedef {object} WidthType
 * @property {number} width - width of the column
 * @property {number} index - index of the column
 * @property {number} innerIndex - index of the column in the row
 */
export interface WidthType {
  width: number;
  index: number;
  innerIndex: number;
}

/**
 * @typedef {object} RenderItemProps
 * @property {TableData} item - data of the column
 * @property {number} index - index of the column
 * @property {number} defaultMaxWidth - default max width of the column
 * @property {StyleProp<ViewStyle>} renderItemContainerStyle - style of the column container
 * @property {ViewProps} renderItemContainerProps - props of the column container
 * @property {StyleProp<ViewStyle>} separatorViewStyle - style of the separator
 * @property {ViewProps} separatorViewProps - props of the separator
 * @property {StyleProp<ViewStyle>} columnTitleStyle - style of the column title
 * @property {StyleProp<ViewStyle>} columnItemStyle - style of the column item
 * @property {StyleProp<ViewStyle>} columnCommonItemStyle - style of the column item
 * @property {ViewProps} columnItemContainerProps - props of the column item container
 * @property {StyleProp<TextStyle>} columnItemTextStyle - style of the column item text
 * @property {TextProps} columnItemTextProps - props of the column item text
 */
export interface RenderItemProps {
  item: TableData;
  index: number;
  defaultMaxWidth?: number;
  renderItemContainerStyle?: StyleProp<ViewStyle>;
  renderItemContainerProps?: ViewProps;
  separatorViewStyle?: StyleProp<ViewStyle>;
  separatorViewProps?: ViewProps;
  columnTitleStyle?: StyleProp<ViewStyle>;
  columnItemStyle?: StyleProp<ViewStyle>;
  columnCommonItemStyle?: StyleProp<ViewStyle>;
  columnItemContainerProps?: ViewProps;
  columnItemTextStyle?: StyleProp<TextStyle>;
  columnItemTextProps?: TextProps;
}

/**
 * @typedef {object} TableData
 * @property {Array<string>} data - data of the column
 * @property {number} maxWidth - max width of the column
 */
export interface TableData {
  data: Array<string>;
  maxWidth?: number;
}

/**
 * @typedef {object} StickyTableData
 * @property {Array<string>} titleData - data of the title
 * @property {Array<TableData>} tableData - data of the table
 */
export interface StickyTableData {
  titleData: Array<string>;
  tableData: Array<TableData>;
}

/**
 * @typedef {object} StickyTableProps
 * @property {StickyTableData} data - data of the table
 * @property {number} maxWidth - max width of the table
 * @property {number} minWidth - min width of the table
 * @property {string} removeProperty - property to remove from the data
 * @property {TitleProps} rowTitleProps - props of the row title
 * @property {ScrollViewProps} scrollViewProps - props of the scroll view
 * @property {StyleProp<ViewStyle>} containerStyle - style of the container
 * @property {ViewProps} containerProps - props of the container
 * @property {FlatListProps<TableData>} flatListProps - props of the flat list
 * @property {RenderItemProps} tableItemProps - props of the table item
 */
export interface StickyTableProps {
  data: StickyTableData;
  maxWidth?: number;
  minWidth?: number;
  removeProperty?: string;
  rowTitleProps?: Pick<
    TitleProps,
    | 'firstIndexContainerStyle'
    | 'otherIndexContainerStyle'
    | 'containerStyle'
    | 'containerProps'
    | 'titleBackgroundColor'
    | 'separatorViewStyle'
    | 'firstWordContainerStyle'
    | 'firstWordTextProps'
    | 'lastWordContainerStyle'
    | 'lastWordTextProps'
    | 'removeProperty'
    | 'rowTitleSeparatorViewStyle'
    | 'rowTitleSeparatorViewProps'
  >;
  scrollViewProps?: ScrollViewProps;
  containerStyle?: StyleProp<ViewStyle>;
  containerProps?: ViewProps;
  flatListProps?: FlatListProps<TableData>;
  tableItemProps?: Pick<
    RenderItemProps,
    | 'renderItemContainerStyle'
    | 'renderItemContainerProps'
    | 'separatorViewStyle'
    | 'separatorViewProps'
    | 'columnTitleStyle'
    | 'columnItemStyle'
    | 'columnCommonItemStyle'
    | 'columnItemContainerProps'
    | 'columnItemTextStyle'
    | 'columnItemTextProps'
  >;
}

/**
 * @typedef {object} TitleProps
 * @property {string} item - data of the title
 * @property {number} index - index of the title
 * @property {object} animatedWidthStyle - style of the title
 * @property {object} translateFirstTextStyle - style of the first word of the title
 * @property {React.Dispatch<React.SetStateAction<number[]>>} setFirstWordWidths - set first word widths
 * @property {number[]} firstWordWidths - first word widths
 * @property {number} maxWidth - max width of the title
 * @property {number} minWidth - min width of the title
 * @property {SharedValue<number>} translationX - translation x of the title
 * @property {SharedValue<number>} flaxValue - flex value of the title
 * @property {string} removeProperty - property to remove from the data
 * @property {string} titleBackgroundColor - background color of the title
 * @property {AnimatedStyleProp<ViewStyle>} firstIndexContainerStyle - style of the first index container
 * @property {AnimatedStyleProp<ViewStyle>} containerStyle - style of the container
 * @property {AnimatedStyleProp<ViewStyle>} otherIndexContainerStyle - style of the other index container
 * @property {AnimateProps<ViewProps>} containerProps - props of the container
 * @property {StyleProp<ViewStyle>} separatorViewStyle - style of the separator
 * @property {AnimatedStyleProp<ViewStyle>} firstWordContainerStyle - style of the first word container
 * @property {AnimateProps<TextProps>} firstWordTextProps - props of the first word text
 * @property {AnimatedStyleProp<ViewStyle>} lastWordContainerStyle - style of the last word container
 * @property {AnimateProps<TextProps>} lastWordTextProps - props of the last word text
 * @property {AnimateProps<ViewProps>} firstWordContainerProps - props of the first word container
 * @property {AnimateProps<ViewProps>} lastWordContainerProps - props of the last word container
 * @property {StyleProp<ViewStyle>} rowTitleSeparatorViewStyle - style of the row title separator
 * @property {ViewProps} rowTitleSeparatorViewProps - props of the row title separator
 */
export interface TitleProps {
  item: string;
  index: number;
  animatedWidthStyle: object;
  translateFirstTextStyle: object;
  setFirstWordWidths: React.Dispatch<React.SetStateAction<number[]>>;
  firstWordWidths: number[];
  maxWidth: number;
  minWidth: number;
  translationX: SharedValue<number>;
  flaxValue: SharedValue<number>;
  removeProperty?: string;
  titleBackgroundColor?: string;
  firstIndexContainerStyle?: AnimatedStyleProp<ViewStyle>;
  containerStyle?: AnimatedStyleProp<ViewStyle>;
  otherIndexContainerStyle?: AnimatedStyleProp<ViewStyle>;
  containerProps?: AnimateProps<ViewProps>;
  separatorViewStyle?: StyleProp<ViewStyle>;
  firstWordContainerStyle?: AnimatedStyleProp<ViewStyle>;
  firstWordTextProps?: AnimateProps<TextProps>;
  lastWordContainerStyle?: AnimatedStyleProp<ViewStyle>;
  lastWordTextProps?: AnimateProps<TextProps>;
  firstWordContainerProps?: AnimateProps<ViewProps>;
  lastWordContainerProps?: AnimateProps<ViewProps>;
  rowTitleSeparatorViewStyle?: StyleProp<ViewStyle>;
  rowTitleSeparatorViewProps?: ViewProps;
}

/**
 * @typedef {object} StickyTableHookType
 * @property {React.MutableRefObject<Animated.FlatList<TableData> | null>} flatListRef - ref of the flat list
 * @property {(event: NativeSyntheticEvent<NativeScrollEvent>) => void} onScroll - on scroll event
 * @property {AnimatedStyleProp<ViewStyle>} animatedWidthStyle - style of the title
 * @property {AnimatedStyleProp<ViewStyle>} translateFirstTextStyle - style of the first word of the title
 * @property {SharedValue<number>} flaxValue - flex value of the title
 * @property {React.Dispatch<React.SetStateAction<number[]>>} setFirstWordWidths - set first word widths
 * @property {number[]} firstWordWidths - first word widths
 * @property {SharedValue<number>} translationX - translation x of the title
 */
export interface StickyTableHookType {
  flatListRef: React.MutableRefObject<Animated.FlatList<TableData> | null>;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  animatedWidthStyle: AnimatedStyleProp<ViewStyle>;
  translateFirstTextStyle: AnimatedStyleProp<ViewStyle>;
  flaxValue: SharedValue<number>;
  setFirstWordWidths: React.Dispatch<React.SetStateAction<number[]>>;
  firstWordWidths: number[];
  translationX: SharedValue<number>;
}

/**
 * @typedef {object} TitleHookType
 * @property {string} firstName - first name of the title
 * @property {string} lastName - last name of the title
 * @property {boolean} shouldRemove - should remove the title
 * @property {AnimatedStyleProp<TextStyle>} translateLastTextStyle - style of the last word of the title
 * @property {(event: NativeSyntheticEvent<TextLayoutEventData>) => void} onTextLayout - on text layout event
 */
export interface TitleHookType {
  firstName: string;
  lastName: string;
  shouldRemove: boolean;
  translateLastTextStyle: AnimatedStyleProp<TextStyle>;
  onTextLayout: (event: NativeSyntheticEvent<TextLayoutEventData>) => void;
}
