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
}
