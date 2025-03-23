"use client";

import { exchangePublicToken, getPlaidLinkToken } from "@/lib/apiSpecific";
import React, { useCallback, useEffect, useState } from "react";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type PlaidLinkProps = {
  user: string;
  variant: string;
  email: string;
};

const PlaidLink = ({ user, variant, email }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Step 1: Loading state

  useEffect(() => {
    const getLinkToken = async () => {
      try {
        const data = await getPlaidLinkToken({
          userId: user || "",
        });

        if (data?.result) {
          setToken(data.result);
          console.log("Plaid link is:", data.result);
        } else {
          console.error("Failed to fetch Plaid link token.");
        }
      } catch (error) {
        console.error("Error fetching Plaid link token:", error);
      }
    };

    getLinkToken();
  }, [user]);

  /* eslint-disable camelcase */
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      console.log("Received public token:", public_token); // Verify here if the token is correct.

      // Step 2: Set loading state to true before starting the async operation
      setIsLoading(true);

      try {
        await exchangePublicToken({
          publicToken: public_token,
          userId: user,
        });

        // Step 3: Once the operation completes, trigger the route change
        router.replace(`/mfa/verif-email/${email}`);
      } catch (error) {
        // Handle any errors if needed
        console.error("Error during exchangePublicToken:", error);
      } finally {
        // Step 4: Reset the loading state once the operation is complete
        setIsLoading(false);
      }
    },
    [user, email, router]
  );

  /* eslint-enable camelcase */

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  if (!token) {
    return <div>Loading...</div>; // Or a loading spinner component
  }

  const renderButton = () => {
    switch (variant) {
      case "primary":
        return (
          <Button
            onClick={() => open()}
            disabled={!ready || isLoading} // Disable button while loading
            className="plaidlink-primary"
          >
            Connect bank
          </Button>
        );
      case "ghost":
        return (
          <Button
            onClick={() => open()}
            variant="ghost"
            className="plaidlink-ghost"
            disabled={isLoading} // Disable button while loading
          >
            <Image
              src="/icons/connect-bank.svg"
              alt="connect bank"
              width={24}
              height={24}
            />
            <p className="hiddenl text-black-2 text-[16px] font-semibold xl:block">
              Connect bank
            </p>
          </Button>
        );
      default:
        return (
          <Button
            onClick={() => open()}
            className="plaidlink-default"
            disabled={isLoading}
          >
            <Image
              src="/icons/connect-bank.svg"
              alt="connect bank"
              width={24}
              height={24}
            />
            <p className="text-black-2 text-[16px] font-semibold">
              Connect bank
            </p>
          </Button>
        );
    }
  };

  return (
    <>
      {/* Step 5: Show a loading spinner while the action is processing */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      {renderButton()}
    </>
  );
};

export default PlaidLink;
