import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import Home from '../screens/Home/Home';
export default function Routes() {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  return (
    <Stack.Navigator initialRouteName="ParentPages">
      <Stack.Screen
        options={{headerShown: false}}
        name="Splash"
        component={Home}
      />
    </Stack.Navigator>
  );
}
