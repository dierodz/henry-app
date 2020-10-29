import * as React from "react";
import { View, ScrollView, Keyboard } from "react-native";
import { Avatar, Card, Text, TextInput, IconButton } from "react-native-paper";
import ModalAlumns from "../../components/ModalAlumns/ModalAlumns";
import Loading from "../../components/Loading/Loading";
import { CREATE_POST} from "../../apollo/mutations/post";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { SUBSCRIBE_POST } from "../../apollo/subscribes/post";
import { useSelector } from "react-redux";
import Hyperlink from 'react-native-hyperlink'
import {  StyleSheet } from "react-native";




export default function ChatUser({ route }) {

  let [text, setText] = React.useState("")
  const { user } = useSelector((state) => state.auth);

  const GET_CHAT = gql`
  query getPost($where: JSON, $whereGroup: JSON) {
    getPost(where: $where) {
      id
      content
      groupId
      user {
        id
        givenName
        familyName
        photoUrl
      }
    }
    groups(where: $whereGroup) {
      id
    }
  }
    `


  const CREATE_CHAT = gql`
    mutation createGroup($name: String) {
      createGroup(input: { name: $name }) {
        id
        name
      }
    }
  `;

  const { data: preData, error, loading: loadFetch, refetch, subscribeToMore } = useQuery(GET_CHAT, {
    variables:{"where": {"Group":{"name": route.params.hashChat.toLowerCase()}},
    "whereGroup": {"name": route.params.hashChat.toLowerCase()}
  }
  });
  const [createChat, { loading: loadMutation }] = useMutation(CREATE_CHAT);

  const [createPost] = useMutation(CREATE_POST);

  React.useEffect(() => {
    (async () => {
      if (preData) {
        if (preData.groups.length === 0) {
          await createChat({
            variables: { name: route.params.hashChat.toLowerCase() },
          });
         refetch(); 
        }
      }
    })();
  }, [preData, error]);

   React.useEffect(() => {
    if(preData && preData.groups.length!==0){

             subscribeToMore({
            document: SUBSCRIBE_POST,
            variables: { groupId:preData.groups[0].id },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              return Object.assign({}, prev, {
                getPost: [...prev.getPost, subscriptionData.data.subscribePost],
              });
            },
          })
    }
  }, [subscribeToMore, preData]); 


  const loading = React.useMemo(() => loadFetch || loadMutation [
    loadFetch,
    loadMutation
  ]);


  const data = React.useMemo(() => {
    if (preData) {
      return preData.getPost.map(({ id, tittle, content, user }) => ({
        id,
        name:
          user.givenName.charAt(0).toUpperCase() +
          user.givenName.slice(1) +
          " " +
          (user.familyName.charAt(0).toUpperCase() + user.familyName.slice(1)),
        nickName: user.nickName,
        photoUrl: user.photoUrl,
        title: tittle,
        content,
        idUser:user.id
      }));
    }
    return undefined;
  }, [preData]);

  const styles = StyleSheet.create({
    me:{ width: "100%", 
    marginBottom:10,
    marginLeft:10,
    },
    other:{
      width: "100%", 
      marginBottom:10,
      marginRight:10
    }
  })

  
  
  return loading? <Loading/>:
  <>
    <View style={{ flex: 1 }}>
      <ScrollView style={{ width: "100%" }}>
        <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
          {data&&data.map((item)=>(
             <Card key={item.id} style={item.idUser=== user.id? styles.me: styles.other}>
             <Card.Title
               title={item.name}
               left={(props) => <Avatar.Image {...props} source={{uri:item.photoUrl}} />}
             />
             <Card.Content>
               <Hyperlink linkDefault={ true } linkStyle={ { color: '#2980b9', fontSize: 16 } }>
               <Text>{item.content}</Text>
               </Hyperlink>
             </Card.Content>
           </Card>
          ))} 
        </View>
      </ScrollView>
    </View>
    <View style={{ width: "100%", bottom: 0, flexDirection: "row" }}>
        
    </View> 
    <View style={{ width: "100%", bottom: 0, flexDirection: "row" }}>
    <TextInput
      style={{ width: "100%", bottom: 0, flex: 1 }}
      label="Posteá!"
      placeholder="Posteá!"
      value={text}
      onChangeText={(text) => setText(text)}
      right={
          <TextInput.Icon
            name={() => (
              <IconButton
                style={{ alignSelf: "center" }}
                width="100%"
                icon="send"
                size={20}
                onPress={async() => {
                  await createPost(({
                    variables:{
                      content:text,
                      userId:user.id,
                      groupId:preData.groups[0].id
                    }
                  }));
                  setText("");
                  Keyboard.dismiss()
                }}
              />
            )}
          />
        }
      />
    </View>
  </>

}
