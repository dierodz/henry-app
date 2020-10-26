import * as React from "react";
import { View,FlatList } from "react-native";
import { IconButton, TextInput} from "react-native-paper";
import { useSelector } from "react-redux";
import PostCard from "../../components/PostCard/PostCard"

export default function General(props) {
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = React.useState('');

  const data=props.route.params.screen=="cohorte"? [{id:1,
    name:user.givenName + " " + user.familyName,
  nickName: user.nickName,
  photoUrl: user.photoUrl,
  title: "Fiesta de fin de año",
  content: "Gente que les parece organizar una fiesta para fin de año?"
}
] : [{id:2,
  name:user.givenName + " " + user.familyName,
nickName: user.nickName,
photoUrl: user.photoUrl,
title: "Libreria de React-native",
content: "Tengo dudas con el tema de hoy"
},{id:3,
  name:user.givenName + " " + user.familyName,
nickName: user.nickName,
photoUrl: user.photoUrl,
title: "Redux",
content: "Quien me explica?"
}
]
  return (
    <>
    <View
      style={{
        flex: 1,
        padding: 20,
        alignItems: "center",
      }}
    >
      <FlatList
      style={{width:"100%"}}
              data={data} 
              renderItem={PostCard}
              keyExtractor={(props) => {
                  return props.id.toString()
                 }}
            />  
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
