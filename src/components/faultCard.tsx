import * as machine from "./machineInfo";

export type faultCard = {
  machineRef: machine.machine;
  name: string;
  type: machine.machineType;
  floor: number;
  x: number;
  y: number;
};

export let faultDeck: faultCard[] = [];

export function buildFaultCards() {
  faultDeck = [];
  for (let i = 0; i < 48; i++) {
    let newfaultCard: faultCard = {
      machineRef: machine.machineList[i],
      name: machine.machineList[i].name,
      type: machine.machineList[i].type,
      floor: machine.machineList[i].floor,
      x: machine.machineList[i].x,
      y: machine.machineList[i].y,
    };
    faultDeck.push(newfaultCard);
  }
}
