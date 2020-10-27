import * as React from "react";
import { View, StyleSheet} from "react-native";
import {Headline, Subheading,Text,IconButton,HelperText,  Card, Title, Avatar, Paragraph,TextInput,Button,Portal,Modal} from "react-native-paper";
import { useSelector } from "react-redux";

export function validate(input) {
  let error={}
  if(input.email.length!=0 && (!/\S+@\S+\.\S+/.test(input.email))){
    return error.email = true;
  }
  error.email=false
  return error;
}

export default function Perfil({ navigation }){
    const { user } = useSelector((state) => state.auth);
    let [modalChange, setModalChange] = React.useState(false)
    let [input, setInput] = React.useState({name:"", 
      lastName:"",  
      email:"",
      nickName:""
    })
    let [errors, setErrors] = React.useState({name:false, 
      lastName:false,  
      email:false,
      nickName:false
    })

    function handleChange(inputName, inputContent){
      setErrors(validate({...input,[inputName]:inputContent}))
      setInput({...input,[inputName]:inputContent})

    }


    return (
     <View
        style={{
          flex: 1,
          padding: 20,
          alignItems: "center",
        }}
      >
        {user.photoUrl?
          <Avatar.Image size={100} style={{marginBottom:30}} source={{uri:user.photoUrl}} />
        :
          <Avatar.Image size={100} style={{marginBottom:30}} source={{uri:user.photoUrl}} />
        }
        <Card style={{width:"80%"}}>
            <Card.Title 
            title={user.givenName + " " + user.familyName} 
            subtitle="Nombre y Apellido"
             />
             <Card.Title 
            title={user.nickName} 
            subtitle="Nickname"
             />
             <Card.Title 
            title={user.email}
            subtitle="Email"
             />
            
            <Card.Actions>
              <Button onPress={()=>setModalChange(true)}>Modificar</Button>
            </Card.Actions>
        </Card>
        <Portal>
          <Modal  
          contentContainerStyle={{ alignItems: "center" }}
          visible={modalChange} 
          onDismiss={()=>setModalChange(false)}>
          <Card style={{width:"80%"}}>
            <Card.Title 
            title="Modificar"
             />
            <Card.Content>
            <TextInput
              style={styles.input}
              label="Nombre"
              value={input.name}
              onChangeText={text => handleChange("name",text)}
            />
            <TextInput
              style={styles.input}
              label="Apellido"
              value={input.lastName}
              onChangeText={text => handleChange("lastName",text)}
            />
            <TextInput
            style={styles.input}
            label="NickName"
            value={input.nickName}
            onChangeText={text => handleChange("nickName",text)}
          />
          <TextInput
          style={styles.input}
            label="Email"
            value={input.email}
            onChangeText={text => handleChange("email",text)}
          />
          <HelperText type="error" visible={errors.email}>
            El email es invalido
          </HelperText>
            </Card.Content>
            <Card.Actions>
              <Button onPress={()=>console.log(input)}>Modificar</Button>
            </Card.Actions>
         </Card>
          </Modal>
        </Portal>
      </View>
    );
  }

  const styles = StyleSheet.create({
    input: {
      marginBottom: 5,
    }
  });
  