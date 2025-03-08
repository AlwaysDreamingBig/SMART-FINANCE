import { Transaction } from "@/types";
import React from "react";

interface BarChartProps {
  transactions: Transaction[];
  width?: number;
  height?: number;
  barWidth?: number;
  spacing?: number;
  bottomMargin?: number;
}

const IncomeBarChart: React.FC<BarChartProps> = ({
  transactions,
  width = 800,
  height = 200,
  barWidth = 80,
  spacing = 10,
  bottomMargin = 15,
}) => {
  const incomeTransactions = React.useMemo(
    () => transactions.filter((t) => t.type === "income"),
    [transactions]
  );

  const categoryGroups = React.useMemo(
    () =>
      incomeTransactions.reduce(
        (acc, transaction) => {
          const category = transaction.category || "Uncategorized";

          if (!acc[category]) acc[category] = [];

          acc[category].push(transaction);

          return acc;
        },
        {} as Record<string, Transaction[]>
      ),
    [incomeTransactions]
  );

  const calculateCategoryWidth = (category: string) => {
    const charWidth = 7; // Approximate width per character

    const baseWidth = barWidth;

    const textWidth = category.length * charWidth;

    return Math.max(baseWidth, textWidth) + spacing;
  };

  const categoryPositions = React.useMemo(() => {
    let currentX = spacing;

    return Object.keys(categoryGroups).map((category) => {
      const width = calculateCategoryWidth(category);

      const position = { x: currentX, width };

      currentX += width + spacing;

      return position;
    });
  }, [categoryGroups, barWidth, spacing]);

  const totalWidth = React.useMemo(
    () =>
      categoryPositions.reduce(
        (sum, pos) => sum + pos.width + spacing,
        spacing
      ),

    [categoryPositions]
  );

  const maxTotal = React.useMemo(() => {
    const totals = Object.values(categoryGroups).map((group) =>
      group.reduce((sum, t) => sum + t.amount, 0)
    );

    return Math.max(...totals, 0);
  }, [categoryGroups]);

  const getCategoryColor = (categoryIndex: number) => {
    const colors = [
      "#4CAF50",
      "#2196F3",
      "#FF9800",
      "#9C27B0",

      "#E91E63",
      "#00BCD4",
      "#8BC34A",
      "#FF5722",
    ];

    return colors[categoryIndex % colors.length];
  };

  if (incomeTransactions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No income transactions to display
      </div>
    );
  }

  return (
    <div className="flex size-full items-center justify-center overflow-x-auto p-4">
      <svg
        viewBox={`0 0 ${totalWidth} ${height + bottomMargin}`}
        width={totalWidth}
        height="100%"
        style={{ minWidth: width, overflow: "visible" }}
      >
        <path
          d={`M${spacing - 10} 20 L${spacing - 10} ${height - 40}`}
          stroke="#ddd"
          strokeWidth={1}
        />

        <path
          d={`M${spacing - 10} ${height - 40} L${totalWidth} ${height - 40}`}
          stroke="#ddd"
          strokeWidth={1}
        />

        {Object.entries(categoryGroups).map(
          ([category, transactions], categoryIndex) => {
            const total = transactions.reduce((sum, t) => sum + t.amount, 0);

            const { x, width: catWidth } = categoryPositions[categoryIndex];

            let yOffset = height - 40;

            const categoryColor = getCategoryColor(categoryIndex);

            return (
              <g key={category} transform={`translate(${x}, 0)`}>
                {transactions.map((transaction) => {
                  const barHeight =
                    (transaction.amount / maxTotal) * (height - 60);

                  const y = yOffset - barHeight;

                  yOffset = y;

                  return (
                    <rect
                      key={`${category}-${transaction.id}`}
                      x={(catWidth - barWidth) / 2} // Centering the bar within the category width
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      fill={categoryColor}
                      rx={3}
                    >
                      <title>
                        {transaction.description}: $
                        {transaction.amount.toFixed(2)}
                      </title>
                    </rect>
                  );
                })}

                {/* Centered category label */}

                <text
                  x={catWidth / 2} // Centering the label under the bar
                  y={height - 25} // Positioning just below the graph
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#666"
                >
                  {category}
                </text>

                {/* Total value */}

                <text
                  x={catWidth / 2} // Centering total value under the bar
                  y={yOffset - 8}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="500"
                  fill="#2c3e50"
                >
                  ${total.toFixed(2)}
                </text>
              </g>
            );
          }
        )}
      </svg>
    </div>
  );
};

export default IncomeBarChart;
