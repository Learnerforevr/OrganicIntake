import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";

import Hero from "../components/landing/Hero.jsx";
import CategorySection from "../components/landing/CategorySection.jsx";
import MissionSection from "../components/landing/MissionSection.jsx";
import FeaturedProducts from "../components/landing/FeaturedProducts.jsx";
import LandingCta from "../components/landing/LandingCta.jsx";

import "../components/landing/LandingPage.css";

function HomePage() {
  return (
    <>
      <Header variant="home" />

      <main className="landing-page">
        <Hero />
        <CategorySection />
        <MissionSection />
        <FeaturedProducts />
        <LandingCta />
      </main>

      <Footer />
    </>
  );
}

export default HomePage;