import { User } from "@/types";
import React from "react";
import HomeDashboard from "@/components/dashboards/HomeDashboard/HomeDashboard";

const sampleUser: User = {
  $id: "usr_123456",
  email: "agnesyakam@gmail.com",
  userId: "abc123",
  firstName: "Agnès",
  lastName: "Yakam",
  name: "Agnès Yakam",
  addresse: "123 Main St",
  city: "New York",
  state: "NY",
  postalCode: "10001",
  dateOfBirth: "1990-05-15",
  ssn: "123-45-6789",
  connectionStatus: "online",
};

const page = () => {
  return (
    <div>
      <HomeDashboard user={sampleUser} />
    </div>
  );
};

export default page;
