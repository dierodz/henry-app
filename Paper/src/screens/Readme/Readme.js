import * as React from "react";
import { View, ScrollView } from "react-native";
import { Card, List, Paragraph} from "react-native-paper";


export default function Readme({route}) {
 
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
        <Card>
            <Card.Content>
                 <Paragraph>{route.params.readme}</Paragraph>
            </Card.Content>
        </Card>
      </View>
    </ScrollView >
  </View> 
}
