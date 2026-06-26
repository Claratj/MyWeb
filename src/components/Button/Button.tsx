import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import styles from "./Button.module.css";

type Variant = "primary" | "solid" | "ghost" | "outline" | "onDark";
type Size = "xs" | "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Optional inline icon before the label (e.g. <DownloadIcon />). */
  iconLeft?: ReactNode;
  /** Optional inline icon after the label. */
  iconRight?: ReactNode;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/* Exact wobble from `main`: the button rotates and the label drifts on hover. */
const btnVariants: Variants = {
  rest: { rotate: 0 },
  animation: {
    rotate: [0, 3, -3, 1, 0],
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};
const textVariants: Variants = {
  rest: { x: 0 },
  animation: {
    translateX: [0, 4, -3, 2, 0],
    transition: { duration: 0.7 },
  },
};

/**
 * Original brand button (recovered from `main`): white pill, amber border,
 * terracotta uppercase label, playful "storm" wobble on hover. No hover fill.
 * Renders an <a> when `href` is set, otherwise a <button>.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  iconLeft,
  iconRight,
  children,
  ...rest
}: ButtonProps) {
  const classes = [styles.btn, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  const reduce = useReducedMotion();
  const btnControls = useAnimationControls();
  const textControls = useAnimationControls();
  // Once a wobble is running, ignore further hovers until it finishes so it
  // always plays to completion — whether or not the pointer stays over.
  const running = useRef(false);

  const playWobble = () => {
    if (reduce || running.current) return;
    running.current = true;
    Promise.all([
      btnControls.start("animation"),
      textControls.start("animation"),
    ]).finally(() => {
      running.current = false;
    });
  };

  // Icons are child nodes inside the label — they don't affect the framer motion.
  const label = (
    <motion.span
      className={styles.label}
      variants={textVariants}
      initial="rest"
      animate={textControls}
    >
      {iconLeft}
      {children}
      {iconRight}
    </motion.span>
  );

  if ("href" in rest && rest.href !== undefined) {
    return (
      <motion.a
        className={classes}
        variants={btnVariants}
        initial="rest"
        animate={btnControls}
        onHoverStart={playWobble}
        {...(rest as any)}
      >
        {label}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      variants={btnVariants}
      initial="rest"
      animate={btnControls}
      onHoverStart={playWobble}
      {...(rest as any)}
    >
      {label}
    </motion.button>
  );
}
