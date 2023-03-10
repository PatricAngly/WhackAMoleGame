import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from './highscore/user';

@Injectable({
  providedIn: 'root'
})
export class GameService {
    grid = [ 
    {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0},
    {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0},
    {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0},
    {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0},
    {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}
  ];
  
   timer = 60;
   score = 0;
   image = "https://thumbs.dreamstime.com/b/tecknad-filmv%C3%A5gbrytare-som-komms-ut-ur-h%C3%A5let-136771542.jpg" 
   gameRunning = false;
   private intervalId: any;
   newPlayer: User = {name: '', score: 0, click: null }
   fastestTime: any = null;
   clickedTime: any;
  constructor(private __afs: AngularFirestore) { }

  start() {
    this.intervalId = setInterval(() => { // Starts a interval that calls on addMoles and updatemoles every 300 millisecond.
        this.addMoles();
        this.updateMole();
    }, 300);
  }

  stop() {
    clearInterval(this.intervalId); // clears the interval for the game and resets the playboard.
    this.grid = [
      {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0},
      {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0},
      {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0},
      {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0},
      {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}, {mole:false, time:0}
    ]; 
  }

  moleCheck(){ // filter a new array with moles that has true as property and return the length of that array.
    let moleCount = this.grid.filter(x => x.mole === true).length;
    return moleCount;
  }

  addMoles(){ // Add new random moles with true property and time property.
    const maxMoles = this.moleCheck() // Sets maxMoles to the returned lenght from moleCheck().
    if (maxMoles === 3) { // return nothing if maxMoles is equal to 3. 
      return;
    }
    let randomSquare = Math.floor(Math.random() * this.grid.length); // Makes a random number based on the lenght of the grid-array. 
    this.grid[randomSquare].mole = true;          //Uses the radom number as index to change
    this.grid[randomSquare].time = Date.now();    // mole and time property.
  }

  hitMole(index:number){ // Takes the index from clicked square as paramter and checkes the mole property.
      this.grid[index].mole = false;     // hit mole will be changed back to false.
      this.score++;
      this.clickedTime = Date.now() - this.grid[index].time // timestamp minus date.now is the clicktime   
      if (this.fastestTime === null || this.clickedTime < this.fastestTime) { // updates fastestTime with clickedTime, then if clickedTime is less than fastestTime it will continue to update fastestTime
        this.fastestTime = this.clickedTime;
        this.newPlayer.click = this.fastestTime
    }
  }

  updateMole() { // Loop through the grid-array to make empty squares of the moles that has been visible for 4 seconds.
    for(let i = 0; i < this.grid.length; i++) {
        if(this.grid[i].mole === true && Date.now() - this.grid[i].time >= 4000) { // if mole is true and the time is greater or equal to 4 seconds
            this.grid[i].mole = false;                                             //  mole will be set to false.  
      }
    }
  }
  addScore() {
    this.__afs.collection('highscore').add(this.newPlayer); // adds a new document to the highscore collection with data from newPlayer variable.
    this.newPlayer.name = ""
  }
}
