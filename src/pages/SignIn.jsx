/***
 * 1. Implement incorrect id pwd sign in error
 */

import React, { useRef, useState } from "react";
import config from "../config";
import { isValidEmail, isValidPassword } from "../utils/validate";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [isSignin, setIsSignin] = useState(true);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const name = useRef();
  const email = useRef();
  const password = useRef();

  // PRIMARY BUTTON
  const handlePrimaryBtn = (e) => {
    e.preventDefault();

    !isValidEmail(email.current.value)
      ? setEmailError("Please enter a valid email address")
      : setEmailError(null);

    !isValidPassword(password.current.value)
      ? setPasswordError(
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
        )
      : setPasswordError(null);

    if (emailError || passwordError) {
      return;
    }

    if (!isSignin) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...
          console.log("USER ", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          console.log(" ERROR ", errorCode, errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("USER SIGNIN", user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(" ERROR SIGNIN", errorCode, errorMessage);

        });
    }
  };

  // SECONDARY BUTTON
  const handleSecondaryBtn = () => {
    setIsSignin(!isSignin);
  };
  return (
    <div
      style={{ backgroundImage: `url(${config.signInBackgroundImg})` }}
      className="text-slate-200 relative h-screen w-full bg-cover bg-center bg-no-repeat flex justify-center items-center"
    >
      <div className="w-5/6 md:w-1/2 px-8 py-16 max-w-[420px] bg-black opacity-80 rounded-l">
        <h2 className="text-2xl font-bold mb-8 text-slate-100">
          {isSignin ? "Sign In" : "Sign up"}
        </h2>
        <form action={handlePrimaryBtn} className="flex flex-col space-y-4">
          {!isSignin && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-4 border border-slate-300 rounded-l bg-stone-800"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email"
            className="p-4 border border-slate-300 rounded-l bg-stone-800"
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 border border-slate-300 rounded-l bg-stone-800"
          />
          {passwordError && !isSignin && <p className="text-red-500">{passwordError}</p>}
          {/* PRIMARY BUTTON */}
          <button
            onClick={handlePrimaryBtn}
            className="bg-red-700 text-xl py-2 mb-8 rounded-l cursor-pointer hover:bg-red-600"
          >
            {isSignin ? "Sign In" : "Sign up"}
          </button>
        </form>
        <p>
          {isSignin ? "New to FlixAI?" : "Already have an account?"}
          {/* SECONDARY BUTTON */}
          <span
            onClick={handleSecondaryBtn}
            className="cursor-pointer ml-2 text-slate-100 font-bold hover:underline"
          >
            {isSignin ? "Sign up now." : "Sign in."}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
