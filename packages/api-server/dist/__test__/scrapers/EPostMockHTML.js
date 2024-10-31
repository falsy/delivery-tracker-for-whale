"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
<div id="print">
  <div class="box_wrap3 ma_t_10 f_s_13 f_w_normal">
    <p>본 서비스인 인터넷 배송조회는 우편물의 배송상태를 고객이 신속히 확인할 수 있도록 제공하는 것이 목적으로 모든 배송정보가 표시되지 않을 수 있습니다.</p>
    <p class="ma_t_5"><span class="f_u">각종 이해관계의 증거자료로 사용하시려면</span> 우편법 시행규칙 제25조 제1항 제4호 다목, 제59조에 따른 <span class="f_u">배달증명서비스를 우체국이나 인터넷우체국을 통해 이용</span>하시기 바랍니다.</p>
  </div>
  <div class="title_wrap ma_t_10">
    <h4>기본정보</h4>
    <p>
      <span class="masking no-print">
        <a class="btn_s" href="javascript:fnPopupMaskingSolv();" title="마스킹(*)해제조회 - 새창으로 열림">마스킹(*)해제조회</a>
        <a class="btn_s" href="#" id="btn_masking" style="cursor:pointer" title="제한표시에 대한 근거 - 새창으로 열림">ⓘ 제한표시에대한 근거</a>
      </span>
    </p>
  </div>
  <table class="table_col">
    <caption>
      <strong>배송조회 기본정보 테이블</strong>
        <p>기본정보 표의 등기번호, 보내는분/접수날짜, 받는분/수신날짜, 취급구분, 배달결과 등의 정보 리스트</p>
    </caption>
    <colgroup>
        <col style="width:15%;">
        <col style="width:15%;">
        <col style="width:14%;">
        <col style="width:15%;">
        <col style="width:12%;">
        <col style="width:15%;">
    </colgroup>
    <thead>
      <tr>
        <th scope="col">등기번호</th>
        <th scope="col">보내는 분/접수일자</th>
        <th scope="col">받는 분</th>
        <th scope="col">수령인/배달일자</th>
        <th scope="col">취급구분</th>
        <th scope="col" class="bg_image_no">배달결과</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">123</th>
        <td>테스트익스프레스<br>2024.03.15</td>
        <td>테*트<br>
        </td>
          <td>테*트<br>2024.03.18</td>
        <td> </td>
        <!-- 0706 테스트 -->
        <td>배달완료 </td>
      </tr>
    </tbody>
  </table>
  <ul class="ul_list">
  <li>보내는 분, 받는 분은 우편물 상에 기재된 성명(회사명 등)을 말하며 수령인은 해당 우편물을 실제로 수령한 분을 말함</li>
  </ul>
  <div class="h4_wrap ma_t_10">
    <div class="title_wrap">
      <h4>배송 진행상황</h4>
    </div>
    <div class="box_wrap1 ma_t_10 ma_b_20" id="deliveryStatusImg">
      <ul class="step_box2 v3">
        <li id="step01" class="v4 n1"> STEP1 접수</li>
        <li id="step02" class="v4 n2"> STEP2 발송</li>
        <li id="step03" class="v4 n3"> STEP3 배달준비</li>
        <li id="step04" class="v4 n4 on"> STEP4 배달완료</li>
      </ul>
    </div>
  </div>
  <div class="h4_wrap ma_t_5">
    <table id="processTable" class="table_col detail_off" style="left: 0px; visibility: visible; position: relative;">
      <caption>
        <strong>배송진행현황 상세표</strong>
        <p>배송 진행 현황표, 날짜, 시간, 발생국, 처리 현황 상세 표기</p>
      </caption>
      <colgroup>
        <col style="width:25%;">
        <col style="width:15%;">
        <col style="width:30%;">
        <col style="width:30%;">
      </colgroup>
      <thead>
        <tr>
          <th scope="col">날짜</th>
          <th scope="col">시간</th>
          <th scope="col">발생국</th><!-- 김정목주사님 요청으로 타이틀명을 현재위치에서 발생국으로 변경 -->
          <th scope="col" class="bg_image_no">처리현황</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2024.03.15</td>
          <td>07:42</td>
          <td><a href="#" onclick="return goPostDetail(10248, '접수', event)" onkeypress="return goPostDetail(10248, '접수', event)" title="새창열림"><span style="color:blue">국제우편물류센터</span></a>
          </td>
          <td>
            <span class="evtnm">접수</span>
          </td>
        </tr>
        <tr>
          <td>2024.03.15</td>
          <td>10:06</td>
          <td><a href="#" onclick="return goPostDetail(85889, '발송', event)" onkeypress="return goPostDetail(85889, '발송', event)" title="새창열림"><span style="color:blue">인천국제공항(화물터미널)</span></a></td>
          <td>
            <span class="evtnm">발송</span>
            <span class="tracered"> </span>
          </td>
        </tr>
        <tr>
          <td>2024.03.15</td>
          <td>12:11</td>
          <td><a href="#" onclick="return goPostDetail(49043, '도착', event)" onkeypress="return goPostDetail(49043, '도착', event)" title="새창열림"><span style="color:blue">안양우편물류센터</span></a></td>
          <td>
            <span class="evtnm">도착</span>
            <span class="tracered"> </span>
          </td>
        </tr>
        <tr>
          <td>2024.03.16</td>
          <td>18:07</td>
          <td><a href="#" onclick="return goPostDetail(86108, '도착', event)" onkeypress="return goPostDetail(86108, '도착', event)" title="새창열림"><span style="color:blue">제주소포센터(위탁)</span></a></td>
          <td>
            <span class="evtnm">도착</span>
            <span class="tracered"> </span>
          </td>
        </tr>
        <tr>
          <td>2024.03.18</td>
          <td>05:01</td>
          <td><a href="#" onclick="return goPostDetail(69018, '배달준비', event)" onkeypress="return goPostDetail(69018, '배달준비', event)" title="새창열림"><span style="color:blue">제주우편집중국</span></a>
            <br>TEL : 064.710.5200
          </td>
          <td>
            <span class="evtnm">배달준비</span> <a href="javascript:fncDetailInfo('123','20240318',3,'69018','1','0','0') " title="새창열림"><span style="color:blue;">(집배원 정보 보기)</span></a>
          </td>
        </tr>
        <tr>
          <td>2024.03.18</td>
          <td>12:12</td>
          <td><a href="#" onclick="return goPostDetail(69018, '배달완료', event)" onkeypress="return goPostDetail(69018, '배달완료', event)" title="새창열림">제주우편집중국</a></td>
          <td>
            <span class="evtnm">배달완료</span>
            (<span class="tracered"> 배달 </span>)<br>      
            (수령인:테*터님 - 본인)
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
//# sourceMappingURL=EPostMockHTML.js.map