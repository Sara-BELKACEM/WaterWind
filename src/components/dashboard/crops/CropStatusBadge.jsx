import { Badge } from '../../ui'

function CropStatusBadge({ status }) {
  const variant = status === 'Active' ? 'success' : 'amber'

  return <Badge variant={variant}>{status}</Badge>
}

export default CropStatusBadge
