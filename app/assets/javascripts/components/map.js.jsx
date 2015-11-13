var Map = React.createClass({

  _populateMapMarkers: function() {
    var parks = ParkStore.all();
    var markers = [];

    for (var i = 0; i < parks.length; i++) {
      markers.push(this._addMarker(parks[i]));
    }

    this.setState({ markers: markers });
  },

  _addMarker: function (park) {
    var marker = new google.maps.Marker({
      map: this.map,
      position: { lat: park.lat, lng: park.lng },
      title: park.description,
      draggable: false,
      animation: google.maps.Animation.DROP,
    });
    return marker;
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
