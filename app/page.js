import { Button } from "@/components/ui/button";
import Provider from "./provider";

export default function Home() {
  return (
    <div>
      <h2>Hello Next JS</h2>
      <Button>Click me</Button>
      <Provider />
    </div>
  );
}
