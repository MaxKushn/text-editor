import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../storage-service/storage.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  @Input() synonyms: any[];

  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
  }

  execCommand(commandId, changedWord?) {
    changedWord ? document.execCommand(commandId, false, changedWord) : document.execCommand(commandId);
    const transformedText = document.getElementById('mockedText');
    this.storageService.setItem('mockedText', transformedText.outerHTML);
  }
}
