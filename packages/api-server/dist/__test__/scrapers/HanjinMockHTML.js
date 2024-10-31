"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `<div class="cont-box cont-in">
<script>
        function go_Cashback(){
                window.name = "hanjin_waybill";
                var frm = document.ok_form;
                pop_win = window.open("","pop_win","scrollbars=no,width="+frm.width.value+",height="+frm.height.value+",left=230,top=150");
                frm.target = "pop_win";
                frm.submit();
                frm.focus();
        }

        function openDtlRsn(wbl_num) {
                window.open("pop_custom_clearance.jsp?wbl_num="+ wbl_num,"통관진행상태","width=500,height=500,resizable=yes");
        }

        $(function() {
                $(".delivery-step > ul > li").each(function() {
                        if($(this).hasClass("on")) {
                                return false;
                        }
                        $(this).addClass("over");
                });
        });

        function fnShow() {
                $(".view").show();
                $("#moreHide").hide();
        }

/*      window.onbeforeunload = function() {
                alert("test");
        } */


</script>
        <form name="ok_form" id="ok_form" method="post" action="https://www.logii.com/interface/delvproms/delv_click.asp">
                <input type="hidden" name="comp_code" value="hanjin">
                <input type="hidden" name="inv_no" value="123 ">
                <input type="hidden" name="login_yn" value="N">
                <input type="hidden" name="login_name" value=" />
                <input type=" hidden"="">
                <input type="hidden" name="width" value="836">
                <input type="hidden" name="height" value="668">
                <input type="hidden" name="repl_wbl_num" id="repl_wbl_num" value="123">
        </form>

        <div class="songjang-num">
                <span class="tit">운송장번호</span> <span class="num">123</span>
        </div>
        <div class="delivery-time">
<!--     국내운송장, 기업물류 B2B 운송장
          -->



                                <p class="cal-sec"><span class="date">2024-04-15</span> <span class="time">14:10</span></p>


                        <p class="comm-sec">

                                <span class="comm-ico "></span>
                                <strong>배송완료</strong>되었습니다.
                        </p>

        </div>
         <!-- 국내운송장, 기업물류 B2B 운송장 -->
                <div class="gap"></div>
                <h3 class="c-tit01">기본정보</h3>
                <table class="board-list-table delivery-tbl">
                        <caption>
                                <span class="blind"></span>
                        </caption>
                        <colgroup>
                                <col style="width:auto;">
                                <col style="width:15%;">
                                <col style="width:15%;">
                                <col style="width:15%;">
                                <col style="width:15%;">
                        </colgroup>
                        <thead>
                                <tr>
                                        <th>상품명</th>
                                        <th>보내는 분</th>
                                        <th colspan="2">받는 분</th>
                                        <th>운임</th>
                                </tr>
                        </thead>
                        <tbody>
                                <tr>
                                        <td data-label="상품명">트레이닝 팬츠</td>
                                        <td data-label="보내는 분">주식**</td>
                                        <td data-label="받는 분">테*트</td>
                                        <td data-label="받는 주소">울산</td>
                                        <td data-label="운임">선불</td>
                        </tr></tbody>
                </table>
                <div class="gap"></div>

        <h3 class="c-tit01">배송현황  </h3>
                <div class="delivery-step">
                <!--
                        <ul>
                                <li > <span class="ico-wr"><span class="ico ico1"></span></span> <span class="num">STEP1</span><span class="txt"><span>상품<br>접수</span></span></span></li>
                                <li > <span class="ico-wr"><span class="ico ico2"></span></span> <span class="num">STEP2</span><span class="txt"><span>터미널<br>입고</span></span></li>
                                <li > <span class="ico-wr"><span class="ico ico3"></span></span> <span class="num">STEP3</span><span class="txt"><span>상품<br>이동중</span></span></li>
                                <li > <span class="ico-wr"><span class="ico ico4"></span></span> <span class="num">STEP4</span><span class="txt"><span>배송<br>터미널<br>도착</span></span></li>
                                <li > <span class="ico-wr"><span class="ico ico5"></span></span> <span class="num">STEP5</span><span class="txt"><span>배송<br>출발</span></span></li>
                                <li class="on" ><span class="ico-wr"> <span class="ico ico6"></span></span> <span class="num">STEP6</span><span class="txt"><span>배송<br>완료</span></span></li>
                        </ul>
                -->
                        <ul>
                                <li> <span class="ico-wr"><span class="ico ico1"></span></span> <span class="num">STEP1</span><span class="txt"><span>상품<br>접수</span></span></li>
                                <li> <span class="ico-wr"><span class="ico ico2"></span></span> <span class="num">STEP2</span><span class="txt"><span>터미널<br>입고</span></span></li>
                                <li> <span class="ico-wr"><span class="ico ico3"></span></span> <span class="num">STEP3</span><span class="txt"><span>상품<br>이동중</span></span></li>
                                <li> <span class="ico-wr"><span class="ico ico4"></span></span> <span class="num">STEP4</span><span class="txt"><span>배송<br>터미널<br>도착</span></span></li>
                                <li> <span class="ico-wr"><span class="ico ico5"></span></span> <span class="num">STEP5</span><span class="txt"><span>배송<br>출발</span></span></li>
                                <!--<li class="on" ><span class="ico-wr"> <span class="ico ico6"></span></span> <span class="num">STEP6</span><span class="txt"><span>배송<br>완료</span></span></li>-->
                                <li class="on"><span class="ico-wr"> <span class="ico ico6"></span></span> <span class="num">STEP6</span><span class="txt"><span>배송<br>완료</span></span></li>
                        </ul>
                </div>


        <div class="ssgap"></div>


        <div class="waybill-tbl">
                <table class="board-list-table">
                        <caption><span class="blind"></span></caption>
                        <colgroup>
                                <col style="width:120px;">
                                <col style="width:80px;">
                                <col style="width:20%;">
                                <col style="width:auto;">
                        </colgroup>
                        <thead>
                                <tr>
                                        <th scope="col">날짜</th>
                                        <th scope="col">시간</th>
                                        <th scope="col">상품위치</th>
                                        <th scope="col">배송 진행상황</th>
                                </tr>
                        </thead>
                        <tbody>
                                                        <tr class="">
                                                                <td class="w-date">2024-04-12</td>
                                                                <td class="w-time">17:08</td>
                                                                <td class="w-org">중부산 터미널</td>
                                                                <td class="l w-preocess">
                                                                        <span class="stateDesc">고객님 상품을 집하하여  <strong>중부산 터미널</strong>에 입고되었습니다.</span>
                                                                                <!-- <br>  -->
                                                                </td>
                                                        </tr>

                                                        <tr class="">
                                                                <td class="w-date">2024-04-12</td>
                                                                <td class="w-time">17:08</td>
                                                                <td class="w-org">중부산 터미널</td>
                                                                <td class="l w-preocess">
                                                                        <span class="stateDesc"><strong>중부산터미널</strong>에서  <strong>칠곡HUB터미널</strong>로 이동중입니다.</span>
                                                                                <!-- <br>  -->
                                                                </td>
                                                        </tr>

                                                        <tr class="">
                                                                <td class="w-date">2024-04-12</td>
                                                                <td class="w-time">22:53</td>
                                                                <td class="w-org">칠곡HUB 터미널</td>
                                                                <td class="l w-preocess">
                                                                        <span class="stateDesc"><strong>칠곡HUB 터미널</strong>에  <strong>도착</strong>하였습니다.</span>
                                                                                <!-- <br>  -->
                                                                </td>
                                                        </tr>

                                                        <tr class="">
                                                                <td class="w-date">2024-04-12</td>
                                                                <td class="w-time">22:53</td>
                                                                <td class="w-org">칠곡HUB 터미널</td>
                                                                <td class="l w-preocess">
                                                                        <span class="stateDesc"><strong>칠곡HUB터미널</strong>에서  <strong>울산터미널</strong>로 이동중입니다.</span>
                                                                                <!-- <br>  -->
                                                                </td>
                                                        </tr>

                                                        <tr class="">
                                                                <td class="w-date">2024-04-13</td>
                                                                <td class="w-time">08:19</td>
                                                                <td class="w-org">울산 터미널</td>
                                                                <td class="l w-preocess">
                                                                        <span class="stateDesc"><strong>울산 터미널</strong>에  <strong>도착</strong>하였습니다.</span>
                                                                                <!-- <br>  -->
                                                                </td>
                                                        </tr>

                                                        <tr class="">
                                                                <td class="w-date">2024-04-13</td>
                                                                <td class="w-time">08:19</td>
                                                                <td class="w-org">울산 터미널</td>
                                                                <td class="l w-preocess">
                                                                        <span class="stateDesc">배송지점에 도착하여 <strong>배송을 준비중</strong>입니다.</span>
                                                                                <!-- <br>  -->
                                                                </td>
                                                        </tr>

                                                        <tr class="">
                                                                <td class="w-date">2024-04-15</td>
                                                                <td class="w-time">09:23</td>
                                                                <td class="w-org">울산동구 터미널</td>
                                                                <td class="l w-preocess">
                                                                        <span class="stateDesc"><strong>배송출발</strong>하였습니다.</span>
                                                                                <!-- <br> (배송사원 : 테스트) -->
                                                                                        <br>(배송사원 : 테스트)
                                                                </td>
                                                        </tr>

                                                        <tr class="">
                                                                <td class="w-date">2024-04-15</td>
                                                                <td class="w-time">14:10</td>
                                                                <td class="w-org">울산동구 터미널</td>
                                                                <td class="l w-preocess">
                                                                        <span class="stateDesc"><strong>배송완료</strong>되었습니다.</span>
                                                                                <!-- <br> (배송사원 : 테스트) -->
                                                                                        <br>(배송사원 : 테스트)
                                                                </td>
                                                        </tr>

                        </tbody>
                </table>
        </div>



 <!---->





        <div class="sgap"></div>

                <div class="info-list">
                <p class="tit">현지 배송진행 현황은? Local Time 기준으로 현지 배송사에서 제공하는 정보입니다.</p>
                        <ul>
                                <li>자세한 사항은 콜센터로 문의하시기 바랍니다.</li>
                                                                        <li>한국 내 배송 :  <strong class="cblue">한진택배 콜센터 (1588-0011)</strong> </li>
                        </ul>
                </div>
<div class="gap"></div>
<div class="c">
        <!-- 
        <button type="button" onClick="location.href='/kor/CMS/DeliveryMgr/WaybillSch.do?mCode=MN038';" class="ldp-btn">다시 조회하기</button>
        <button type="button" class="ldp-btn" onClick="commonPgrLayor(this, '/kor/ajx_json/DeliveryMgr/Mypage/KakakoShare.do?wblNum=123&sndNam=AYADeCGuk+GiPCeT5KYZ6QgU6vAAXwABABVhd3MtY3J5cHRvLXB1YmxpYy1rZXkAREF5VWM4a0pKTStvbGxXcXRNN21xK01PVUtPMlVtbzZ6ZEhXQS9KRXA1VzlvbEg3ajhDZmkxK2N0VDJReWI5R09Gdz09AAEAB2F3cy1rbXMAUGFybjphd3M6a21zOmFwLW5vcnRoZWFzdC0yOjQyMDQ5Njc5NjAwNjprZXkvY2Q3ODE0YmEtNmFkYi00N2FiLWEwZjktNDAzNGQ5NmY4Yzk5ALgBAgEAeJgoFYo0gcWXo75x3rHcgq6XvgD38i3Lf/i+1957KKZvAagWYr25sPsvrW8Qf3ww/9UAAAB+MHwGCSqGSIb3DQEHBqBvMG0CAQAwaAYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAwu9G0Cgh5RwhLn6VsCARCAO2IZzu6zhR7GdbZTuFdNVqkcg3G2Exiy21RSNwbE477X0VDNCBpGLdSMynQpucULrL3CmwQWhN3RqsTpAgAAAAAMAAAQAAAAAAAAAAAAAAAAAIYimuQ2WoT3QFUhNYROjy//////AAAAAQAAAAAAAAAAAAAAAQAAAB/8UMmoZvfsZ7StJmKmfWlXaPuxkYjR8PnZO3j6mUG3lRSlT/xvf/UCJTvoRjo5SABnMGUCMQCMSnw14rGtn4CVN3WJJl8HlEbwIYo7sw83d0z2+/9kYL6sZ6b491Dtb7gghGgM64cCMAsFgcS/xnA72QJn1wKeCq+4C1ZjT11revJ/tPwmdVeXuTlhDCbg9KHR4ewGCMjceg==&godNam=AYADeFaTMxu9UoR+iN/MxqJFwCgAXwABABVhd3MtY3J5cHRvLXB1YmxpYy1rZXkAREF4NWlFbk5TOUhaYy9tWXAvdHluVVVPMjFsaTNza09JS1RrSDJNSlJOSU5TbnlEZUxuL2lNdUpnZ3lDcktKbjBLQT09AAEAB2F3cy1rbXMAUGFybjphd3M6a21zOmFwLW5vcnRoZWFzdC0yOjQyMDQ5Njc5NjAwNjprZXkvY2Q3ODE0YmEtNmFkYi00N2FiLWEwZjktNDAzNGQ5NmY4Yzk5ALgBAgEAeJgoFYo0gcWXo75x3rHcgq6XvgD38i3Lf/i+1957KKZvAYb+QvA+FQZlbC5GZO1vDIcAAAB+MHwGCSqGSIb3DQEHBqBvMG0CAQAwaAYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAyWNKlELTe3GUypGq8CARCAO+E6Gfdmjz24zmmzPlED+zcsqruW3VwCRueoXf++GMWYo6Zf4IDdIq9yHC3iKlLqqZ65MO+wcOTogkutAgAAAAAMAAAQAAAAAAAAAAAAAAAAAG4QgE8Q+ruyJZfLHDJB1tL/////AAAAAQAAAAAAAAAAAAAAAQAAADsqwShQxistRcuTEx+vddh22FuYztBEcTjhurNKZ+1o07SZFUooMRgvVbTDgy+D3nAD7o7Cps1trQsRTzUEABKvOv9UkwsHI7nBwYAAZzBlAjEA9nD4X93u3y1HHe7apylfGobdQtLhLAtX3D9iU+IpiM+XW3gbS4dONrLfOuXo03WmAjAs9v93Sab2N6Tyitf8f2KVTm7/2F4ly85gB4k9BnaiRgmot4QYYHBPem6gSBzqQ4Y=', '공유 ', '600', '550');" title="카카오톡 공유하기">카카오톡 공유</button>
        -->
        <button type="button" onclick="location.href='/kor/CMS/DeliveryMgr/WaybillSch.do?mCode=MN038';" class="ldp-btn">다시 조회하기</button>
        <button type="button" class="ldp-btn" onclick="commonPgrLayor(this, '/kor/ajx_json/DeliveryMgr/Mypage/KakakoShare.do?wblNum=123&amp;sndNam=주식회사 원아이컴퍼니&amp;godNam=JM. 레서 337 쭈리 트레이닝 팬츠 [그레이-L(32)]', '공유 ', '600', '550');" title="카카오톡 공유하기">카카오톡 공유</button>
</div>

</div>`;
//# sourceMappingURL=HanjinMockHTML.js.map