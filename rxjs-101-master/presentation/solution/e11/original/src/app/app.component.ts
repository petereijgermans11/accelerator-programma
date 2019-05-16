import { Component, OnInit } from '@angular/core';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

type item = { name: string };

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Angular';

  // We want to keep some local state in this application, but also want
  // to keep a "stream" as we normally would as if it were coming from the // backend, therefore keeping our components simple.

  // However, the BehaviorSubject underneath is unnecessary.
  // Rewrite this code so it doesn't use Subjects, yet keeps local state.
  items$ = new BehaviorSubject<item[]>([]);

  ngOnInit() {
    // Hint; this could possibly get more simple without Subjects.
    this.getItem().subscribe({ 
      next: (response) => this.items$.next(response)
    });
  }

  addItem(item: item) {
    const prevData = this.items$.value;
    const nextData = [ ...prevData, item ];
    this.items$.next(nextData);

    // If your api fails return to previous state (show feedback to user there was issue)
    this.postItem(item).subscribe({ error: (err) => this.items$.next(prevData)})
  }

  refresh() {
    this.getItem().subscribe({
      next: (response) => { this.items$.next(response) }
    })
  }

  getItem(): Observable<item[]> {
    // do your api call
    return of([{ name: 'something' }, { name: 'another something' }]).pipe(
      tap(() => { console.log('retrieving from API!') })
    );
  }

  postItem(item: item) {
    // do your api call
    return of();
  }
}
