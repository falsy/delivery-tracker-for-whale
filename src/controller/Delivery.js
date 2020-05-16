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
      if(!delivery.hasOwnProperty('label') || delivery.label === '') delivery.label = '';
      this.deliveryList.appendChild(this.domElement.appendDeliveryList(delivery, i));
    });

    this.webStorage.set(DELIVERY_DATA, deliverydata);
  }

  eventListener() {
    this.body.addEventListener('click', async (e) => {
      const selectbox = document.getElementsByClassName('select-box-list');
      const tName = e.target.className;

      if(tName === 'delivery-btn') {
        const deliveryList = this.webStorage.get(DELIVERY_DATA);
        const container = e.target.parentElement.parentElement;
        const cIndex = container.dataset.cIndex;
        const dIndex = container.dataset.dIndex;
        const carrierId = DELIVERY_LIST[dIndex].id;
        const postLabel = container.children[1].value;
        const postNumber = container.children[3].children[0].value;

        deliveryList[cIndex].idx = dIndex;
        deliveryList[cIndex].code = postNumber;
        deliveryList[cIndex].label = postLabel;
        this.webStorage.set(DELIVERY_DATA, deliveryList);

        if(container.children.length === 5) container.children[4].remove();
        container.appendChild(this.domElement.appendDeliveryState());
        const delivery = await this.remote.getDeliveray(carrierId, postNumber);
        container.children[4].children[0].children[0].remove();

        if(typeof delivery.message !== 'undefined') {
          container.children[4].children[0].appendChild(this.domElement.appendDeliveryError(delivery.message));
        } else {
          container.children[4].children[0].appendChild(this.domElement.appendDeliveryStateDetail(delivery));
        }

        return;
      }

      if(tName === 'delivery-state-close-btn') {
          e.target.parentElement.remove();
          return;
      }

      if(tName === 'select-box') {
        const display = e.target.nextElementSibling.style.display === 'none' ? 'block' : 'none';
        e.target.nextElementSibling.style.display = display;
        for(const select of selectbox) {
          if(select.style.display === 'block' && select !== e.target.nextElementSibling) {
            select.style.display = 'none';
          }
        }
        return;
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
        return;
      }

      if(tName === 'delete-btn') {
        const idx = Number(e.target.parentElement.dataset.cIndex);
        const deliveryList = this.webStorage.get(DELIVERY_DATA);

        deliveryList.splice(idx, 1);
        this.webStorage.set(DELIVERY_DATA, deliveryList);
        this.getStorageListData();
        return;
      }

      if(tName === 'choice-delivery') {
        const index = e.target.dataset.index;
        const deliveryName = e.target.innerText;
        const deliveryBox = e.target.parentElement.previousSibling.parentElement.parentElement;
        const deliveryElement = e.target.parentElement.previousSibling;

        deliveryBox.dataset.dIndex = index;
        deliveryElement.innerHTML = deliveryName + ' <span>›</span>';
        return;
      }

    }, {
      capture: true
    });
  }

}

export default Delivery;