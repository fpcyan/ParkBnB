(function (root) {

  var _parks = [];
  var resetParks = function (parks) {
    _parks = parks;
  };

  ParkStore = root.ParkStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _parks.slice();
    },

    dispatcherId: AppDispatcher.register( function(payload) {

      switch (payload.actionType) {
        case ParkConstants.PARKS_RECEIVED:
          resetParks(payload.parks);
          break;
      }
    })

  });




})(this);
