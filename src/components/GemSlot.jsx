import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

const GemSlot = ({ completedGemsList, animationData, gem = "" }) => {
  return (
    <div
      className="gem-slot"
      style={{
        width: "100px",
        height: "100px",
        border: "1px solid gray",
      }}
    >
      {completedGemsList.includes(gem) && (
        <motion.div
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 2 }}
        >
          <Lottie animationData={animationData} autoplay={true} loop={true} />
        </motion.div>
      )}
    </div>
  );
};

export default GemSlot;
