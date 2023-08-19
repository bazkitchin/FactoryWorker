import "./styles.css";
import Box from "./components/box";

export default function App() {
  return (
    <div>
      <h1>Box Drawing Example</h1>
      <Box width={200} height={200} color="black" />
      <Box width={150} height={150} color="red" />
    </div>
  );
}
