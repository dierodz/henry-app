import { useQuery } from "@apollo/client";
import PostCard from "components/PostCard";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { GET_POST, SUBSCRIBE_POST } from "apollo/Mutations/postSub";
import Loading from "components/Loading";


export const Post = () => {

    
  const { id } = useParams();
  //suscripciones
  const { groupId } = React.useMemo(() => ({ groupId: parseInt(id) }), [id]);
  //const groupId =  parseInt(id) 


  const { data: preData, loading, subscribeToMore } = useQuery(GET_POST, {
    variables:  groupId 
  });
  console.log('predata',preData, groupId,loading, subscribeToMore);
  //use effect para la suscripcion

  useEffect(() => {
    subscribeToMore({
      document: SUBSCRIBE_POST,
      variables: { groupId },
      updateQuery: (prev, { subscriptionData }) => {
        console.log('hola', prev, subscriptionData);
        if (!subscriptionData.data) return prev;
        return Object.assign({}, prev, {
          getPost: [...prev.getPost, subscriptionData.data.subscribePost],
        });

      },
    });
  }, [groupId, subscribeToMore], preData);

  // mapeo de los datos recibidos
  const data = useMemo(() => {
    if (preData && preData) {

  console.log('prev', preData)
      const laData = preData.getPost.map((post) => ({
        id: post?.id,
        // name: `${
        //   post?.user.givenName?.charAt(0).toUpperCase() +
        //   post?.user.givenName?.slice(1)
        // } ${
        //   post?.user.familyName?.charAt(0).toUpperCase() +
        //   post?.user.familyName?.slice(1)
        // }`,
        // nickName: post?.user.nickName,
        // photoUrl: post?.user.photoUrl,
        title: post?.tittle,
        content: post?.content,
        userId: post?.user?.id,
      }));

      laData.pop();

      return laData;
    }
  }, [preData]);

  if (!loading) {
    console.log(data);
  }

  if (loading) {
    return <Loading />;
  }

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
    // <h1>hola</h1>
    <>{data && data.map((post) => <PostCard key={post.id} {...post} />)}</>
  );
};
