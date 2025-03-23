"use client";

import { connectedtUser } from "@/redux/user/userSlice";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import PlaidLink from "@/components/plaid/PlaidLink";
import { motion } from "framer-motion";

const ConnectBankPage = () => {
  const currentUser = useSelector(connectedtUser);

  const userId = currentUser?.id || "";
  const email = currentUser?.email || "";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-col items-center"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/svg/logo_V1.svg"
            width={40}
            height={40}
            alt="Smart Finance logo"
            className="rounded-lg"
          />
          <h1 className="text-2xl font-bold text-gray-900">Smart Finance</h1>
        </Link>
      </motion.header>

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center shadow-md"
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Connect Your Bank Account
        </h2>
        <p className="mb-6 text-gray-600">
          Securely link your bank account to get started.
        </p>
        <PlaidLink user={userId} variant="primary" email={email} />
      </motion.div>
    </div>
  );
};

export default ConnectBankPage;
