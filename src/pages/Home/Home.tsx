import {
  Nav,
  Hero,
  TrustStrip,
  System,
  Experience,
  Approach,
  About,
  Contact,
  Footer,
} from "../../sections";
import { EdgeLabels } from "../../components";

export function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <EdgeLabels left="Clara Toloba · Madrid" right="Available · Remote" />
      <Nav />
      <main id="main">
        <span id="top" />
        <Hero />
        <TrustStrip />
        <System />
        <Experience />
        <Approach />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
