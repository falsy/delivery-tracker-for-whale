import { DELIVERY_LIST } from '../constants/index.js';

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
          labelInput.setAttribute('type', 'text');
          labelInput.setAttribute('value', label);
    const selectBox = document.createElement('ul');
          selectBox.className = 'select-box-list';
          selectBox.style.display = 'none';
    const input = document.createElement('input');
          input.setAttribute('class', 'delivery-number');
          input.setAttribute('type', 'text');
          input.setAttribute('value', code);
    const buttonText = document.createTextNode('조회');
    const button = document.createElement('button');
          button.className = 'delivery-btn';
          button.appendChild(buttonText);
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
    container.appendChild(labelInput);
    container.appendChild(deliveryBox);
    container.appendChild(input);
    container.appendChild(button);
    container.appendChild(closeBtn);

    return container;
  }

  appendDeliveryState() {
    const container = document.createElement('div');
          container.className = 'delivery-container';

    return container;
  }
  
}

export default DomElement;