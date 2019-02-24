import React, { Component } from 'react';
import { UsersItem, AddUser } from '../../components';
import { Redirect } from 'react-router-dom';
import httpClient from '../../httpInstance';
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import './style.css';

import maleUserIcon from '../../images/maleUserIcon.png';
import femaleUserIcon from '../../images/femaleUserIcon.png';


export default class Users extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            isLoading: true,
            userDeleted: null,
            userEdited: null,
            userAdded: null
        }
    }
    componentDidMount(){
        httpClient.get('all',{headers: {
            authorization : localStorage.getItem("token")
        }}).then(data => {
            this.setState({
                users: data.data,
                isLoading: false
            });
        }).catch(() => {
            this.toastError("User List Error")
        })
        
    }
    componentDidUpdate(){
        if((this.state.isLoading && this.state.userDeleted) || 
           (this.state.isLoading && this.state.userEdited) || 
           (this.state.isLoading && this.state.userAdded)){
            httpClient.get('all',{headers: {
                authorization : localStorage.getItem("token")
            }}).then(data => {
                this.setState({
                    users: data.data,
                    isLoading: false,
                    userDeleted: null,
                    userEdited: null
                });
            }).catch(() => {
                this.toastError("User List Error");
                this.setState({
                    users: []
                })
            })
            
        }
    }
    listGenerator = arr => (
        arr.map( item => (
            <UsersItem 
                user = { item } 
                key = { item._id }
                deleteUserLoading = { this.deleteUserLoading }
                editUserLoading = { this.editUserLoading }
                toastError = { this.toastError }
            />
        ))
    )
    logoutClick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        this.forceUpdate()
    }
    deleteUserLoading =  (load, dell) => {
        this.setState({
            isLoading: load,
            userDeleted: dell
        })
    }
    editUserLoading = (load, edit) => {
        this.setState({
            isLoading: load,
            userEdited: edit
        })
    }
    addUserLoading = (load, add) => {
        this.setState({
            isLoading: load,
            userAdded: add
        })
    }
    toastError = err => {
        toast.error(err, {
            position: "top-center",
            autoClose: 6000, 
            closeButton: true
        })
        this.setState({
            isLoading: false,
            userDeleted: null,
            userEdited: null,
            userAdded: null
        })
    }
    render(){
        return(
            <main className="Users container-fluid flex column align-center">

                { !localStorage.getItem("token") && <Redirect to="/"/> }

                <ToastContainer />

                <div className="container flex align-center justify-between">
                    <div className="loginedUser flex align-center">
                        <img src={ (localStorage.getItem("gender") === "Male")? maleUserIcon : femaleUserIcon } 
                             alt="User icon"
                        />
                        <p>{ localStorage.getItem("userName") }</p>
                    </div>
                    <button onClick={ this.logoutClick } className="logout btn">Logout</button>
                </div>
                <div className="table container">
                    <table cellSpacing="10" cellPadding="8"  className={ this.state.isLoading? "none" : "" }>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Birthday</th>
                                <th>Gender</th>
                                <th>Tell</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <AddUser 
                                toastError = { this.toastError }
                                addUserLoading = { this.addUserLoading }
                            />
                            { this.listGenerator(this.state.users) }
                        </tbody>
                    </table>
                </div>
                <ReactLoading type="bars" className={ this.state.isLoading? "load" : "none" }/>
            </main>
        )
    }
}