export const POST_NUMBER = 'POST_NUMBER'
export const DELIVERY_LIST = {
  korea_post: {
    name: '우체국택배',
    api: 'https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?displayHeader=N&sid1='
  },
  cj_post: {
    name: 'CJ 대한통운',
    api: 'http://nplus.doortodoor.co.kr/web/detail.jsp?slipno='
  },
  hanjin_post: {
    name: '한진택배',
    api: 'http://www.hanjin.co.kr/Delivery_html/inquiry/result_waybill.jsp?wbl_num='
  },
  lotte_post: {
    name: '롯데택배',
    api: 'https://www.lotteglogis.com/open/tracking?invno='
  },
  logen_post: {
    name: '로젠택배',
    api: 'https://www.ilogen.com/web/personal/trace/'
  },
  kgb_post: {
    name: 'KGB택배',
    api: 'http://www.kgbps.com/delivery/delivery_result.jsp?item_no='
  },
  cvsnet_post: {
    name: 'CVSnet 편의점택배',
    api: 'http://www.cvsnet.co.kr/reservation-inquiry/delivery/index.do?dlvry_type=domestic&invoice_no='
  },
  cu_post: {
    name: 'CU 편의점택배',
    api: 'https://www.cupost.co.kr/postbox/delivery/localResult.cupost?invoice_no='
  },
  kd_post: {
    name: '경동택배',
    api: 'http://kdexp.com/basicNewDelivery.kd?barcode='
  },
  daesin_post: {
    name: '대신택배',
    api: 'http://home.daesinlogistics.co.kr/daesin/jsp/d_freight_chase/d_general_process2.jsp'
  },
  ilyang_logis: {
    name: '일양로지스',
    api: 'http://www.ilyanglogis.com/functionality/card_form_waybill.asp?hawb_no='
  },

}