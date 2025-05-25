import IDeliveryProgressVO from "@domains/vos/interfaces/IDeliveryProgressVO"
import LoadingBox from "@components/molecules/LoadingBox"
import DeliveryErrorMessage from "@components/atoms/DeliveryErrorMessage"
import StateSummary from "@components/atoms/StateSummary"
import StateList from "@components/atoms/StateList"
import CloseButton from "@components/atoms/CloseButton"

export default function StateBox({
  isPending,
  deliveryErrorMessage,
  deliveryState,
  progresses,
  onClose
}: {
  isPending: boolean
  deliveryErrorMessage: string
  deliveryState: { from: string; to: string; state: string }
  progresses: IDeliveryProgressVO[]
  onClose: () => void
}) {
  return (
    <div className="border-t border-divider dark:border-divider-dark py-3 mt-1">
      <div className="relative h-[320px] overflow-auto pr-4">
        {isPending && <LoadingBox />}
        {!!deliveryErrorMessage && (
          <DeliveryErrorMessage message={deliveryErrorMessage} />
        )}
        {progresses.length > 0 && !deliveryErrorMessage && (
          <div
            className={`transition-opacity duration-150 ${isPending ? "opacity-0" : "opacity-100"}`}
          >
            <StateSummary state={deliveryState} />
            <StateList progresses={progresses} />
          </div>
        )}
      </div>
      <CloseButton onClick={onClose} />
    </div>
  )
}
