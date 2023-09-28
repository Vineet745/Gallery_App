import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import RNFS from 'react-native-fs';
import GalleryItems from '../../components/GalleryItems';
import {photosStyle} from './photosStyle';
import {useIsFocused} from '@react-navigation/native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useSelector} from 'react-redux';
import {isPermission} from '../../permission';
const Photos = () => {
  const [parentArray, setParentArray] = useState([]);
  const [render, setRender] = useState(false);
  const {check} = useSelector(state => state.check);
  const isfocused = useIsFocused();
  const padToTwo = number => (number < 10 ? `0${number}` : `${number}`);

  useEffect(() => {
    getGalleryImages();
  }, [check, isfocused]);

  const getGalleryImages = () => {
    const unqDates = new Set();
    const imageFilesByDate = {};
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    CameraRoll.getPhotos({
      first: 60,
      assetType: 'All',
    })
      .then(response => {
        const edges = response.edges;
        edges.forEach(item => {
          const date = new Date(item.node.timestamp * 1000);
          const monthAbbreviation = months[date.getMonth()];
          const day = date.getDate();
          const year = date.getFullYear();
          const formattedDate = `${monthAbbreviation} ${padToTwo(
            day,
          )}, ${year}`;

          if (!unqDates.has(formattedDate)) {
            unqDates.add(formattedDate);
            imageFilesByDate[formattedDate] = [];
          }
          imageFilesByDate[formattedDate].push(item);
        });

        const sortedDates = Array.from(unqDates).sort();
        console.log('sortedDates', sortedDates);
        const updatedParentArray = sortedDates.map(date => ({
          formattedDate: date,
          data: imageFilesByDate[date],
        }));

        setParentArray(updatedParentArray);
        setRender(prev => !prev);
      })
      .catch(error => {
        console.error('Error getting gallery images:', error);
      });
  };

  return (
    <View style={photosStyle.mainContainer}>
      <GalleryItems parentArray={parentArray} />
    </View>
  );
};

export default Photos;
