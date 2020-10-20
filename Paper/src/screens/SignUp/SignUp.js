/* eslint-disable react/prop-types */
import * as React from 'react';
import {  View, ScrollView ,Image } from 'react-native';
import { Avatar,  Colors, TextInput, Button, Caption, IconButton} from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import {IMAGENAME} from "../../../assets"


export default function SignUp(props) {
  const [text, setText] = React.useState('');

  const[isPrivate,setPrivate] = React.useState(true)

    return (
      <View style={{flex:1, alignItems:"center", justifyContent:"center" }}>
        <ScrollView style={{width:"100%" }}>
        <View  style={{ flex: 1, paddingHorizontal:20, alignContent:"center",}}>
        <Avatar.Text
          style={{ alignSelf: "center", marginVertical: 30 }}
          label="H"
        /> 
        <TextInput
        mode='outlined'
        label="Nombre"
        value={text}
        onChangeText={text => setText(text)}z
        style={{ marginBottom:20 } }
       /><TextInput
       mode='outlined'
       label="Apellido  "
       value={text}
       onChangeText={text => setText(text)}z
       style={{ marginBottom:20 } }
      />
        <TextInput
        mode='outlined'
        label="Email"
        value={text}
        onChangeText={text => setText(text)}z
        style={{ marginBottom:20 } }
       />
       <TextInput
        mode='outlined'
        label="Password"
        secureTextEntry={true}
        value={text}
        onChangeText={text =>{
          !isPrivate&&setPrivate(true)
          setText(text)
        } }
        style={{ marginBottom:20 } }
        secureTextEntry={isPrivate}
        right={<TextInput.Icon name={() =><IconButton
          style={{alignSelf:"center"} } 
          width="100%"
          icon="eye"
          size={20}
          onPress={() => setPrivate(false)}
          />}/>}
        />
        <TextInput
        mode='outlined'
        label="Repeat Password"
        secureTextEntry={true}
        value={text}
        onChangeText={text =>{
          !isPrivate&&setPrivate(true)
          setText(text)
        } }
        style={{ marginBottom:20 } }
        secureTextEntry={isPrivate}
        right={<TextInput.Icon name={() =><IconButton
          style={{alignSelf:"center"} } 
          width="100%"
          icon="eye"
          size={20}
          onPress={() => setPrivate(false)}
          />}/>}
        />

        <TextInput
        mode='outlined'
        label="Nickname"
        value={text}
        onChangeText={text => setText(text)}z
        style={{ marginBottom:30 } }
       />
        <Button mode="contained" onPress={() => props.navigation.navigate('Home')} style={{ marginBottom:20 } }>
          Sign-Up
        </Button>
        </View>

        </ScrollView >
      </View>
    );
}