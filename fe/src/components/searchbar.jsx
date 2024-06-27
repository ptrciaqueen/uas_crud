import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function InputWithButton() {
  return (
    <div className="flex w-[50vw] items-center space-x-2">
      <Input type="text" placeholder="Search" />
      <Button type="submit" className="w-[10rem]">
        Search
      </Button>
    </div>
  );
}
