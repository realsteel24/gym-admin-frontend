import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardProps {
  cardTitle: string;
  buttonTitle?: string;
  cardFunction?: () => void;
  children?: React.ReactNode;
  type: "buttonedCard" | "elementCard";
}

export function CardMenu({
  cardTitle,
  cardFunction,
  children,
  type,
  buttonTitle,
}: CardProps) {
  return (
    <div className="col-span-1">
      <Card className="w-full h-full min-h-[200px] dark:bg-black flex flex-col">
        <div className="flex flex-col flex-1 text-center items-center">
          <CardHeader>
            <CardTitle>{cardTitle}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            {type === "buttonedCard" ? (
              <Button variant={"outline"} onClick={cardFunction}>
                {buttonTitle}
              </Button>
            ) : (
              children
            )}
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </div>
      </Card>
    </div>
  );
}
