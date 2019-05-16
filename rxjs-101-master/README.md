## Codestar RxJS 101

## Todo
> W = waiting for
> X = done

- [X] Contact met Academy voor aanmelding training/trainers
- [X] Academy formulieren invullen en sturen.
- [X] Slides/presentatie maken.
    - [X] Aantal excercises bepalen
    - [X] Rode draad tussen excercises vastleggen.
    - [X] Note: Moeten we nog nadenken over non-Mac gebruikers?

- [X] Exercises los aanbieden, omdat niet iedereen op hetzelfde tempo werkt?    

- [X] Invullen lesplan
    - [X] Allebei eigen variant klaarmaken, vergelijken.
    - [X] Invullen in Word template, verzenden naar Academy.


### Requirements
* [Node](https://nodejs.org/en/download/)
* [Code editor / IDE](https://code.visualstudio.com/Download)

### Resources
* [RxJS Github](https://github.com/reactivex/rxjs)
* [RxJS Documentation](http://reactivex.io/rxjs/)
...

### Schedule
1. Introduction
2. ...

### Exercises
See the [exercises folder](exercises/README.md)


Intro
- Wat is RxJS? 
    - Betere manier om data en events binnen je applicatie beter te managen en uit te wisselen tussen onderdelen.
- Waarom RxJS
    - Betere leesbaarheid van je code
    - Data flow
    - Eenvoudigere transformaties
    - Functional!
- Waarvoor RxJS?
    - Streaming data i.e. WebSocket
    - Games
    - Communicatie tussen applicatie onderdelen.
        - Onafhankelijke communicatie

- Het Rx contract:
    - Observable
        - Databron
        - `empty()`
        - `of()`
        - `from()`
        - `fromEvent()`
        - `interval()`
        - `merge()`
    - Operators
        - Transformaties op de databron
    - Subscriber
        - Observable doet niets tot er een subscriber is. "Ik ben geïnteresseerd in deze informatie"
    - Subscription
        - Het bijhouden van een subscription maakt het afsluiten en 'annuleren' van informatiestromen mogelijk.
    - Subject
        - Een handmatige Observable die vanuit de code aangestuurd wordt. Kortom; zelf in de hand wat de Observable doet.
        - Waarschuwing! Subjects worden veel misbruikt door mensen die niet helemaal weten wat RxJS doet. Denk dus goed na voor je er eentje gebruikt. Er zijn zat situaties waar je echt een Subject nodig hebt.

- oneindige observables
    - Observable.fromEvent( ... )
    - Subscriben en console loggen

- eindige observables
    - Observable middels een range (0-3), 1 emit, etc.
        - `Observable.range(3);` aanmaken
        - Subscriben op de Observable, waarin je `console.log` doet.

- Events afhandelen met RxJS

- 

- Toon een klok middels een observable
    - Evt: afkaderen: gebruikt geen methode x? (doe het the right way)
    - Observable.interval
        - Date()
        - timestamp ophogen

### Een van de laatste excercises
- Een RxJS implementatie op de `correcte` manier, middels `npm`, `es6`, `imports` etc. Misschien als huiswerk meegeven voor de ijverige student.
- Hoe gebruikt een serieuze developer in een team het nou echt op dagelijkse basis.

Getting started pakken van rxjs en gebruiken voor onze intro

# R&D onderwerpjes
- RxJS een `polling http event` omzetten in een `stream` middels Rx?
