'use client';

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authClient } from "../../../../lib/auth-client";
import { useForm } from "react-hook-form";
import { useState } from "react";

const RegisterPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const handleRegisterFunc = async (data) => {
        const { name, photo, email, password } = data;
        console.log('Register Data:', { name, photo, email, password });


        const { data: res, error } = await authClient.signUp.email({
            name: name, // required
            email: email, // required
            password: password, // required
            image: photo, // optional
            callbackURL: "/",
        });
        if (error) {
            alert(error.message);
        } else {
            alert('Successfully registered:', res);
        }
    };

    const [isShowPassword, setIsShowPassword] = useState(false);

    // console.log('watch', watch());

    // const handleRegisterFunc = (e) => {
    //     e.preventDefault();
    //     const email = e.target.email.value;
    //     const password = e.target.password.value;
    //     console.log('Email:', email);
    //     console.log('Password:', password);
    // }

    return (
        <div className='container mx-auto min-h-[80vh] flex flex-col items-center justify-center bg-slate-100 rounded-lg shadow-md'>
            <div className='p-4 r;ounded-xl bg-white shadow-md mb-6'>
                <h1 className='text-3xl font-bold text-center mb-4'>Register Your Account</h1>
                <form className='space-y-4' onSubmit={handleSubmit(handleRegisterFunc)}>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Name</legend>
                        <input type="text" {...register('name', { required: "Name is required" })} className="input" placeholder="Type Your Name" />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Photo URL</legend>
                        <input type="text" {...register('photo', { required: "Photo URL is required" })} className="input" placeholder="Type Your Photo URL" />
                        {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email</legend>
                        <input type="email" {...register('email', { required: "Email is required" })} className="input" placeholder="Type Your Email" />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </fieldset>
                    <fieldset className="fieldset relative">
                        <legend className="fieldset-legend">Password</legend>
                        <input type={isShowPassword ? "text" : "password"} {...register('password', { required: "Password is required" })} className="input" placeholder="Type Your Password" />
                        <span className="cursor-pointer absolute right-10 top-3.5 text-xl text-gray-400" onClick={() => setIsShowPassword(!isShowPassword)}>
                            {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </fieldset>
                    <button type="submit" className='w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-600 transition duration-300'>Register</button>
                </form>
                <p className='text-gray-600 text-center mt-4'>Don't have an account? <a href="/login" className='text-blue-500 hover:underline'>Register Now</a></p>
            </div>
        </div>
    );
};

export default RegisterPage;