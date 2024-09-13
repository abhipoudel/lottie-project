import React, { useRef, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../asset/animations/bird.json"; // Import your Lottie
import animationData1 from "../asset/animations/anim1.json"; // Import your Lottie
import animationData2 from "../asset/animations/anim2.json"; // Import your Lottie

import audio1 from "../asset/audio/audio1.mp3";
import audio2 from "../asset/audio/audio2.mp3";
import audio3 from "../asset/audio/audio3.mp3";

import star from "../asset/animations/star.json";
import diamond from "../asset/animations/diamond.json";
import heart from "../asset/animations/heart.json";
import GemsContainer from "./GemsContainer";

const LottieContainer = () => {
  const lottieRef = useRef(null);
  const [frame, setFrame] = useState(0);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [subtitles, setSubtitles] = useState("Starting subtitles...");
  const [isTaskComplete, setIsTaskComplete] = useState(false);
  const audioRef = useRef(null);
  const [completedGem, setCompletedGem] = useState([]); // Track which gem is completed

  const animations = [
    {
      lottie: animationData1,
      audio: audio1,
      subtitle: "First animation subtitles...",
      gem: "star",
    },
    {
      lottie: animationData2,
      audio: audio2,
      subtitle: "Second animation subtitles...",
      gem: "diamond",
    },
    {
      lottie: animationData,
      audio: audio3,
      subtitle: "Third animation subtitles...",
      gem: "heart",
    },
  ];

  const gems = [
    { type: "star", lottie: star },
    { type: "diamond", lottie: diamond },
    { type: "heart", lottie: heart },
  ];

  const playAnimation = () => {
    setIsPlaying(true);
    lottieRef.current.goToAndPlay(0, true);
    audioRef.current.play();
  };

  const onAudioEnded = (gem) => {
    setIsPlaying(false);
    lottieRef.current.goToAndStop(0, true);
    setAnimationIndex((prevIndex) =>
      Math.min(prevIndex + 1, animations.length - 1)
    );
    // setSubtitles(animations[(animationIndex + 1) % animations.length].subtitle);
    handleTaskComplete(gem);
  };

  const handleTaskComplete = (gemType) => {
    setCompletedGem((array) => [...array, gemType]);
  };

  const handleNextFrame = () => {
    const nextFrame = Math.min(
      frame + 1,
      lottieRef.current.getDuration(true) - 1
    );
    lottieRef.current.goToAndStop(nextFrame, true);
    setFrame(nextFrame);
  };

  const handlePreviousFrame = () => {
    const prevFrame = Math.max(frame - 1, 0);
    lottieRef.current.goToAndStop(prevFrame, true);
    setFrame(prevFrame);
  };

  const processNext = () => {
    console.log("next step");
    playAnimation();
  };

  return (
    <div>
      <div>
        <div
          className="main-lottie-container"
          style={{
            border: "1px solid red",
            margin: "10px",
            padding: "10px",
          }}
        >
          <Lottie
            style={{ height: "300px" }}
            lottieRef={lottieRef}
            animationData={animations[animationIndex].lottie}
            autoplay={false}
            loop={true}
          />

          {isPlaying && <p>{animations[animationIndex].subtitle}</p>}

          {!isPlaying && <button onClick={processNext}>GO</button>}

          <audio
            ref={audioRef}
            src={animations[animationIndex].audio}
            onEnded={() => onAudioEnded(animations[animationIndex].gem)}
          />
        </div>
      </div>
      <div>
        <GemsContainer gems={gems} completedGemsList={completedGem} />
      </div>
    </div>
  );
};

export default LottieContainer;
