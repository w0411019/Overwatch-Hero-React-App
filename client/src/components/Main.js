import React from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import Card from './Card'
import dataService from '../services/dataService';
import { Link } from 'react-router-dom';

class Main extends React.Component {

//define state here
  state = {
    heroes: [],
  }

  componentDidMount(){
    dataService.getHeroes((err, heroes) => {
        if(err) return console.log(err)
        this.setState({heroes})
    })
  }


  render(){
    return (
      <div>
        <section className="jumbotron text-center">
        <div className="container">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search this site" />
            <div className="input-group-append">
              <button className="btn btn-secondary" type="button">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>

        <div>     
           <Link to={{pathname: '/heroes/create'}} ><button className="btn btn-success mt-4" >Create</button> </Link>
        </div>

      </section>
      <div>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              
          {this.state.heroes.map((hero, i) => {        
              let difficulty;
              if(hero.difficultyrating === 1){
                  difficulty = "★"
              }
              else if(hero.difficultyrating === 2){
                  difficulty = "★★"
              }
              else if(hero.difficultyrating === 3){
                  difficulty = "★★★"
              }
              return (  
                <div className="col-md-4" key={i}>
                      <Card hero={hero} difficulty={difficulty}/>
                </div>
              )           
              })
            }
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
 
export default Main;