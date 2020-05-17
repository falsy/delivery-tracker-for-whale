import { DELIVERY_LIST } from '../constants/index.js';
import DateFormat from '../utils/DateFormat.js';

class DomElement {

  appendDeliveryList(deliveryData, i) {
    const { idx, label, code } = deliveryData;
    const container = document.createElement('div');
          container.className = 'delivery-container';
          container.setAttribute('data-d-Index', idx);
          container.setAttribute('data-c-Index', i);
    const arrowText = document.createTextNode('›');
    const arrow = document.createElement('span');
          arrow.appendChild(arrowText);
    const deliveryText = document.createTextNode(DELIVERY_LIST[idx].name);
    const delivery = document.createElement('p');
          delivery.className = 'select-box';
          delivery.appendChild(deliveryText);
          delivery.appendChild(arrow);
    const deliveryBox = document.createElement('div');
          deliveryBox.appendChild(delivery);
    const labelInput = document.createElement('input');
          labelInput.setAttribute('class', 'delivery-label');
          labelInput.setAttribute('placeholder', '이곳에 배송에 대한 정보를 적을 수 있어요.');
          labelInput.setAttribute('type', 'text');
          labelInput.setAttribute('value', label);
    const selectBox = document.createElement('ul');
          selectBox.className = 'select-box-list';
          selectBox.style.display = 'none';
    const input = document.createElement('input');
          input.setAttribute('class', 'delivery-number');
          input.setAttribute('type', 'text');
          input.setAttribute('placeholder', '운송장 번호를 입력해주세요.');
          input.setAttribute('value', code);
    const buttonText2 = document.createTextNode('새창');
    const button2 = document.createElement('button');
          button2.className = 'delivery-btn-new-window';
          button2.appendChild(buttonText2);
    const buttonText = document.createTextNode('조회');
    const button = document.createElement('button');
          button.className = 'delivery-btn';
          button.appendChild(buttonText);
    const deliveryBox2 = document.createElement('div');
          deliveryBox2.className = 'delivery-code-box';
          deliveryBox2.appendChild(input);
          deliveryBox2.appendChild(button2);
          deliveryBox2.appendChild(button);
    const closeText = document.createTextNode('×');
    const closeBtn = document.createElement('span');
          closeBtn.className = 'delete-btn';
          closeBtn.appendChild(closeText);


    for(let i=0; i<DELIVERY_LIST.length; i++) {
      const list = document.createElement('li');
            list.className = 'choice-delivery';
            list.setAttribute('data-index', i);
      const deliveryText = document.createTextNode(DELIVERY_LIST[i].name);
      list.appendChild(deliveryText);
      selectBox.appendChild(list);
    }

    deliveryBox.appendChild(selectBox);
    container.appendChild(closeBtn);
    container.appendChild(labelInput);
    container.appendChild(deliveryBox);
    container.appendChild(deliveryBox2);

    return container;
  }

  appendDeliveryState() {
    const container = document.createElement('div');
          container.className = 'delivery-state-container';
    const contentArea = document.createElement('div');
          contentArea.className = 'delivery-content-area';
    const loading = document.createElement('div');
          loading.className = 'loading';
    const loadingIcon = document.createElement('div');
          loadingIcon.className = 'loading-icon';
    const buttonText = document.createTextNode('닫기');
    const button = document.createElement('button');
          button.className = 'delivery-state-close-btn';
          button.appendChild(buttonText);
    
    loading.appendChild(loadingIcon);
    contentArea.appendChild(loading);
    container.appendChild(contentArea);
    container.appendChild(button);
    return container;
  }

  appendDeliveryError(message) {
    const messageText = document.createTextNode(message);
    const messageBox = document.createElement('p');
          messageBox.className = 'error-message';
    
    messageBox.appendChild(messageText);
    return messageBox;
  }

  appendDeliveryStateDetail(delivery) {
    const deliveryStateList = document.createElement('div');
    let summaryMarkUp = `
      <div class="delivery-summary">
        <table>
          <thead>
            <tr>
              <th>발송지</th>
              <th>도착지</th>
              <th>배달결과</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${delivery.from.name}</td>
              <td>${delivery.to.name}</td>
              <td>${delivery.state.text}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="delivery-state-list">
        <table>
          <thead>
            <tr>
              <th>단계/시간</th>
              <th>위치/현황</th>
            </tr>
          </thead>
          <tbody>
    `;

    delivery.progresses.forEach(state => {
      const { year, month, day, hour, minute, second } = DateFormat.convert(state.time);
      summaryMarkUp += `
        <tr>
          <td>
            <p>[${state.status.text.trim()}]</p>
            <p>${year}-${month}-${day}<br />${hour}:${minute}:${second}</p>
          </td>
          <td>
            <p>[${state.location.name.trim()}]</p>
            <p>${state.description}</p>
          </td>
        </tr>
      `;
    });

    summaryMarkUp += `
          </tbody>
        </table>
      </div>
    `;

    deliveryStateList.innerHTML = summaryMarkUp;
    return deliveryStateList;
  }

}

export default DomElement;