import { useLocation } from 'react-router-dom'

const labelMap = {
  '/dashboard': 'Dashboard',
  '/dashboard/crops': 'Dashboard / Crops',
  '/dashboard/soils': 'Dashboard / Soils',
  '/dashboard/analysis': 'Dashboard / Analysis',
  '/dashboard/history': 'Dashboard / History',
  '/dashboard/statistics': 'Dashboard / Statistics',
}

function Breadcrumb() {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)
  const breadcrumb = segments.length
    ? segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`
        const label = labelMap[path] ?? segment
        return label
      })
    : ['Dashboard']

  return (
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-300">
      {breadcrumb.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center gap-2">
          {index > 0 ? <span className="text-slate-400">/</span> : null}
          <span>{item}</span>
        </span>
      ))}
    </div>
  )
}

export default Breadcrumb
