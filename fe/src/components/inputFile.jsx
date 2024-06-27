import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 h-[10vw]">
      <Input id="picture" type="file" className="w-full h-full" />
    </div>
  );
}
