import React, { Component } from 'react';
import { getToDos, putToDos } from ".././actions";
import {deleteToDos } from ".././actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Input } from 'reactstrap';
import {SingleToDo} from './SingleToDo';
export class ToDo extends Component {

constructor(props) {
    super(props);
    this.state = { todos: [], inProgress: [], completed: [], loading: true };
    // this.editToDo = this.editToDo.bind(this);
    this.renderForecastsTable = this.renderForecastsTable.bind(this)

}

componentDidMount(){

    this.props.getToDos().then(() => {
        this.setState({todos: this.props.todos, loading: false, });
        this.props.todos.forEach(element => {
          if (element.finished){
            var og = this.state.completed.concat(element);
            this.setState({completed: og});
            // console.log("complete",this.state.completed);
          
          }else{
            var og = this.state.inProgress.concat(element);
            this.setState({inProgress: og})
            // console.log(this.state.inProgress)
          }
        });
        if(this.state.completed.length != this.state.inProgress.length){
          if(this.state.completed.length < this.state.inProgress.length){
            for(var i=this.state.completed.length-1; i < this.state.inProgress.length-1; i ++){
              this.state.completed.push("");
            }
          }
        }
        console.log(this.state.completed)
    }
    );
   
    
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
              this.state.inProgress.map((todos, i) =>
             
                <tr key={todos.id}>
                    <td> 
                        <SingleToDo

                        data={todos}
                        putToDos={this.props.putToDos}/>
                    </td>
                    <td>
                    <SingleToDo
                      
                      data={this.state.completed[i]}
                      putToDos={this.props.putToDos}/>
                    </td>
                </tr>
                )
                
            }
           
              
        </tbody>
      </table>
    );
  }


render() {

    let rows;
    // this.renderForecastsTable(this.state.todos);
    let contents = this.state.loading

      ? <p><em>Loading...</em></p>
      :this.renderForecastsTable(this.state.todos);
  return (
    <div>
       {contents}
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
  return {

    todos: state.todos
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToDo));