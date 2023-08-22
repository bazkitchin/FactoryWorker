import {
  machineType,
  type1,
  type2,
  type3,
  type4,
  type5,
  type6,
} from "./machineInfo";

export type spanner = {
  type: machineType;
};

export type player = {
  name: string;
  spanners: spanner[];
};

export let spannerDeck: spanner[];

export function makeSpannerDeck() {
  for (let i = 0; i < 12; i++) {
    let spanner1: spanner = { type: type1 };
    let spanner2: spanner = { type: type2 };
    let spanner3: spanner = { type: type3 };
    let spanner4: spanner = { type: type4 };
    spannerDeck.push(spanner1);
    spannerDeck.push(spanner2);
    spannerDeck.push(spanner3);
    spannerDeck.push(spanner4);
  }
  for (let i = 0; i < 12; i++) {
    let spanner1: spanner = { type: type5 };
    spannerDeck.push(spanner1);
  }
  for (let i = 0; i < 12; i++) {
    let spanner1: spanner = { type: type6 };
    spannerDeck.push(spanner1);
  }
}
