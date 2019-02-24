import React, { Component } from 'react';
import HttpClient from '../../httpInstance';
import './style.css';

export default class UserItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            edit: false,
            user: this.props.user
        }
    }
    
    editClick = () => {
        this.setState({
            edit: true,
        })
    }

    inputChange = e => {
        let newUser = this.state.user;
        newUser[e.target.dataset.key] = e.target.value
        this.setState({
            user: newUser
        })
    }

    editAjaxClick = () => {
        this.props.editUserLoading(true, false);
        HttpClient.put("edit/" + this.state.user._id,{
            data: this.state.user
        },{
            headers: {
                authorization : localStorage.getItem("token")
            }
        }).then(data => {
           this.setState({
               edit: false
           })
            this.props.editUserLoading(true, true);           
        }).catch(err => {
            this.props.editUserLoading(true, true);
            this.props.toastError("Edit Error")
            
        })

    }

    deleteClick = () => {
        this.props.deleteUserLoading(true, false);
        HttpClient.delete("delete/" + this.state.user._id, {
            headers: {
                authorization : localStorage.getItem("token")
            }
        }).then(data => {
            this.props.deleteUserLoading(true, true);
        }).catch(err => {
            this.props.deleteUserLoading(true, true);
            this.props.toastError("Delete Error")            
        })
    }

    resetClick = () => {
        this.setState({
            user: {
                name: "",
                birthday: "",
                gender: "",
                tell: "",
                address: ""
            }
        })
        
    }

    render(){
        const user = this.state.user;
        return(      
            this.state.edit ? (
                <tr className="UsersItem">
                    <td><input 
                            data-key="name" 
                            type="text" 
                            value={ user.name }
                            onChange={ this.inputChange }
                            className="inp"/></td>
                    <td><input 
                            data-key="birthday" 
                            type="text" 
                            value={ user.birthday }
                            onChange={ this.inputChange }
                            className="inp"/></td>
                    <td><input 
                            data-key="gender" 
                            type="text" 
                            value={ user.gender }
                            onChange={ this.inputChange }
                            className="inp"/></td>
                    <td><input 
                            data-key="tell" 
                            type="text" 
                            value={ user.tell }
                            onChange={ this.inputChange }
                            className="inp"/></td>
                    <td><input 
                            data-key="address" 
                            type="text" 
                            value={ user.address }
                            onChange={ this.inputChange }
                            className="inp"/></td> 
                    <td>
                        <button onClick={ this.editAjaxClick } className="btn okBut">Ok</button>
                    </td>
                    <td>
                        <button onClick={ this.resetClick } className="btn closeBut">Reset</button>
                    </td>
                </tr>
            ) : (
                <tr  className="UsersItem">
                    <td>{ user.name }</td>
                    <td>{ user.birthday }</td>
                    <td>{ user.gender }</td>
                    <td>{ user.tell }</td>
                    <td>{ user.address }</td>
                    <td>
                        <button className="btn editBut" onClick={ this.editClick }>Edit</button>
                    </td>
                    <td>
                        <button className="btn deleteBut" onClick={ this.deleteClick }>Delete</button>
                    </td>
                </tr>
            )
        )
    }
}