import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import DashboardContainer from '../../components/dashboard/DashboardContainer'
import CropRow from '../../components/dashboard/crops/CropRow'
import CropSkeleton from '../../components/dashboard/crops/CropSkeleton'
import CropToolbar from '../../components/dashboard/crops/CropToolbar'
import CropModal from '../../components/dashboard/crops/CropModal'
import EmptyCropState from '../../components/dashboard/crops/EmptyCropState'
import { Button, Card, Modal } from '../../components/ui'
import { crops as initialCrops } from '../../data/mockData'

const defaultCropForm = {
  name: '',
  recommendedWater: 'Moderate',
  recommendedPh: '6.2',
  minerals: 'Nitrogen, Potassium',
  compatibleSoils: 'Loam, Clay',
  recommendedDevice: 'AquaPulse',
  status: 'Active',
}

function CropManagementPage() {
  const [crops, setCrops] = useState(initialCrops)
  const [search, setSearch] = useState('')
  const [deviceFilter, setDeviceFilter] = useState('all')
  const [waterFilter, setWaterFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [selectedCrop, setSelectedCrop] = useState(null)
  const [modalMode, setModalMode] = useState('add')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading] = useState(false)

  const filteredCrops = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    const filtered = crops.filter((crop) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        crop.name.toLowerCase().includes(normalizedSearch) ||
        crop.recommendedDevice.toLowerCase().includes(normalizedSearch)

      const matchesDevice = deviceFilter === 'all' || crop.recommendedDevice === deviceFilter
      const matchesWater = waterFilter === 'all' || crop.recommendedWater === waterFilter

      return matchesSearch && matchesDevice && matchesWater
    })

    const sorted = [...filtered].sort((left, right) => {
      if (sortBy === 'device') {
        return left.recommendedDevice.localeCompare(right.recommendedDevice)
      }

      if (sortBy === 'status') {
        return Number(right.status === 'Active') - Number(left.status === 'Active')
      }

      return left.name.localeCompare(right.name)
    })

    return sorted
  }, [crops, search, deviceFilter, waterFilter, sortBy])

  const openAddModal = () => {
    setSelectedCrop(defaultCropForm)
    setModalMode('add')
    setIsModalOpen(true)
  }

  const openEditModal = (crop) => {
    setSelectedCrop(crop)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const openDeleteDialog = (crop) => {
    setSelectedCrop(crop)
    setIsDeleteDialogOpen(true)
  }

  const openDrawer = (crop) => {
    setSelectedCrop(crop)
    setIsDrawerOpen(true)
  }

  const handleSaveCrop = (payload) => {
    if (modalMode === 'edit' && selectedCrop?.id) {
      setCrops((current) => current.map((crop) => (crop.id === selectedCrop.id ? { ...crop, ...payload } : crop)))
      return
    }

    setCrops((current) => [
      {
        id: `crop-${crypto.randomUUID()}`,
        ...payload,
      },
      ...current,
    ])
  }

  const handleDeleteCrop = () => {
    setCrops((current) => current.filter((crop) => crop.id !== selectedCrop?.id))
    setIsDeleteDialogOpen(false)
    setSelectedCrop(null)
  }

  return (
    <DashboardContainer className="space-y-6">
      <header className="rounded-[28px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/85">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-300">Dashboard / Crops</div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Crop Management</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Maintain crop recommendations, device compatibility, and water profiles across your managed fields.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={() => setSearch('')} className="rounded-[18px]">
              Reset Filters
            </Button>
            <Button onClick={openAddModal} className="rounded-[18px]">
              Add Crop
            </Button>
          </div>
        </div>
      </header>

      <CropToolbar
        search={search}
        onSearchChange={setSearch}
        deviceFilter={deviceFilter}
        onDeviceFilterChange={setDeviceFilter}
        waterFilter={waterFilter}
        onWaterFilterChange={setWaterFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onRefresh={() => setCrops(initialCrops)}
      />

      {isLoading ? (
        <CropSkeleton />
      ) : filteredCrops.length === 0 ? (
        <EmptyCropState onAdd={openAddModal} />
      ) : (
        <Card className="rounded-[24px] border border-slate-200/80 p-0 shadow-[0_16px_45px_rgba(15,23,42,0.08)] dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-slate-100/90 text-xs uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-800/90 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3">Crop</th>
                  <th className="px-4 py-3">Water</th>
                  <th className="px-4 py-3">pH</th>
                  <th className="px-4 py-3">Minerals</th>
                  <th className="px-4 py-3">Soils</th>
                  <th className="px-4 py-3">Device</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredCrops.map((crop) => (
                  <CropRow
                    key={crop.id}
                    crop={crop}
                    onView={openDrawer}
                    onEdit={openEditModal}
                    onDelete={openDeleteDialog}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <CropModal
        isOpen={isModalOpen}
        mode={modalMode}
        defaultValues={selectedCrop ?? defaultCropForm}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedCrop(null)
        }}
        onSave={handleSaveCrop}
      />

      <Modal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Delete crop"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Delete <span className="font-semibold text-slate-900 dark:text-white">{selectedCrop?.name}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)} className="rounded-[18px]">
              Cancel
            </Button>
            <Button onClick={handleDeleteCrop} className="rounded-[18px] bg-rose-600 hover:bg-rose-700">
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>

      <AnimatePresence>
        {isDrawerOpen && selectedCrop ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          >
            <motion.aside
              initial={{ x: 32, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 28, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="absolute right-0 top-0 h-full w-full max-w-md border-l border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">Crop profile</p>
                  <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{selectedCrop.name}</h3>
                </div>
                <button type="button" onClick={() => setIsDrawerOpen(false)} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X size={16} />
                </button>
              </div>

              <div className="mt-6 space-y-4 text-sm text-slate-700 dark:text-slate-200">
                <div className="rounded-[20px] bg-slate-100 p-4 dark:bg-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Recommended water</span>
                    <span>{selectedCrop.recommendedWater}</span>
                  </div>
                </div>
                <div className="rounded-[20px] bg-slate-100 p-4 dark:bg-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Recommended pH</span>
                    <span>{selectedCrop.recommendedPh}</span>
                  </div>
                </div>
                <div className="rounded-[20px] bg-slate-100 p-4 dark:bg-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Device</span>
                    <span>{selectedCrop.recommendedDevice}</span>
                  </div>
                </div>
                <div className="rounded-[20px] bg-slate-100 p-4 dark:bg-slate-800/80">
                  <span className="font-medium">Minerals</span>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">{selectedCrop.minerals.join(', ')}</p>
                </div>
                <div className="rounded-[20px] bg-slate-100 p-4 dark:bg-slate-800/80">
                  <span className="font-medium">Compatible soils</span>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">{selectedCrop.compatibleSoils.join(', ')}</p>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </DashboardContainer>
  )
}

export default CropManagementPage
