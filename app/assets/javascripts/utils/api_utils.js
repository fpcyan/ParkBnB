ApiUtil = {

  fetchParks: function (bounds) {
    $.ajax({
      url: "/api/parks",
      type: "get",
      dataType: "json",
      data: { bounds: bounds },
      success: function (data) {
        ApiActions.receiveAllParks(data, bounds);
      }
    });
  },

  fetchOnePark: function (id) {
    if (id === undefined) {
      ApiActions.receiveOnePark();
    } else {
      $.ajax({
        url: "/api/parks/" + id,
        type: "get",
        dataType: "json",
        success: function (data) {
          ApiActions.receiveOnePark(data);
        }
      });
    }
  }

};
