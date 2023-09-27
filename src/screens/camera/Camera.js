import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"

const Camera = ({navigation}) => {

// Photo

  const selectCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(image => {
      console.log(image);
    });
  };


  // Video

  const selectVideo = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
      width: 300,
      height: 400,
    }).then(image => {
      console.log(image);
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:"black"
      }}>
      <TouchableOpacity
        onPress={selectCamera}
        style={{
          backgroundColor: '#ffa1cf',
          padding: 20,
          alignItems: 'center',
          flexDirection:"row",
          borderRadius: 10,
          marginBottom: 10,
          marginRight: 10,
        }}>
          <AntDesign name="camera" size={20} style={{color:"white"}}/>
        <Text style={{color: 'white', fontSize: 20,marginLeft:10}}>Take Image</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={selectVideo}
        style={{
          backgroundColor: '#ffa1cf',
          padding: 20,
          alignItems: 'center',
          borderRadius: 10,
          marginBottom: 10,
          flexDirection:"row"
        }}>
          <FontAwesome name="video-camera" size={20} style={{color:"white"}}/>
        <Text style={{color: 'white', fontSize: 20,marginLeft:10}}>Take Video</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Camera;
