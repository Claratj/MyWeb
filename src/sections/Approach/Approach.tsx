import { pillars } from "../../data/pillars";
import { Eyebrow } from "../../components/Eyebrow/Eyebrow";
import { Pillar } from "../../components/Pillar/Pillar";
import { Reveal } from "../../components/Reveal/Reveal";
import styles from "./Approach.module.css";

export function Approach() {
  return (
    <section id="approach" className={`section ${styles.approach}`} aria-labelledby="approach-title">
      <div className="container">
        <Reveal from="left" className={styles.head}>
          <Eyebrow>Approach</Eyebrow>
          <h2 id="approach-title" className={styles.title}>
            Designer's eye, engineer's rigor
          </h2>
        </Reveal>

        <div className={styles.grid}>
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.id} from="scale" delay={i * 0.1}>
              <Pillar index={i + 1} title={pillar.title} body={pillar.body} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
