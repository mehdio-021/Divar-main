import React from "react";
import styles from "./Sidebar.module.css";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "services/admin";

const Sidebar = ({categories,categoryLoading}) => {

  console.log(categories);
  return (
    <div className={styles.sidebar}>
      <h4>دسته ها</h4>
      <ul>
        {categories.data.map((category) => (
          <li key={category._id}>
            <img src={`${category.icon}.svg`} alt="" />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
