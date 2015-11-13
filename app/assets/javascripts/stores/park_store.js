(function (root) {
  var CHANGE_EVENT = "change";

  var _parks = [];

  var resetParks = function (parks) {
    _parks = parks;
  };

  ParkStore = root.ParkStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _parks.slice();
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register( function(payload) {

      switch (payload.actionType) {
        case ParkConstants.PARKS_RECEIVED:
          resetParks(payload.parks);
          ParkStore.emit(CHANGE_EVENT);
          break;
      }
    })

  });




})(this);
