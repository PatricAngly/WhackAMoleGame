import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
    grid = [ 
    {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0},
    {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0},
    {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0},
    {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0},
    {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}
  ];
  
   timer = 60;
   score = 0;
   image = "https://thumbs.dreamstime.com/b/tecknad-filmv%C3%A5gbrytare-som-komms-ut-ur-h%C3%A5let-136771542.jpg" 
   gameRunning = false;
   intervalId: any;
   maxMoles = 0;

  constructor() { }

  startGame() { // Runs when start is clicked, disables the button and resets values. 
    this.gameRunning = true;
    this.score = 0;
    this.timer = 60;
    this.intervalId = setInterval(() => { 
      if (this.timer > 0) {
        this.timer--;
        this.addMoles();
      } else{
        clearInterval(this.intervalId);
        this.gameRunning = false;
        this.clearPlayboard()
      }
      this.updateMole();
    }, 1000);
  }

  addMoles(){ // Add new random moles with image property and time property
    if(this.maxMoles >= 2){
      this.maxMoles--;
    }else {
    this.maxMoles++;
    let randomSquare = Math.floor(Math.random() * this.grid.length);
    this.grid[randomSquare].mole = this.image;
    this.grid[randomSquare].time = Date.now();
    } 
  }

  hitMole(index:number){ // Takes index as paramter in from ngFor in template to empty that sqaure when its clicked
    if(this.grid[index].mole != ""){
      this.grid[index].mole = "";
      this.score++;
      this.maxMoles--;
    }
  }

  updateMole(){ // Loop through the grid-array to make empty squares of the moles that has been visible for 4 seconds
    for(let i = 0; i < this.grid.length; i++){
      const mole = this.grid[i];
      const time = (Date.now() - mole.time) / 1000;
    if (time >= 4) {
      mole.mole = "";
      }
    }
  }

  clearPlayboard() { // Resets the playboard 
    this.grid = [
      {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0},
      {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0},
      {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0},
      {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0},
      {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}, {mole:"", time:0}
    ]; 
  }

}
