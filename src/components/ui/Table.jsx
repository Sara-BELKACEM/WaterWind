function Table({ children, className = '' }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full text-left">
        {children}
      </table>
    </div>
  )
}

export default Table
