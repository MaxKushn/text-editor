import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  constructor() {}

  setItem(name, data): any {
    return localStorage.setItem(name, data);
  }

  getItem(name): any {
    return localStorage.getItem(name);
  }
}
