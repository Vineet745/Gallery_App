import React, {memo} from 'react';
import {View, Modal, Image} from 'react-native';
import VideoPlayer from 'react-native-video-player';

const FullScreenImage = ({toggleModal, visible, imagePath}) => {

  const isVideo = imagePath && typeof imagePath === 'string' && imagePath?.endsWith('.mp4');

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <Modal
        visible={visible}
        onRequestClose={toggleModal}
        style={{backgroundColor: 'black'}}>
        {isVideo ? (
          <VideoPlayer
            thumbnail={{uri:imagePath}}
            video={{uri: imagePath}}
            // control={true}
            videoWidth={900}
            videoHeight={1800}
          />
        ) : (
          <Image
            source={{uri: imagePath}}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        )}
      </Modal>
    </View>
  );
};

export default memo(FullScreenImage);
