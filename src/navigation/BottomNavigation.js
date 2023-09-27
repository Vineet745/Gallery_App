import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Camera from '../screens/camera/Camera';
import Photos from '../screens/photos/Photos';
import Foundation from 'react-native-vector-icons/Foundation';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: () => {
            let iconName;
            if (route.name === 'Photos') {
              iconName = 'photo';
            } else if (route.name === 'Camera') {
              iconName = 'camera';
            }

            return <Foundation name={iconName} size={30} color={'white'} />;
          },
          tabBarStyle: {
            backgroundColor: 'black',
            height: 58,
            paddingBottom: 5,
            borderTopWidth:0
          },
          tabBarLabelStyle: {
            color: 'white',
            fontWeight: '500',
            fontSize: 13,
          },
          headerShown: false,
        })}>
        <Tab.Screen name="Photos" component={Photos} />
        <Tab.Screen name="Camera" component={Camera} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigation;
