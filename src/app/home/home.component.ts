import {Component, OnDestroy, OnInit} from '@angular/core';
import {count, interval, Subscription, Observable, map, filter} from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  constructor() {
  }

  ngOnInit() {
    //this.subscription = interval(1000).subscribe(count=>{console.log(count)});
    const customIntervalObservable = new Observable<number>(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count++);
        if (count === 2) {
          observer.complete()
        }
        if (count > 3) {
          observer.error(new Error('Count error '))
        }
      }, 1000);
    });


    this.subscription = customIntervalObservable.pipe(filter((data) => data > 0), map(data => {
      return "RESULT" + data
    })).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completed');
      }
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe()

  }

}
