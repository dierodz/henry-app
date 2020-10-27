import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Avatar,Card,Text } from "react-native-paper";
import ModalAlumns from "../../components/ModalAlumns/ModalAlumns"
import Loading from "../../components/Loading/Loading"
import {GET_USERS_GROUP} from "../../apollo/querys/groups"
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

export default function Participantes({route}) {
    let id = route.params.id
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
/* 
 const [createChat, {error, loading}] = useMutation(CREATE_CHAT);
 const {data,loading} =  useQuery(GET_CHAT, {variables: {"name":route.params.hashChat}})
 */
 
    return <View style={{flex:1}}>
      <ScrollView style={{width:"100%" }}>
        <View style={{ flex: 1, alignItems: 'center', padding:20 }}>
           <Text>{route.params.user.givenName}</Text>
        </View>
      </ScrollView >
    </View>
}