import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView, ScrollView, StatusBar,
  StyleSheet, Text, useColorScheme, TextInput,
  View, Pressable, PermissionsAndroid, Platform,
  ToastAndroid, Image, TouchableOpacity, TouchableHighlight
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createStackNavigator } from '@react-navigation/stack';


import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { CameraScreen, Camera, CameraType } from 'react-native-camera-kit';

import RNFS from 'react-native-fs';

function CaptureScreen({ route, navigation }: any): JSX.Element {
  navigation = useNavigation();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const takePicture = async () => {
    try {
      const image = await Camera.capture(true);
      setCapturedImage(image);
    } catch (error) {
      console.log('Error takinc picture:', error);
    }
  };

  const handleNext = () => {
    navigation.navigate('ReportScreen', { capturedImage });
  };

  const renderImagePreview = () => {
    if (capturedImage) {
      return <Image source={{ uri: capturedImage }} style={{ flex: 1 }} />;
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraScreen ref={ref => ref?.capture()} />
      <TouchableOpacity onPress={takePicture}>
        <Text>Capture Image</Text>
      </TouchableOpacity>
      {renderImagePreview()}
      <TouchableOpacity onPress={handleNext}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};


const cover = require('./motorcycle-rider.jpg');
type SectionProps = PropsWithChildren<{
  title: string;
  onPress(): void;
}>;
async function hasAndroidPermission() {
  const permission: String = Platform.Version >= 33 ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

async function savePicture() {
  if (Platform.OS === "android" && !(await hasAndroidPermission())) {
    return;
  }

  CameraRoll.save(tag, { type: 'photo', album })
};

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Reporting App needs access to your camera ' +
          'so you can take clear evidence',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '600',
        }}>
        {title}
      </Text>
      <Text
        style={
          {
            marginTop: 8,
            fontSize: 18,
            fontWeight: '400'
          }}>
        {children}
      </Text>
    </View>
  );
}

function ShortToast(title: string, pressed: true): void {
  if (pressed) {
    return (ToastAndroid.show(title, ToastAndroid.SHORT));
  }
  console.log("title not pressed");
}

function Button({ title, onPress }: SectionProps,): JSX.Element {
  return <Pressable style={[styles.solidButton]} onPress={onPress}>
    <View><Text style={[styles.buttonText]}>{title}</Text></View>
  </Pressable>
}


function ReportCameraScreen({ route, navigation }: any): JSX.Element {
  navigation = useNavigation()
  // let { uri } = await this.camera.capture();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const cameraref: any = useRef(null)
  return <SafeAreaView style={{ flex: 1 }}>
    <CameraScreen
      ref={(ref) => this.camera = ref}
      actions={{ leftButtonText: 'Cancel', rightButtonText: 'Capture', leftCaptureRetakeButtonText: 'Abandon' }}
      onBottomButtonPressed={(event: any) => navigation.navigate('report')}

    />

  </SafeAreaView>
}


function ReportScreen({ route, navigation }: any): JSX.Element {
  navigation = useNavigation()
  const [selectedImage, setSelectedImage] = useState('');


  const handleImagePick = async () => {
    try {
      const { edges } = await CameraRoll.getPhotos({ first: 1 });
      if (edges.length > 0) {
        const { node } = edges[0];
        setSelectedImage(node.image.uri);
      }
    } catch (error) {
      console.error('Error picking image from camera roll:', error);
    }
  };
  return <SafeAreaView>
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: "#e0e0e0" }}>
      {selectedImage ?
        <View >

          <Image source={{ uri: selectedImage }} style={{ height: 450, justifyContent: 'center', marginHorizontal: 'auto' }} />
          <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 10, color: 'blue', paddingLeft: 10 }}>
            Etxra Description
          </Text>

        </View> : null}
      <Button title="Take Picture" onPress={handleImagePick} />
    </ScrollView>
  </SafeAreaView >
}

function StartScreen({ route, navigation }: any): JSX.Element {
  navigation = useNavigation()
  return <SafeAreaView>
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Image source={cover} style={[styles.coverImage]} />
      <Button onPress={() => navigation.navigate('report')} title="Login Now" />
      <Button onPress={() => navigation.navigate('send')} title="Send Immediate report" />
      <Pressable style={{ width: '94%', marginHorizontal: '3%' }} onPress={() => navigation.navigate('signup')} >
        <Text style={{ color: 'blue', textAlign: 'center', textDecorationLine: 'underline', paddingBottom: 3, borderColor: 'blue' }}>Sign Up</Text>
      </Pressable>
    </ScrollView>
  </SafeAreaView>
}




const HomeStack = createStackNavigator();

function App(): JSX.Element {
  return <NavigationContainer>
    <HomeStack.Navigator initialRouteName='start'>
      <HomeStack.Screen name='start' component={StartScreen} />
      <HomeStack.Screen name="report" component={ReportScreen} />
      <ReportCameraScreen name="camera" component={ReportCameraScreen} />
    </HomeStack.Navigator>
  </NavigationContainer>
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
  container: {
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
