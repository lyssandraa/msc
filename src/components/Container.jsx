/** Page gutter. `narrow` is for long-form reading columns. */
export default function Container({ narrow = false, className = '', children }) {
  const width = narrow ? 'max-w-3xl' : 'max-w-6xl'
  return (
    <div className={`mx-auto w-full ${width} px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  )
}
