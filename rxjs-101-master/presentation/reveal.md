## Welcome

### To RxJS 101 <!-- .element: class="fragment" -->

---

<div style="float: left; width: 45%;">
  <img src="bjorn.jpg" width="100" style="border-radius:100%; display: inline-flex;">
  <h1 style="font-size: 0.9em;">Bjorn Schijff</h1>
  <small style="display: inline-flex;">Frontend Software Engineer @ Politie</small>
  <img src="codestar.svg" height="30" style="border: 0; background-color: transparent;">
   <small>@Bjeaurn / bjorn.schijff@ordina.nl</small>
</div>
<div style="float: right; width: 45%;">
  <img src="martin.jpg" width="100" style="border-radius:100%; display: inline-flex;">
  <h1 style="font-size: 0.9em;">Martin van Dam</h1>
<small>Frontend Software Engineer @ BZK</small>
  <img src="codestar.svg" height="30" style="border: 0; background-color: transparent; position: relative" /> 
  <small>@MrtnvDam / martin.van.dam@ordina.nl</small>
</div>

---

## What is RxJS?

- Reactive programming in the Frontend <!-- .element: class="fragment" -->
- A better way to manage data and events within your app. <!-- .element: class="fragment" -->

---

## Why RxJS?

- Better readable code 🤓<!-- .element: class="fragment" -->
- Data flow 🌊<!-- .element: class="fragment" -->
- Easier and safer data transformations 🤖<!-- .element: class="fragment" -->
- Functional and Reactive (!) 🙌<!-- .element: class="fragment" -->

---

## What do you use RxJS for?

- Streaming data, (i.e. WebSockets) <!-- .element: class="fragment" -->
- Games <!-- .element: class="fragment" -->
- Communicating between application components <!-- .element: class="fragment" -->

---

#### Streaming data

```ts
const locationUpdates = webSocket("ws://some-live-shiplocation-api");

locationUpdates.subscribe(newShipLocation => {
  // update UI with new location i.e.
  this.state.shiplocation = newShipLocation;
});
```

---

#### Games

```ts
const ticks = interval(this.tickMs)
    .pipe(map(() => 'tick'))
const frames = interval(this.fpsMs)
    .pipe(map(() => 'frame'))
const seconds = interval(1000)
    .pipe(map(() => 'second'))

this.update$ = merge(ticks, frames, seconds)
    .share()
```

---

#### Communicating between application components

Service

```ts
export class EventBusService {
  private events = new Subject<Event>();

  getEvents(): Observable<Event> {
    return this.events.asObservable();
  }

  sendEvent(event: Event): void {
    this.events.next(event);
  }
}
```

---

#### Communicating between application components

Component

```ts
export class Component {
  constructor(private eventsService: EventBusService) {
    this.eventsService
      .getEvents()
      .filter(event => event.type === "InterestingEvent")
      .subscribe(this.handleEvents);
  }

  doAction(): void {
    this.eventsService.sendEvent(new TestEvent());
  }

  handleEvents(event: Event) {
    //... do things
  }
}
```

---

### So, RxJS?

- Implementation of the Observable pattern in Javascript
- Used heavily by `Angular`
- Lots of adoption in libraries like
  - `Redux-observable`
  - `VueRx`
- Java/Scala also have their implementation.

#### 🤩 So plenty of stuff to have fun with! 🤩 <!-- .element: class="fragment" -->

---

### Disclaimer

All examples are based on RxJS v6

```js
// RxJS v5
import * as Rx from 'rxjs'
const observable = Rx.Observable.from(...)

// RxJS v6 - TypeScript
import { from } from 'rxjs'
const observable = from(...)

// RxJS v6 - JavaScript
const { from } = 'rxjs';
const observable = from(...)
```

---

# The RxJS Contract

---

### Wait, what's a contract?

- A set of rules agreed upon <!-- .element: class="fragment" -->
- Using the same language throughout <!-- .element: class="fragment" -->
- Ensures we're all using the same things for the same reasons. <!-- .element: class="fragment" -->

---

### So, the RxJS Contract

- Observable
- Subscribers
- Subscription
- Operators
- Subject

---

#### Observable

- Datasource\* <!-- .element: class="small" -->
- You can `subscribe` to its contents, much like a newsletter.
- Unlike a newsletter, it won't send anything until at least someone has a `subscription`.
- You can use `operators` on it, to get the parts you are interested in.

---

#### Subscribers

```js
const obs = from([1, 2, 3]);

obs.subscribe(
  next => { console.log(next) },
  error => {},
  complete => { console.log("I'm done!") }
);

// What does this do?
```

- A subscriber activates an Observable. <!-- .element: class="fragment" -->
- Within a subscriber you handle every value, an error, or when it's done. <!-- .element: class="fragment" -->
- Without error handling, the subscription will end immediately <!-- .element: class="fragment" -->

---

#### Subscription

```js
const obs = from([1, 2, 3]).pipe(
  delay(1)
);

const subscription = obs.subscribe(
  next => { console.log(next) },
  error => {},
  complete => { console.log("I'm done!") }
);

subscription.unsubscribe();

// What do you think this does?
```

```js
// and what happens when we remove the delay()?
```

<!-- .element: class="fragment" -->

- A subscription let's you unsubscribe from the ~~newsletter~~ `Observable`.

---

#### Operators

- Operators are small operations you perform on top of your Observable. <!-- .element: class="fragment" -->
- You can use multiple operators to transform the data to your liking. <!-- .element: class="fragment" -->
- This is done using the pipe() method, introduced in RxJS v6 <!-- .element: class="fragment" -->
- There's multiple categories of operators.<br />More on that later! 🔜<!-- .element: class="fragment" -->

---

#### Creation

- Generates an Observable based on your input
  `from() of()`<br /> <!-- .element: class="fragment" -->
  `interval() EMPTY`<br /> <!-- .element: class="fragment" -->
  `fromPromise() merge() concat()`<br /> <!-- .element: class="fragment" -->
  - and more!<!-- .element: class="fragment" -->

---

```js
const obs = from([1, 2, 3]).pipe(
  map(x => x * 2),
  filter(x => x < 4)
);

obs.subscribe(
  next => {
    console.log(next);
  }, // 2, 4, I'm done!
  error => {},
  complete => {
    console.log("I'm done!");
  }
);
```

<!-- .element: class="fragment" -->
```
// What happens when we switch the map() and filter() around?
```
<!-- .element: class="fragment" -->

---

#### But wait, there's more! 🙀

- Subject <!-- .element: class="fragment" -->
  - BehaviorSubject
  - ReplaySubject
- Observers <!-- .element: class="fragment" -->

We may go into these later. <!-- .element: class="fragment" -->

⛔ This is advanced, you can forget about these now. <!-- .element: class="fragment" -->

---

## Let's tango! 💃

In your terminal:

```sh
git clone https://github.com/code-star/rxjs-101.git

cd rxjs-101/exercises
```

- Open the folder in your favorite IDE/text editor.

```sh
code .
```

For Visual Studio Code.

---

# Exercises

Part one

---

### Exercise #1

Use `range()` to write your first Observable, and log its contents to your console.

Remember that an Observable does nothing on its own!

```js
const { range } = rxjs;
const rangeObservable = range(1, 3);
// ...
```

---

# Operators

---

- We've talked about operators for a little bit.
- But there's more!

---

- Transformation like `map()`
- Filtering like `filter()`
- Utility like `tap()`
- Error handling like `catchError()`
- Combination like `merge()`
- Flattening like `switch()`
- Multicasting like `share()`
- And plenty of combined operators, like `switchMap()` or `mergeMap()`

---

### `map()`

Transform the value to another value

```ts
const obs = from([1, 2, 3]).pipe(
  map(x => x * 2) // multiplies each item by 2
);

// outputs: 2, 4, 6
```

---

### `filter()`

Filter out values you're not interested in

```ts
const obs = from([1, 2, 3]).pipe(
  filter(x => x > 2) // only use values that are higher than 2
);

// outputs: 3
```

---

### `tap()`

Utility for doing side effects but it will not effect the actual data

```ts
const obs = from([1, 2, 3]).pipe(
  tap(x => console.log(x)) // logs the value to the console
);

// outputs: 1, 2, 3
```

---

### `catchError()`

- By default, the Observable will finish on errors
- catchError operator will help handle errors

```ts
const obs = from([1, 2, 3]).pipe(
  map( ... ),
  catchError((err, caught) => {
    // `catchError` takes an error Observable, handles
    // the error and either breaks the stream or returns
    // a new one that functions.
    // This operator basically works like a `switchMap`
    return ...
  })
);
```

---

### `merge()` vs. `concat()`

Merge or concatinate multiple Observables together

```ts
const { from, merge, timer, concat } = rxjs;
const { take, delay } = rxjs.operators;

const obs1 = timer(0, 1000).pipe(take(3));
const obs2 = from(["a", "b", "c"]).pipe(delay(1));

merge(obs1, obs2);
// outputs: 0, 'a', 'b', 'c', 1, 2

concat(obs1, obs2);
// outputs 0, 1, 2, 'a', 'b', 'c'
```

---

- There's about a 120 operators.
- They're all on https://github.com/ReactiveX/rxjs/tree/master/src
- It's a bit scary at first, but don't be afraid to just go there and lookup what an operator does.

---

# Exercises

Part two

---

### Exercise #2

Use `filter()` to let the observable only return the numbers that are lower than 10

```js
const { from, pipe } = rxjs;
const { filter, map } = rxjs.operators;

const observable = from([1, 2, 4, 8, 16, 32])
  .pipe
  // apply filtering here... //
  ();

observable.subscribe(value => {
  console.log(value); // should log the values 1, 2, 4, 8
});
```

---

### Exercise #3

Use `map()` to multiply the values by 2

```js
const { from, pipe } = rxjs;
const { filter, map } = rxjs.operators;

const observable = from([1, 2, 4, 8, 16, 32])
  .pipe
  // apply transformations here... //
  ();

observable.subscribe(value => {
  console.log(value); // should log the values 2, 3, 8, 16, 32, 64
});
```

---

### Exercise #4

Combine `filter()`with `map()`.

Hint: use `typeof x === 'string'` and `toUpperCase()`

---

### Exercise #5

A part of this exercise is given business logic, but we need the Observable to complete.

Add operators to make sure we handle any errors given by the Observable so it completes again.

---

# Common mistakes

- By André Staltz

---

- Using Subjects too much. Use Observable.create!
- Using Observable.create too much. Use Creation operators
- Subscribing too much and unsubscribing too much
- Subject.next inside subscribe
- Subscribe inside subscribe

---

# Exercises

Part three

---

### Exercise #6

A: There are two things that are going wrong in this code. Can you see what they are? Adjust the code to fix those problems.

Hint: Run the example first and check the console log.

B: Rewrite this code so you don't need a Subject anymore.

Hint: the `from` creator and the `map` operator could help here.

---

## Cold versus Hot


```ts
const obs = interval(1000).pipe(
    // share(), <--- This makes it hot! 🌶️
    // Share secretly is a `multicast()` with a `refCount()`
    take(5),
)

obs.subscribe(a => console.log('A', a));

setTimeout(() => {
    obs.subscribe(b => console.log('B', b))
}, 1001) // We start it after the first emit.
```

```js
// 🌶️ Hot: A0, A1, B1, A2, B2, etc.
// ❄️ Cold: A0, A1, B0, A2, B1, A3, B2, etc.
```

⛔️ Advanced stuff! Interested? Look up `share()` and its friends.

---

# Exercises

Part four

---

### Exercise #7

Fix the bug! 🐛

---

# Final review;

- Reflect on how easy it can be to read RxJS code
- Functional programming !!!
- RxJS and Reactive programming is a mindset. Get in the habit of doing it and it'll get easier.

---

Questions?

---

🙌 Thanks for your attention and attendance! 🙌

<div style="float: left; width: 40%;">@Bjeaurn</div>
<div style="float: right; width: 40%;">@MrtnvDam</div>

---

### ⛔️ Advanced stuff ahead!

---

### `switchMap()` operator

`Projects each source value to an Observable which is merged in the output`

```js
fromEvent(document, 'click')
.pipe(
  // restart counter on every click
  switchMap(() => interval(1000))
)
.subscribe(console.log);
```

----

```ts
this.http.get<ID>(MY_URL).pipe(
  switchMap(id => {
    const url = MY_SECOND_URL.replace(":thingId", id)
    return this.http.get(url)
  })
)
```

---

### Subscription management 😕

```js
const onFocus = fromEvent(input, 'focus')
const onBlur = fromEvent(input, 'blur')
const onKeyUp = fromEvent(input, 'keyup')

onFocus.subscribe(() => validateInput())
onBlur.subscribe(() => validateInput())
onKeyUp.subscribe(() => validateInput())

// and when we're done
onClick.unsubscribe()
onScroll.unsubscribe()
onResize.unsubscribe()
```

---

### Subscription management 😎

```js
const onFocus = fromEvent(input, 'focus')
const onBlur = fromEvent(input, 'blur')
const onKeyUp = fromEvent(input, 'keyup')
const events = merge(onFocus, onBlur, onKeyUp)

events.subscribe(() => validateInput())

// and when we're done
events.unsubscribe()
```

---

### Exercise #8

We talked about the `catchError` operator before. But in that scenario (exercise #5), we stopped and completed the stream.

Let's say we want to fish out any errors and continue the original stream. 

---

### Exercise #9

Managing your subscriptions is important.

In this exercise we're going to refactor code to reduce subscriptions.

---

### Exercise #10

Link the two observables to merge a Pokémon Observable with a Pokémon Moves Observable.

Hint; not all types have moves, and you only need (should have) 1 subscribe.

---

### Exercise #11

This exercise is in Angular on Stackblitz.

We have an application that uses a BehaviorSubject, and keeps local state of some values; but maintains a stream like it was coming from a server.

Refactor it so it doesn't need a BehaviorSubject, works the exact same and in turn make it simpler.
