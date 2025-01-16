import { css } from "@styled-system/css"
import IDeliveryProgressVO from "@domains/vos/interfaces/IDeliveryProgressVO"
import Loading from "@components/commons/items/Loading"
import StateTable from "./StateTable"

export default function TrackerStateBox({
  isPending,
  errDeliveryMessage,
  deliveryState,
  progresses,
  closeFnc
}: {
  isPending: boolean
  errDeliveryMessage: string
  deliveryState: { from: string; to: string; state: string }
  progresses: IDeliveryProgressVO[]
  closeFnc: () => void
}) {
  return (
    <div
      className={css({
        borderTop: "1px solid #eee",
        padding: "20px 0",
        "@media (prefers-color-scheme: dark)": {
          borderColor: "rgb(85, 85, 85)"
        }
      })}
    >
      <div
        className={css({
          height: 200,
          overflow: "auto",
          padding: "0 15px 0 0",
          position: "relative"
        })}
      >
        {isPending && (
          <div
            className={css({
              position: "sticky",
              top: 0
            })}
          >
            <div
              className={css({
                position: "absolute",
                width: "100%"
              })}
            >
              <Loading />
            </div>
          </div>
        )}
        {!!errDeliveryMessage && (
          <p
            className={css({
              padding: "0 2px",
              color: "#bbb",
              fontSize: "13px",
              "@media (prefers-color-scheme: dark)": {
                color: "#ddd"
              }
            })}
          >
            {errDeliveryMessage}
          </p>
        )}
        {progresses.length > 0 && !errDeliveryMessage && (
          <div
            className={css({
              opacity: isPending ? 0 : 1,
              transition: "opacity",
              transitionDuration: "0.15s"
            })}
          >
            <div
              className={css({
                marginBottom: "20px"
              })}
            >
              <StateTable>
                <thead>
                  <tr>
                    <th>발송지</th>
                    <th>도착지</th>
                    <th>배달결과</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{deliveryState.from}</td>
                    <td>{deliveryState.to}</td>
                    <td>{deliveryState.state}</td>
                  </tr>
                </tbody>
              </StateTable>
            </div>

            <StateTable>
              <thead>
                <tr>
                  <th>단계/시간</th>
                  <th>위치/현황</th>
                </tr>
              </thead>
              <tbody>
                {progresses.map((progress, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <p>[{progress.state.name}]</p>
                        <p>{progress.time}</p>
                      </td>
                      <td>
                        <p>[{progress.location}]</p>
                        <p>{progress.description}</p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </StateTable>
          </div>
        )}
      </div>
      <button
        className={css({
          margin: "20px auto 0",
          display: "block",
          textAlign: "center",
          width: "100%",
          fontSize: "12px",
          lineHeight: "36px",
          padding: 0,
          background: "#f5f5f5",
          border: "1px solid #ddd",
          "@media (prefers-color-scheme: dark)": {
            background: "rgb(44, 44, 44)",
            color: "#ddd",
            borderColor: "rgb(85, 85, 85)"
          }
        })}
        onClick={closeFnc}
      >
        닫기
      </button>
    </div>
  )
}
