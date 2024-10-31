export default `<table class="tblH mt60">
<caption>조회 테이블은 운송장 번호, 보내는 분, 받는 분, 상품명, 배달결과로 구성되어 있습니다.</caption>
<colgroup>
    <col style="width:25%" span="4">
</colgroup>
<thead>
    <tr>
        <th scope="col">운송장 번호</th>
        <th scope="col">발송지</th>
        <th scope="col">도착지</th>
        <th scope="col">배달결과</th>
    </tr>
</thead>
<tbody>
    <tr>
    
                <td>123</td>
                <td>광주지점</td>
                <td>화성서부(대)</td>
                <td>배달완료</td>
        
    </tr>
</tbody>
</table>

<ul class="contStep goodsStep">
<li class="item01"><span>상품접수</span></li> <!-- 현재 택배 위치일때 on 추가 -->
<!-- <li class="item02"><span>터미널 입고</span></li> -->
<li class="item03"><span>상품 이동중</span></li>
<!-- <li class="item04"><span>배달지 도착</span></li> -->
<li class="item05"><span>배송 출발</span></li>
<li class="item06"><span>배달 완료</span></li>
</ul>

                
<div class="tblTopArea tr">
<a href="https://www.logii.com/interface/delvproms/delv_click.asp?comp_code=hd&amp;inv_no=123&amp;login_yn=N&amp;login_id=&amp;login_name=&amp;page_type=P" class="btnLG btnS btnPopup"><span>택배 캐쉬백포인트 적립</span></a>
</div>


<table class="tblH">
<caption>조회 테이블은 단계, 시간, 현재위치, 처리현황으로 구성되어 있습니다.</caption>
<colgroup>
    <col style="width:20%" span="3">
    <col style="width:auto">
</colgroup>
<thead>
    <tr>
        <th scope="col">단계</th>
        <th scope="col">시간</th>
        <th scope="col">현재위치</th>
        <th scope="col">처리현황</th>
    </tr>
</thead>
<tbody>

        <!-- 택배 상태 아이콘 변경을 위해 사용 -->
                                
    <tr>
        <td>배달 완료</td>
        <td>
                2024-04-06&nbsp;14:44
        </td>
        <td>
                고객
        </td>
        <td class="tl">물품을 받으셨습니다.</td>
    </tr>
                            
    <tr>
        <td>배달 완료</td>
        <td>
                2024-04-06&nbsp;14:44
        </td>
        <td>
                화성서부(대)
        </td>
        <td class="tl">배달 완료하였습니다.<br>(배송담당: 테스트)</td>
    </tr>
                            
    <tr>
        <td>배송 출발</td>
        <td>
                2024-04-06&nbsp;07:22
        </td>
        <td>
                화성서부(대)
        </td>
        <td class="tl">고객님의 상품을  17~19시에 배달 예정 입니다.<br>(배송담당: 테스트)</td>
    </tr>
                            
    <tr>
        <td>상품 이동중</td>
        <td>
                2024-04-04&nbsp;09:07
        </td>
        <td>
                화성서브집배센터
        </td>
        <td class="tl">화성서브집배센터에 도착하였습니다.</td>
    </tr>
                            
    <tr>
        <td>상품 이동중</td>
        <td>
                2024-04-04&nbsp;03:20
        </td>
        <td>
                중부권MEGAHUB(터)
        </td>
        <td class="tl">중부권MEGAHUB(터)에 도착하였습니다.</td>
    </tr>
                            
    <tr>
        <td>상품 이동중</td>
        <td>
                2024-04-03&nbsp;22:58
        </td>
        <td>
                광주TML
        </td>
        <td class="tl">광주TML에 도착하였습니다.</td>
    </tr>
                            
    <tr>
        <td>인수/상품접수</td>
        <td>
                2024-04-03&nbsp;--:--
                
        </td>
        <td>
                광주지점
        </td>
        <td class="tl">보내시는 고객님으로부터 상품을 인수했습니다.</td>
    </tr>
                                
</tbody>
</table>
<input type="hidden" id="goodsStep" value="item06">`
