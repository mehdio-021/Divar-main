import React from "react";
import styles from "./Main.module.css";
import { sp } from "utils/numbers";

const Main = ({ posts }) => {
  //const baseURL = "http://localhost:3400/"
  const baseURL = import.meta.env.VITE_BASE_URL;
  console.log(posts);
  return (
    <div className={styles.container}>
      {posts.data.posts.map((post) => {
        return (
          <div key={post._id} className={styles.card}>
            <div className={styles.info}>
              <p>{post.options?.title}</p>
              <div >
                <p>{sp(post.amount)} تومان</p>
                <span>{post.options?.city}</span>
              </div>
            </div>
            <img src={`${baseURL}${post.images[0]}`} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default Main;
