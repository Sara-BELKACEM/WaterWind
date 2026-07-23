import {
  BarChart3,
  Droplets,
  FileClock,
  House,
  LandPlot,
  Leaf,
  LogIn,
  Mail,
  PackageSearch,
  Sprout,
  Users,
} from 'lucide-react'

export const publicLinks = [
  { label: 'Home', path: '/', icon: House },
  { label: 'About', path: '/about', icon: Users },
  { label: 'Products', path: '/products', icon: PackageSearch },
  { label: 'Contact', path: '/contact', icon: Mail },
]

export const dashboardLinks = [
  { label: 'Dashboard', path: '/dashboard', icon: BarChart3 },
  { label: 'Crops', path: '/dashboard/crops', icon: Sprout },
  { label: 'Soils', path: '/dashboard/soils', icon: LandPlot },
  { label: 'Analysis', path: '/dashboard/analysis', icon: Droplets },
  { label: 'History', path: '/dashboard/history', icon: FileClock },
  { label: 'Statistics', path: '/dashboard/statistics', icon: Leaf },
]

export const dashboardHighlights = [
  { label: 'Water balance', value: '86%', tone: 'emerald' },
  { label: 'Active crops', value: '24', tone: 'sky' },
  { label: 'Risk alerts', value: '3', tone: 'amber' },
]

export const publicMetadata = {
  brand: 'WaterWind',
  tagline: 'Smart Water Recommendation Platform',
}

export const placeholderPages = {
  '/': 'Home',
  '/about': 'About',
  '/products': 'Products',
  '/contact': 'Contact',
  '/login': 'Login',
  '/dashboard': 'Dashboard',
  '/dashboard/crops': 'Crops',
  '/dashboard/soils': 'Soils',
  '/dashboard/analysis': 'Analysis',
  '/dashboard/history': 'History',
  '/dashboard/statistics': 'Statistics',
}
