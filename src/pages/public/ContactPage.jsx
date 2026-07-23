import ContactCards from '../../components/contact/ContactCards'
import ContactCTA from '../../components/contact/ContactCTA'
import ContactForm from '../../components/contact/ContactForm'
import ContactHero from '../../components/contact/ContactHero'
import ContactInfo from '../../components/contact/ContactInfo'
import FAQPreview from '../../components/contact/FAQPreview'
import { Container } from '../../components/ui'

function ContactPage() {
  return (
    <div>
      <ContactHero />

      <section className="py-8 md:py-12">
        <Container className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <ContactInfo />
          <ContactForm />
        </Container>
      </section>

      <ContactCards />
      <FAQPreview />
      <ContactCTA />
    </div>
  )
}

export default ContactPage
