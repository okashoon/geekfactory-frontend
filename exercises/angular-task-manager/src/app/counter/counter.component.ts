import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  @Input()
  counter: number ;

  constructor() { }

  ngOnInit() {
    this.counter = this.counter | 0;
  }



  increment(): void {
    this.counter++
  }

  reset(): void {
    this.counter = 0;
  }

}
