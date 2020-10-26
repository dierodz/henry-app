import { useQuery } from "@apollo/client";
import { GROUP_POSTS } from "apollo/querys/posts";
import PostCard from "components/PostCard";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { GET_POST, SUBSCRIBE_POST } from "apollo/Mutations/postSub";

export const Post = () => {
  const { id } = useParams();
  //suscripciones
  const { cohorteId, groupId } = React.useMemo(() => ({ groupId: parseInt(id) }), [id]);

  const { data: preData, loading, subscribeToMore } = useQuery(GET_POST, {
    variables: { where: { groupId } },
  });

  //use effect para la suscripcion

  React.useEffect(() => {
    subscribeToMore({
      document: SUBSCRIBE_POST,
      variables: { groupId },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev, subscriptionData);
        if (!subscriptionData.data) return prev;
        return Object.assign({}, prev, {
          getPost: [...prev.getPost, subscriptionData.data.subscribePost],
        });
      },
    });
  }, [groupId, subscribeToMore]);

  // mapeo de los datos recibidos  
  const data = React.useMemo(() => {

    if (preData) {
      return preData.getPost.map(({ id, tittle, content, user }) => ({
        id,
        name:
          user.givenName?.charAt(0).toUpperCase() +
          user.givenName?.slice(1) +
          " " +
          (user.familyName?.charAt(0).toUpperCase() + user.familyName.slice(1)),
        nickName: user.nickName,
        photoUrl: user.photoUrl,
        title: tittle,
        content,
      }));
    }
    return undefined;
  }, [preData]);

  console.log(data)

  return (
    // <Tabla
    //   loading={loading}
    //   data={tableData}
    //   count={undefined}
    //   page={1}
    //   rowsPerPage={4}
    //   onChangePage={2}
    //   onChangeRowsPerPage={2}
    // />
    <>{data && data.map((post) => <PostCard key={post.id} {...post} />)}</>
  );
};
