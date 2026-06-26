import {
  Nav,
  Hero,
  TrustStrip,
  SelectedWork,
  Approach,
  About,
  Contact,
  Footer,
} from "../../sections";

export function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <span id="top" />
        <Hero />
        <TrustStrip />
        <SelectedWork />
        <Approach />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
