import * as React from 'react';
import {  View } from 'react-native';
import { Avatar, Subheading, Divider, Paragraph, Button, DataTable  } from 'react-native-paper';

export default function Grupos(props){
    return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Paragraph>Grupos</Paragraph>
    <Button style={{ marginBottom:20 } } mode="outlined" onPress={() => props.navigation.navigate('Participantes')}>
          
          Participantes
        </Button>
</View>
);
}