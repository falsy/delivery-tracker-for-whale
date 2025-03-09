export default function Loading() {
  return (
    <div className="h-[200px] flex items-center justify-center overflow-hidden text-transparent text-[0px] relative">
      loading...
      <div className="w-10 h-10 border-4 border-transparent border-t-green-700 border-l-green-700 rounded-full animate-spin absolute" />
    </div>
  )
}
