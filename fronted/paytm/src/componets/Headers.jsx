import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Headers = () => {
    const token = localStorage.getItem('token');

    const history = useNavigate();
    return (
        <header className="rounded-none bg-slate-400 pt-0 mt-0 h-10 flex items-center justify-between px-4">
            <div>
                <h1 className="text-xl font-bold">Paytm</h1>
            </div>
            <nav>
                <ul className="flex mx-3">
                    {token ? (
                        <li>
                            <button onClick={() => {
                                localStorage.removeItem('token');
                                history('/signin')

                            }} className="hover:underline">
                                Logout
                            </button>
                        </li>
                    ) : (
                        <>
                            <li className="mx-3">
                                <Link to="/signin" className="hover:underline">Sign In</Link>
                            </li>
                            <li className="mx-3">
                                <Link to="/signup" className="hover:underline">Sign Up</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Headers;
