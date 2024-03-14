import React from "react";
import Sidebar from "components/templates/Sidebar";
import Main from "components/templates/Main";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "services/user";
import { getCategory } from "services/admin";
import Loader from './../modules/Loader';


const HomePage = () => {
  const { data: posts, isLoading: postLoading } = useQuery({
    queryKey: ["post-list"],
    queryFn: getAllPosts,
  });
  const { data: categories, isLoading: categoryLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });
  console.log(posts, postLoading);
  console.log(categories, categoryLoading);
  return (
    <>
      {categoryLoading || postLoading ? (
        <Loader/>
      ) : (
        <div style={{ display: "flex" }}>
          <Sidebar categories={categories} categoryLoading={categoryLoading}/>
          <Main posts={posts} postLoading={postLoading}/>
        </div>
      )}
    </>
  );
};

export default HomePage;
