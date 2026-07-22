import SoilCard from './SoilCard'

function SoilGrid({ soils, onView, onEdit, onDelete }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {soils.map((soil) => (
        <SoilCard key={soil.id} soil={soil} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default SoilGrid
