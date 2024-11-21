import styled from "@emotion/styled"
import { css } from "@emotion/react"
import IDeliveryProgressVO from "@domains/vos/interfaces/IDeliveryProgressVO"
import Loading from "@components/commons/items/Loading"

export default function TrackerStateBox({
  isLoading,
  errDeliveryMessage,
  deliveryState,
  progresses,
  closeFnc
}: {
  isLoading: boolean
  errDeliveryMessage: string
  deliveryState: { from: string; to: string; state: string }
  progresses: IDeliveryProgressVO[]
  closeFnc: () => void
}) {
  return (
    <div
      css={css`
        border-top: 1px solid #eee;
        padding: 20px 0;
        @media (prefers-color-scheme: dark) {
          border-color: rgb(85, 85, 85);
        }
      `}
    >
      <div
        css={css`
          height: 200px;
          overflow: auto;
          padding: 0 15px 0 0;
        `}
      >
        {isLoading && (
          <div
            css={css`
              position: fixed;
              width: 100%;
              left: 0;
            `}
          >
            <Loading />
          </div>
        )}
        {!isLoading && !!errDeliveryMessage && (
          <p
            css={css`
              padding: 0 2px;
              color: #bbb;
              font-size: 13px;

              @media (prefers-color-scheme: dark) {
                color: #ddd;
              }
            `}
          >
            {errDeliveryMessage}
          </p>
        )}
        {progresses.length > 0 && !errDeliveryMessage && (
          <div>
            <div
              css={css`
                margin-bottom: 20px;
              `}
            >
              <$table>
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
              </$table>
            </div>

            <$stateList>
              <$table>
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
              </$table>
            </$stateList>
          </div>
        )}
      </div>
      <button
        css={css`
          margin-top: 20px;
          border: 0;
          text-align: center;
          width: 100%;
          font-size: 12px;
          line-height: 36px;
          padding: 0;
          background: #f5f5f5;
          border: 1px solid #ddd;

          @media (prefers-color-scheme: dark) {
            background: rgb(44, 44, 44);
            color: #ddd;
            border-color: rgb(85, 85, 85);
          }
        `}
        onClick={closeFnc}
      >
        닫기
      </button>
    </div>
  )
}

const $table = styled.table`
  table-layout: fixed;
  width: 100%;
  text-align: center;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-spacing: 0;
  font-size: 13px;
  @media (prefers-color-scheme: dark) {
    border-color: rgb(85, 85, 85);
    color: #fff;
  }

  th,
  td {
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
    @media (prefers-color-scheme: dark) {
      border-color: rgb(85, 85, 85);
    }
  }

  th {
    background: #f5f5f5;
    line-height: 34px;
    @media (prefers-color-scheme: dark) {
      background: rgb(44, 44, 44);
    }
  }

  td {
    line-height: 20px;
    padding: 5px;
  }
`

const $stateList = styled.div`
  table {
    th:first-of-type {
      width: 35%;
    }
    td {
      p {
        margin: 5px 0;
      }
    }
  }
`
