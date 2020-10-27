import { useQuery } from "@apollo/client";
import { GROUP_POSTS } from "apollo/querys/posts";
import PostCard from "components/PostCard";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

export const Post = () => {
  const { id } = useParams();
  const { data: preData } = useQuery(GROUP_POSTS, {
    variables: {
      groupId: parseInt(id),
    },
  });

  const data = useMemo(() => {
    if (preData) {
      return preData.getGroupPosts;
    }
  }, [preData]);
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
