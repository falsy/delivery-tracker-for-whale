export default function Loading() {
  return (
    <div
      className="h-[320px] flex items-center justify-center overflow-hidden text-transparent text-[0px] relative"
      role="status"
    >
      loading...
      <div className="w-12 h-12 border-3 border-transparent border-t-primary border-l-primary rounded-full animate-spin absolute" />
    </div>
  )
}
