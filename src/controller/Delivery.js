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
        deliverydata = deliverydata && deliverydata.length ? deliverydata : [ DELIVERY_INIT ];

    this.$deliveryList.removeAllChild();

    deliverydata.forEach((delivery, i) => {
      if(!delivery.hasOwnProperty('label') || delivery.label === '') delivery.label = '';
      if(!delivery.hasOwnProperty('isInline') || delivery.isInline === '') delivery.isInline = 'false'; 
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
        const dIsInline = $container.attr('data-is-inline');
        const carrierId = DELIVERY_LIST[dIndex].id;
        const postLabel = $container.children('.delivery-label').el().value;
        const postNumber = $container.children('.delivery-code-box').children('.delivery-number').el().value;

        deliveryList[cIndex].idx = dIndex;
        deliveryList[cIndex].code = postNumber;
        deliveryList[cIndex].label = postLabel;
        deliveryList[cIndex].isInline = dIsInline;
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

      if(tName === 'delivery-btn-new-window') {
        const deliveryList = this.webStorage.get(DELIVERY_DATA);
        const $target = $([e.target]);
        const $container = $target.parents('.delivery-container');
        const cIndex = $container.attr('data-c-index');
        const dIndex = $container.attr('data-d-index');
        const dIsInline = $container.attr('data-is-inline');
        const apiTarget = DELIVERY_LIST[dIndex].name;
        const apiUrl = DELIVERY_LIST[dIndex].api;
        const postLabel = $container.children('.delivery-label').el().value;
        const postNumber = $container.children('.delivery-code-box').children('.delivery-number').el().value;

        deliveryList[cIndex].idx = dIndex;
        deliveryList[cIndex].code = postNumber;
        deliveryList[cIndex].label = postLabel;
        deliveryList[cIndex].isInline = dIsInline;
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
        const deliveryListLen = deliveryList.length;

        deliveryList.push(DELIVERY_INIT);
        this.webStorage.set(DELIVERY_DATA, deliveryList);
        this.$deliveryList.append(this.domElement.appendDeliveryList({
          idx: 0, label: '', code: '', isInline: 'false'
        }, deliveryListLen));
        this.$deliveryList.children().forEach((el, i) => {
          el.attr('data-c-index', i);
        });
        return;
      }

      if(tName === 'delete-btn') {
        const $target = $([e.target]);
        const $container = $target.parents('.delivery-container');
        const idx = Number($container.attr('data-c-index'));
        
        const deliveryList = this.webStorage.get(DELIVERY_DATA);
        deliveryList.splice(idx, 1);
        this.webStorage.set(DELIVERY_DATA, deliveryList);
        this.$deliveryList.children().el(idx).remove();
        this.$deliveryList.children().forEach((el, i) => {
          el.attr('data-c-index', i);
        });
        return;
      }

      if(tName === 'choice-delivery') {
        const $target = $([e.target]);
        const index = $target.attr('data-index');
        const isOnlyInline = $target.attr('data-is-inline');
        const deliveryName = $target.text();
        const $container = $target.parents('.delivery-container');
        const $textElement = $target.parent().prev();
        if(isOnlyInline === 'true') {
          $container.addClass('only-inline');
        } else {
          $container.removeClass('only-inline');
        }

        $container.attr('data-is-inline', isOnlyInline);
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