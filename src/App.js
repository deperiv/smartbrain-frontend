import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import ParticlesEdit from './components/particlesedit/ParticlesEdit';
import './App.css'
import './index.css'


class App extends Component {
  render(){
    return (
      <div className='App'>
        <ParticlesEdit />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        
        {
        // 
        // 
        // <FaceRecognition />
        }
      </div>
    );
  }
}


export default App;
