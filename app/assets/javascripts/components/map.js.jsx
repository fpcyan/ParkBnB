var Map = React.createClass({

  isSorted: function (arr) {
    for (var i = 0; i < arr.length - 1; i++) {
      if (arr[i].id > arr[i+1].id) {
        console.log("NOT SORTED", arr[i].id, arr[i+1].id);
        return false;
      }
    }
    console.log("SORTED");
    return true;
  },

  _populateMapMarkers: function() {
    var parks = ParkStore.all();
    var currentMarkers = this.state.markers.slice();
    var activeMarkers = [];
    if (currentMarkers.length > 0) {

      var usedParks = [];
      if (!this.isSorted(parks)) {

        parks.sort(function (x, y) {
          if (x.id < y.id) {
            return -1;
          } else if (x.id === y.id) {
            throw "Shit broke";
          } else {
            return 1;
          }
        });
      }
      if (!this.isSorted(currentMarkers)) {
        currentMarkers.sort(function (x, y) {
          if (x.id < y.id) {
            return -1;
          } else if (x.id === y.id) {
            throw "Shit broke";
          } else {
            return 1;
          }
        });
      }

      var j = 0;
      while (currentMarkers.length > 0) {
        console.log(currentMarkers.length, j);
        var i = 0;
        var match = false;
        while (i < parks.length) {

          if (currentMarkers[0].id === parks[i].id) {
            activeMarkers.push(currentMarkers.shift(1));
            usedParks.push(parks.shift(1));
            match = true;
            break;
          }

          i++;
        }
        if (parks.length === 0) {
          break;
        } else if (!match) {
          j++;
        } else if (j === currentMarkers.length) {
          break;
        } else if (j > currentMarkers.length)
          debugger;
          break;

      }

      if (parks.length > 0) {
        var unusedParks = parks;
        unusedParks.forEach(function (park) {
          var marker = this.addMarker(park);
          activeMarkers.push(marker);
        }.bind(this));
      }
      if (currentMarkers.length > 0) {
        var inactiveMarkers = currentMarkers;
        this.removeMarkers(inactiveMarkers);
      }


    } else {

      parks.forEach(function (park) {
        var marker = this.addMarker(park);
        activeMarkers.push(marker);
      }.bind(this));
    }
    this.setState({ markers: activeMarkers });
  },

  addMarker: function (park) {
    var bounce;
    if (park.bounce) {
      bounce = google.maps.Animation.BOUNCE;
    }
    var marker = new google.maps.Marker({
      map: this.map,
      position: { lat: park.lat, lng: park.lng },
      title: park.description,
      id: park.id,
      animation: bounce,
    });
    return marker;
  },

  removeMarkers: function (inactiveMarkers) {
    inactiveMarkers.forEach(function (marker) {
      marker.setMap(null);
    });
  },

  _idleMapListener: function () {
    var bounds = this.map.getBounds();
    var northEast = bounds.getNorthEast();
    var southWest = bounds.getSouthWest();


    var mapcorners = {
      northEast: { lat: northEast.lat(), lng: northEast.lng() },
      southWest: { lat: southWest.lat(), lng: southWest.lng() }
    };

    ApiUtil.fetchParks(mapcorners);
  },

  getInitialState: function () {
    return({ markers: [] });
  },

  componentDidMount: function () {
    var map = React.findDOMNode(this.refs.map);
    var mapOptions = {
      center: { lat: 40.724166, lng: -73.992574 },
      zoom: 13
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.map.addListener('idle', this._idleMapListener);
    ParkStore.addChangeListener(this._populateMapMarkers);
  },

  componentWillUnmount: function () {
    this.markers.forEach( function (marker) {
      marker.setMap(null);
    }.bind(this));
    ParkStore.removeChangeListener(this._populateMapMarkers);
  },

  render: function () {
    return(
      <div className="map" ref="map">
      </div>
    );
  }
});
