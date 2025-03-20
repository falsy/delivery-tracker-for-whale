// Date: 25.02.14
const carriers = [
  {
    id: "2de90e9c-1fda-11ef-8884-0a8cb08d3aea",
    no: 1,
    name: "epost",
    displayName: "우체국 택배",
    isCrawlable: true,
    isPopupEnabled: true,
    popupURL:
      "https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?displayHeader=N&sid1="
  },
  {
    id: "2de91044-1fda-11ef-8884-0a8cb08d3aea",
    no: 2,
    name: "cjlogistics",
    displayName: "CJ 대한통운",
    isCrawlable: true,
    isPopupEnabled: true,
    popupURL: "https://trace.cjlogistics.com/next/tracking.html?wblNo="
  },
  {
    id: "2de9109b-1fda-11ef-8884-0a8cb08d3aea",
    no: 3,
    name: "hanjin",
    displayName: "한진 택배",
    isCrawlable: true,
    isPopupEnabled: true,
    popupURL:
      "https://www.hanjin.com/kor/CMS/DeliveryMgr/WaybillResult.do?mCode=MN038&schLang=KR&wblnum="
  },
  {
    id: "2de910d2-1fda-11ef-8884-0a8cb08d3aea",
    no: 4,
    name: "lotte",
    displayName: "롯데 택배",
    isCrawlable: true,
    isPopupEnabled: true,
    popupURL: "https://www.lotteglogis.com/open/tracking?invno="
  },
  {
    id: "ed4ec7e2-20ee-11ef-8884-0a8cb08d3aea",
    no: 5,
    name: "logen",
    displayName: "로젠 택배",
    isCrawlable: true,
    isPopupEnabled: true,
    popupURL: "https://www.ilogen.com/web/personal/trace/"
  },
  {
    id: "2de91105-1fda-11ef-8884-0a8cb08d3aea",
    no: 6,
    name: "gspostbox",
    displayName: "GS 편의점 택배",
    isCrawlable: false,
    isPopupEnabled: true,
    popupURL: "https://www.cvsnet.co.kr/invoice/tracking.do?invoice_no="
  },
  {
    id: "2de9113a-1fda-11ef-8884-0a8cb08d3aea",
    no: 7,
    name: "cupost",
    displayName: "CU 편의점 택배",
    isCrawlable: false,
    isPopupEnabled: true,
    popupURL:
      "https://www.cupost.co.kr/postbox/delivery/localResult.cupost?invoice_no="
  },
  {
    id: "2de9116d-1fda-11ef-8884-0a8cb08d3aea",
    no: 8,
    name: "kdexp",
    displayName: "경동 택배",
    isCrawlable: true,
    isPopupEnabled: false,
    popupURL: ""
  },
  {
    id: "2de9119c-1fda-11ef-8884-0a8cb08d3aea",
    no: 9,
    name: "daesin",
    displayName: "대신 택배",
    isCrawlable: true,
    isPopupEnabled: false,
    popupURL: ""
  },
  {
    id: "2de911ca-1fda-11ef-8884-0a8cb08d3aea",
    no: 10,
    name: "ilyanglogis",
    displayName: "일량로지스",
    isCrawlable: false,
    isPopupEnabled: true,
    popupURL:
      "http://www.ilyanglogis.com/functionality/card_form_waybill.asp?hawb_no="
  },
  {
    id: "2de911fb-1fda-11ef-8884-0a8cb08d3aea",
    no: 11,
    name: "ems",
    displayName: "국체우편(EMS)",
    isCrawlable: false,
    isPopupEnabled: true,
    popupURL:
      "https://service.epost.go.kr/trace.RetrieveEmsRigiTraceList.comm?displayHeader=N&POST_CODE="
  }
]

export default carriers
