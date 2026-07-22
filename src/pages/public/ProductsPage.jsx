import ProductsHero from '../../components/products/ProductsHero'
import ProductCard from '../../components/products/ProductCard'
import ComparisonTable from '../../components/products/ComparisonTable'
import Benefits from '../../components/products/Benefits'
import Timeline from '../../components/products/Timeline'
import Testimonials from '../../components/products/Testimonials'
import FAQ from '../../components/products/FAQ'
import ProductsCTA from '../../components/products/ProductsCTA'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import { Container } from '../../components/ui'

function ProductsPage() {
  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <ProductsHero />

      <section className="py-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          <ProductCard variant="micro" />
          <ProductCard variant="pro" />
        </Container>
      </section>

      <ComparisonTable />
      <Benefits />
      <Timeline />
      <Testimonials />
      <FAQ />
      <ProductsCTA />
      <Footer />
    </div>
  )
}

export default ProductsPage
