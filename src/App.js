import React, { Component } from 'react';
import './App.css';
import Workspace from './components/Workspace/index';

function App() {
  return (
    <Workspace/>
  )
}

// class App extends Component { 
//   constructor(props){
//     super(props);
//     this.state = {
//       images: [],
//       selectedImage: null
//     }
//   }
  
//   render() {
//     return (
//       <div id='main'>
//         <div>
//           <button onClick={this._handleOpenFolder}>Open Folder</button>
//         </div>
//         <div id="annotate">
//         </div>
//         <Alert dismissible variant="danger">
//           <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
//           <p>
//             Change this and that and try again.
//           </p>
//         </Alert>
//       </div>
//     );
//   }

//   _handleOpenFolder = () => {
//     const electron = window.require('electron');
//     promptSamples({ electron })
//     .then(result => {
//       this.setState({
//         images: result,
//         selectedImage: result[0].src,
//       })
//     });
//   

// }

export default App;
