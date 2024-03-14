import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPosts } from "services/user";
import Loader from "modules/Loader";
import { sp } from "utils/numbers";
import styles from "./PostList.module.css"

const PostList = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { data, isLoading } = useQuery({
    queryKey: ["my-post-list"],
    queryFn: getPosts,
  });
  console.log(data, isLoading);
  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی های شما</h3>
          {data.data.posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <img src={`${baseURL}${post.images[0]}`} />
              <div>
                <p>{post?.options?.title}</p>
                <span>{post?.options?.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post?.createdAt).toLocaleString("fa-IR")}</p>
                <span>{sp(post?.amount)}</span>
              </div>
              <button>حذف </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PostList;
