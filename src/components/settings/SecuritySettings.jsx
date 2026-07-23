import { useState } from 'react'
import { Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button, Input } from '../ui'
import SettingsCard from './SettingsCard'
import SettingsToggle from './SettingsToggle'

function SecuritySettings() {
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactor, setTwoFactor] = useState(true)
  const [rememberDevice, setRememberDevice] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState(true)
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const newPassword = watch('newPassword', '')
  const passwordStrength = newPassword.length >= 12 ? 'Strong' : newPassword.length >= 8 ? 'Medium' : 'Weak'

  const onSubmit = (data) => {
    console.log('Security settings updated:', data)
  }

  return (
    <SettingsCard title="Security" description="Protect your workspace with stronger account controls." icon={ShieldCheck} accent="sky">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="rounded-[22px] border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <Lock size={16} />
            Change Password
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
                <span className="font-medium">Current Password</span>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900"
                    {...register('currentPassword', { required: 'Current password is required' })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.currentPassword ? <span className="text-xs text-rose-500">{errors.currentPassword.message}</span> : null}
              </label>
            </div>

            <Input label="New Password" type={showPassword ? 'text' : 'password'} {...register('newPassword', { required: true, minLength: 8 })} />
            <Input label="Confirm Password" type={showPassword ? 'text' : 'password'} {...register('confirmPassword', { required: true, minLength: 8 })} />
          </div>

          <div className="mt-4 flex items-center justify-between rounded-[18px] border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-800">
            <span className="text-sm text-slate-600 dark:text-slate-300">Password strength</span>
            <span className={`text-sm font-semibold ${passwordStrength === 'Strong' ? 'text-emerald-600' : passwordStrength === 'Medium' ? 'text-amber-600' : 'text-rose-600'}`}>
              {passwordStrength}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <SettingsToggle label="Two-Factor Authentication" description="Require an extra verification step for sign-in." checked={twoFactor} onChange={setTwoFactor} />
          <SettingsToggle label="Remember this device" description="Keep your browser signed in for quicker access." checked={rememberDevice} onChange={setRememberDevice} />
          <SettingsToggle label="Session Timeout" description="Auto-lock inactive sessions after 15 minutes." checked={sessionTimeout} onChange={setSessionTimeout} />
        </div>

        <Button type="submit" variant="primary" className="rounded-[18px]">
          Save Security Preferences
        </Button>
      </form>
    </SettingsCard>
  )
}

export default SecuritySettings
