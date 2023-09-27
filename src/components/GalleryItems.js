import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import FullScreenImage from './FullScreenImage';
import VideoPlayer from 'react-native-video-player';

const GalleryItems = ({parentArray}) => {

  const [imagePath, setImagePath] = useState();
  const [visible, setVisible] = useState(false);

  const toggleModal = useCallback(item => {
      setImagePath(item);
      setVisible(prev => !prev);
    },
    [visible],
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={parentArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View>
            <Text style={styles.header}>{item.formattedDate}</Text>
            <FlatList
              data={item.data}
              keyExtractor={(item, index) => index.toString() + item}
              numColumns={4}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => toggleModal(item.path)}>
                  <View style={styles.item}>
                    {item.path.includes('.mp4') ? (
                      <VideoPlayer
                        video={{uri: item.path}}
                        thumbnail={{uri: `file://${item.path}`}}
                      />
                    ) : (
                      <Image
                        source={{uri: `file://${item.path}`}}
                        style={styles.image}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      />
      <FullScreenImage
        visible={visible}
        toggleModal={toggleModal}
        imagePath={imagePath}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 100,
    width: 100,
    overflow: 'hidden',
    flex: 1,
    marginRight: 2,
    marginBottom: 2,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  header: {
    fontSize: 18,
    color: 'white',
    padding: 10,
  },
});

export default GalleryItems;
