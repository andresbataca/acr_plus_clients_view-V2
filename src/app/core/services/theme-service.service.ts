import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  #darkMode = signal(false);

  get getIsDarkMode() {
    return this.#darkMode();
  }

  set setIsDarkMode(value: boolean) {
    this.#darkMode.set(value);
  }

  constructor() {}

  public toggleTheme() {
    this.#darkMode.update(prevValue => !prevValue);
    document.body.classList.toggle('dark-theme',this.#darkMode() );
    this.saveTheme();
  }

  private saveTheme() {
    localStorage.setItem('theme', JSON.stringify(this.#darkMode()) );
  }

  public themeInLocalStorage(){
    const storedTheme = localStorage.getItem('theme');
    const themeStatus = storedTheme ? JSON.parse(storedTheme) : false;
    return themeStatus;
  }

  public themeLoadInAppComponent() {
    const status = this.themeInLocalStorage()
    document.body.classList.toggle('dark-theme', status);
    this.setIsDarkMode = status;
  }
}


// private _isDarkMode = false;

// get getIsDarkMode() {
//   return this._isDarkMode;
// }

// set setIsDarkMode(value: boolean) {
//   this._isDarkMode = value;
// }

// constructor() {}

// public toggleTheme() {
//   this._isDarkMode = !this._isDarkMode;
//   document.body.classList.toggle('dark-theme', this._isDarkMode);
//   this.saveTheme();
//   console.log(this._isDarkMode);
// }

// private saveTheme() {
//   localStorage.setItem('theme', JSON.stringify(this._isDarkMode));
// }

// public themeInLocalStorage(){
//   const storedTheme = localStorage.getItem('theme');
//   const themeStatus = storedTheme ? JSON.parse(storedTheme) : false;
//   return themeStatus;
// }

// public themeLoadInAppComponent() {
//   const status = this.themeInLocalStorage()
//   document.body.classList.toggle('dark-theme', status);
//   this.setIsDarkMode = status;
// }
