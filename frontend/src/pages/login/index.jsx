import UserLayout from '@/layout/UserLayout'
import { useRouter } from 'next/router'
import React, { use, useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './style.module.css'
import { loginUser, registerUser } from '@/config/redux/action/authAction'
import { emptyMessage } from '@/config/redux/reducer/authReducer'

function LoginComponent() {

  const authState = useSelector((state) => state.auth)

  const router = useRouter();

  const dispath = useDispatch();

  const [userLoginMethod, setUserLoginMethod] = useState(false);

  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if(authState.loggedIn) {
      router.push("/dashboard")
    }
  }, [authState.loggedIn, router])

  useEffect(() => {
    if(localStorage.getItem("token")) {
      router.push("/dashboard")
    }
  }, [])

  useEffect(() => {
    dispath(emptyMessage());
  }, [userLoginMethod])

  const handleRegister = () => {
    console.log("Registering...");
    dispath(registerUser({ username, password, email, name })).then(() => {
      // Clear form fields after registration
      setUsername("");
      setName("");
      setEmailAddress("");
      setPassword("");
      // Switch to login mode
      setUserLoginMethod(true);
    })
  }

const handleLogin = () => {
  console.log("Logging in...");
  dispath(loginUser({ email, password }))
}


  return (
    <UserLayout>

      

      <div className={styles.container}>
      
        <div className={styles.cardContainer}>

          <div className={styles.cardContainer_left}>
            <p className={styles.cardleft_heading}> {userLoginMethod ? "Sign In" : "Sign Up"} </p>

            {authState.message && <p style={{color: authState.isError ? "red" : "green"}}> {authState.message?.message || authState.message} </p>}

              <div className={styles.inputContainers}>

                {!userLoginMethod &&

                <div>
                  <input onChange={(e) => setUsername(e.target.value)} className={styles.inputField} type='text' placeholder='Username' />
                  <input onChange={(e) => setName(e.target.value)} className={styles.inputField} style={{marginTop: "1.5rem"}} type='text' placeholder='Name' />
                </div> }

                <input onChange={(e) => setEmailAddress(e.target.value)} className={styles.inputField} type='text' placeholder='Email' />

                <input onChange={(e) => setPassword(e.target.value)} className={styles.inputField} type='password' placeholder='Password' />
                
                <div onClick={() => {
                  if(userLoginMethod) {
                    handleLogin();
                  }
                  else {
                    handleRegister();
                  }
                }} className={styles.buttonWithOutline}>

                  <p> {userLoginMethod ? "Sign In" : "Sign Up"} </p>
                  
                </div>               

              </div>

          </div>

          <div className={styles.cardContainer_right}>
            
                {userLoginMethod ? "Don't have an account?" : "Already have an account?"}
                

                <div onClick={() => {
                  setUserLoginMethod(!userLoginMethod)
                }} style={{color: "black", textAlign: "center"}} className={styles.buttonWithOutline}>

                  <p> {userLoginMethod ? "Sign Up" : "Sign In"} </p>
                  
                </div>      

          </div>

        </div>
      </div>

    </UserLayout>
  )
}

export default LoginComponent
