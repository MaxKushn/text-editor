import { Component, OnInit } from '@angular/core';
import { TextService } from '../text-service/text.service';
import { WordService } from '../word-service/word.service';
import { StorageService } from '../storage-service/storage.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  text: any = '';
  selectedWord = '';
  synonyms: any[];
  selection: Selection;
  range: Range;

  constructor(private textService: TextService,
              private wordService: WordService,
              private storageService: StorageService) {
  }

  ngOnInit() {
    // create similar div element without context.
    const changedText = document.createElement('div');
    changedText.className = 'file';
    changedText.id = 'mockedText';
    changedText.contentEditable = 'true';

    // get context from localStorage
    changedText.innerHTML = this.storageService.getItem('mockedText');

    // if document was changed in past - all data will takes from localStorage and will be replaced
    changedText.innerHTML !== '' ? document.getElementById('mockedText').outerHTML = changedText.innerHTML
      : this.textService.getMockText().then((result) => this.text = result);

    // get selected word into selectedWord variable
    document.ondblclick = () => {
      this.selection = window.getSelection();
      this.range = this.selection.getRangeAt(0);
      if (window.getSelection && this.selection.toString() !== ' ' && this.selection.toString() !== '') {
        this.selectedWord = this.selection.toString();
        this.wordService.getSynonymWords(this.selectedWord).subscribe(res => {
          this.synonyms = res;
        });
      }

      // prevent click on the control panel
      document.onclick = (event: any) => {
        if (event.target.id !== 'formatActions'
          && event.target.id !== 'synonyms'
          && event.target.id !== 'appControlPanel'
          && event.target.parentNode.localName !== 'button'
          && event.target.parentNode.localName !== 'app-control-panel'
          && event.target.localName !== 'button'
          && event.target.localName !== 'input'
          && event.target.className !== 'format-actions') {
          this.selectedWord = '';
        }
        if (event.target.className === 'format-actions'
          || event.target.localName === 'app-control-panel'
          || event.target.className === 'synonyms') {
          this.selection.removeAllRanges();
          this.selection.addRange(this.range);
        }
      };
    };

  }
}
