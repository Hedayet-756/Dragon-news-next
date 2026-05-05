'use client';

import { useForm } from "react-hook-form";

const LoginPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const handleLoginFunc = (data) => {
        console.log('Login Data:', data);
    }

    console.log('watch', watch());

    // const handleLoginFunc = (e) => {
    //     e.preventDefault();
    //     const email = e.target.email.value;
    //     const password = e.target.password.value;
    //     console.log('Email:', email);
    //     console.log('Password:', password);
    // }

    return (
        <div className='container mx-auto min-h-[80vh] flex flex-col items-center justify-center bg-slate-100 rounded-lg shadow-md'>
            <div className='p-4 r;ounded-xl bg-white shadow-md mb-6'>
                <h1 className='text-3xl font-bold text-center mb-4'>Login Your Account</h1>
                <form className='space-y-4' onSubmit={handleSubmit(handleLoginFunc)}>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email</legend>
                        <input type="email" {...register('email', { required: "Email is required" })} className="input" placeholder="Type Your Email" />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input type="password" {...register('password', { required: "Password is required" })} className="input" placeholder="Type Your Password" />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </fieldset>
                    <button type="submit" className='w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-600 transition duration-300'>Login</button>
                </form>
                <p className='text-gray-600 text-center mt-4'>Don't have an account? <a href="/register" className='text-blue-500 hover:underline'>Register here</a></p>
            </div>
        </div>
    );
};

export default LoginPage;