import { subscriptionData } from "@/constants";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SubscriptionChart = () => {
  const [data, setData] = useState<any[]>([]);

  // Fetch data from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setData(subscriptionData);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally handle the error state here
      }
    };

    fetchData();
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Recurring Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} stackOffset="sign">
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Netflix" stackId="a" fill="#E50914" name="Netflix" />
          <Bar dataKey="Spotify" stackId="a" fill="#1DB954" name="Spotify" />
          <Bar dataKey="Gym" stackId="a" fill="#FF9F1C" name="Gym" />
          <Bar dataKey="Software" stackId="a" fill="#6366F1" name="Software" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubscriptionChart;
