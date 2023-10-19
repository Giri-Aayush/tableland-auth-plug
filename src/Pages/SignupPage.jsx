import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SignupValidation } from "../ValidatePages"; // Ensure this import path is correct

const initialValues = { username: "", email: "", password: "" };

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, touched } = useFormik({
    validationSchema: SignupValidation,
    initialValues: initialValues,
  });

  const signupHandle = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/user/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='justify-center items-center flex h-screen'
      style={{ backgroundImage: "linear-gradient(to right,white,blue,white" }}
    >
      <div className='bg-white p-4 gap-4 rounded-md flex flex-col'>
        {loading ? (
          <p>Account creation transaction is under process. Please wait...</p>
        ) : (
          <>
            <h4 className='font-bold text-center'>Sign Up</h4>
            <div className='flex gap-2 items-center bg-white rounded-full shadow-lg px-2'>
              <span className='w-10 h-10'>
                <FaUserCircle className='w-full h-full text-violet-800' />
              </span>
              <span>
                <input
                  type='text'
                  placeholder='Username'
                  name='username'
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='outline-none w-60'
                />
              </span>
            </div>
            {errors.username && touched.username && (
              <p className='text-red-800 text-md'>{errors.username}</p>
            )}
            <div className='flex gap-2 items-center bg-white rounded-full shadow-lg px-2'>
              <span className='w-10 h-10'>
                <MdEmail className='w-full h-full text-violet-800' />
              </span>
              <span>
                <input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='outline-none w-60'
                />
              </span>
            </div>
            {errors.email && touched.email && (
              <p className='text-red-800 text-md'>{errors.email}</p>
            )}
            <div className='flex gap-2 items-center bg-white rounded-full shadow-lg px-2'>
              <span className='w-10 h-10'>
                <RiLockPasswordFill className='w-full h-full text-violet-800' />
              </span>
              <span>
                <input
                  type='text'
                  placeholder='Password'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='outline-none w-60'
                />
              </span>
            </div>
            {errors.password && touched.password && (
              <p className='text-red-800 text-md'>{errors.password}</p>
            )}
            <span className='text-center'>
              <button
                onClick={signupHandle}
                disabled={loading}
                className='bg-violet-800 px-4 py-2 text-white text-xl rounded-md'
              >
                Register
              </button>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
