import React from "react";
import { sendOtp } from "services/auth";
import styles from "./SendOtpForm.module.css";
import { p2e } from "utils/numbers";

const SendOtpForm = ({ setStep, mobile, setMobile }) => {
  const submitHandler = async (e) => {
    e.preventDefault();
    if (mobile.length !== 11) return;
    //console.log(e);
    const { response, error } = await sendOtp(p2e(mobile));
    if (response) {
      setStep(2);
      console.log(response);
    }
    if (error) {
      //console.log(error)
      console.log(error.response.data.message);
    }
  };
  return (
    <form action="" onSubmit={submitHandler} className={styles.form}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار،لطفا شماره موبال خود را وارد کنید کد تأیید
        به این شماره ارسال خواهد شد
      </span>
      <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
      <input
        type="text"
        id="input"
        name="input"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="شماره موبایل خود را وارد کنید"
      />
      <button type="submit">ارسال کد تأیید</button>
    </form>
  );
};

export default SendOtpForm;
