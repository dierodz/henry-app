import * as React from 'react';
import { Card, Avatar, Modal, Button, Portal } from "react-native-paper";
import {  useSelector } from "react-redux";
import Chat from "../../hooks/useChat"
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
/* 
const GET_CHAT= gql`
        query groups($name:String){
            groups(name:$name){
            id
            name
        }
        }
    `;

   const CREATE_CHAT= gql` 
   mutation createGroup($name: String) {
      createGroup(input: { name: $name}) {
        id
        name
      }
  }`
  const { user } = useSelector((state) => state.auth);
  let [groupName,setGroupName]= React.useState("")
React.useEffect( ()=>{
       async function prueba(){
          if(groupName.length>0){
                  console.log("entra al if")
                  const {data,error,loading} =  useQuery(GET_CHAT, {variables: {"name":groupName}})
                  console.log("sigue")
              if(!loading){
                      console.log("creo")
                      const [createChat, resultCreate] = useMutation(CREATE_CHAT);
                      createChat(({variables:{name:groupName}}))
              }else{
                  console.log("ya esta");
              }
          }}
          prueba() 
          modalChange?
          setGroupName(Chat(
              [user.givenName+" "+user.familyName,modalChange.givenName+" "+modalChange.familyName ],
              [user.id,modalChange.id]))
          :
          setGroupName("")
     
  },[modalChange]) 
      const {data,error,loading} =  useQuery(GET_CHAT, {variables: {"name":groupName}}) */

export default function ModalAlumns({ modalChange, setModalChange, navigation }) {

    return (<Portal >
        <Modal
            contentContainerStyle={{ alignItems: "center" }}
            visible={modalChange}
            onDismiss={() => setModalChange(false)}
        >
            <Card style={{ width: "80%" }}>
                {modalChange.url?
                    <Avatar.Image style={{ alignSelf: "center", margin: 10 }} source={{ uri: modalChange.url }} />
                    :
                    <Avatar.Text style={{ alignSelf: "center", margin: 10 }} label={modalChange?modalChange.givenName[0]+modalChange.familyName[0]:"H"} />
                    }
                <Card.Title
                    title={`${modalChange.givenName} ${modalChange.familyName}`}
                    subtitle={modalChange.nickName}
                />
                <Card.Content>
                </Card.Content>
                <Card.Actions style={{ alignSelf: "center", margin: 10 }}>
                    <Button onPress={() =>{
                        setModalChange(false)
                        navigation.navigate(modalChange.givenName+modalChange.familyName+modalChange.id)}}>Chatea</Button>
                </Card.Actions>
            </Card>
        </Modal>
    </Portal>

    );
}