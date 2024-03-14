import React, { useState } from "react";
import styles from "./CategoryForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "../../services/admin";
import toast from "react-hot-toast";

const CategoryForm = () => {
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });

  const queryClient = useQueryClient();
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => queryClient.invalidateQueries("get-categories"),
  });
  console.log({ isPending, error, data });
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    //console.log(form)
  };

  const submitHandler = (e) => {
    e.preventDefault();
    //console.log(form);
    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);
    toast.success("دسته بندی با موفقیت ثبت شد");
  };
  return (
    <form
      action=""
      onChange={changeHandler}
      onSubmit={submitHandler}
      className={styles.form}
    >
      <h3>دسته بندی جدید</h3>
      {/*  for error handling   */}
      {/* <p></p> */}
      {!!error && <p>مکشلی پیش امده است</p>}
      {data?.status === 201 && <p>دسته بندی با موفقیت اضافه شد</p>}
      <label htmlFor="name">نام دسته بندی</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" />
      <label htmlFor="icon">آیکن</label>
      <input type="text" name="icon" id="icon" />
      <button type="submit" disabled={isPending}>
        ایجاد
      </button>
    </form>
  );
};

export default CategoryForm;
