import * as React from "react";
import { View , Image} from "react-native";
import { Avatar, TextInput, Button, Caption, IconButton,ActivityIndicator } from "react-native-paper";

export default function LoadingScreen(props){

    return(  <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <ActivityIndicator size="large" animating={true} />
             </View>
        )
}