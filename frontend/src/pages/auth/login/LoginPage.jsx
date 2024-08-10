import { useState } from "react";
import { Link } from "react-router-dom";
import XSvg from "../../../components/svgs/X";
import { MdOutlineMail, MdPassword } from "react-icons/md";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isError = false;

  return (
    <div className='max-w-screen-xl mx-auto flex h-screen'>
      <div className='flex-1 hidden lg:flex items-center justify-center'>
        <XSvg className='w-2/3 fill-white' /> {/* Adjusted size */}
      </div>
      <div className='flex-1 flex flex-col justify-center items-center bg-black'>
        <form className='flex gap-4 flex-col w-full max-w-sm px-6' onSubmit={handleSubmit}>
          <XSvg className='w-32 lg:hidden fill-white mb-4' /> {/* Adjusted size and added margin */}
          <h1 className='text-4xl font-extrabold text-white mb-6'>{"Let's"} go.</h1>
          <label className='input input-bordered rounded flex items-center gap-2'>
            <MdOutlineMail />
            <input
              type='text'
              className='grow text-lg'
              placeholder='username'
              name='username'
              onChange={handleInputChange}
              value={formData.username}
            />
          </label>
          <label className='input input-bordered rounded flex items-center gap-2'>
            <MdPassword />
            <input
              type='password'
              className='grow text-lg'
              placeholder='Password'
              name='password'
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className='btn rounded-full btn-primary text-white text-lg py-2'>Login</button> {/* Adjusted size */}
          {isError && <p className='text-red-500 mt-2'>Something went wrong</p>}
        </form>
        <div className='flex flex-col gap-2 mt-4'>
          <p className='text-white text-lg'>{"Don't"} have an account?</p>
          <Link to='/signup'>
            <button className='btn rounded-full btn-primary text-white btn-outline w-full text-lg py-2'>Sign up</button> {/* Adjusted size */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
