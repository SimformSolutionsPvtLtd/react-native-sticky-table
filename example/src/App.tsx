import React from 'react';
import { SafeAreaView } from 'react-native';
import { StickyTable } from 'react-native-sticky-table';
import { Colors } from './theme';
import { data } from './constants';
import styles from './AppStyle';

const App = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <StickyTable
        data={data}
        rowTitleProps={{
          removeProperty: 'The',
          titleBackgroundColor: Colors.white,
        }}
      />
    </SafeAreaView>
  );
};

export default App;
