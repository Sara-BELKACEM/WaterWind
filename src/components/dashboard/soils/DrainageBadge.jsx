import { Badge } from '../../ui'

const drainageMap = {
  Low: 'amber',
  Medium: 'sky',
  High: 'emerald',
}

function DrainageBadge({ drainage }) {
  return <Badge variant={drainageMap[drainage] ?? 'emerald'}>{drainage}</Badge>
}

export default DrainageBadge
