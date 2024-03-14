import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getCategory } from "services/admin";
import styles from "./AddPost.module.css";
import { getCookie } from "utils/cookie";
import axios from "axios";
import toast from "react-hot-toast";

const AddPost = () => {
  const [sending, isSending] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    amount: null,
    city: "",
    category: "",
    images: null,
  });
  const { data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });
  /* return  all category */
  //console.log(data);

  const changeHandler = (e) => {
    //console.log(e)
    //console.log(e.target.name)
    const name = e.target.name;
    if (name !== "images") {
      setForm({ ...form, [name]: e.target.value });
    } else {
      //console.log(e.target.files[0])
      setForm({ ...form, [name]: e.target.files[0] });
    }
  };
  const addHandler = (e) => {
    e.preventDefault();
    isSending(true);
    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }
    const token = getCookie("accessToken");
    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        isSending(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("مشکلی پیش امده است");
        isSending(false);
      });
    //console.log(form);
    console.log(formData);
  };
  return (
    <form onChange={changeHandler} className={styles.form}>
      <h3>افزودن آگهی</h3>
      <label htmlFor="title">عنوان</label>
      <input type="text" id="title" name="title" />
      <label htmlFor="content">توضیحات</label>
      <textarea name="content" id="content" />
      <label htmlFor="amount">قیمت</label>
      <input type="number" id="amount" name="amount" />
      <label htmlFor="city">شهر</label>
      <input type="text" id="city" name="city" />
      <label htmlFor="category">دسته بندی</label>
      <select name="category" id="category">
        {data?.data?.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <label htmlFor="images"> عکس</label>
      <input type="file" id="images" name="images" />
      <button onClick={addHandler} disabled={sending}>
        ایجاد
      </button>
    </form>
  );
};

export default AddPost;
