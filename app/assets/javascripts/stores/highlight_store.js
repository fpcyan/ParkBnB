(function (root) {

  var CHANGE_EVENT = "change event";

  var _highlightedPark;
  var _resetHighlight = function (park) {
    _highlightedPark = park;
  };

  var HighlightStore = root.HighlightStore = $.extend( {}, EventEmitter.prototype, {

    park: function () {
      return _highlightedPark;
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherId: AppDispatcher.register( function (payload) {

      switch (payload.actionType) {
        case ParkConstants.ONE_PARK_RECEIVED:
          _resetHighlight(payload.park);
          HighlightStore.emit(CHANGE_EVENT);
      }
    })

  });

})(this);
