import Box from "./box";
import machine1 from "./machineInfo";

const FaultCard: React.FC = () => {
  const string = { machine1 };
  return (
    <Box width={200} height={200} color="blue">
      <h1>{machine1.name}</h1>
    </Box>
  );
};
