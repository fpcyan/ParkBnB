
ApiActions = {

  receiveAllParks: function (data) {
    AppDispatcher.dispatch({
      actionType: ParkConstants.PARKS_RECEIVED,
      parks: data
    });
  }

};
