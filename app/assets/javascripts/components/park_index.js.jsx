var ParkIndex = React.createClass({

  _onChange: function (park) {
    this.setState({ parks: ParkStore.all() });
  },

  getInitialState: function () {
    return({ parks: ParkStore.all(), highlighted: HighlightStore.park() });
  },

  componentDidMount: function () {
    ParkStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    ParkStore.removeChangeListener(this._onChange);
  },

  handleHover: function (e) {
    e.preventDefault();
    var parkId = e.currentTarget.id;
    var target;
    var newParks = this.state.parks.map(function (park) {
      if (park.id === parseInt(parkId)) {
        park.bounce = "BOUNCE";
        target = park;
        return park;
      } else {
        return park;
      }
    });
    if (target && (this.state.highlighted === undefined || (target.id !== this.state.highlighted.id))) {
      this.setState({ highlighted: target });
      ApiActions.receiveAllParks(newParks);
    }
  },

  handleStopHover: function (e) {
    e.preventDefault();
    if (this.state.highlighted) {
      this.setState({ highlighted: undefined });
      var northEast = ParkStore.idledBounds().northEast;
      var southWest = ParkStore.idledBounds().southWest;

      var bounds = {
        northEast: { lat: northEast.lat, lng: northEast.lng },
        southWest: { lat: southWest.lat, lng: southWest.lng }
      };
      ApiUtil.fetchParks(bounds);
    }
  },


  render: function () {
    var parks = (
      <div>
        {
          this.state.parks.map(function (park) {
            return(
              <li
                className="park"
                key={park.id}
                id={park.id}
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleStopHover}>{park}
              </li>
            );
          }, this)
        }
      </div>
    );
    return(
      <ul className="park-index">
        {parks}
      </ul>
    );
  }


});
