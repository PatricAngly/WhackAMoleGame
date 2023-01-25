import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GameService } from '../game.service';

@Component({
  selector: 'app-user-modal',
  template: `
  <div class="modal-body">
    <form (ngSubmit)="saveName()">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" [(ngModel)]="this.gameService.newPlayer.name" name="name" required>
  </div>
  <div class="modal-footer">
    <button type="submit" class="btn btn-primary">Start game</button>
  </div>
  </form>
  `,
  styles: [
  ]
})
export class UserModalComponent {

  

  constructor (public activeModal: NgbActiveModal, public gameService: GameService){}
  
    saveName() {
    this.activeModal.close(); // closes the modal when the user clicks on start game after they have enter their name.
  }  


}
