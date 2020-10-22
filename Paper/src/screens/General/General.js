import * as React from "react";
import { View } from "react-native";
import { Text,IconButton,  Card, Title, Avatar, TextInput} from "react-native-paper";
import { useSelector } from "react-redux";
import Hyperlink from 'react-native-hyperlink'


export default function General({ navigation }) {
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = React.useState('');

  return (
    <>
    <View
      style={{
        flex: 1,
        padding: 20,
        alignItems: "center",
      }}
    >
      <Card style={{ width: "100%" }}>
        <Card.Title
          title={user.givenName + " " + user.familyName}
          subtitle={user.nickName}
          left={(props) => <Avatar.Image {...props} source={{uri:user.photoUrl}} />}
        />
        <Card.Content>
          <Title>Fiesta de fin de año</Title>
          <Hyperlink linkDefault={ true } linkStyle={ { color: '#2980b9', fontSize: 16 } }>
           <Text>Gente que les parece organizar una fiesta para fin de año?</Text>
          </Hyperlink>
        </Card.Content>
      </Card>
    </View>
    <View style={{ width:"100%", bottom:0,flexDirection:"row" } } >
      <TextInput
          style={{ width:"100%", bottom:0, flex:1, } } 
        label="Posteá!"
        placeholder="Posteá!"
        value={text}
        onChangeText={text => setText(text)}
        right={<TextInput.Icon name={() =><IconButton
          style={{alignSelf:"center"} } 
          width="100%"
          icon="send"
          size={20}
          onPress={() => {alert(text)
            setText('')
          }}
          />}/>}
      />
    </View>
    </>
  );
}
