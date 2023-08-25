import * as machine from "./machineInfo";

export type spanner = {
  type: machine.machineType;
};

export type player = {
  name: string;
  colour: string;
  location: machine.machine;
  spanners: spanner[];
};

export let spannerDeck: spanner[] = [];

export function makeSpannerDeck() {
  spannerDeck = [];
  for (let i = 0; i < 12; i++) {
    let spanner1: spanner = { type: machine.type1 };
    let spanner2: spanner = { type: machine.type2 };
    let spanner3: spanner = { type: machine.type3 };
    let spanner4: spanner = { type: machine.type4 };
    spannerDeck.push(spanner1);
    spannerDeck.push(spanner2);
    spannerDeck.push(spanner3);
    spannerDeck.push(spanner4);
  }
  for (let i = 0; i < 12; i++) {
    let spanner1: spanner = { type: machine.type5 };
    spannerDeck.push(spanner1);
  }
}

export function addJamSpanners(deck: spanner[]) {
  for (let i = 0; i < 12; i++) {
    let spanner1: spanner = { type: machine.type6 };
    deck.push(spanner1);
  }
}
