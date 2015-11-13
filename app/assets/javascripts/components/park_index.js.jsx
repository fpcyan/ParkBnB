var ParkIndex = React.createClass({

  _onChange: function () {
    this.setState({ parks: ParkStore.all() });
  },

  getInitialState: function () {
    return({ parks: ParkStore.all() });
  },

  componentDidMount: function () {
    ParkStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    ParkStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var parks = this.state.parks.map( function (park) {
      return <li key={park.id}> {park.description} </li>;
    });
    return(
      <ul className="park-index">
        {parks}
      </ul>
    );
  }


});
