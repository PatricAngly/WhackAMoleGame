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
    <hr>
    <h1>Fastest click</h1>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Click time</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of userClick | async">
          <td>{{user.data.name}}</td>
          <td>{{user.data.click}} ms</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
  ]
})
export class HighscoreComponent {
  userlist!: AngularFirestoreCollection<User>;
  clicklist!: AngularFirestoreCollection<User>    
  users: any; 
  userClick:any;                                  

  constructor(private __afs: AngularFirestore, public gameService: GameService) {} 

  ngOnInit(): void {
    this.userlist = this.__afs.collection<User>('highscore', ref => ref.orderBy('score', 'desc').limit(10)); // returns a reference from the firebase collection of highscore document, sorted by score and has a limit of 10
    this.users = this.userlist.snapshotChanges().pipe( // gets all changes from the collection to
      map(action => {                                  // transfroms every object and type convert them to the User class
        return action.map( a => {                       
          const data = a.payload.doc.data() as User;
          return { data };
        })
      })
    );
    this.clicklist = this.__afs.collection<User>('highscore', ref => ref.orderBy('click', 'asc').limit(5)); // returns a reference from the firebase collection of highscore document, sorted by lowest ms and has a limit of 5
    this.userClick = this.clicklist.snapshotChanges().pipe( // gets all changes from the collection to
    map(action => {                                  // transfroms every object and type convert them to the User class
      return action.map( a => {                       
        const data = a.payload.doc.data() as User;
        return { data };
      })
    })
  );

  }

}
