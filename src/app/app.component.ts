import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  template: ` <router-outlet /> `,
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'giphy-gifs';
}
