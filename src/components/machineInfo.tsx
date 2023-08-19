type machineType = {
  name: string;
  colour: string;
};

type machine = {
  name: string;
  type: machineType;
  floor: number;
  x: number;
  y: number;
  links: machine[];
};

const type1: machineType = { name: "Office", colour: "blue" };
const type2: machineType = { name: "Assembly", colour: "green" };
const type3: machineType = { name: "Fabrication", colour: "black" };
const type4: machineType = { name: "Chemical", colour: "yellow" };

const machine1: machine = {
  name: "Board Room",
  type: type1,
  floor: 3,
  x: 1,
  y: 1,
  links: [],
};

export default machine1;
