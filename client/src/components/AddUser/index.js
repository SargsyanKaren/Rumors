import React, { Component } from 'react';
import HttpClient from '../../httpInstance';
import './style.css';

export default class AddUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            newUser: {
                name: "",
                birthday: "",
                gender: "",
                tell: "",
                address: ""
            }
        }
    }
    inputChange = e => {
        let newUser = this.state.newUser;
        newUser[e.target.dataset.key] = e.target.value
        this.setState({
            newUser: newUser
        })
    }
    addClick = () => {
        this.props.addUserLoading(true, false)
        HttpClient.post("add",{
            data: this.state.newUser
        },{
            headers:{
                authorization : localStorage.getItem("token")
            }
        }).then(data => {
            this.setState({
                newUser: {
                    name: "",
                    birthday: "",
                    gender: "",
                    tell: "",
                    address: ""
                }
            },() => this.props.addUserLoading(true, true))
        }).catch(err => {
            this.props.toastError("Add User Error")
        })
    }
    render(){
        const newUser = this.state.newUser;
        return (
            <tr className="AddUser">
                    <td><input 
                            data-key="name" 
                            type="text" 
                            value={ newUser.name}
                            onChange={ this.inputChange }
                            className="inp"/></td>
                    <td><input 
                            data-key="birthday" 
                            type="text" 
                            value={ newUser.birthday }
                            onChange={ this.inputChange }
                            className="inp"/></td>
                    <td><input 
                            data-key="gender" 
                            type="text" 
                            value={ newUser.gender }
                            onChange={ this.inputChange }
                            className="inp"/></td>
                    <td><input 
                            data-key="tell" 
                            type="text" 
                            value={ newUser.tell }
                            onChange={ this.inputChange }
                            className="inp"/></td>
                    <td><input 
                            data-key="address" 
                            type="text" 
                            value={ newUser.address }
                            onChange={ this.inputChange }
                            className="inp"/></td> 
                    <td>
                        <button onClick={ this.addClick } className="btn addBut">Add</button>
                    </td>
            </tr>
        )
    }
}