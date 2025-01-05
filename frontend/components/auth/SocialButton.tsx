import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SocialButtonProps {
  icon: IconDefinition;
  label: string;
  type: string;
  onClick: () => void;
}

const SocialButton: React.FC<SocialButtonProps & { color: string }> = ({
  icon,
  label,
  onClick,
  color,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center rounded-lg border p-3 shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
    >
      <FontAwesomeIcon
        icon={icon}
        className={`mr-2 text-xl ${color}`}
        width={20}
      />
      <span className="font-medium text-gray-700">
        <span className="hidden sm:inline">
          {type === "sign-in"
            ? `Sign in with ${label}`
            : `Sign up with ${label}`}
        </span>
        <span className="sm:hidden">{label}</span>
      </span>
    </button>
  );
};

const SocialButtons = ({ type }: { type: string }) => {
  return (
    <div className="space-y-3">
      <SocialButton
        icon={faGoogle}
        label="Google"
        color="text-red-600" // Google red
        onClick={() => console.log("Google Login")}
        type={type}
      />
      <div className="flex gap-4">
        <SocialButton
          icon={faFacebook}
          label="Facebook"
          color="text-blue-600" // Facebook blue
          onClick={() => console.log("Facebook Login")}
          type={type}
        />
        <SocialButton
          icon={faGithub}
          label="GitHub"
          color="text-gray-800" // GitHub black
          onClick={() => console.log("GitHub Login")}
          type={type}
        />
      </div>
    </div>
  );
};

export default SocialButtons;
