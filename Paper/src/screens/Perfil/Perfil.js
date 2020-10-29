import * as React from "react";
import { View, StyleSheet} from "react-native";
import {HelperText,  Card, Title, Avatar, Paragraph,TextInput,Button,Portal,Modal} from "react-native-paper";
import { useSelector } from "react-redux";
import {  useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { signInWithToken } from "../../dispatchers/auth";


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
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

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

     const UPDATE_USER= gql`
     mutation updateUser($id:Int,$input:UserInput){
      updateUser(id:$id,input:$input){
        id
      }
    }
    `;

    const [updateUser, resultUpdateUser] = useMutation(UPDATE_USER);

    React.useEffect(()=>{
      if(resultUpdateUser.called)dispatch(signInWithToken(token));
    },[resultUpdateUser])

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
              onChangeText={text => handleChange("name",text)}
            />
            <TextInput
              style={styles.input}
              label="Apellido"
              onChangeText={text => handleChange("lastName",text)}
            />
            <TextInput
            style={styles.input}
            label="NickName"
            onChangeText={text => handleChange("nickName",text)}
          />
          <TextInput
          style={styles.input}
            label="Email"
            onChangeText={text => handleChange("email",text)}
          />
          <HelperText type="error" visible={errors.email}>
            El email es invalido
          </HelperText>
            </Card.Content>
            <Card.Actions>
              <Button onPress={async () => {
                  await updateUser({
                    variables: {
                      id:user.id,
                      input:{
                      givenName: input.name?input.name:user.givenName,
                      familyName: input.lastName? input.lastName: user.familyName,
                      nickName: input.nickName? input.nickName:user.nickName,
                    }},
                  });
                  setInput({name:"", 
                  lastName:"",  
                  email:"",
                  nickName:""
                });
                setModalChange(false)
                }}>Modificar</Button>
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
  