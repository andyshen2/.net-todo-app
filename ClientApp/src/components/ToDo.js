import React, { Component } from 'react';
import { getToDos } from ".././actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class ToDo extends Component {
//   static displayName = Counter.name;

constructor(props) {
  super(props);
  this.state = { todos: [], loading: true };

;
}

componentDidMount(){
    console.log("mounting")
    this.props.getToDos().then(() => {
        this.setState({loading: false });

    }

    );

}

static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Todo</th>
            <th>finsihed. (C)</th>
            
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.id}>

              <td>{forecast.summary}</td>
              <td>{JSON.stringify(forecast.finshed) }</td>
                <td>{forecast.id}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

render() {
    console.log(this.props.todos.user);
    let contents = this.state.loading

      ? <p><em>Loading...</em></p>
      : ToDo.renderForecastsTable(this.props.todos.user);
//   console.log(this.props);
  return (
    <div>
       {contents}
    </div>
  );
}
}
const mapDispatchToProps = dispatch => ({
    
  getToDos: userInfo => dispatch(getToDos())
})
const mapStateToProps = function(state) {
    console.log("state", state)
  return {

    todos: state
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ToDo));