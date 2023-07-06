import './style.css'

import * as THREE from 'three';

class Game_Globals{
  constructor(){
    console.log(window.innerWidth, 'width');
    console.log(window.innerHeight, 'hights');

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1,1000);

    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);
    this.sound = new THREE.Audio( this.listener );

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg')});
    this.audioLoader = new THREE.AudioLoader()
    this.scene.background = new THREE.TextureLoader().load( "Images/blue.png" )
    this.audioLoader.load( 'Music/Ikebukuro_Explore.mp3', ( buffer ) =>{
      this.sound.setBuffer( buffer );
      this.sound.setLoop( true );
      this.sound.setVolume( 0.5 );
      this.sound.play();
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.state = 'roam';
  }


}
// console.log(new Game_Globals());

const Game_Globals_Instance = new Game_Globals();
export default Game_Globals_Instance;
