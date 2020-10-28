import * as React from "react";
import { View, StyleSheet,ScrollView } from "react-native";
import { Card, List, Button} from "react-native-paper";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import Loading from "../../components/Loading/Loading"

const styles = StyleSheet.create({
  title: {
    textTransform: "capitalize",
  }})

export default function Clases({route, navigation}) {
  const modules= route.params.modules
 
  return <View
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
      {modules.length !=0 ? modules.map((modulo)=>(
        <Card key={modulo.id} style={{width:"100%", marginBottom:15}}>
          <List.Section key={modulo.id} style={{width:"100%"}} >
              <List.Accordion
                style={{width:"100%"}}
                title={modulo.name}
                left={props => <List.Icon {...props} icon="folder" />}>
                  {modulo.contents.length!=0?
                   modulo.contents.map((clase)=>(
                    <List.Item key={clase.id} onPress={()=> navigation.navigate(clase.topicName)} title={clase.topicName.charAt(0).toUpperCase()+clase.topicName.slice(1)} />
                  )):
                  <List.Item title="Sin Clases" />
                  }
               </List.Accordion>
            </List.Section>
        </Card>
         )):
         <Card onPress={()=>alert("SIN ELEMENTOS")} style={{ width: "100%",marginBottom:15 }}>
            <Card.Title
              style={styles.title}
              title={"SIN ELEMENTOS"}
            />
            </Card>
         }
      </View>
    </ScrollView >
  </View> 
}
