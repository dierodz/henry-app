import * as React from "react";
import { Text, Card, Title, Avatar, } from "react-native-paper";
import Hyperlink from 'react-native-hyperlink'

export default function PostCard ({item}){
    return(
        <Card key={item.id} style={{ width: "100%", marginBottom:10 }}>
        <Card.Title
          title={item.name}
          subtitle={item.nickName}
          left={(props) => <Avatar.Image {...props} source={{uri:item.photoUrl}} />}
        />
        <Card.Content>
          <Hyperlink linkDefault={ true } linkStyle={ { color: '#2980b9', fontSize: 16 } }>
          <Text>{item.content}</Text>
          </Hyperlink>
        </Card.Content>
      </Card>
    )

}