import 'react-native-gesture-handler';
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView, ScrollView, StatusBar,
  StyleSheet, Text, useColorScheme,
  View, Pressable, PermissionsAndroid, Platform,
  ToastAndroid, Image
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
const cover = require('./motorcycle-rider.jpg');
type SectionProps = PropsWithChildren<{
  title: string;
  onPress(): void;
}>;

async function hasAndroidPermission() {
  const permission:String = Platform.Version >= 33 ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

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

  CameraRoll.save(tag, { type:'photo', album })
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


function StartScreen({ route, navigation }: any): JSX.Element {
  navigation = useNavigation()
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <Button title='Report A Case' onPress={requestCameraPermission} />
        <Pressable onPress={() => navigation.navigate('report')} style={[styles.solidButton,]}>
          <View >
            <Text style={[styles.buttonText]}>
              Request Camera Demo
            </Text>
          </View>
        </Pressable>
        <Button onPress={requestCameraPermission} title='Request camera' />
        <Button onPress={() => { CameraRoll.getAlbums() }} title='Get Albums' />
        <Button onPress={hasAndroidPermission} title='See permissions camera roll' />
      </ScrollView>
    </SafeAreaView>
  );
}
function ReportScreen({ route, navigation }: any): JSX.Element {
  navigation = useNavigation()
  return <SafeAreaView>
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Button onPress={() => navigation.navigate('login')} title="Login" />
    </ScrollView>
  </SafeAreaView>
}

function LoginScreen({ route, navigation }: any): JSX.Element {
  navigation = useNavigation()
  return <SafeAreaView>
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Image source={cover} style={[styles.coverImage]} />
      <Button onPress={() => navigation.navigate('start')} title="Go To Start" />
    </ScrollView>
  </SafeAreaView>
}


const HomeStack = createStackNavigator();




function App(): JSX.Element {
  return <NavigationContainer>
    <HomeStack.Navigator initialRouteName='start'>
      <HomeStack.Screen name='start' component={StartScreen} />
      <HomeStack.Screen name="report" component={ReportScreen} />
      <HomeStack.Screen name="login" component={LoginScreen} />
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
    color: 'black'
  },
  coverImage: {
    width: '96%',
    marginHorizontal: '2%',
    height: 350,
    marginBottom: 10,
    borderRadius: 5,

  }
});

export default App;
