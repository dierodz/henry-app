import * as React from 'react';
import {  View } from 'react-native';
import { Button} from 'react-native-paper';

export default function Settings({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button icon="camera"  onPress={()=>navigation.openDrawer()}>
          Abrir
        </Button>    
      </View>
    );
}