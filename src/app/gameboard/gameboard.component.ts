import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-gameboard',
  template: `
<div>
  <button (click)="gameService.startGame()" [disabled]="gameService.gameRunning">Start</button>
</div>
<div>
  <p>Time remaining: {{ gameService.timer }}</p>
  <p>Score: {{ gameService.score }}</p>
</div>
<div class="grid">
  <div *ngFor="let square of gameService.grid; let i = index" class="square">
    <img *ngIf="square.mole" [src]="gameService.image">
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

}
