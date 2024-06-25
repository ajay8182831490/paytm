import React from 'react';
import { Link } from "react-router-dom";

const Signin = () => {
    return (
        <div className='h-screen flex items-center justify-center bg-slate-600'>
            <div className='flex flex-col bg-white p-8 rounded-lg shadow-md'>
                <div className='text-center mb-4'>
                    <h1 className='text-2xl font-bold'>Sign-in</h1>
                </div>
                <div className='flex flex-col space-y-4'>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='mb-1'>Email</label>
                        <input id="email" type="email" placeholder='john@gmail.com' className='p-2 border rounded' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password" className='mb-1'>Password</label>
                        <input id="password" type="password" placeholder='enter your password' className='p-2 border rounded' />
                    </div>
                </div>
                <div className='flex justify-center mt-4 space-x-4'>
                    <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Submit</button>
                    <Link to='/signup' className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>Signup</Link>
                </div>
            </div>
        </div>
    );
}

export default Signin;
