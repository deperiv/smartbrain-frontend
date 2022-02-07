import React, {Component} from 'react';
import './App.css'

import Navigation      from './components/navigation/Navigation';
import Logo            from './components/logo/Logo';
import ImageLinkForm   from './components/imagelinkform/ImageLinkForm';
import Rank            from './components/rank/Rank';
import ParticlesEdit   from './components/particlesedit/ParticlesEdit';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import SignIn          from './components/signin/SignIn';
import Register        from './components/register/Register';

  //Some images to try in the website
  //https://samples.clarifai.com/face-det.jpg
  //https://healthmatters.nyp.org/wp-content/uploads/2020/05/covid-19-severity-hero.jpg
  //https://www.psychologicalscience.org/redesign/wp-content/uploads/2016/08/PAFF_022619_facescrowd-1024x705.jpg
  //https://i.cbc.ca/1.5807150.1605732785!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/faces.jpg
  //https://st3.depositphotos.com/2853475/12805/i/950/depositphotos_128054926-stock-photo-skater-boy-practicing-at-skate.jpg
  //https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2019/10/29/11e2cf75-e46c-4f19-b987-799670d4f167/dassy-angyil-red-bull-bc-one-camp-houston-2018
  


const initialState = {
  input: '',
  imageUrl: '',
  boxesArray: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxesArray: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

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

  // updateEntries = (entries) => {
  //   this.setState({user.entries: entries});
  // }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3001/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input
        })
    })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
         })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries:count}))
          })
          .catch(console.log)
      }
      this.displayFaceBoxes(this.getRegions(response).map((region) => this.calculateFaceLocation(region)))

    })
    .catch(err => console.log(err))

  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  
  render(){
    const {isSignedIn, route, imageUrl, boxesArray} = this.state;
    return (
      <div className='App'>
        <ParticlesEdit />
        
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Logo />
          <Navigation onRouteChange={this.onRouteChange} isSignedIn = {isSignedIn}/>
        </div>
        {
          this.state.route === 'home'
          ? <div>
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm 
                  onInputChange={this.onInputChange} 
                  onPictureSubmit={this.onPictureSubmit}
                />
                <FaceRecognition 
                  imageUrl = {imageUrl} 
                  boxes = {boxesArray}
                />
            </div>
          :(
            (route === 'signin' || route === 'signout')

            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          ) 
        }
      </div>
    );
  }
}


export default App;
