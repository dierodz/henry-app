import * as React from "react";
import { View, FlatList } from "react-native";
import {
  TextInput,
  FAB,
  Portal,
  Modal,
  Card,
  Button,
} from "react-native-paper";
import PostCard from "../../components/PostCard/PostCard";
import { useQuery, useMutation } from "@apollo/client";
import Loading from "../../components/Loading/Loading";
import { GET_POST, SUBSCRIBE_POST } from "../../apollo/subscribes/post";
import { CREATE_POST } from "../../apollo/mutations/post";
import { useSelector } from "react-redux";
import { useTheme } from "react-native-paper";

export default function General({ route }) {
  const { user } = useSelector((state) => state.auth);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const { cohorteId, groupId } = React.useMemo(
    () => ({ groupId: route.params.id }),
    [route.params.id]
  );
  const { data: preData, loading, subscribeToMore } = useQuery(GET_POST, {
    variables: { where: { cohorteId, groupId } },
  });
  const [createPost] = useMutation(CREATE_POST);
  const [visible, setVisible] = React.useState(false);
  const { colors } = useTheme();

  React.useEffect(() => {
    subscribeToMore({
      document: SUBSCRIBE_POST,
      variables: { cohorteId, groupId },
      updateQuery: (prev, { subscriptionData }) => {
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
        <Portal>
          <Modal
            contentContainerStyle={{ alignItems: "center" }}
            visible={visible}
            onDismiss={() => setVisible(false)}
          >
            <Card style={{ width: "80%" }}>
              <TextInput
                label="Título"
                placeholder="Título"
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
              <TextInput
                label="Contenido"
                placeholder="Contenido"
                multiline={true}
                value={content}
                onChangeText={(text) => setContent(text)}
              />
              <Button
                icon="send"
                mode="contained"
                onPress={async () => {
                  await createPost({
                    variables: {
                      tittle: title,
                      content: content,
                      userId: user.id,
                      groupId: route.params.id,
                    },
                  });
                  setVisible(false);
                  setTitle("");
                  setContent("");
                }}
              >
                Enviar
              </Button>
            </Card>
          </Modal>
        </Portal>
      </View>
      <FAB
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: colors.primary,
        }}
        small
        icon="plus"
        onPress={() => setVisible(true)}
      />
    </>
  );
}