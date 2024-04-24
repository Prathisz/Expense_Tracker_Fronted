// import React, { useState } from 'react';

// const LoginForm = () => {
    
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();
   

//     // Basic validation
//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     // You can add your login logic here, e.g., calling an API

//     // Clear form fields
//     setEmail('');
//     setPassword('');
//     setError('');
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={handleEmailChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={handlePasswordChange}
//             required
//           />
//         </div>
//         {error && <div style={{ color: 'red' }}>{error}</div>}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
export default function Login() {
  const [cookies,setcookie]=useCookies([])
  const nav=useNavigate()
    const handlesubmit=((e)=>{
    e.preventDefault();
    const email=document.querySelector(".email").value;
    const password=document.querySelector(".password").value;
    fetch('http://localhost:8000/user/login',{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({
        emailID:email,
        password:password
      })
    }).then(res => res.json())
    .then(data=>{
      const {status,accesstoken}=data;
      if(status.toLowerCase()==="success"){
         setcookie('token',accesstoken,{maxAge:3600})
        const error=document.querySelector(".error");
        error.textContent="Login successful!!"
        error.style.display="block"
        setTimeout(()=>{nav('/Expense')},1000)
      }
      else{
        const error=document.querySelector(".error");
        error.style.display="block"
      }
    });
    })
    
  return (
    <div className="loginform">
        <form  id='loginform' onSubmit={handlesubmit}>
        <input type="email" className="email" placeholder='Enter Email'required/>
        <input type="password" className="password" placeholder='Enter Password' required/>
        <button type="submit">Login</button>
        <p className="error">User Not Found, Try to Register</p>
        </form>
  
    </div>
  )
}
