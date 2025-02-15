"use client";

import { useState } from "react";
import BankCard from "./BankCard";

interface UserBankCardsProps {
  user: {
    name: string;
    cards: {
      cardNumber: string;
      expirationDate: string;
      scLogo?: string;
      issuerLogo?: string;
      theme?:
        | "classic"
        | "gold"
        | "platinum"
        | "signature"
        | "black"
        | "purple";
    }[];
  };
}

const UserBankCards: React.FC<UserBankCardsProps> = ({ user }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="max-w-92 relative flex h-[280px] items-center justify-center">
      {user.cards.map((card, index) => (
        <div
          key={index}
          className="absolute cursor-pointer transition-transform"
          style={{
            transform: `translateY(${index * 10}px)`,
            zIndex:
              index === selectedIndex
                ? user.cards.length
                : user.cards.length - index,
          }}
          onClick={() => setSelectedIndex(index)}
        >
          <BankCard
            cardNumber={card.cardNumber}
            cardHolderName={user.name}
            expirationDate={card.expirationDate}
            issuerLogo={card.issuerLogo}
            theme={card.theme}
          />
        </div>
      ))}
    </div>
  );
};

export default UserBankCards;
