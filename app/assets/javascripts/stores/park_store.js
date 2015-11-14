(function (root) {
  var CHANGE_EVENT = "change";

  var _parks = [];
  var _bounds;

  var resetParks = function (parks) {
    _parks = parks;
  };

  var setBounds = function (bounds) {
    _bounds = bounds;
  };

  ParkStore = root.ParkStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _parks.slice();
    },

    idledBounds: function () {
      return _bounds;
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
          if (payload.bounds !== undefined) {
            setBounds(payload.bounds);
          }
          ParkStore.emit(CHANGE_EVENT);
          break;
      }
    })

  });




})(this);
