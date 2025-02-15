"use client";

import Image from "next/image";

interface BankCardProps {
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  scLogo?: string;
  issuerLogo?: string; // Visa, Mastercard, etc.
  theme?: "classic" | "gold" | "platinum" | "signature" | "black" | "purple"; // Predefined themes
}

const BankCard: React.FC<BankCardProps> = ({
  cardNumber,
  cardHolderName,
  expirationDate,
  scLogo = "/assets/images/sans-contact.png",
  issuerLogo = "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
  theme = "classic", // Default theme
}) => {
  // Format the card number to show only the last 4 digits
  const formattedCardNumber = `●●●● ●●●● ●●●● ${cardNumber.slice(-4)}`;

  // Define themes with SVG backgrounds
  const themes = {
    classic: {
      backgroundImage: "url('/assets/svg/normal-card.svg')", // Blue pattern
      textColor: "text-black",
    },
    gold: {
      backgroundImage: "url('/assets/svg/gold-card.svg')", // Gold pattern
      textColor: "text-gray-900",
    },
    platinum: {
      backgroundImage: "url('/assets/svg/platinum-card.svg')", // Silver pattern
      textColor: "text-white",
    },
    signature: {
      backgroundImage: "url('/assets/svg/signature-card.svg')", // Purple pattern
      textColor: "text-white",
    },
    black: {
      backgroundImage: "url('/assets/svg/black-card.svg')", // Dark pattern
      textColor: "text-white",
    },
    purple: {
      backgroundImage: "url('/assets/svg/purple-card.svg')", // Purple pattern
      textColor: "text-white",
    },
  };

  // Get the selected theme
  const selectedTheme = themes[theme];

  return (
    <div
      className="relative h-56 w-80 overflow-hidden rounded-2xl p-6 shadow-2xl transition-transform hover:scale-105"
      style={{
        backgroundImage: selectedTheme.backgroundImage,
        backgroundSize: "cover",
      }}
    >
      {/* Bank Logo */}
      <div className="absolute right-6 top-6">
        <Image src={scLogo} alt="Bank Logo" width={30} height={30} />
      </div>

      {/* Issuer Logo (Visa, Mastercard, etc.) */}
      <div className="absolute bottom-6 right-6">
        <Image src={issuerLogo} alt="Issuer Logo" width={50} height={30} />
      </div>

      {/* Card Number */}
      <div
        className={`mt-10 font-mono text-xl tracking-widest ${selectedTheme.textColor}`}
      >
        {formattedCardNumber}
      </div>

      {/* Cardholder Name and Expiration Date */}
      <div
        className={`mt-6 flex justify-between text-sm ${selectedTheme.textColor}`}
      >
        <div>
          <p className="text-xs opacity-80">Cardholder Name</p>
          <p className="text-lg font-semibold">{cardHolderName}</p>
        </div>
        <div>
          <p className="text-xs opacity-80">Expires</p>
          <p className="text-lg font-semibold">{expirationDate}</p>
        </div>
      </div>

      {/* Chip Icon */}
      <div className="absolute bottom-6 left-6 rounded-lg">
        <Image
          src="/assets/images/chip.png"
          alt="Chip"
          width={40}
          height={30}
        />
      </div>

      {/* Embossed Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10" />
    </div>
  );
};

export default BankCard;
