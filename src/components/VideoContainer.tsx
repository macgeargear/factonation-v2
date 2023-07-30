"use client";
import { FC } from "react";
import ReactPlayer from "react-player";
import { Checkbox } from "./ui/checkbox";

interface videoProps {
  title: string;
  videoUrl: string;
}

const VideoContainer: FC<videoProps> = ({ title, videoUrl }) => {
  return (
    <div className="flex gap-4 mt-16 flex-col text-[#222] ">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-semibold">{title}</h1>
      </div>
      <ReactPlayer
        controls
        url={
          "https://player.vimeo.com/video/738671414?h=3b018417ad&badge=0&autopause=0&player_id=0&app_id=58479/embed"
        }
      />
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-md font-medium leading-none">
          Mark as completed
        </label>
      </div>
    </div>
  );
};

export default VideoContainer;
