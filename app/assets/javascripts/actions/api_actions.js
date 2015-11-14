
ApiActions = {

  receiveAllParks: function (data, bounds) {
    AppDispatcher.dispatch({
      actionType: ParkConstants.PARKS_RECEIVED,
      parks: data,
      bounds: bounds
    });
  },

  receiveOnePark: function (data) {
    AppDispatcher.dispatch({
      actionType: ParkConstants.ONE_PARK_RECEIVED,
      park: data
    });
  }

};
