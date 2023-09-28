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
import AntDesign from 'react-native-vector-icons/AntDesign';

const GalleryItems = ({parentArray}) => {
  const [imagePath, setImagePath] = useState();
  const [visible, setVisible] = useState(false);

  const toggleModal = useCallback(
    item => {
      console.log(item);
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
                <TouchableOpacity
                  onPress={() => toggleModal(item.node.image.uri)}>
                  <View style={styles.item}>
                    {item.node.image.uri.includes('.mp4') ? (
                      <AntDesign
                        name="caretright"
                        size={20}
                        style={{color: 'white', alignSelf: 'center'}}
                      />
                    ) : (
                      <Image
                        source={{uri: item.node.image.uri}}
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
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'grey',
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
