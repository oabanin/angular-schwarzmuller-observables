import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {UserService} from './user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  userActivated = false;
  private activatedSub!:Subscription;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe(didActivate =>{
      this.userActivated = didActivate;
    })
  }

  ngOnDestroy() {
    this.activatedSub.unsubscribe()
  }
}
