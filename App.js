import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import BottomNavigation from './src/navigation/BottomNavigation';
import {isPermission} from './src/permission';
import { useDispatch } from 'react-redux';
import { setTrue } from './src/redux/slice/checkSlice';

const App = () => {
 const dispatch = useDispatch()
  useEffect(() => {
    isPermission(dispatch);
  }, []);

  return (
    <View style={{flex: 1}}>
      <BottomNavigation />
    </View>
  );
};

export default App;
