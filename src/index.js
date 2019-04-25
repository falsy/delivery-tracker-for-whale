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
    const list = document.createElement('ul');

    for(const key in DELIVERY_LIST) {
      const listDom = document.createElement('li');
      listDom.innerHTML = `
        <div>
          <h2>${DELIVERY_LIST[key].name}</h2>
          <label>
            <span>운송장 번호</span>
            <input type="text" id="${key}" class="post-number" />
          </label>
          <button data-target="${key}" class="delivery-btn">조회</button>
        </div>
      `;
      list.appendChild(listDom);
    }

    this.deliveryList.appendChild(list);
  }

  cachePostNumber() {
    const cachePostNoList = WebStorage.get(POST_NUMBER) || {};
    for(const target in cachePostNoList) {
      document.getElementById(target).value = cachePostNoList[target];
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
    }, {
      capture: true
    });
  }
}


new Delivery();