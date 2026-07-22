import { Plus } from 'lucide-react'
import { Button, Card } from '../../ui'

function EmptySoilState({ onAdd }) {
  return (
    <Card className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50/70 px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-900/60">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/20">
        <Plus size={20} />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">No soil types found.</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Create a new soil profile to enrich the recommendation engine.</p>
      <Button onClick={onAdd} className="mt-5 rounded-[18px]">
        <Plus size={15} />
        Add First Soil
      </Button>
    </Card>
  )
}

export default EmptySoilState
