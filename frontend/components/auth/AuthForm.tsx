"use client";

import { login, register } from "@/lib/apiSpecific";
import { extractHttpErrorMessage } from "@/lib/error-handler";
import {
  AuthApiResponse,
  initAuthApiResponse,
  succeedAuthResponseHandler,
  User,
} from "@/lib/response-handler";
import { authFormSchema } from "@/lib/utils";
import { startSession } from "@/redux/session/sessionSlice";
import {
  signError,
  signInFailure,
  signInStart,
  signInSuccess,
  signLoading,
} from "@/redux/user/userSlice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import CustomInput from "../CustomInput";
import SocialButtons from "./SocialButton";

type FormType = "sign-in" | "sign-up";

const AuthForm = ({ type }: { type: FormType }) => {
  const isLoading = useSelector(signLoading);
  const error = useSelector(signError);

  const dispatch = useDispatch();
  const [failure, setFailure] = useState<boolean>(false);
  const [success, setSuccess] = useState<AuthApiResponse>(initAuthApiResponse);
  const [message, setMessage] = useState<string | null>(null);

  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "client",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    dispatch(signInStart());

    try {
      let responseData;

      if (type === "sign-in") {
        responseData = await login({
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
      } else if (type === "sign-up") {
        responseData = await register({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          role: formData.role,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
      }

      // Ensure responseData is defined before accessing its properties
      if (!responseData) {
        throw new Error("No response data received");
      }

      if ("success" in responseData && responseData.success === false) {
        dispatch(signInFailure(responseData.message));
        setFailure(true);
        return;
      }

      const user = succeedAuthResponseHandler(responseData, "user") as User;
      dispatch(signInSuccess(user));

      const responseMessage = succeedAuthResponseHandler(
        responseData,
        "message"
      ) as string;
      setMessage(responseMessage);

      if (type === "sign-in") {
        const token = succeedAuthResponseHandler(
          responseData,
          "token"
        ) as string;
        dispatch(startSession({ sessionToken: token, sessionExpiry: "" }));
      }

      setSuccess(responseData);
    } catch (err) {
      const errorString = err instanceof Error ? err.message : String(err);
      const errorMessage = extractHttpErrorMessage(errorString);
      setFailure(true);
      dispatch(signInFailure(errorMessage));
    }
  };

  return (
    <section className="auth-form px-10">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image
            src="/assets/svg/logo_V1.svg"
            width={34}
            height={34}
            alt="Smart Finance logo"
            className="rounded-lg"
          />
          <h1 className="h2 g:h1 font-ibm-plex-serif text-black-1 font-bold">
            Smart-Finace3
          </h1>
        </Link>
      </header>

      <h1 className="form-title">
        {type === "sign-in" ? "Sign In" : "Sign Up"}
      </h1>

      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Inputs for email and password */}
            <CustomInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
            />

            <CustomInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
            />

            {type === "sign-up" && (
              <>
                <CustomInput
                  control={form.control}
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Enter your password"
                />
                <div className="flex gap-4">
                  <CustomInput
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                  />
                  <CustomInput
                    control={form.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your first name"
                  />
                </div>
                <CustomInput
                  control={form.control}
                  name="address1"
                  label="Address"
                  placeholder="Enter your specific address"
                />
                <CustomInput
                  control={form.control}
                  name="city"
                  label="City"
                  placeholder="Enter your city"
                />
                <div className="flex gap-4">
                  <CustomInput
                    control={form.control}
                    name="state"
                    label="State"
                    placeholder="Example: NY"
                  />
                  <CustomInput
                    control={form.control}
                    name="postalCode"
                    label="Postal Code"
                    placeholder="Example: 11101"
                  />
                </div>
                <div className="flex gap-4">
                  <CustomInput
                    control={form.control}
                    name="dateOfBirth"
                    label="Date of Birth"
                    placeholder="YYYY-MM-DD"
                  />
                  <CustomInput
                    control={form.control}
                    name="ssn"
                    label="SSN"
                    placeholder="Example: 1234"
                  />
                </div>
              </>
            )}

            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="shad-submit-btn"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    &nbsp; Loading...
                  </>
                ) : type === "sign-in" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </form>
        </Form>

        {success && <div className="text-center text-green-500">{message}</div>}
        {failure && <div className="text-center text-red-500">{error}</div>}

        {/* Separator */}
        <div className="my-6 flex items-center">
          <div className="grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="grow border-t border-gray-300"></div>
        </div>

        {/* Social Buttons Section */}
        <SocialButtons type={type} />

        <footer className="flex justify-center gap-1">
          <p className="text-14 font-normal text-gray-600">
            {type === "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <Link
            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            className="text-brand"
          >
            {type === "sign-in" ? "Sign up" : "Sign in"}
          </Link>
        </footer>
      </>
    </section>
  );
};

export default AuthForm;
