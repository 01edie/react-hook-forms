import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Form1 = () => {
  const [state, setState] = useState({ modeChanged: 0, status: false });

  useEffect(() => {
    console.log("on first render");
  }, []);
  useEffect(() => {
    console.log("on mode change");
    setState((state) => {
      return { ...state, modeChanged: state.modeChanged + 1 };
    });
  }, [state.status]);

  console.log("on every render");
  

  const schema = yup.object().shape({
    fullName: yup.string().required("Your full name is required"),
    email: yup
      .string()
      .email("Enter a valid email id")
      .required("Your email id is required"),
    dob: yup
      .date()
      .required()
      .typeError("Date of Birth is required")
      .max("01-01-2004", "Age must be over 18")
      .min("01-01-1962", "Age must be below 60"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,8}$/,
        "Min 6 Characters Max 8 characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords don't match")
      .required(),
    agree: yup.bool().isTrue("You must accept to proceed!"),
  });

  const onSubmit = (data) => {
    console.log("success", data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  return (
    <main className={state.status ? "dark" : null}>
      <div className="container">
        {/* dark mode */}
        <span className="darkMode">
          <h5>Dark Mode</h5>
          <input
            type="checkbox"
            onChange={(e) => {
              setState((state) => {
                return { ...state, status: e.target.checked };
              });
            }}
          />
        </span>

        <span className="modeChanged">
          <p>Mode changed: {state.modeChanged} times</p>
        </span>

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName")}
          />
          {errors?.fullName?.message && (
            <p className="err">! {errors.fullName.message}</p>
          )}

          <input type="text" placeholder="Email" {...register("email")} />
          {errors?.email?.message && (
            <p className="err">! {errors.email.message}</p>
          )}

          <input type="date" placeholder="Date of Birth" {...register("dob")} />
          {errors?.dob?.message && (
            <p className="err">! {errors.dob.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors?.password?.message && (
            <p className="err">! {errors.password.message}</p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors?.confirmPassword?.message && (
            <p className="err">! {errors.confirmPassword.message}</p>
          )}

          <span className="agree">
            <input
              type="checkbox"
              {...register("agree")}
              {...register("agree")}
            />{" "}
            * I agree the Terms.
          </span>
          {errors?.agree?.message && (
            <p className="err">! {errors.agree.message}</p>
          )}

          <input type="submit" value="submit" />
        </form>
      </div>
    </main>
  );
};

export default Form1;
