"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const login = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        password: "",
        email: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log("Login success", response.data);
        toast.success("Login success");
        router.push("/profile");
      } catch (error) {
        console.log("Login failed");
        console.log(error.message);
      } finally{
        setLoading(false);
      }
    }

    useEffect(() => {
     if(user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
     } else {
      setButtonDisabled(true);
     }
    }, [user])
    

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Proceesing" : "Login"}</h1>
      <hr />
      <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
      <label htmlFor="password">Password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button onClick={onLogin}  className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" >Login here</button>
            <Link href="/signup" >Visit Signup page</Link>
    </div>
  )
}

export default login