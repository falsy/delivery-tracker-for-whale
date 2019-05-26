export const POST_NUMBER = 'POST_NUMBER';
export const DELIVERY_INIT = { idx : 0, code: '' };
export const DELIVERY_DATA = 'DELIVERY_DATA';
export const DELIVERY_LIST = [{
    name: '우체국 택배',
    api: 'https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?displayHeader=N&sid1='
  }, {
    name: 'CJ 대한통운',
    api: 'http://nplus.doortodoor.co.kr/web/detail.jsp?slipno='
  }, {
    name: '한진 택배',
    api: 'http://www.hanjin.co.kr/Delivery_html/inquiry/result_waybill.jsp?wbl_num='
  }, {
    name: '롯데 택배',
    api: 'https://www.lotteglogis.com/open/tracking?invno='
  }, {
    name: '로젠 택배',
    api: 'https://www.ilogen.com/web/personal/trace/'
  }, {
    name: 'KGB 택배',
    api: 'http://www.kgbps.com/delivery/delivery_result.jsp?item_no='
  }, {
    name: 'CVSnet 편의점 택배',
    api: 'http://www.cvsnet.co.kr/reservation-inquiry/delivery/index.do?dlvry_type=domestic&invoice_no='
  }, {
    name: 'CU 편의점 택배',
    api: 'https://www.cupost.co.kr/postbox/delivery/localResult.cupost?invoice_no='
  }, {
    name: '경동 택배',
    api: 'http://kdexp.com/basicNewDelivery.kd?barcode='
  }, {
    name: '대신 택배',
    api: 'http://home.daesinlogistics.co.kr/daesin/jsp/d_freight_chase/d_general_process2.jsp'
  }, {
    name: '일양로지스',
    api: 'http://www.ilyanglogis.com/functionality/card_form_waybill.asp?hawb_no='
  }, {
    name: '국제우편(EMS)',
    api: 'https://service.epost.go.kr/trace.RetrieveEmsRigiTraceList.comm?displayHeader=N&POST_CODE='
  }];