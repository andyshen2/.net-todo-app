import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import { putToDos } from ".././actions";
import { connect } from "react-redux";

export class SingleToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          editing: false,
          id : null,
          summary: "",
          finished: false
        };
        this.editToDo = this.editToDo.bind(this);
        this.saveToDo = this.saveToDo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFinished = this.handleFinished.bind(this);
      }
    componentDidMount(){
        console.log("mounting")
        this.setState({summary: this.props.data.summary, id: this.props.data.id, finished: this.props.data.finished});
    }

     editToDo () {
        this.setState({editing: true});

    }
    saveToDo () {
        this.setState({editing: false});
        
        var newToDo = {id: this.state.id, summary: this.state.summary, finished: this.state.finished};
        console.log(newToDo)
        this.props.putToDos(newToDo);
    }
    handleChange = event => {
        this.setState({
        [event.target.name]: event.target.value
        });
    }
    handleFinished = event => {

        this.setState(prevState => ({
            finished: !prevState.finished
          }));

    }
    render() {

        let edit = this.state.editing
            ? <div>
                 <input
                    name="finished"
                    type="checkbox"

                    checked={this.state.finished}
                    onChange={this.handleFinished}
                />
                <input 
                    name="summary" 
                    value={this.state.summary}
                    onChange={this.handleChange}
                    />
                <Button onClick={this.saveToDo}>Save</Button>
            </div>
            :<div> 
                 <input
                    name="finished"
                    type="checkbox"

                    checked={this.state.finished}
                    onChange={this.handleFinished}
                />
               {this.state.summary}
                <Button onClick={this.editToDo}>Edit</Button>
            </div>
           
      return (
        <div>
           
                 {edit}
           
        </div>
      );
    }
}

