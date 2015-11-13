var Map = React.createClass({

  componentDidMount: function () {
    var map = React.findDOMNode(this.refs.map);
    var mapOptions = {
      center: { lat: 40.724166, lng: -73.992574 },
      zoom: 13
    };
    this.map = new google.maps.Map(map, mapOptions);
  },

  render: function () {
    return(
      <div className="map" ref="map">

      </div>
    );
  }
});
