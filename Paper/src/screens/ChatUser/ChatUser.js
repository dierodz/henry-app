import * as React from "react";
import { View, ScrollView } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import ModalAlumns from "../../components/ModalAlumns/ModalAlumns";
import Loading from "../../components/Loading/Loading";
import { GET_USERS_GROUP } from "../../apollo/querys/groups";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

export default function Participantes({ route }) {
  let id = route.params.id;
  const GET_CHAT = gql`
    query groups($where: JSON) {
      groups(where: $where) {
        id
        name
      }
    }
  `;

  const CREATE_CHAT = gql`
    mutation createGroup($name: String) {
      createGroup(input: { name: $name }) {
        id
        name
      }
    }
  `;

  const { data, error, loading: loadFetch, refetch } = useQuery(GET_CHAT, {
    variables: { where: { name: route.params.hashChat.toLowerCase() } },
  });
  const [createChat, { loading: loadMutation }] = useMutation(CREATE_CHAT);

  const loading = React.useMemo(() => loadFetch || loadMutation, [
    loadFetch,
    loadMutation,
  ]);

  React.useEffect(() => {
    (async () => {
      if (data) {
        if (data.groups.length === 0) {
          await createChat({
            variables: { name: route.params.hashChat.toLowerCase() },
          });
          refetch();
        }
      }
    })();
  }, [data, error]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ width: "100%" }}>
        <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
          <Text>{route.params.user.givenName}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
