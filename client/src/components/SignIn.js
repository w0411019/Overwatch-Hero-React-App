import React from 'react';
import '../css/signin.css';
import authService from '../services/authService';
import Joi from 'joi-browser';

class SignIn extends React.Component {

    state = {
        credentials: {
            email:"",
            password:""
        },
        errors: [] //array of objects
    }

    validationSchema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const result = Joi.validate(this.state.credentials, this.validationSchema, {abortEarly: false});

        console.log(result.error)

        const errors = []
        if(result.error){
            result.error.details.forEach(detail => {
                
                //create a new custom object
                const error = {}
                //fill it with needed error data
                error.message = detail.message
                error.field = detail.path[0]
                //add to the errors array
                errors.push(error)

            });
        }
        this.setState({errors: errors})

        if(errors.length === 0 ) {
            authService.login(this.state.credentials, (err, success)=> {
            if(!success){

                console.log(err)
                const errors = []
                const error = {}

                switch(err.status){
                    case 404:{
                        //invalid login (unauthorzied)
                        error.message = "Invalid Login"
                        break;
                        
                    }
                    case 400:{
                        error.message = "Server Error"
                        break;
                    }
                }
                errors.push(error)
                this.setState({errors})

                return //dont go to redirect
            }

            //login was successful - redirect to home
            this.props.history.push('/');
            })
        }
    }

    handleChange = (e) =>{

        //set state in credentials nested object
        const credentials = { ...this.state.credentials }
        credentials[e.target.name] = e.target.value


        this.setState({credentials})

        //this.setState({[e.target.name]:e.target.value})
    }

    render(){
        return (
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input onChange={this.handleChange} name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" autoFocus />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input onChange={this.handleChange} name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
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
 
export default SignIn;