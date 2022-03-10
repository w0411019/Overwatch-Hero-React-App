import Joi from 'joi-browser';
import React from 'react';
import '../css/signin.css';
import authService from '../services/authService';


class Register extends React.Component {

    state = {
        registerData: {
        firstName:"", 
        lastName:"", 
        email:"", 
        password:""
        },
        errors: []
    }

    validationSchema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const result = Joi.validate(this.state.registerData, this.validationSchema, {abortEarly: false});

        const errors = []
        if(result.error){
            result.error.details.forEach(detail => {
                
                const error = {}

                error.message = detail.message
                error.field = detail.path[0]

                errors.push(error)

            });
        }
        this.setState({errors: errors})

        if(errors.length === 0 ) {
            authService.register(this.state.registerData, (err, success) => {
                if(!success){
                    console.log(err)
                    const errors = []
                    const error = {}
    
                    switch(err.status){
                        case 400:{
                            error.message = "Server Error"
                            break;
                        }
                    }
                    errors.push(error)
                    this.setState({errors})
    
                    return //dont go to redirect
                }
    
                //register was successful - redirect to home
                this.props.history.push('/');
            })
        }
    }

    handleChange = (e) =>{
        const registerData = { ...this.state.registerData }
        registerData[e.target.name] = e.target.value


        this.setState({registerData})
    }

    render(){
        return ( 
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal text-center">Please Register</h1>
                <label htmlFor="inputFName" className="sr-only">First name</label>
                <input onChange={this.handleChange} name="firstName" type="text" id="inputFName" className="form-control" placeholder="First name" autoFocus />
                <label htmlFor="inputLName" className="sr-only">Last name</label>
                <input onChange={this.handleChange} name="lastName" type="text" id="inputLName" className="form-control" placeholder="Last name" />
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input onChange={this.handleChange} name="email" type="text" id="inputEmail" className="form-control" placeholder="Email address" />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input onChange={this.handleChange} name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
                {   
                        this.state.errors.length > 0 && <div className="alert alert-danger mt-2">
                            <ul>
                                {
                                    this.state.errors.map((error, i )=> {
                                       return <li key={i}>{ error.message }</li>
                                    })
                                }
                            </ul>
                        </div>
                    }
            </form>
        );
    }
}
 
export default Register;