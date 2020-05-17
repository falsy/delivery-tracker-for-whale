export const POST_NUMBER = 'POST_NUMBER';
export const DELIVERY_INIT = { idx : 0, code: '' };
export const DELIVERY_DATA = 'DELIVERY_DATA';
export const DELIVERY_LIST = [{
    id: 'kr.epost',
    label: '',
    name: '우체국 택배',
    api: 'https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?displayHeader=N&sid1='
  }, {
    id: 'kr.cjlogistics',
    label: '',
    name: 'CJ 대한통운',
    api: 'http://nplus.doortodoor.co.kr/web/detail.jsp?slipno='
  }, {
    id: 'kr.hanjin',
    label: '',
    name: '한진 택배',
    api: 'http://www.hanjin.co.kr/Delivery_html/inquiry/result_waybill.jsp?wbl_num='
  }, {
    id: 'kr.lotte',
    label: '',
    name: '롯데 택배',
    api: 'https://www.lotteglogis.com/open/tracking?invno='
  }, {
    id: '	kr.logen',
    label: '',
    name: '로젠 택배',
    api: 'https://www.ilogen.com/web/personal/trace/'
  }, {
    id: 'kr.cvsnet',
    label: '',
    name: 'GS Postbox 택배',
    api: 'http://www.cvsnet.co.kr/reservation-inquiry/delivery/index.do?dlvry_type=domestic&invoice_no='
  }, {
    id: 'kr.cupost',
    label: '',
    name: 'CU 편의점 택배',
    api: 'https://www.cupost.co.kr/postbox/delivery/localResult.cupost?invoice_no='
  }, {
    id: 'kr.kdexp',
    label: '',
    name: '경동 택배',
    api: 'http://kdexp.com/basicNewDelivery.kd?barcode='
  }, {
    id: '	kr.daesin',
    label: '',
    name: '대신 택배',
    api: 'http://home.daesinlogistics.co.kr/daesin/jsp/d_freight_chase/d_general_process2.jsp'
  }, {
    id: '	kr.ilyanglogis',
    label: '',
    name: '일양로지스',
    api: 'http://www.ilyanglogis.com/functionality/card_form_waybill.asp?hawb_no='
  }, {
    id: '	un.upu.ems',
    label: '',
    name: '국제우편(EMS)',
    api: 'https://service.epost.go.kr/trace.RetrieveEmsRigiTraceList.comm?displayHeader=N&POST_CODE='
  }];