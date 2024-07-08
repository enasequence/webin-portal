import {Component, OnInit} from '@angular/core';
import {AaiService} from '../aai/aai.service';

@Component({
  selector: 'app-aai-callback',
  templateUrl: './aai-callback.component.html',
  styleUrls: ['./aai-callback.component.css']
})
export class AaiCallbackComponent implements OnInit {

  constructor(private aaiService: AaiService) {
  }

  ngOnInit() {
    this.aaiService.completeAuthentication();
  }
}
