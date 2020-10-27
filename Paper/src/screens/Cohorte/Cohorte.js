import * as React from "react";
import { View, FlatList } from "react-native";
import PostCard from "../../components/PostCard/PostCard";
import { useQuery } from "@apollo/client";
import Loading from "../../components/Loading/Loading";
import {GET_POST,SUBSCRIBE_POST} from "../../apollo/subscribes/post"


export default function Cohorte({route}) {
  const { cohorteId, groupId } = React.useMemo(() => ({ cohorteId: route.params.id }), [route.params.id ]);
  const { data: preData, loading, subscribeToMore } = useQuery(GET_POST, {
    variables: { where: { cohorteId, groupId } },
  });

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
  );
}
