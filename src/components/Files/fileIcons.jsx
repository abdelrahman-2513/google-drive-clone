import React from "react";
import { AiFillFile, AiFillFileZip } from "react-icons/ai";
import { MdMovie, MdPictureAsPdf } from "react-icons/md";
import { IoMdHeadset } from "react-icons/io";
import {
  BiSolidImageAlt,
  BiSolidFileTxt,
  BiSolidFileDoc,
} from "react-icons/bi";

const fileIcons = {
  mp4: <MdMovie className="type1-icon" />,
  mp3: <IoMdHeadset className="type1-icon" />,
  pdf: <MdPictureAsPdf className="type1-icon" />,
  jpg: <BiSolidImageAlt className="type1-icon" />,
  jpeg: <BiSolidImageAlt className="type1-icon" />,
  png: <BiSolidImageAlt className="type1-icon" />,
  jfif: <BiSolidImageAlt className="type1-icon" />,
  gif: <BiSolidImageAlt className="type1-icon" />,
  webp: <BiSolidImageAlt className="type1-icon" />,
  ico: <BiSolidImageAlt className="type1-icon" />,
  svg: <BiSolidImageAlt className="type2-icon" />,
  docx: <BiSolidFileDoc className="type2-icon" />,
  txt: <BiSolidFileTxt className="type2-icon" />,
  zip: <AiFillFileZip />,
  any: <AiFillFile />,
};
function GetFileIcon({ file }) {
  return <>{fileIcons[file.type.split("/")[1]] || fileIcons["any"]}</>;
}

export default GetFileIcon;
