import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Form1 = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().min(18).max(36).required(),
    password: yup.string().min(4).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null],'password dont match').required(),
    agree: yup.bool().isTrue('you must accept')
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
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Full Name" {...register("fullName")} />
        {errors?.fullName?.message && (
          <p className="err">! {errors.fullName.message}</p>
        )}

        <input type="text" placeholder="Email" {...register("email")} />
        {errors?.email?.message && (
          <p className="err">! {errors.email.message}</p>
        )}

        <input type="text" placeholder="Age" {...register("age")} />
        {errors?.age?.message && <p className="err">! {errors.age.message}</p>}

        <input type="text" placeholder="Password" {...register("password")} />
        {errors?.password?.message && (
          <p className="err">! {errors.password.message}</p>
        )}

        <input
          type="text"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        {errors?.confirmPassword?.message && (
          <p className="err">! {errors.confirmPassword.message}</p>
        )}
        <span>
         
          <input type="checkbox" {...register("agree")}  {...register('agree')}/> I agree
        </span>
        {errors?.agree?.message && (
          <p className="err">! {errors.agree.message}</p>
        )}
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Form1;
