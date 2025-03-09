import Loading from "../atoms/Loading"

export default function LoadingBox() {
  return (
    <div className="sticky top-0">
      <div className="absolute w-full">
        <Loading />
      </div>
    </div>
  )
}
