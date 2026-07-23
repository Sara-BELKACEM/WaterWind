import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import PlaceholderPage from '../pages/PlaceholderPage'
import DashboardHomePage from '../pages/dashboard/DashboardHomePage'
import CropManagementPage from '../pages/dashboard/CropManagementPage'
import SoilManagementPage from '../pages/dashboard/SoilManagementPage'
import WaterAnalysisPage from '../pages/dashboard/WaterAnalysisPage'
import AnalysisHistoryPage from '../pages/dashboard/AnalysisHistoryPage'
import StatisticsPage from '../pages/dashboard/StatisticsPage'
import SettingsPage from '../pages/dashboard/SettingsPage'
import HomePage from '../pages/public/HomePage'
import ProductsPage from '../pages/public/ProductsPage'
import AboutPage from '../pages/public/AboutPage'
import ContactPage from '../pages/public/ContactPage'
import LoginPage from '../pages/public/LoginPage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PlaceholderPage title="Page not found" />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardHomePage />} />
        <Route path="/dashboard/crops" element={<CropManagementPage />} />
        <Route path="/dashboard/soils" element={<SoilManagementPage />} />
        <Route path="/dashboard/analysis" element={<WaterAnalysisPage />} />
        <Route path="/dashboard/history" element={<AnalysisHistoryPage />} />
        <Route path="/dashboard/statistics" element={<StatisticsPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="/dashboard/settings/:section" element={<SettingsPage />} />
        <Route path="*" element={<PlaceholderPage title="Page not found" />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
