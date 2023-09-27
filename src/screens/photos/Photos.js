import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import RNFS from 'react-native-fs';
import GalleryItems from '../../components/GalleryItems';
import {photosStyle} from './photosStyle';
import {useIsFocused} from '@react-navigation/native';

const Photos = () => {
  
  const [parentArray, setParentArray] = useState([]);
  const [render, setRender] = useState(false);
  const isfocused = useIsFocused();

  useEffect(() => {
    const fetchPhotos = async () => {
      const selectedPath =
        '/storage/emulated/0/Android/data/com.galleryapp/files/Pictures';
      try {
        const result = await RNFS.readDir(selectedPath);
        const unqDates = new Set();
        const imageFilesByDate = {};

        result.forEach(item => {
          const date = new Date(item.mtime);
          const monthAbbreviation = months[date.getMonth()];
          const day = date.getDate();
          const year = date.getFullYear();
          const formattedDate = `${monthAbbreviation} ${day} , ${year}`;

          if (!unqDates.has(formattedDate)) {
            unqDates.add(formattedDate);
            imageFilesByDate[formattedDate] = [];
          }
          imageFilesByDate[formattedDate].push(item);
        });


        const sortedDates = Array.from(unqDates).sort(); 
        const updatedParentArray = sortedDates.map(date => ({
          formattedDate: date,
          data: imageFilesByDate[date],
        }));
          

        setParentArray(updatedParentArray);
        setRender(prev => !prev);
      } catch (error) {
        console.error('Error reading directory:', error);
      }
    };

    fetchPhotos();
  }, [isfocused]);

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

  return (
    <View style={photosStyle.mainContainer}>
      <GalleryItems parentArray={parentArray} />
    </View>
  );
};

export default Photos;
