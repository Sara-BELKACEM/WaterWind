import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import PlaceholderPage from '../pages/PlaceholderPage'
import DashboardHomePage from '../pages/dashboard/DashboardHomePage'
import CropManagementPage from '../pages/dashboard/CropManagementPage'
import SoilManagementPage from '../pages/dashboard/SoilManagementPage'
import WaterAnalysisPage from '../pages/dashboard/WaterAnalysisPage'
import HomePage from '../pages/public/HomePage'
import ProductsPage from '../pages/public/ProductsPage'
import AboutPage from '../pages/public/AboutPage'
import ContactPage from '../pages/public/ContactPage'

const publicRoutes = [
  { path: '/', title: 'Home' },
  { path: '/about', title: 'About' },
  { path: '/products', title: 'Products' },
  { path: '/contact', title: 'Contact' },
  { path: '/login', title: 'Login' },
]

const dashboardRoutes = [
  { path: '/dashboard', title: 'Dashboard' },
  { path: '/dashboard/crops', title: 'Crops' },
  { path: '/dashboard/soils', title: 'Soils' },
  { path: '/dashboard/analysis', title: 'Analysis' },
  { path: '/dashboard/history', title: 'History' },
  { path: '/dashboard/statistics', title: 'Statistics' },
]

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {publicRoutes
          .filter((route) => route.path !== '/' && route.path !== '/products' && route.path !== '/about' && route.path !== '/contact')
          .map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<PlaceholderPage title={route.title} />}
            />
          ))}
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardHomePage />} />
        <Route path="/dashboard/crops" element={<CropManagementPage />} />
        <Route path="/dashboard/soils" element={<SoilManagementPage />} />
        <Route path="/dashboard/analysis" element={<WaterAnalysisPage />} />
        {dashboardRoutes
          .filter((route) => route.path !== '/dashboard' && route.path !== '/dashboard/crops' && route.path !== '/dashboard/soils' && route.path !== '/dashboard/analysis')
          .map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<PlaceholderPage title={route.title} />}
            />
          ))}
      </Route>
    </Routes>
  )
}

export default AppRoutes
