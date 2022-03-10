import React from 'react';
import { Link } from 'react-router-dom';


const Card = (props) => {
    return ( 
        <div>
            <div className="card mb-4 box-shadow">
              <img 
                className="card-img-top" 
                alt={props.hero.charactername.heroname} 
                src={props.hero.image}
                data-holder-rendered="true" />
                <h3 className="card-header">{props.hero.charactername.heroname}</h3>
              <div className="card-body">
                <div className="card-text">
                    <p><strong>Full Name:</strong> {props.hero.charactername.fullname.firstname} {props.hero.charactername.fullname.lastname}</p>
                    <p><strong>Role:</strong> {props.hero.role}</p>
                    <p><strong>HP:</strong> {props.hero.healthpoints}</p>
                    <p><strong>Sheilds:</strong> {props.hero.shields}</p>
                    <p><strong>Difficulty Rating:</strong> {props.difficulty}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                  <Link to={{pathname: '/heroes/edit/'+props.hero._id}}><button type="button" className="btn btn-sm btn-outline-secondary">Edit</button></Link>
                  <Link to={{pathname: '/heroes/delete/'+props.hero._id}}> <button type="button" className="btn btn-sm btn-outline-secondary">Delete</button></Link>
                  </div>
                  <small className="text-muted"></small>
                </div>
              </div>  
            </div>
        </div>
      );
}

export default Card;