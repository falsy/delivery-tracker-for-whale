class Remote {

  getDeliveray(carrierId, trackNo) {
    return fetch(`https://apis.tracker.delivery/carriers/${carrierId}/tracks/${trackNo}`, {
      method: 'GET'
    }).then(res => res.json());
  }

}

export default Remote;