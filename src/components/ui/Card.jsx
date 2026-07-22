function Card({ children, className = '', as: Component = 'div', ...props }) {
  return (
    <Component
      className={`rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_10px_40px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Card
