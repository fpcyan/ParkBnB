ApiUtil = {

  fetchParks: function (bounds) {
    $.ajax({
      url: "/api/parks",
      type: "get",
      dataType: "json",
      data: { bounds: bounds },
      success: function (data) {
        ApiActions.receiveAllParks(data);
      }
    });
  }

};
