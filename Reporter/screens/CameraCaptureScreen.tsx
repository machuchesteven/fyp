import React, { useRef } from "react";
import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { useCameraDevices, Camera } from "react-native-vision-camera";
import { useNavigation } from "@react-navigation/native";



export default function CameraCaptureScreen({ route, navigation }: any): JSX.Element {
  navigation = useNavigation()
  const camera = useRef<Camera>(null)
  const { devices }: any = useCameraDevices();
  
  return (<View>
    <Camera
      style={{ display: 'flex', flex: 1 }}
      device={devices}
      ref={camera}
      isActive={true}
      photo={true}
    />
  </View>
  )
}
