import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import DashboardContainer from '../../components/dashboard/DashboardContainer'
import SoilToolbar from '../../components/dashboard/soils/SoilToolbar'
import SoilGrid from '../../components/dashboard/soils/SoilGrid'
import SoilModal from '../../components/dashboard/soils/SoilModal'
import SoilDrawer from '../../components/dashboard/soils/SoilDrawer'
import DeleteSoilDialog from '../../components/dashboard/soils/DeleteSoilDialog'
import SoilSkeleton from '../../components/dashboard/soils/SoilSkeleton'
import EmptySoilState from '../../components/dashboard/soils/EmptySoilState'
import { Button } from '../../components/ui'
import { soils as initialSoils } from '../../data/mockData'

const defaultSoilForm = {
  name: '',
  waterRetention: 75,
  drainage: 'Medium',
  description: '',
  status: 'Active',
  compatibleCrops: ['Maize', 'Tomato'],
  createdDate: new Date().toISOString().slice(0, 10),
}

function SoilManagementPage() {
  const [soils, setSoils] = useState(initialSoils)
  const [search, setSearch] = useState('')
  const [retentionFilter, setRetentionFilter] = useState('all')
  const [drainageFilter, setDrainageFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [selectedSoil, setSelectedSoil] = useState(null)
  const [modalMode, setModalMode] = useState('add')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading] = useState(false)

  const filteredSoils = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    const filtered = soils.filter((soil) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        soil.name.toLowerCase().includes(normalizedSearch) ||
        soil.description.toLowerCase().includes(normalizedSearch)

      const matchesRetention =
        retentionFilter === 'all' ||
        (retentionFilter === 'high' && soil.waterRetention >= 75) ||
        (retentionFilter === 'medium' && soil.waterRetention >= 45 && soil.waterRetention < 75) ||
        (retentionFilter === 'low' && soil.waterRetention < 45)

      const matchesDrainage = drainageFilter === 'all' || soil.drainage === drainageFilter

      return matchesSearch && matchesRetention && matchesDrainage
    })

    return [...filtered].sort((left, right) => {
      if (sortBy === 'retention') {
        return right.waterRetention - left.waterRetention
      }

      if (sortBy === 'status') {
        return Number(right.status === 'Active') - Number(left.status === 'Active')
      }

      return left.name.localeCompare(right.name)
    })
  }, [soils, search, retentionFilter, drainageFilter, sortBy])

  const openAddModal = () => {
    setSelectedSoil(defaultSoilForm)
    setModalMode('add')
    setIsModalOpen(true)
  }

  const openEditModal = (soil) => {
    setSelectedSoil(soil)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const openDeleteDialog = (soil) => {
    setSelectedSoil(soil)
    setIsDeleteDialogOpen(true)
  }

  const openDrawer = (soil) => {
    setSelectedSoil(soil)
    setIsDrawerOpen(true)
  }

  const handleSaveSoil = (payload) => {
    if (modalMode === 'edit' && selectedSoil?.id) {
      setSoils((current) => current.map((soil) => (soil.id === selectedSoil.id ? { ...soil, ...payload } : soil)))
      setIsModalOpen(false)
      setSelectedSoil(null)
      return
    }

    setSoils((current) => [
      {
        id: `soil-${crypto.randomUUID()}`,
        createdDate: new Date().toISOString().slice(0, 10),
        compatibleCrops: ['Maize', 'Rice'],
        ...payload,
      },
      ...current,
    ])
    setIsModalOpen(false)
    setSelectedSoil(null)
  }

  const handleDeleteSoil = (soil) => {
    setSoils((current) => current.filter((item) => item.id !== soil?.id))
    setIsDeleteDialogOpen(false)
    setSelectedSoil(null)
  }

  return (
    <DashboardContainer className="space-y-6">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        className="rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-emerald-50/70 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-300">Dashboard / Soil Management</div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Soil Management</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage soil types used by the WaterWind recommendation system.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={() => {
              setSearch('')
              setRetentionFilter('all')
              setDrainageFilter('all')
              setSortBy('name')
            }} className="rounded-[18px]">
              Reset Filters
            </Button>
            <Button onClick={openAddModal} className="rounded-[18px]">
              Add Soil
            </Button>
          </div>
        </div>
      </motion.header>

      <SoilToolbar
        search={search}
        onSearchChange={setSearch}
        retentionFilter={retentionFilter}
        onRetentionFilterChange={setRetentionFilter}
        drainageFilter={drainageFilter}
        onDrainageFilterChange={setDrainageFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onRefresh={() => setSoils(initialSoils)}
      />

      {isLoading ? (
        <SoilSkeleton />
      ) : filteredSoils.length === 0 ? (
        <EmptySoilState onAdd={openAddModal} />
      ) : (
        <SoilGrid soils={filteredSoils} onView={openDrawer} onEdit={openEditModal} onDelete={openDeleteDialog} />
      )}

      <SoilModal
        isOpen={isModalOpen}
        mode={modalMode}
        defaultValues={selectedSoil ?? defaultSoilForm}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedSoil(null)
        }}
        onSave={handleSaveSoil}
      />

      <DeleteSoilDialog
        isOpen={isDeleteDialogOpen}
        soil={selectedSoil}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setSelectedSoil(null)
        }}
        onDelete={handleDeleteSoil}
      />

      <SoilDrawer isOpen={isDrawerOpen} soil={selectedSoil} onClose={() => setIsDrawerOpen(false)} />
    </DashboardContainer>
  )
}

export default SoilManagementPage
