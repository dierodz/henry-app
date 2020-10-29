import * as React from "react";
import { View, ScrollView } from "react-native";
import { Caption } from 'react-native-paper';
import { Video } from 'expo-av';
import Slider from '@react-native-community/slider';
import { useTheme } from 'react-native-paper';


export default function Vimeo({route}) {
  const {colors} = useTheme()

  let[velocity, setVelocity] = React.useState(1)
 
  return <View
      style={{
        flex: 1,
      }}
    >
    <ScrollView style={{width:"100%" }}>
     <View
      style={{
        flex: 1,
        padding: 20,
        alignItems: "center",
      }}
    >
        <Video
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          rate={velocity}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          useNativeControls={true}
          shouldPlay={false}
          isLooping
          style={{height:200,width: "100%", marginBottom:10}}
        />
        <Caption style={{width:"100%"}}>
          Velocidad
        </Caption>
        <Slider
          style={{ width:"100%", height: 40}}
          minimumValue={1}
          maximumValue={10}
          minimumTrackTintColor={colors.primary}
          thumbTintColor={colors.primary}
          maximumTrackTintColor={colors.text}
          onValueChange={(e)=>setVelocity(e)}
        />
      </View>
    </ScrollView >
  </View> 
}
