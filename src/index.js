import { POST_NUMBER, DELIVERY_LIST } from './constants/index.js';
import WebStorage from './servises/WebStorage.js';

class Delivery {
  constructor() {
    this.body = document.body;
    this.deliveryList = document.getElementById('delivery-list-container');

    this.appendDeliveryListDOM();
    this.cachePostNumber();
    this.eventListener();
  }

  appendDeliveryListDOM() {
    const container = document.createElement('div');
    const arrowText = document.createTextNode('›');
    const arrow = document.createElement('span');
          arrow.appendChild(arrowText);
    const deliveryText = document.createTextNode(DELIVERY_LIST[0].name);
    const delivery = document.createElement('p');
          delivery.setAttribute('data-delivery', 0);
          delivery.appendChild(deliveryText);
          delivery.appendChild(arrow);
    const deliveryBox = document.createElement('div');
          deliveryBox.appendChild(delivery);
    const selectBox = document.createElement('ul');
    const input = document.createElement('input');
          input.setAttribute('type', 'text');
    const buttonText = document.createTextNode('조회');
    const button = document.createElement('button');
          button.className = 'delivery-btn';
          button.appendChild(buttonText);
    const closeText = document.createTextNode('×');
    const closeBtn = document.createElement('span');
          closeBtn.appendChild(closeText);


    for(let i=0; i<DELIVERY_LIST.length; i++) {
      const list = document.createElement('li');
      const deliveryText = document.createTextNode(DELIVERY_LIST[i].name);
      list.appendChild(deliveryText);
      selectBox.appendChild(list);
    }
    
    deliveryBox.appendChild(selectBox);
    container.appendChild(deliveryBox);
    container.appendChild(input);
    container.appendChild(button);
    container.appendChild(closeBtn);

    this.deliveryList.appendChild(container);
  }

  cachePostNumber() {
    const cachePostNoList = WebStorage.get(POST_NUMBER) || {};
    for(const target in cachePostNoList) {
      document.getElementById(target).value = cachePostNoList[target];
    }
  }

  claerPostNumber() {
    for(const key in DELIVERY_LIST) {
      document.getElementById(key).value = '';
    }
  }

  eventListener() {
    this.body.addEventListener('click', (e) => {
      if(e.target.className === 'delivery-btn') {
        const apiTarget = e.target.dataset.target;
        const apiUrl = DELIVERY_LIST[apiTarget].api;
        const postNumber = document.getElementById(apiTarget).value;
        WebStorage.set(POST_NUMBER, apiTarget, postNumber);

        if(apiTarget === 'daesin_post') {
          const billno1 = '?billno1=' + String(postNumber).substring(0, 4);
          const billno2 = '&billno2=' + String(postNumber).substring(4, 7);
          const billno3 = '&billno3=' + String(postNumber).substring(7, 13);
          window.open(apiUrl+billno1+billno2+billno3, apiTarget, 'resizable=yes,scrollbars=yes,width=720,height=600');
        } else {
          window.open(apiUrl+postNumber, apiTarget, 'resizable=yes,scrollbars=yes,width=720,height=600');
        }
      }

      if(e.target.id === 'delete-storage') {
        this.claerPostNumber();
        WebStorage.clear();
      }
    }, {
      capture: true
    });
  }
}


new Delivery();