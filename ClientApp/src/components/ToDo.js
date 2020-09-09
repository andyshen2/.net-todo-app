import React, { Component } from "react";
import { getToDos, putToDos, addToDo } from ".././actions";
import { deleteToDos } from ".././actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { SingleToDo } from "./SingleToDo";
export class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inProgress: [],
      completed: [],
      loading: true,
      newSummary: "",
    };
    // this.editToDo = this.editToDo.bind(this);
    this.deleteToDos = this.deleteToDos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderForecastsTable = this.renderForecastsTable.bind(this);
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  addToDo = () => {
    var newToDo = { summary: this.state.newSummary, finished: false };
    this.props.addToDo(newToDo).then(() => {
      this.props.getToDos().then(() => {
        this.setState({ todos: this.props.todos, loading: false });
      });
      this.setState({ todos: this.props.todos, loading: false });
    });
  };
  componentDidMount() {
    this.props.getToDos().then(() => {
      this.setState({ todos: this.props.todos, loading: false });
      // this.props.todos.forEach(element => {
      //   if (element.finished){
      //     var og = this.state.completed.concat(element);
      //     this.setState({completed: og});
      //     // console.log("complete",this.state.completed);

      //   }else{
      //     var og = this.state.inProgress.concat(element);
      //     this.setState({inProgress: og})
      //     // console.log(this.state.inProgress)
      //   }
      // });
      // if(this.state.completed.length != this.state.inProgress.length){
      //   if(this.state.completed.length < this.state.inProgress.length){
      //     for(var i=this.state.completed.length-1; i < this.state.inProgress.length-1; i ++){
      //       this.state.completed.push("");
      //     }
      //   }
      // }
      // console.log(this.state.completed)
    });
  }

  deleteToDos = (id) => {
    console.log(id);
    var array = [...this.state.todos];
    var index;
    array.map((element, i) => {
      if (id === element.id) {
        index = i;
      }
    });
    array.indexOf(index);

    this.props.deleteToDos(id).then((e) => {
      array.splice(index, 1);
      this.setState({ todos: array });
    });
  };

  renderForecastsTable = (todos) => {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>In Progress</th>
            <th>Finished</th>
          </tr>
        </thead>
        <tbody>
          <td>
            <input
              name="newSummary"
              // value={this.state.summary}
              onChange={this.handleChange}
            />
            <Button onClick={this.addToDo}>Add</Button>
          </td>
          {this.state.todos.map((todos, i) => (
            <tr key={todos.id}>
              <td>
                <SingleToDo
                  data={todos}
                  putToDos={this.props.putToDos}
                  deleteToDos={this.deleteToDos}
                />
              </td>
              {/* <td>
                    <SingleToDo
                      key = {1}
                      data={this.state.completed[i]}
                      putToDos={this.props.putToDos}
                      deleteToDos={this.props.deleteToDos}/>
                    </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  render() {
    let rows;
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderForecastsTable(this.state.todos)
    );
    return <div>{contents}</div>;
  }
}
const mapDispatchToProps = (dispatch) => ({
  getToDos: () => dispatch(getToDos()),
  deleteToDos: (newToDo) => dispatch(deleteToDos(newToDo)),
  putToDos: (newToDo) => dispatch(putToDos(newToDo)),
  addToDo: (newToDo) => dispatch(addToDo(newToDo)),
});
const mapStateToProps = function (state) {
  return {
    todos: state.todos,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToDo));
