import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { checkOtp } from "services/auth";
import { setCookie } from "utils/cookie";
import { getProfile } from "services/user";
import styles from "./CheckOtpForm.module.css";

const CheckOtpForm = ({ code, setCode, mobile, setStep }) => {
  const navigate = useNavigate();
  const { refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  //console.log({ refetch });
  const submitHandler = async (e) => {
    e.preventDefault();
    //console.log({ code, mobile });
    if (code.length !== 5) return;
    const { response, error } = await checkOtp(mobile, code);
    if (response) {
      //console.log(response.data);
      setCookie(response.data);
      navigate("/");
      refetch();
      console.log("ورود با موفقیت انجام شد");
    }
    if (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <form action="" onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد پیامک شده</p>
      <span>کد پیامک شده به شماره موبایل **{mobile}** را وارد کنید</span>
      <label htmlFor="input">کد تأیید را وارد کنید</label>
      <input
        type="text"
        name="input"
        id="input"
        placeholder="کد ارسال شده راوارد کنید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div>
        <button type="submit">ورود</button>
        <button onClick={() => setStep(1)}>تغییر شماره</button>
      </div>
    </form>
  );
};

export default CheckOtpForm;
