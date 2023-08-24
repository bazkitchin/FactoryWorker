import React, { useState, useEffect } from "react";

export type machineType = {
  name: string;
  colour: string;
};

export type machine = {
  name: string;
  type: machineType;
  floor: number;
  x: number;
  y: number;
  computer: boolean;
  toolbox: boolean;
  faults: number;
  links: machine[];
};

export const type1: machineType = { name: "Office", colour: "blue" };
export const type2: machineType = { name: "Assembly", colour: "green" };
export const type3: machineType = { name: "Chemical", colour: "yellow" };
export const type4: machineType = {
  name: "Fabrication",
  colour: "darkslategray",
};
export const type5: machineType = { name: "Special", colour: "silver" };
export const type6: machineType = { name: "JAM!", colour: "red" };

// ------------------------------------------------------ Office Machines
let machine1: machine = {
  name: "Board Room",
  type: type1,
  floor: 3,
  x: 0.1,
  y: 0.45,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine2: machine = {
  name: "Server Room",
  type: type1,
  floor: 3,
  x: 0.1,
  y: 0.8,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine3: machine = {
  name: "Finacial Services",
  type: type1,
  floor: 3,
  x: 0.1,
  y: 0.15,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine4: machine = {
  name: "Backup Generator",
  type: type1,
  floor: 1,
  x: 0.5,
  y: 0.8,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine5: machine = {
  name: "Front Door",
  type: type1,
  floor: 2,
  x: 0.1,
  y: 0.45,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine6: machine = {
  name: "Canteen",
  type: type1,
  floor: 2,
  x: 0.3,
  y: 0.3,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine7: machine = {
  name: "Break Room",
  type: type1,
  floor: 3,
  x: 0.25,
  y: 0.4,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine8: machine = {
  name: "Site Services",
  type: type1,
  floor: 1,
  x: 0.3,
  y: 0.8,
  computer: true,
  toolbox: true,
  faults: 0,
  links: [],
};
let machine9: machine = {
  name: "Laboratory",
  type: type1,
  floor: 3,
  x: 0.45,
  y: 0.15,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine10: machine = {
  name: "Engineering Office",
  type: type1,
  floor: 3,
  x: 0.6,
  y: 0.4,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine11: machine = {
  name: "Fax Machine",
  type: type1,
  floor: 3,
  x: 0.25,
  y: 0.15,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine12: machine = {
  name: "Water Cooler",
  type: type1,
  floor: 3,
  x: 0.25,
  y: 0.55,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};

// ------------------------------------------------------ Assembly Machines
let machine13: machine = {
  name: "Item Store",
  type: type2,
  floor: 3,
  x: 0.3,
  y: 0.8,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine14: machine = {
  name: "Bowl Feeder",
  type: type2,
  floor: 2,
  x: 0.25,
  y: 0.8,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine15: machine = {
  name: "Robot Arm",
  type: type2,
  floor: 2,
  x: 0.25,
  y: 0.65,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine16: machine = {
  name: "Dehumidifier",
  type: type2,
  floor: 1,
  x: 0.2,
  y: 0.65,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine17: machine = {
  name: "Labelling Machine",
  type: type2,
  floor: 2,
  x: 0.3,
  y: 0.45,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine18: machine = {
  name: "Dispatch Bay",
  type: type2,
  floor: 2,
  x: 0.45,
  y: 0.8,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine19: machine = {
  name: "Packing Station",
  type: type2,
  floor: 2,
  x: 0.75,
  y: 0.8,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine20: machine = {
  name: "Coil Winder",
  type: type2,
  floor: 1,
  x: 0.3,
  y: 0.45,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine21: machine = {
  name: "Rivit Gun",
  type: type2,
  floor: 2,
  x: 0.45,
  y: 0.65,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine22: machine = {
  name: "Cable Dispenser",
  type: type2,
  floor: 3,
  x: 0.6,
  y: 0.75,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine23: machine = {
  name: "Crane",
  type: type2,
  floor: 3,
  x: 0.45,
  y: 0.8,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine24: machine = {
  name: "Nuts and Bolts",
  type: type2,
  floor: 1,
  x: 0.15,
  y: 0.5,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};

// ------------------------------------------------------ Chemical Machines
let machine25: machine = {
  name: "Sewage Outlet",
  type: type3,
  floor: 1,
  x: 0.8,
  y: 0.2,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine26: machine = {
  name: "Disel Tank",
  type: type3,
  floor: 1,
  x: 0.65,
  y: 0.8,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine27: machine = {
  name: "Toilet",
  type: type3,
  floor: 2,
  x: 0.65,
  y: 0.15,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine28: machine = {
  name: "Etching Tank",
  type: type3,
  floor: 1,
  x: 0.65,
  y: 0.4,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine29: machine = {
  name: "Nitrogen Tank",
  type: type3,
  floor: 2,
  x: 0.8,
  y: 0.2,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine30: machine = {
  name: "Water Pump",
  type: type3,
  floor: 1,
  x: 0.8,
  y: 0.35,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine31: machine = {
  name: "Industrial Blender",
  type: type3,
  floor: 1,
  x: 0.5,
  y: 0.15,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine32: machine = {
  name: "Bioreactor",
  type: type3,
  floor: 1,
  x: 0.65,
  y: 0.15,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine33: machine = {
  name: "Extractor System",
  type: type3,
  floor: 3,
  x: 0.75,
  y: 0.8,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine34: machine = {
  name: "Distillery",
  type: type3,
  floor: 3,
  x: 0.6,
  y: 0.55,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine35: machine = {
  name: "Centrifuge",
  type: type3,
  floor: 1,
  x: 0.45,
  y: 0.3,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine36: machine = {
  name: "Heat Exchanger",
  type: type3,
  floor: 1,
  x: 0.8,
  y: 0.6,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};

// ------------------------------------------------------ Fabrication Machines
let machine37: machine = {
  name: "Goods In",
  type: type4,
  floor: 2,
  x: 0.8,
  y: 0.35,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine38: machine = {
  name: "Workshop",
  type: type4,
  floor: 2,
  x: 0.45,
  y: 0.3,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine39: machine = {
  name: "3D Printer",
  type: type4,
  floor: 3,
  x: 0.8,
  y: 0.45,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine40: machine = {
  name: "Milling Machine",
  type: type4,
  floor: 2,
  x: 0.65,
  y: 0.6,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine41: machine = {
  name: "Lathe",
  type: type4,
  floor: 1,
  x: 0.1,
  y: 0.35,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine42: machine = {
  name: "Piller Drill",
  type: type4,
  floor: 2,
  x: 0.4,
  y: 0.15,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine43: machine = {
  name: "Welding Station",
  type: type4,
  floor: 1,
  x: 0.25,
  y: 0.25,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine44: machine = {
  name: "Band Saw",
  type: type4,
  floor: 2,
  x: 0.8,
  y: 0.6,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine45: machine = {
  name: "Forge",
  type: type4,
  floor: 1,
  x: 0.1,
  y: 0.15,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine46: machine = {
  name: "Laser Cutter",
  type: type4,
  floor: 3,
  x: 0.8,
  y: 0.15,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine47: machine = {
  name: "Soldering Station",
  type: type4,
  floor: 3,
  x: 0.6,
  y: 0.15,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine48: machine = {
  name: "Hydraulic Press",
  type: type4,
  floor: 2,
  x: 0.6,
  y: 0.4,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
// ------------------------------------------------------ Other Machines
let machine49: machine = {
  name: "Lift",
  type: type5,
  floor: 1,
  x: 0.45,
  y: 0.45,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine50: machine = {
  name: "Lift",
  type: type5,
  floor: 2,
  x: 0.45,
  y: 0.45,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};
let machine51: machine = {
  name: "Lift",
  type: type5,
  floor: 3,
  x: 0.45,
  y: 0.45,
  computer: false,
  toolbox: false,
  faults: 0,
  links: [],
};

export let machineList: machine[] = [
  machine1,
  machine2,
  machine3,
  machine4,
  machine5,
  machine6,
  machine7,
  machine8,
  machine9,
  machine10,
  machine11,
  machine12,
  machine13,
  machine14,
  machine15,
  machine16,
  machine17,
  machine18,
  machine19,
  machine20,
  machine21,
  machine22,
  machine23,
  machine24,
  machine25,
  machine26,
  machine27,
  machine28,
  machine29,
  machine30,
  machine31,
  machine32,
  machine33,
  machine34,
  machine35,
  machine36,
  machine37,
  machine38,
  machine39,
  machine40,
  machine41,
  machine42,
  machine43,
  machine44,
  machine45,
  machine46,
  machine47,
  machine48,
  machine49,
  machine50,
  machine51,
];
export function handleLinks() {
  // top floor links
  machine1.links = [machine2, machine3, machine7, machine11, machine12];
  machine2.links = [machine12];
  machine3.links = [machine11];
  machine7.links = [machine9, machine12, machine51];
  machine9.links = [machine10, machine47];
  machine10.links = [machine39, machine51];
  machine11.links = [];
  machine12.links = [machine13];
  machine13.links = [machine23];
  machine22.links = [machine23, machine34, machine51];
  machine23.links = [];
  machine33.links = [machine34, machine39];
  machine34.links = [];
  machine39.links = [machine46, machine47];
  machine46.links = [machine47];
  machine47.links = [];

  // ground floor links
  machine5.links = [machine6, machine15];
  machine6.links = [machine17, machine38, machine43, machine50];
  machine14.links = [machine15, machine21];
  machine15.links = [machine21];
  machine17.links = [machine21, machine50];
  machine18.links = [machine19, machine21];
  machine19.links = [machine40, machine44];
  machine21.links = [];
  machine27.links = [machine29, machine38, machine48];
  machine29.links = [machine48];
  machine37.links = [machine40];
  machine38.links = [machine42, machine50];
  machine40.links = [machine44, machine48, machine50];
  machine42.links = [];
  machine44.links = [];
  machine48.links = [];

  // basement links
  machine4.links = [machine8, machine26, machine49];
  machine8.links = [machine16];
  machine16.links = [machine20, machine24];
  machine20.links = [machine43, machine49];
  machine24.links = [machine41];
  machine25.links = [machine30, machine32];
  machine26.links = [machine28, machine36];
  machine28.links = [machine30, machine36, machine35];
  machine30.links = [];
  machine31.links = [machine35, machine32];
  machine32.links = [machine35];
  machine35.links = [machine49];
  machine36.links = [];
  machine41.links = [machine43, machine45];
  machine43.links = [machine45, machine49];
  machine45.links = [];

  // lift links
  machine49.links = [machine50, machine51];

  // make all links bi-directional
  machineList.forEach((machine) => {
    machine.links.forEach((linkedMachine) => {
      if (!linkedMachine.links.includes(machine)) {
        linkedMachine.links.push(machine);
      }
    });
  });
}
