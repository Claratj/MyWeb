import { work } from "../../data/work";
import { CaseCard } from "../../components/CaseCard/CaseCard";
import { Eyebrow } from "../../components/Eyebrow/Eyebrow";
import { Reveal } from "../../components/Reveal/Reveal";
import styles from "./SelectedWork.module.css";

export function SelectedWork() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <Reveal from="up" className={styles.head}>
          <Eyebrow>Selected work</Eyebrow>
          <h2 id="work-title" className={styles.title}>
            Systems and product UI, shipped
          </h2>
          <p className={styles.intro}>
            Three places where design and engineering had to meet. Each one: the problem,
            what I owned, and the result.
          </p>
        </Reveal>

        <div className={styles.grid}>
          {work.map((study, i) => (
            <Reveal key={study.id} from="lift" delay={i * 0.09}>
              <CaseCard study={study} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
