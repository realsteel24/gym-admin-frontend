import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";
import { MemberFeeOptions } from "@/hooks";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface GenderPieChartProps {
  memberFees: MemberFeeOptions[];
}

export const GenderPie: React.FC<GenderPieChartProps> = ({ memberFees }) => {
  // Count members by gender
  const genders: { [key: string]: number } = {};
  memberFees.forEach((member) => {
    const gender = member.Member.User.gender;
    if (gender in genders) {
      genders[gender]++;
    } else {
      genders[gender] = 1;
    }
  });

  // Prepare data for pie chart
  const genderData = Object.keys(genders).map((key) => ({
    name: key,
    value: genders[key],
  }));

  // Define chart configuration
  const chartConfig: ChartConfig = {
    male: {
      label: "Male",
      color: "hsl(var(--chart-1))", // Example color
    },
    female: {
      label: "Female",
      color: "hsl(var(--chart-2))", // Example color
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-3))", // Example color
    },
  };

  return (
    <div className="col-span-2">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie Chart - Gender Distribution</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square min-h-[200px] max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                label
                outerRadius={80}
              >
                {genderData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartConfig[entry.name]?.color || "red"} // Fallback color
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
