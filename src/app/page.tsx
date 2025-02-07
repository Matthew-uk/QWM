import Header from '@/components/custom/Header';
import Hero from '@/components/custom/Hero';
import InvestmentOpportunity from '@/components/custom/InvestmentOpportunity';
import DrugInvestmentSlider from '@/components/custom/DrugInvestmentSlider';
import Features from '@/components/custom/Features';
import CTA from '@/components/custom/CTA';
import Footer from '@/components/custom/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main>
        <Hero />
        <InvestmentOpportunity />
        <DrugInvestmentSlider />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
