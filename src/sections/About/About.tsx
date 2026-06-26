import { Eyebrow } from "../../components/Eyebrow/Eyebrow";
import { Reveal } from "../../components/Reveal/Reveal";
import photo from "../../assets/img/clara-about.png";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.media}>
          <img
            className={styles.photo}
            src={photo}
            width={500}
            height={333}
            loading="lazy"
            alt="Clara Toloba"
          />
        </Reveal>

        <Reveal from="right" className={styles.copy}>
          <Eyebrow>About</Eyebrow>
          <h2 id="about-title" className={styles.title}>
            A designer who moved into code, and stayed in both
          </h2>
          <p>
            I'm a frontend developer with six years in the field and a design background I
            never fully left behind. I started out in graphic design and art direction,
            then moved into code, so I tend to think about how an interface is built and
            how it looks at the same time.
          </p>
          <p>
            Most of my work is product UI and design systems in React and TypeScript. I've
            built design systems across React and Vue with Storybook and design tokens, and
            I get up to speed on large, data-heavy products fairly quickly.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
