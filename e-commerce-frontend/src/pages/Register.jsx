import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Link } from 'react-router'
import { signUp } from '../lib/api';

const Register = () => {
// const [isadmin , setIsadmin] = useState(false)
const [signupData,setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
})
const queryClient = useQueryClient()
const {mutate:signupMutate}=useMutation({
  mutationFn:signUp,
  onSuccess:()=>{
    queryClient.invalidateQueries({queryKey:['authUser']})
  }
})

  const handleSignup = async(e) => {
        e.preventDefault()
        signupMutate(signupData)
  };
  return (
     <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8'>
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>

    {/* left side  */}
    <div className='flex items-center w-full lg:w-1/2 sm:p-4 flex-col'>
 
 <div className='w-full '>
      <form onSubmit={handleSignup}>
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold'>Create an Account</h2>
          {/* <p className='text-sm opacity-70'>Join chatify </p> */}
        </div>

        <div className='space-y-3'>
          <div className='form-control flex flex-col gap-2 w-full'>
            <label className="label">
              <span className='label-text font-semibold'>
                UserName
              </span>
            </label>
            <input type="text" placeholder='John doe' className=' border rounded-lg bg-primary p-2 w-full' value={signupData.fullName} onChange={(e)=>setSignupData({
              ...signupData,fullName:e.target.value
            })} required/>
          </div>

          <div className='form-control flex flex-col gap-2 w-full'>
            <label className="label">
              <span className='label-text font-semibold'>
                Email 
              </span>
            </label>
            <input type="email" placeholder='johndoe@gmail.com' className='input border w-full bg-primary p-2 rounded-lg' value={signupData.email} onChange={(e)=>setSignupData({
              ...signupData,email:e.target.value
            })} required/>
          </div>

          <div className='form-control w-full flex flex-col gap-2'>
            <label className="label">
              <span className='label-text font-semibold'>
                Password
              </span>
            </label>
            <input type="password" placeholder='enter your password' className='input input-bordered w-full bg-primary p-2 rounded-lg ' value={signupData.password} onChange={(e)=>setSignupData({
              ...signupData,password:e.target.value
            })} required/>
            <p className='text-xs font-semibold mt-1 opacity-70'>password must be atleast 6 characters</p>
          </div>

          <div className='form-control'>
            <label className="label cursor-pointer justify-start gap-3 flex">
              <input type="checkbox" className='checkbox rounded-full ml-2 ' required/>
              <span className='label-text font-semibold '>
                I agree to the {' '}
              <span className='text-primary hover:underline'>terms of servces{" "}</span>
              <span className='text-primary hover:underline'>privacy policy</span>
              </span>
            </label>
          </div>
        </div>

        <button className='btn btn-primary w-full hover:scale-105 hover:bg-primary bg-green-500 p-2 rounded-full ' type='submit' >
          Create Account
          </button>

        <div className='text-center mt-4'>
          <p className='text-sm font-serif'>Already have an account?{" "}</p>
          <Link className='text-primary hover:underline' to={'/login'}>Sign in</Link>
        </div>
      </form>

     </div>
    </div>

{/* right side */}
<div className='hidden lg:flex w-full lg:w-1/2 bg-primary items-center justify-center'>
  <div className='max-w-md p-8 '>
    <div className='relative aspect-square max-w-sm mx-auto'>
    <img src="/Ecommerce-Image.png" alt="signup image" className='w-full h-full' />
    </div>

  <div className='text-center space-y-3 mt-5'>
    <h2 className='text-xl font-semibold'>Connect with people</h2>
    <p className='opacity-70 font-serif'>practice conversation , make friends and improve your leanguae skills together </p>
  </div>
  </div>
</div>
      </div>
    </div>  )
}

export default Register