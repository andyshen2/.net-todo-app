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
        // this.deleteToDo = this.deleteToDo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFinished = this.handleFinished.bind(this);
      }
    componentDidMount(){
        // console.log(this.props.data)
        // console.log(this.props)
        // if(!this.props.data ){
        //     // console.log(this.props.data);
        //     return <em></em>
        // }
        // console.log(this.props.data)
        // if(this.props.data.summary.finished){
            // console.log(this.props.data)
        // }
        this.setState({summary: this.props.data.summary, id: this.props.data.id, finished: this.props.data.finished});
    }

     editToDo () {
      
        this.setState({editing: true});

    }
    
    saveToDo () {
        this.setState({editing: false});
        var newToDo = {id: this.state.id, summary: this.state.summary, finished: this.state.finished};
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

        // if (this.state.id === null) {
        //     return <em></em>
        // }
        // console.log(this.state)
       
    //    console.log(this.props)
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
                <Button onClick={()=>this.props.deleteToDos(this.state.id)}>Delete</Button>
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
                <Button onClick={()=>this.props.deleteToDos(this.state.id)}>Delete</Button>
            </div>
           
      return (
        <div>
           
                 {edit}
           
        </div>
      );
    }
}

