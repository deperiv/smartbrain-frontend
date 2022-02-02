import React, {Component} from 'react';
import './App.css'
import Clarifai        from 'clarifai';
import Navigation      from './components/navigation/Navigation';
import Logo            from './components/logo/Logo';
import ImageLinkForm   from './components/imagelinkform/ImageLinkForm';
import Rank            from './components/rank/Rank';
import ParticlesEdit   from './components/particlesedit/ParticlesEdit';
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
      boxesArray: []
    }
  }

  //Images to test the website
  //https://samples.clarifai.com/face-det.jpg
  //https://healthmatters.nyp.org/wp-content/uploads/2020/05/covid-19-severity-hero.jpg
  //https://www.psychologicalscience.org/redesign/wp-content/uploads/2016/08/PAFF_022619_facescrowd-1024x705.jpg
  //https://i.cbc.ca/1.5807150.1605732785!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/faces.jpg
  //https://st3.depositphotos.com/2853475/12805/i/950/depositphotos_128054926-stock-photo-skater-boy-practicing-at-skate.jpg
  //https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2019/10/29/11e2cf75-e46c-4f19-b987-799670d4f167/dassy-angyil-red-bull-bc-one-camp-houston-2018
  
  getRegions = (data) => {
    const faceRegionsArray = data.outputs[0].data.regions;
    const coordinatesArray = faceRegionsArray.map(region => {
      return region.region_info.bounding_box;
    })
    return coordinatesArray;
  }
  
  calculateFaceLocation  = (data) => {
    const clarifaiFace = data;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol:clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      width: (clarifaiFace.right_col -  clarifaiFace.left_col) * width,
      height: (clarifaiFace.bottom_row -  clarifaiFace.top_row) * height
    }
  }

  displayFaceBoxes = (boxes) => {
    this.setState({boxesArray: boxes})
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => this.getRegions(response))
    .then(regions => regions.map((region) => this.calculateFaceLocation(region)))
    .then(boxes => this.displayFaceBoxes(boxes))
    .catch(err => console.log(err))
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
        <FaceRecognition 
          imageUrl = {this.state.imageUrl} 
          boxes = {this.state.boxesArray}
        />
      </div>
    );
  }
}


export default App;
