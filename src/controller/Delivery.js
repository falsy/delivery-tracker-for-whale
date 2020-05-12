import { POST_NUMBER, DELIVERY_INIT, DELIVERY_DATA, DELIVERY_LIST } from '../constants/index.js';

class Delivery {

  constructor(remote, webStorage, domElement) {
    this.remote = remote;
    this.webStorage = webStorage;
    this.domElement = domElement;

    this.body = document.body;
    this.deliveryList = document.getElementById('delivery-list-container');

    this.getStorageListData();
    this.eventListener();

    if(this.webStorage.get(POST_NUMBER)) this.webStorage.remove(POST_NUMBER);
  }

  getStorageListData() {
    let deliverydata = this.webStorage.get(DELIVERY_DATA);
        deliverydata = deliverydata && deliverydata.length  ? deliverydata : [ DELIVERY_INIT ];

    while(this.deliveryList.firstChild) {
      this.deliveryList.removeChild(this.deliveryList.firstChild);
    }

    deliverydata.forEach((delivery, i) => {
      if(!delivery.hasOwnProperty('label') || delivery.label === '') delivery.label = '라벨';
      this.deliveryList.appendChild(this.domElement.appendDeliveryList(delivery, i));
    });

    this.webStorage.set(DELIVERY_DATA, deliverydata);
  }

  eventListener() {
    this.body.addEventListener('click', (e) => {
      const selectbox = document.getElementsByClassName('select-box-list');
      const tName = e.target.className;

      if(tName === 'delivery-btn') {
        const deliveryList = this.webStorage.get(DELIVERY_DATA);
        const container = e.target.parentElement;
        const cIndex = container.dataset.cIndex;
        const dIndex = container.dataset.dIndex;
        const apiTarget = DELIVERY_LIST[dIndex].name;
        const apiUrl = DELIVERY_LIST[dIndex].api;
        const postLabel = container.children[0].value;
        const postNumber = container.children[2].value;

        deliveryList[cIndex].idx = dIndex;
        deliveryList[cIndex].code = postNumber;
        deliveryList[cIndex].label = postLabel;
        this.webStorage.set(DELIVERY_DATA, deliveryList);

        if(apiTarget === '대신 택배') {
          const billno1 = '?billno1=' + String(postNumber).substring(0, 4);
          const billno2 = '&billno2=' + String(postNumber).substring(4, 7);
          const billno3 = '&billno3=' + String(postNumber).substring(7, 13);

          window.open(apiUrl+billno1+billno2+billno3, apiTarget, 'resizable=yes,scrollbars=yes,width=720,height=600');
        } else {
          window.open(apiUrl+postNumber, apiTarget, 'resizable=yes,scrollbars=yes,width=720,height=600');
        }
      }

      if(tName === 'select-box') {
        const display = e.target.nextElementSibling.style.display === 'none' ? 'block' : 'none';

        e.target.nextElementSibling.style.display = display;
      } else {
        for(const select of selectbox) {
          if(select.style.display === 'block') {
            select.style.display = 'none';
          }
        }
      }

      if(tName === 'add-delivery') {
        const deliveryList = this.webStorage.get(DELIVERY_DATA);

        deliveryList.push(DELIVERY_INIT);
        this.webStorage.set(DELIVERY_DATA, deliveryList);
        this.getStorageListData();
      }

      if(tName === 'delete-btn') {
        const idx = Number(e.target.parentElement.dataset.cIndex);
        const deliveryList = this.webStorage.get(DELIVERY_DATA);

        deliveryList.splice(idx, 1);
        this.webStorage.set(DELIVERY_DATA, deliveryList);
        this.getStorageListData();
      }

      if(tName === 'choice-delivery') {
        const index = e.target.dataset.index;
        const deliveryName = e.target.innerText;
        const deliveryBox = e.target.parentElement.previousSibling.parentElement.parentElement;
        const deliveryElement = e.target.parentElement.previousSibling;

        deliveryBox.dataset.dIndex = index;
        deliveryElement.innerHTML = deliveryName + ' <span>›</span>';
      }

    }, {
      capture: true
    });
  }

}

export default Delivery;