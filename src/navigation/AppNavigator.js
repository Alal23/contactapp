import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ContactMain,
  ContactDetail,
  ContactCreate,
  ContactUpdate,
} from '../contact/screens';
const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="ContactMain" component={ContactMain} />
        <Stack.Screen name="ContactDetail" component={ContactDetail} />
        <Stack.Screen name="ContactCreate" component={ContactCreate} />
        <Stack.Screen name="ContactUpdate" component={ContactUpdate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
