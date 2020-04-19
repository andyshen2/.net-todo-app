import React, { Component } from 'react';
import { getToDos, putToDos } from ".././actions";
import {deleteToDos } from ".././actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Input } from 'reactstrap';
import {SingleToDo} from './SingleToDo';
export class ToDo extends Component {
//   static displayName = Counter.name;

constructor(props) {
    super(props);
    this.state = { todos: [], loading: true };
    this.editToDo = this.editToDo.bind(this);
    this.renderForecastsTable = this.renderForecastsTable.bind(this)

}

componentDidMount(){
    console.log("mounting")
    this.props.getToDos().then(() => {
        this.setState({todos: this.props.todos, loading: false, });

    }

    );
}
editToDo = id => {
    console.log(id)
}
 renderForecastsTable = todos => {
    
   
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>In Progress</th>
            <th>Finished</th>
            
          </tr>
        </thead>
        <tbody>
   
          {
              this.state.todos.map(todos =>
                <tr key={todos.id}>
                    <td> 
                        <SingleToDo
                        // key={this.state.todos[key].id}
                        data={todos}
                        putToDos={this.props.putToDos}/>
                    </td>
                    <td>sdv</td>
                </tr>
                )}
        </tbody>
      </table>
    );
  }


render() {
    // console.log(this.state.todos);
    let rows;
    // this.renderForecastsTable(this.state.todos);
    let contents = this.state.loading

      ? <p><em>Loading...</em></p>
      :this.renderForecastsTable(this.state.todos);
    //   :  rows = Object.keys(this.state.todos).map(key => {
    //     // console.log("key", key)
    //     return (
   
    //     <SingleToDo
    //         key={this.state.todos[key].id}
    //         data={this.state.todos[key]}
    //         putToDos={this.props.putToDos}
    //     />
    //     );

    // });

   
  return (
    <div>
       {contents}
       {/* <div>{contents}</div> */}
   
    </div>
  );
}
}
const mapDispatchToProps = dispatch => ({
    
  getToDos: () => dispatch(getToDos()),
  deleteToDos: () => dispatch(deleteToDos()),
  putToDos: newToDo => dispatch(putToDos(newToDo))
})
const mapStateToProps = function(state) {
    console.log("state", state)
  return {

    todos: state.todos
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToDo));