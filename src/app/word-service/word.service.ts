import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { wordApiUrl } from '../constants/constants';

@Injectable()
export class WordService {
  constructor(
    private http: HttpClient
  ) {}

  getSynonymWords(word): any {
    const url =  `${wordApiUrl}/words?rel_syn=${word}`;

    return this.http.get(url);
  }
}
