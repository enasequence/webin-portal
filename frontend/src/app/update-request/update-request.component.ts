import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.css']
})
export class UpdateRequestComponent implements OnInit {

  id: string;
  status: string;
  authority: string;
  affects: string;
  reason: string;
  currentValue: string;
  newValue: string;

  constructor() { }

  ngOnInit() {
  }
}
