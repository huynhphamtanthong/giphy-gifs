import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxMasonryModule } from 'ngx-masonry';
import { Gif } from 'src/app/assets/models/gif-model';
import { CommonUtils } from 'src/app/utils/common-utils';
import { GifsRating } from 'src/app/utils/gifs-rating';
import { GifComponent } from '../gif/gif.component';

@Component({
  selector: 'app-grid-list',
  standalone: true,
  imports: [CommonModule, GifComponent],
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.sass'],
})
export class GridListComponent implements OnInit {
  @Input() selectItem: Function = () => {};
  @Input() items: Gif[] = [];
  gridItems: Gif[][] = [];
  expandedItemId: string = '';
  maxRating: number = -1;
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.maxRating = GifsRating.getMaxRating();
  }

  ngOnChanges() {
    console.log(this.items);
    this.gridItems = CommonUtils.splitListIntoMatrix2d(this.items);
  }

  ngOnDestroy() {}
}
