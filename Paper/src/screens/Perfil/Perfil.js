import * as React from "react";
import { View } from "react-native";
import { Text,IconButton,  Card, Title, Avatar, Paragraph,TextInput,Button} from "react-native-paper";
import { useSelector } from "react-redux";

export default function Pm({ navigation }){
    const { user } = useSelector((state) => state.auth);
  
    return (
      <>
      <View
        style={{
          flex: 1,
          padding: 20,
          alignItems: "center",
        }}
      >
        <Avatar.Image size={100} style={{marginBottom:30}} source={{uri:user.photoUrl}} />
        <Card style={{width:"80%"}}>
            <Card.Title 
            title={user.givenName + " " + user.familyName} 
            subtitle={user.cohortes.length === 0 ? "" : user.cohortes[0].name}
             />
            <Card.Content>
            </Card.Content>
            <Card.Actions>
              <Button onPress={()=>alert("modificar")}>Modificar</Button>
            </Card.Actions>
        </Card>
      </View>
      </>
    );
  }