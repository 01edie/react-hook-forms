import React from 'react'
import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

import * as yup from 'yup'

const Form = () => {
    

    const schema = yup.object().shape({
        fullName: yup.string().required("Your full name is required"),
        email: yup.string().email().required(),
        age: yup.number('must be a number').positive().integer().min(18).required().typeError('it is required'),
        password: yup.string().min(4).max(6).required(),
        confirmPassword: yup.string().oneOf([yup.ref('password'),null],'passwords dont match').required()

    })
    const {register, handleSubmit, formState:{errors}} = useForm({resolver: yupResolver(schema)});


    

    const onSubmit = (data)=>{
        console.log('test!');
        console.log(data);
    }
  return (
    <div className='container'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder='Full Name' {...register('fullName')}/>
            {/* {errors?.fullName?.message?(<p>a</p>):null} */}
            {errors?.fullName?.message&& <p className='err'>! {errors.fullName.message}</p>}

            <input type="text" placeholder='Email' {...register('email')}/>
            {errors?.email?.message&& <p className='err'>! {errors.email.message}</p>}

            <input type="number" placeholder='Age' {...register('age')}/>
            {errors?.age?.message&& <p className='err'>! {errors.age.message}</p>}

            <input type="password" placeholder='password' {...register('password')}/>
            {errors?.password?.message&& <p className='err'>! {errors.password.message}</p>}

            <input type="password" placeholder='re password' {...register('confirmPassword')}/>
            {errors?.confirmPassword?.message&& <p className='err'>! {errors.confirmPassword.message}</p>}


            
            <input type="submit" value="submit" />
        </form>


    </div>
  )
}

export default Form