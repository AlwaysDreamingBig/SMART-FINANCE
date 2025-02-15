"use client";

import UserBankCards from "./UserBankCards";

const exampleUser = {
  name: "Agnès Yakam",
  cards: [
    {
      cardNumber: "1234567812345678",
      expirationDate: "12/25",
      theme: "gold" as const,
    },
    {
      cardNumber: "9876543210987654",
      expirationDate: "08/24",
      theme: "platinum" as const,
    },
    {
      cardNumber: "5555444433332222",
      expirationDate: "05/26",
      theme: "black" as const,
    },
  ],
};

const BankCardsSection = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <UserBankCards user={exampleUser} />
    </div>
  );
};

export default BankCardsSection;
