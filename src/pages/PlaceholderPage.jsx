import { useLocation } from 'react-router-dom'
import DashboardContainer from '../components/dashboard/DashboardContainer'
import DashboardHeader from '../components/layout/DashboardHeader'
import EmptyState from '../components/dashboard/EmptyState'

const breadcrumbLabels = {
  '/': 'Home',
  '/about': 'About',
  '/products': 'Products',
  '/contact': 'Contact',
  '/login': 'Login',
  '/dashboard': 'Dashboard',
  '/dashboard/crops': 'Dashboard / Crops',
  '/dashboard/soils': 'Dashboard / Soils',
  '/dashboard/analysis': 'Dashboard / Analysis',
  '/dashboard/history': 'Dashboard / History',
  '/dashboard/statistics': 'Dashboard / Statistics',
}

function PlaceholderPage({ title }) {
  const location = useLocation()
  const activeTitle = title ?? breadcrumbLabels[location.pathname] ?? 'Page'
  const breadcrumb = breadcrumbLabels[location.pathname] ?? 'Home'

  return (
    <DashboardContainer className="space-y-6">
      <DashboardHeader
        title={activeTitle}
        subtitle="This module will be implemented in the next step."
        breadcrumb={breadcrumb}
      />

      <EmptyState
        title={activeTitle}
        description="This module will be implemented in the next step."
      />
    </DashboardContainer>
  )
}

export default PlaceholderPage
