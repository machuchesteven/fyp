/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  Image,
  Alert, TextInput
} from 'react-native';

import axios from 'axios';
const cover = require('./motorcycle-rider.jpg');
import {
  Colors,
  Header
} from 'react-native/Libraries/NewAppScreen';

function Button({ title, onPress }) {
  return <Pressable style={[styles.solidButton]} onPress={onPress}>
    <View><Text style={[styles.buttonText]}>{title}</Text></View>
  </Pressable>
}






function App() {
  const [imageSet, isImageSet] = useState(false)
  const isDarkMode = useColorScheme() === 'dark';
  const [selectImage, setSelectImage] = useState('');
  const [text, setText] = useState()
  const ImagePicker = () => {
    let options = {
      storageOptions: {
        app: 'image'
      }
    }
    launchImageLibrary(options, response => {
      setSelectImage(response.assets[0].uri)
      isImageSet(true)
      console.log(response.assets[0].uri)
    })
  }
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const takeCameraPhoto = () => {
    let options = {
      saveToPhotos: true,
      crop: false
    }
    launchCamera(options, response => {
      setSelectImage(response.assets[0].uri)
      console.log(response.assets[0].uri)
      isImageSet(true)
    })
  }
  const resetImage = () => {
    setSelectImage('')
    isImageSet(false)
  }
  const submitReport = async (file, description) => {

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', text);

      const response = await axios.post('http://127.0.0.1:5000/process_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
    } catch (error) {
      alert('Failed To Finish Application')
    }
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={{ height: 400, width: '100%' }}>
          {selectImage !== '' ? <Image style={{ height: 400, width: '100%' }} source={{ uri: selectImage }} /> : <Image source={cover} style={[styles.coverImage]} />}
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {!imageSet ? <>
            <Button onPress={() => ImagePicker()} title={"Pick Gallery Image"} />
            <Button onPress={() => takeCameraPhoto()} title={"Capture With Camera"} />

          </> : <>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textInput, { borderColor: Colors.white, fontSize: 16, marginVertical: 10, marginHorizontal: 10, borderWidth: 1, borderRadius: 5, color: Colors.white }]}
                placeholder="Enter Description"
                value={text}
                onChangeText={(inputText) => setText(inputText)}
              />
              <Button title="Submit Report" onPress={submitReport} />
            </View>
            <Button onPress={() => submitReport()} title={"Send Your Report"} />
            <Button style={[styles.buttonDanger]} onPress={() => resetImage()} title={"Reset Image"} />
          </>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  solidButton: {
    paddingHorizontal: 'auto',
    paddingVertical: 12,
    marginVertical: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: 50,
    borderColor: '#222',
    borderWidth: 1,
    borderRadius: 5,
    width: '94%',
    marginHorizontal: '3%',
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',

  },
  coverImage: {
    width: '96%',
    marginHorizontal: '2%',
    height: 350,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonDanger: {
    backgroundColor: 'red',
    fontWeight: 'bold',
    textAlign: 'center'
  }, container: {
    margin: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 5,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default App;
