import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';

const Camera = ({navigation}) => {
  // Photo

  const selectCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    })
      .then(image => {
        console.log('Image taken:', image);

        return CameraRoll.save(image.path, {type: 'photo', album: 'Camera'});
      })
      .then(savedImage => {
        console.log('Image saved to Camera Roll:', savedImage);

        // Define the path for the Camera folder
        const cameraFolderPath = RNFS.DocumentDirectoryPath + '/Camera/';

        // Check if the Camera folder exists, if not create it
        return RNFS.exists(cameraFolderPath)
          .then(exists => {
            if (!exists) {
              return RNFS.mkdir(cameraFolderPath);
            }
          })
          .then(() => {
            // Move the image to the Camera folder
            return RNFS.moveFile(
              savedImage,
              `${cameraFolderPath}${savedImage}.jpg`,
            );
          });
      })
      .then(() => {
        console.log('Image moved to Camera folder');
      })
      .catch(error => {
        console.error('Error saving/moving image:');
      });
  };

  // Video

  const selectVideo = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
      width: 300,
      height: 400,
    })
      .then(video => {
        console.log('Video taken:', video);

        // Save the video to the Camera Roll
        return CameraRoll.save(video.path, {type: 'video', album: 'Camera'});
      })
      .then(savedVideo => {
        console.log('Video saved to Camera Roll:', savedVideo);

        // Define the path for the Camera folder
        const cameraFolderPath = RNFS.DocumentDirectoryPath + '/Camera/';

        // Check if the Camera folder exists, if not create it
        return RNFS.exists(cameraFolderPath)
          .then(exists => {
            if (!exists) {
              return RNFS.mkdir(cameraFolderPath);
            }
          })
          .then(() => {
            // Move the video to the Camera folder
            return RNFS.moveFile(
              savedVideo,
              `${cameraFolderPath}${savedVideo}.mp4`,
            );
          });
      })
      .then(() => {
        console.log('Video moved to Camera folder');
      })
      .catch(error => {
        console.error('Error capturing or saving video:', error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'black',
      }}>
      <TouchableOpacity
        onPress={selectCamera}
        style={{
          backgroundColor: '#ffa1cf',
          padding: 20,
          alignItems: 'center',
          flexDirection: 'row',
          borderRadius: 10,
          marginBottom: 10,
          marginRight: 10,
        }}>
        <AntDesign name="camera" size={20} style={{color: 'white'}} />
        <Text style={{color: 'white', fontSize: 20, marginLeft: 10}}>
          Take Image
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={selectVideo}
        style={{
          backgroundColor: '#ffa1cf',
          padding: 20,
          alignItems: 'center',
          borderRadius: 10,
          marginBottom: 10,
          flexDirection: 'row',
        }}>
        <FontAwesome name="video-camera" size={20} style={{color: 'white'}} />
        <Text style={{color: 'white', fontSize: 20, marginLeft: 10}}>
          Take Video
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Camera;
