import * as React from "react";
import { View, FlatList } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import PostCard from "../../components/PostCard/PostCard";
import { useQuery, useMutation } from "@apollo/client";
import Loading from "../../components/Loading/Loading";
import {GET_POST,SUBSCRIBE_POST} from "../../apollo/subscribes/post"
import {CREATE_POST} from "../../apollo/mutations/post"
import {  useSelector } from "react-redux";


export default function General({route}) {
  const { user } = useSelector((state) => state.auth); 
  const [text, setText] = React.useState("");
  const { cohorteId, groupId } = React.useMemo(() => ({groupId:route.params.id }), [route.params.id]);
  const { data: preData, loading, subscribeToMore } = useQuery(GET_POST, {
    variables: { where: { cohorteId, groupId } },
  });
  const [createPost, resultCreate] = useMutation(CREATE_POST);

  React.useEffect(() => {
    subscribeToMore({
      document: SUBSCRIBE_POST,
      variables: { cohorteId, groupId },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev, subscriptionData);
        if (!subscriptionData.data) return prev;
        return Object.assign({}, prev, {
          getPost: [...prev.getPost, subscriptionData.data.subscribePost],
        });
      },
    });
  }, [subscribeToMore]);

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
      }));
    }
    return undefined;
  }, [preData]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <View
        style={{
          flex: 1,
          padding: 20,
          alignItems: "center",
        }}
      >
        <FlatList
          style={{ width: "100%" }}
          data={data}
          renderItem={PostCard}
          keyExtractor={(props) => {
            return props.id.toString();
          }}
        />
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
                        groupId:route.params.id
                      }
                    }));
                    setText("");
                  }}
                />
              )}
            />
          }
        />
      </View>
    </>
  );
}
