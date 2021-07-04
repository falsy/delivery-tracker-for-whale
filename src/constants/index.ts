export const DELIVERY_DATA = 'DELIVERY_DATA'
export const DELIVERY_INIT = { uid: 1, label: '', code: '', isInline: true, isWindow: true }
export const DELIVERY_LIST = [{
    uid: 1,
    id: 'kr.epost',
    name: '우체국 택배',
    api: 'https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?displayHeader=N&sid1=',
    isInline: true,
    isWindow: true
  }, {
    uid: 2,
    id: 'kr.cjlogistics',
    name: 'CJ 대한통운',
    api: 'http://nplus.doortodoor.co.kr/web/detail.jsp?slipno=',
    isInline: true,
    isWindow: true
  }, {
    uid: 3,
    id: 'kr.hanjin',
    name: '한진 택배',
    api: 'http://www.hanjinexpress.hanjin.net/customer/hddcw18.tracking?w_num=',
    isInline: true,
    isWindow: true
  }, {
    uid: 4,
    id: 'kr.lotte',
    name: '롯데 택배',
    api: 'https://www.lotteglogis.com/open/tracking?invno=',
    isInline: true,
    isWindow: true
  }, {
    uid: 5,
    id: '	kr.logen',
    name: '로젠 택배',
    api: 'https://www.ilogen.com/web/personal/trace/',
    isInline: true,
    isWindow: true
  }, {
    uid: 6,
    id: 'kr.cvsnet',
    name: 'GS Postbox 택배',
    api: 'http://www.cvsnet.co.kr/reservation-inquiry/delivery/index.do?dlvry_type=domestic&invoice_no=',
    isInline: true,
    isWindow: true
  }, {
    uid: 7,
    id: 'kr.cupost',
    name: 'CU 편의점 택배',
    api: 'https://www.cupost.co.kr/postbox/delivery/localResult.cupost?invoice_no=',
    isInline: true,
    isWindow: true
  }, {
    uid: 8,
    id: 'kr.kdexp',
    name: '경동 택배',
    api: 'http://kdexp.com/basicNewDelivery.kd?barcode=',
    isInline: true,
    isWindow: true
  }, {
    uid: 9,
    id: '	kr.daesin',
    name: '대신 택배',
    api: 'http://home.daesinlogistics.co.kr/daesin/jsp/d_freight_chase/d_general_process2.jsp',
    isInline: false,
    isWindow: true
  }, {
    uid: 10,
    id: '	kr.ilyanglogis',
    name: '일양로지스',
    api: 'http://www.ilyanglogis.com/functionality/card_form_waybill.asp?hawb_no=',
    isInline: true,
    isWindow: true
  }, {
    uid: 11,
    id: '	un.upu.ems',
    name: '국제우편(EMS)',
    api: 'https://service.epost.go.kr/trace.RetrieveEmsRigiTraceList.comm?displayHeader=N&POST_CODE=',
    isInline: false,
    isWindow: true
  }, {
    uid: 12,
    id: "us.fedex",
    name: "Fedex",
    api: '',
    isInline: true,
    isWindow: false
  }, {
    uid: 13,
    id: "nl.tnt",
    name: "TNT",
    api: '',
    isInline: true,
    isWindow: false
  }]

  // , {
  //   uid: 14,
  //   id: "us.ups",
  //   name: "UPS",
  //   api: '',
  //   isInline: true,
  //   isWindow: false
  // }