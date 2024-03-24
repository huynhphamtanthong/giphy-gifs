import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Gif } from 'src/app/assets/models/gif-model';
import { GifsRating } from 'src/app/utils/gifs-rating';

@Component({
  selector: 'app-gif',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: `./gif.component.html`,
  styleUrl: `./gif.component.sass`,
})
export class GifComponent {
  @Input() item: Gif = { id: '', title: '', username: '', rating: '', url: '' };
  @Input() maxRating: number = -1;
  isExpanded: boolean = false;
  isLoading: boolean = true;
  ngOnInit() {
    this.isLoading = true;
  }

  toggleExpansion(): void {
    this.isExpanded = !this.isExpanded;
  }

  onLoadDone() {
    this.isLoading = false;
    console.log('Here');
  }

  getStarRating(item: Gif): number {
    return GifsRating.alignTextToNumberRating(item.rating);
  }
}
