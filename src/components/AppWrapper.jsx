import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
// import theme from '../../theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

type Props = {
  children: React.ReactNode,
};

export default function AppWrapper(props: Props) {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <NativeBaseProvider>{props.children}</NativeBaseProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
