import { useEffect, useState } from 'react'
import { dashboardStats, products, recentAnalyses, crops, soils } from '../data/mockData'

export function useMockApi() {
  const [loading, setLoading] = useState(true)
  const [data] = useState({
    products,
    stats: dashboardStats,
    crops,
    soils,
    analyses: recentAnalyses,
  })

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 200)
    return () => window.clearTimeout(timer)
  }, [])

  return { data, loading }
}
