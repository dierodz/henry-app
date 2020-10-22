import * as React from "react";
import { View, StyleSheet,ScrollView } from "react-native";
import { Text,IconButton,  Card, Title, Avatar, TextInput} from "react-native-paper";


const styles = StyleSheet.create({
  title: {
    textTransform: "capitalize",
  }})


export default function Clases({ navigation }) {

  return (
  <View
      style={{
        flex: 1,
      }}
    >
     <ScrollView style={{width:"100%" }}>
     <View
      style={{
        flex: 1,
        padding: 20,
        alignItems: "center",
      }}
    >
          <Card onPress={()=>alert("react")} style={{ width: "100%",marginBottom:15 }}>
          <Card.Title
            style={styles.title}
            title={"React-Estado-LifeCycle"}
            subtitle={"react"}
          />
          </Card>
          <Card onPress={()=>alert("react")} style={{ width: "100%",marginBottom:15 }}>
          <Card.Title
            style={styles.title}
            title={"React-Routing"}
            subtitle={"react"}
          />
          </Card>

      </View>
    </ScrollView >
  </View>
  );
}




/* { [{id:"01", name:"DOM"},
{id:"02", name:"CSS"},
{id:"03", name:"ES6"},
{id:"04", name:"Ajax"},
{id:"05", name:"Bundlers"},
{id:"06", name:"React-Intro"},
{id:"07", name:"React-Estilos"},
{id:"08", name:"React-Estado-LifeCycle"},
{id:"09", name:"React-Routing"},
{id:"10", name:"React-Forms"},
{id:"11", name:"Redux"},
{id:"12", name:"React-Redux"},
{id:"13", name:"React-Hooks"}].map((e)=>(<Card key={e.id} onPress={()=>alert(e.name)} style={{ width: "100%",marginBottom:15 }}>
 <Card.Title
   style={styles.title}
   title={e.name}
   subtitle={e.id}
 />
</Card> */