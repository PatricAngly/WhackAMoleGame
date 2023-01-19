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
      } else{
        clearInterval(this.intervalId);
        this.gameRunning = false;
      }
    }, 1000);
  }
}
