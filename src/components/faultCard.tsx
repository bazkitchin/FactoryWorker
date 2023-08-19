import React, { CSSProperties } from "react";
import Box from "./box";
import MachineDeck from "./machineInfo";
import "./styles/faultCard.css";

const FaultCard: React.FC = () => {
  const CONTAINER: CSSProperties = {
    // color: machine1.type.colour,
  };
  return (
    <div className="card">
      <div style={CONTAINER}>
        {/* <h1 className="value">{MachineDeck.name}</h1> */}
        {/* <p className="info">{machine1.type.name}</p>
        <p className="info">{machine1.floor}</p> */}
      </div>
    </div>
  );
};

export default FaultCard;
