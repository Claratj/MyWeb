import { Link } from "react-router-dom";
import React from "react";

import cv from "../../download/cv.pdf";
import { motion } from "framer-motion";

interface IButtonProps {
  text: string;
  path?: string;
}

const btnVariants = {
  rest: {
    x: 0,
  },
  animation: {
    rotate: [0, 3, -3, 1, 0],
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
};

const txtBtnVariants = {
  rest: {
    x: 0,
  },
  animation: {
    translateX: [0, 4, -3, 2, 0],
    transition: {
      duration: 0.7,
    },
  },
};

export default function Button(props: IButtonProps) {
  switch (props.text) {
    case "CV Download":
      return (
        <motion.a
          variants={btnVariants}
          initial="rest"
          whileHover="animation"
          animate="rest"
          href={cv}
          download="cv_clara_toloba_eng.pdf"
          className="btn-more"
        >
          <motion.span variants={txtBtnVariants}>{props.text}</motion.span>
        </motion.a>
      );
    case "More please!":
      return (
        <Link to={props.path as string}>
          <motion.button
            variants={btnVariants}
            whileHover="animation"
            className="btn-more"
          >
            <motion.span variants={txtBtnVariants}>{props.text}</motion.span>
          </motion.button>
        </Link>
      );
    default:
      return <></>;
  }
}
