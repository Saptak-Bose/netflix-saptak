import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

type Props = {};

type Inputs = {
  email: string;
  password: string;
};

const Login = (props: Props) => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div>
      <Head>
        <title>Netflix - Log In or Sign Up to Your Account</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
        <Image
          className="object-cover -z-10 !hidden opacity-60 sm:!inline"
          src="https://firebasestorage.googleapis.com/v0/b/storage-15b1a.appspot.com/o/netflix-banner.png?alt=media&token=4da0c8ee-0c93-4f63-9b1d-56eb9c9d8f2b"
          fill
          alt="Login Banner"
        />

        <Link href="/">
          <img
            className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
            src="https://rb.gy/ulxxee"
            width={150}
            height={150}
            alt="Netflix Logo"
          />
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        >
          <h1 className="text-4xl font-semibold">Sign In</h1>
          <div className="space-y-4">
            <label className="inline-block w-full">
              <input
                className="input"
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="p-1 text-[13px] font-light text-orange-500">
                  Please enter a valid email.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
              <input
                className="input"
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="p-1 text-[13px] font-light text-orange-500">
                  Your password must contain 8 to 60 characters.
                </p>
              )}
            </label>
          </div>

          <button
            type="submit"
            onClick={() => setLogin(true)}
            className="w-full rounded bg-[#e50914] py-3 font-semibold"
          >
            Sign In
          </button>

          <div className="text-[gray]">
            New to Netflix?{" "}
            <button
              type="submit"
              onClick={() => setLogin(false)}
              className="text-white hover:underline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
