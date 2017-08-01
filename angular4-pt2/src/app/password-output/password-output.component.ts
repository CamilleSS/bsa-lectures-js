import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-password-output',
  templateUrl: './password-output.component.html',
  styleUrls: ['./password-output.component.css']
})
export class PasswordOutputComponent implements OnInit, OnDestroy {

  route$: Subscription;
  email = '';
  password = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route$ = this.route.params.subscribe((params) => {
      const passedData = params.id.split('|||');
      this.email = passedData[0];
      this.password = passedData[1];
    });
  }

  ngOnDestroy() {
    if (this.route$) {
      this.route$.unsubscribe();
    }
  }
}
