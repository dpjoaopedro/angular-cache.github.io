import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  users$ = this.userService.users$;
  show = false;

  timeLeft = 0;
  interval: any

  constructor(private userService: UserService) {}

  showToggle() {
    this.show = !this.show;
    if (this.timeLeft === 0 && this.show) {
      this.startTimer();
    }
  }

  startTimer() {
    this.timeLeft = 10;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }

      if (this.timeLeft === 0) {
        this.resetTimer();
      }
    }, 1000);
  }

  cleanUsersCache() {
    this.userService.cleanCache();
    this.resetTimer();
  }

  resetTimer() {
    this.show = false;
    this.timeLeft = 0;
    clearInterval(this.interval);
  }
}
