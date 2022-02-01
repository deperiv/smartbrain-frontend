import React, {Component} from 'react';
import Clarifai from 'clarifai';
import './App.css'

import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import ParticlesEdit from './components/particlesedit/ParticlesEdit';
import FaceRecognition from './components/facerecognition/FaceRecognition';

const app = new Clarifai.App({
  apiKey: 'c9019e56e40f4597b4c0603a31cbe9d5'
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      faces: []
    }
  }

  //https://samples.clarifai.com/face-det.jpg
  //https://healthmatters.nyp.org/wp-content/uploads/2020/05/covid-19-severity-hero.jpg
  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    console.log(this.state.input);
    
    this.setState({imageUrl: this.state.input});

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input).
     then(
      function(response) {
        console.log(response)
      }, 
      function(err){
        console.log(err)
      }
    );
  }

  render(){
    return (
      <div className='App'>
        <ParticlesEdit />
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Logo />
          <Navigation />
        </div>
        
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl = {this.state.imageUrl}/>
        
        {
        // 
        // 
        // 
        }
      </div>
    );
  }
}


export default App;
