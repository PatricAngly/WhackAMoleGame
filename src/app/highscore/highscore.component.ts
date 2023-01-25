import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from './user';
import { map } from 'rxjs/operators';
import { GameService } from '../game.service';

@Component({
  selector: 'app-highscore',
  template: `
    <h1>Highscore</h1>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users | async">
          <td>{{user.data.name}}</td>
          <td>{{user.data.score}}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
  ]
})
export class HighscoreComponent {
  userlist!: AngularFirestoreCollection<User>;    
  users: any;                                   

  constructor(private __afs: AngularFirestore, public gameService: GameService) {} 

  ngOnInit(): void {
    this.userlist = this.__afs.collection<User>('highscore', ref => ref.orderBy('score', 'desc'));
    this.users = this.userlist.snapshotChanges().pipe(
      map(action => {
        return action.map( a => {
          const data = a.payload.doc.data() as User;
          return { data };
        })
      })
    );
  }

}