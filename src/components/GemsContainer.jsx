import React from "react";
import GemSlot from "./GemSlot";

const GemsContainer = ({ gems = [], completedGemsList }) => {
  return (
    <div
      className="gems-container"
      style={{
        display: "flex",
        gap: "10px",
        margin: "10px",
        justifyContent: "space-between",
      }}
    >
      {gems.map((gem) => (
        <GemSlot
          key={gem.type}
          completedGemsList={completedGemsList}
          animationData={gem.lottie}
          gem={gem.type}
        />
      ))}
    </div>
  );
};

export default GemsContainer;
