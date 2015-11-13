ApiUtil = {

  fetchParks: function () {
    $.ajax({
      url: "/api/parks",
      type: "get",
      dataType: "json",
      success: function (data) {
        ApiActions.receiveAllParks(data);
      }
    });
  }

};
