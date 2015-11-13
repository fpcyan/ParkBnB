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

    return(
      <ul className="park-index">
        {
          this.state.parks.map( function (park) {
            return <li key={park.id} className="park">{park}</li>;
          })
        }
      </ul>
    );
  }


});
