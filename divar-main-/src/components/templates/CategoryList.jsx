import React from "react";
import styles from "./CategoryList.module.css";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "services/admin";
import Loader from "modules/Loader";

const CategoryList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });
  console.log(data, isLoading);
  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data?.data?.map((item) => (
          <div key={item._id} className={styles.item}>
            <div className={styles.nameLogo}>
              <img src={`${item.icon}.svg`} alt="" />
              <h5>{item.name}</h5>
            </div>
            <div className={styles.delSlug}>
            <p>slug:{item.slug}</p>
            <button>حذف</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryList;
