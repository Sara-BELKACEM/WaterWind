import Hero from '../../components/layout/Hero'
import Technology from '../../components/layout/Technology'
import Features from '../../components/layout/Features'
import Statistics from '../../components/layout/Statistics'
import CTA from '../../components/layout/CTA'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'

function HomePage() {
  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <Hero />
      <Technology />
      <Features />
      <Statistics />
      <CTA />
      <Footer />
    </div>
  )
}

export default HomePage
