import { POST_NUMBER, DELIVERY_INIT, DELIVERY_DATA, DELIVERY_LIST } from '../constants/index.js';
import $ from '../utils/DomScript.js';

class Delivery {

  constructor(remote, webStorage, domElement) {
    this.remote = remote;
    this.webStorage = webStorage;
    this.domElement = domElement;

    this.$document = $(document);
    this.$deliveryList = $('#delivery-list-container');

    this.getStorageListData();
    this.eventListener();

    if(this.webStorage.get(POST_NUMBER)) this.webStorage.remove(POST_NUMBER);
  }

  getStorageListData() {
    let deliverydata = this.webStorage.get(DELIVERY_DATA);
        deliverydata = deliverydata && deliverydata.length  ? deliverydata : [ DELIVERY_INIT ];

    this.$deliveryList.removeAllChild();

    deliverydata.forEach((delivery, i) => {
      if(!delivery.hasOwnProperty('label') || delivery.label === '') delivery.label = '';
      this.$deliveryList.append(this.domElement.appendDeliveryList(delivery, i));
    });

    this.webStorage.set(DELIVERY_DATA, deliverydata);
  }

  eventListener() {
    this.$document.event('click', async (e) => {
      const tName = e.target.className;

      if(tName === 'delivery-btn') {
        const deliveryList = this.webStorage.get(DELIVERY_DATA);
        const $target = $([e.target]);
        const $container = $target.parents('.delivery-container');
        const cIndex = $container.attr('data-c-index');
        const dIndex = $container.attr('data-d-index');
        const carrierId = DELIVERY_LIST[dIndex].id;
        const postLabel = $container.children('.delivery-label').el().value;
        const postNumber = $container.children('.delivery-code-box').children('.delivery-number').el().value;

        deliveryList[cIndex].idx = dIndex;
        deliveryList[cIndex].code = postNumber;
        deliveryList[cIndex].label = postLabel;
        this.webStorage.set(DELIVERY_DATA, deliveryList);

        if($container.children('.delivery-state-container').length() > 0) {
          $container.children('.delivery-state-container').el().remove();
        }
        $container.append(this.domElement.appendDeliveryState());
        
        const delivery = await this.remote.getDeliveray(carrierId, postNumber);
        const $deliveryState = $container.children('.delivery-state-container');

        $deliveryState.children('.delivery-content-area').children('.loading').el().remove();

        if(typeof delivery.message !== 'undefined') {
          $deliveryState.children('.delivery-content-area').append(this.domElement.appendDeliveryError(delivery.message));
        } else {
          $deliveryState.children('.delivery-content-area').append(this.domElement.appendDeliveryStateDetail(delivery));
        }
        return;
      }

      if(tName === 'delivery-state-close-btn') {
        const $target = $([e.target]);
        const $stateContainer = $target.parents('.delivery-state-container');

        $stateContainer.el().remove();
        return;
      }

      if(tName === 'select-box') {
        const $target = $([e.target]);
        const $selectBox = $target.next();

        $selectBox.style('display', $selectBox.style('display') === 'none' ? 'block' : 'none');
        $('.select-box-list').forEach((el) => {
          if(el.el() !== $selectBox.el()) el.style('display', 'none');
        });
        return;
      } else {
        $('.select-box-list').style('display', 'none');
      }

      if(tName === 'add-delivery') {
        const deliveryList = this.webStorage.get(DELIVERY_DATA);

        deliveryList.push(DELIVERY_INIT);
        this.webStorage.set(DELIVERY_DATA, deliveryList);
        this.getStorageListData();
        return;
      }

      if(tName === 'delete-btn') {
        const $target = $([e.target]);
        const $container = $target.parents('.delivery-container');
        const idx = Number($container.attr('data-c-index'));
        
        const deliveryList = this.webStorage.get(DELIVERY_DATA);

        deliveryList.splice(idx, 1);
        this.webStorage.set(DELIVERY_DATA, deliveryList);
        this.getStorageListData();
        return;
      }

      if(tName === 'choice-delivery') {
        const $target = $([e.target]);
        const index = $target.attr('data-index');
        const deliveryName = $target.text();
        const $container = $target.parents('.delivery-container');
        const $textElement = $target.parent().prev();

        $container.attr('data-d-index', index);
        $textElement.html(deliveryName + ' <span>›</span>');
        return;
      }

    }, {
      capture: true
    });
  }

}

export default Delivery;