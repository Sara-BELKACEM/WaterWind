import { Container, Card } from '../ui'

const rows = [
  { feature: 'Water Production', micro: '20L/day', pro: '120L/day' },
  { feature: 'Best Usage', micro: 'Greenhouses / Small plots', pro: 'Large farms / Cooperatives' },
  { feature: 'Energy Source', micro: 'Solar + Wind', pro: 'Solar + Wind + AI monitoring' },
  { feature: 'Installation', micro: 'Quick modular setup', pro: 'Professional deployment' },
  { feature: 'Maintenance', micro: 'Low', pro: 'Low with monitoring support' },
  { feature: 'Recommended Farm Size', micro: '1–5 hectares', pro: '5+ hectares' },
]

function ComparisonTable() {
  return (
    <section className="py-20">
      <Container>
        <Card className="overflow-hidden rounded-[28px]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-950 text-white">
                  <th className="px-4 py-4 font-medium">Feature</th>
                  <th className="px-4 py-4 font-medium">WaterWind Micro</th>
                  <th className="px-4 py-4 font-medium bg-sky-500/20">WaterWind Pro</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.feature} className="border-b border-slate-200 last:border-b-0">
                    <td className="px-4 py-4 font-semibold text-slate-800">{row.feature}</td>
                    <td className="px-4 py-4 text-slate-600">{row.micro}</td>
                    <td className="px-4 py-4 text-slate-600 bg-sky-50/60">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Container>
    </section>
  )
}

export default ComparisonTable
