import AboutCTA from '../../components/about/AboutCTA'
import AboutHero from '../../components/about/AboutHero'
import CoreValues from '../../components/about/CoreValues'
import ImpactStats from '../../components/about/ImpactStats'
import MissionVision from '../../components/about/MissionVision'
import StorySection from '../../components/about/StorySection'
import Timeline from '../../components/about/Timeline'
import WhyChooseUs from '../../components/about/WhyChooseUs'

function AboutPage() {
  return (
    <div>
      <AboutHero />
      <StorySection />
      <MissionVision />
      <CoreValues />
      <Timeline />
      <WhyChooseUs />
      <ImpactStats />
      <AboutCTA />
    </div>
  )
}

export default AboutPage
