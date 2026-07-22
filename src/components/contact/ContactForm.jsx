import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Send } from 'lucide-react'
import { Button, Card } from '../ui'

const defaultValues = {
  fullName: '',
  email: '',
  subject: '',
  message: '',
}

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ defaultValues })

  const onSubmit = (data) => {
    console.log('Contact form submitted:', data)
    reset()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
    >
      <Card className="rounded-[28px] bg-white/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur md:p-7">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">Contact Form</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950">Send us a message</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm text-slate-700">
              <span className="font-medium">Full Name</span>
              <input
                type="text"
                placeholder="Alex Morgan"
                className="w-full rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                {...register('fullName', { required: 'Full name is required' })}
              />
              {errors.fullName ? <span className="text-xs text-rose-500">{errors.fullName.message}</span> : null}
            </label>

            <label className="block space-y-2 text-sm text-slate-700">
              <span className="font-medium">Email Address</span>
              <input
                type="email"
                placeholder="alex@company.com"
                className="w-full rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
              {errors.email ? <span className="text-xs text-rose-500">{errors.email.message}</span> : null}
            </label>
          </div>

          <label className="block space-y-2 text-sm text-slate-700">
            <span className="font-medium">Subject</span>
            <input
              type="text"
              placeholder="Product information"
              className="w-full rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
              {...register('subject', { required: 'Subject is required' })}
            />
            {errors.subject ? <span className="text-xs text-rose-500">{errors.subject.message}</span> : null}
          </label>

          <label className="block space-y-2 text-sm text-slate-700">
            <span className="font-medium">Message</span>
            <textarea
              rows="5"
              placeholder="Tell us more about your project or question..."
              className="w-full rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
              {...register('message', {
                required: 'Message is required',
                minLength: { value: 10, message: 'Message must be at least 10 characters' },
              })}
            />
            {errors.message ? <span className="text-xs text-rose-500">{errors.message.message}</span> : null}
          </label>

          <Button type="submit" variant="primary" className="w-full md:w-auto" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Send message'}
            <Send size={15} />
          </Button>
        </form>
      </Card>
    </motion.div>
  )
}

export default ContactForm
