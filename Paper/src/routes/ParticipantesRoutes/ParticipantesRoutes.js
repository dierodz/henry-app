import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from "@apollo/client";
import Loading from "../../components/Loading/Loading"
import Participantes from '../../screens/Participantes/Participantes';
import ChatUser from '../../screens/ChatUser/ChatUser';
import { GET_USERS_GROUP } from '../../apollo/querys/groups';
import useChat from "../../hooks/useChat"

import {  useSelector } from "react-redux";

const ParticipantesStack = createStackNavigator()

export default function ParticipantesRoutes({route}) {

    let id = route.params.id
    let type= route.params.screen
    const  userMe  = useSelector((state) => state.auth);
    console.log(userMe.user.givenName)
    const { loading, error, data, refetch,  } = useQuery(GET_USERS_GROUP, {
        variables: {
            "where": {
              [type]: {
                "id": id
              }
            }
          },
    })
   
    return loading?
      <Loading/>
      :
      <ParticipantesStack.Navigator >
        <ParticipantesStack.Screen  
        options={{headerShown:false}} 
        initialParams={{user:data.users}} 
        name="Participantes" 
        component={Participantes} />
        {data&&data.users.map((user)=>{
           let hash = useChat(
            [userMe.user.id,user.id])
            return(
          <ParticipantesStack.Screen 
          options={{ headerStyle:{height:40}}} 
          key={user.id} 
          initialParams={{user:user, hashChat:hash}} 
          name={user.givenName+user.familyName+user.id} 
          component={ChatUser} />
         )})
        }
      </ParticipantesStack.Navigator>
  }