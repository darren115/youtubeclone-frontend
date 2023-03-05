import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'],
})
export class CallbackComponent {
  constructor(private userService: UserService, private router: Router) {
    //this.userService.registerUser();
    this.router.navigateByUrl('');
  }
}
