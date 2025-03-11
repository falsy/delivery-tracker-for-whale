export default function DeliveryErrorMessage({ message }: { message: string }) {
  return (
    <p className="text-xs text-gray-500 dark:text-gray-400 px-0.5 py-0">
      {message}
    </p>
  )
}
