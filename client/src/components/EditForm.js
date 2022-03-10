import React from 'react';
import '../css/signin.css';
import dataService from '../services/dataService';
import Joi from 'joi-browser';

class EditForm extends React.Component {
    state = {
        heroData: {
            heroname:"", 
            firstname:"", 
            lastname:"", 
            role:"", 
            healthpoints:0, 
            shields:0, 
            difficultyrating:1, 
            image:""
        },
        errors: []
    }

    componentDidMount(){
        dataService.getOneHero(this.props.match.params.id, (err, hero) => {
            if(err) return console.log(err)
            this.setState({
                heroData: {
                heroname: hero.charactername.heroname, 
                firstname: hero.charactername.fullname.firstname,
                lastname: hero.charactername.fullname.lastname,
                role: hero.role, 
                healthpoints: hero.healthpoints,
                shields: hero.shields,
                difficultyrating: hero.difficultyrating,
                image: hero.image
                }
            })
            console.log(this.state)
        })
        
      }

    validationSchema = {
        heroname: Joi.string().required(),
        firstname: Joi.string(),
        lastname: Joi.string(),
        role: Joi.string().valid('Support','Tank','Damage').required(),
        healthpoints: Joi.number().required(),
        shields: Joi.number().required(),
        difficultyrating: Joi.number().required(),
        image: Joi.string().required()
    }

    handleSubmit = (e) => {
        e.preventDefault() 


        const result = Joi.validate(this.state.heroData, this.validationSchema, {abortEarly: false});

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
            console.log(this.state.heroData.heroname)
            dataService.updateHero({
                charactername:{
                    heroname: this.state.heroData.heroname, 
                    fullname:{
                        firstname: this.state.heroData.firstname, 
                        lastname: this.state.heroData.lastname
                        }
                    },
                    role: this.state.heroData.role, 
                    healthpoints: this.state.heroData.healthpoints,
                    shields: this.state.heroData.shields, 
                    difficultyrating: this.state.heroData.difficultyrating, 
                    image:this.state.heroData.image
                },
                this.props.match.params.id, (err, success) => {
                if(!success){
                    const errors = []
                    const error = {}

                    switch(err.status){
                        case 404:{
                            //invalid login (unauthorzied)
                            error.message = "Hero not found"
                            break;
                            
                        }
                        case 400:{
                            error.message = "Server Error"
                            break;
                        }
                    }
                    errors.push(error)
                    this.setState({errors})

                    return
                }

                this.props.history.push('/');
            })
        }
    }

    handleChange = (e) =>{
        const heroData = { ...this.state.heroData }
        heroData[e.target.name] = e.target.value


        this.setState({heroData})
    }

    render(){
        return ( 
            
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal text-center">Edit Hero</h1>

                <label htmlFor="inputHName" >Hero name:</label>
                <input onChange={this.handleChange} name="heroname" type="text" id="inputHName" className="form-control" 
                 value={this.state.heroData.heroname} autoFocus/>

                <label htmlFor="inputFName">First name:</label>
                <input onChange={this.handleChange} name="firstname" type="text" id="inputFName" 
                value={this.state.heroData.firstname} className="form-control" />

                <label htmlFor="inputLName">Last name:</label>
                <input onChange={this.handleChange} name="lastname" type="text" id="inputLName" 
                value={this.state.heroData.lastname} className="form-control" />

                <label htmlFor="inputRole">Role:</label>
                <select onChange={this.handleChange} name="role" id="inputRole" className="form-control" 
                value={this.state.heroData.role}>
                    <option value="Support">Support</option>
                    <option value="Tank">Tank</option>
                    <option value="Damage">Damage</option>
                </select>

                <label htmlFor="inputHP">Health Points:</label>
                <input onChange={this.handleChange} name="healthpoints" type="text" id="inputHP" 
                value={this.state.heroData.healthpoints} className="form-control" />

                <label htmlFor="inputShields" >Sheilds:</label>
                <input onChange={this.handleChange} name="shields" type="text" id="inputSheilds" 
                value={this.state.heroData.shields} className="form-control" placeholder="Hero Shields" />

                <label htmlFor="inputDR">Difficulty Rating:</label>
                <select onChange={this.handleChange} name="difficultyrating" id="inputDR" className="form-control" value={this.state.heroData.difficultyrating} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <label htmlFor="inputImage">Image:</label>
                <input onChange={this.handleChange} name="image" type="text" id="inputImage" className="form-control" value={this.state.heroData.image} />

                <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">Edit Hero</button>
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

export default EditForm;