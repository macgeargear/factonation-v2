"use client";

import * as React from "react";

// import { cn } from "@/lib/utils";
// import { Icons } from "./Icon";
// import { Button } from "./ui/Button";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
import Link from "next/link";
import Image from "next/image";
import smallLogo from "../../public/small-logo.png";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { host } from "@/lib/utils";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  page: UserAuthFormPage;
}

export enum UserAuthFormPage {
  LogIn,
  Register,
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const page: UserAuthFormPage = props.page;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();
  const { login } = useAuthContext();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    if (page === UserAuthFormPage.LogIn) {
      try {
        await login(email, password);
        router.push("/");
      } catch (err) {
        console.log(err);
      }
    }

    if (page === UserAuthFormPage.Register) {
      const userInfo = {
        email: email,
        name: name,
        password: password,
      };

      try {
        const response = await fetch(`http://${host}/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        });
        if (response.status !== 201) {
          console.log("error");
        } else {
          router.push("/auth/login");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div
          className={
            page === UserAuthFormPage.LogIn ? "flex flex-col items-center" : ""
          }
        >
          <Image
            className="h-10 w-auto"
            src={smallLogo}
            alt="Factonation logo"
          />
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {page === UserAuthFormPage.LogIn ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
          </h2>

          {page === UserAuthFormPage.LogIn ? (
            <p className="mt-2 text-sm leading-6 text-gray-500">
              ยังไม่ได้เป็นสมาชิก?{" "}
              <Link
                href="/auth/register"
                className="font-semibold text-primary-button hover:text-accent"
              >
                สมัครทันที
              </Link>
            </p>
          ) : (
            <p className="mt-2 text-sm leading-6 text-gray-500">
              เป็นสมาชิกกับเราแล้ว?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-primary-button hover:text-accent"
              >
                เข้าสู่ระบบ
              </Link>
            </p>
          )}
        </div>

        <form onSubmit={onSubmit} action="#" method="POST">
          <div className="mt-10">
            <div className="space-y-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                อีเมลล์
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>

              {page === UserAuthFormPage.Register ? (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ชื่อ
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      id="name"
                      name="name"
                      type="name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  รหัสผ่าน
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6 text-gray-700"
                  >
                    จดจำฉัน
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <a
                    href="#"
                    className="font-semibold primary-button  text-primary-button hover:text-accent"
                  >
                    ลืมรหัสผ่าน?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary-button px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {page === UserAuthFormPage.LogIn
                    ? "เข้าสู่ระบบ"
                    : "สมัครสมาชิก"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
