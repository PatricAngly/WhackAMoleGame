import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-gameboard',
  template: `
<div>
  <button (click)="startGame()" [disabled]="gameService.gameRunning">Start</button>
</div>
<div>
  <p>Time remaining: {{ gameService.timer }}</p>
  <p>Score: {{ gameService.score }}</p>
</div>
<div class="grid">
  <div *ngFor="let square of gameService.grid; let i = index" class="square">
    <img *ngIf="square.mole" [src]="gameService.image" (click)="gameService.hitMole(i)">
  </div>
</div>
  `,
  styles: [`
    .grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr); 
    grid-template-rows: repeat(5, 1fr); 
    grid-gap: 1px; 
    width: fit-content;
  }

  .square {
    width: 100px;
    height: 100px;
    background-color: green;
    border-style: solid;
    border-width: 5px;
  }

  .square img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  `]
})
export class GameboardComponent {

  constructor (public gameService: GameService){}

  startGame() { // calls when user clicks on start.
    this.gameService.gameRunning = true; // sets game to running which disables the start button.
    this.gameService.start(); // calls on start() from gameservice.
    this.gameService.score = 0;
    this.gameService.timer = 20;
    let gameinterValId = setInterval(() => { // starts a interval for the timer.
      this.gameService.timer--; // timer counts down every second.
      if (this.gameService.timer === 0) { // if timer is 0, game is finished.
        this.gameService.gameRunning = false; // start button is clickable again.
        clearInterval(gameinterValId); // clears the interval for the timer countdown.
      }
    }, 1000);
  }

}
