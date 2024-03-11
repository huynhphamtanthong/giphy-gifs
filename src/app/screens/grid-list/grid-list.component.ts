import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { NgxMasonryModule } from 'ngx-masonry';
import { Observable, Subject } from 'rxjs';
import { Gif } from 'src/app/assets/models/gif-model';
import { CommonUtils } from 'src/app/utils/common-utils';
import { GifsRating } from 'src/app/utils/gifs-rating';

// export const expandAnimation = trigger('expand', [
//   state(
//     'collapsed',
//     style({
//       height: '0',
//       opacity: '0',
//       overflow: 'hidden',
//     })
//   ),
//   state(
//     'expanded',
//     style({
//       height: '*',
//       opacity: '1',
//     })
//   ),
//   transition('collapsed <=> expanded', [animate('0.3s ease')]),
// ]);

@Component({
  selector: 'app-grid-list',
  standalone: true,
  imports: [
    NgxMasonryModule,
    MatGridListModule,
    MatExpansionModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
  ],
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
    this.gridItems = CommonUtils.splitListIntoMatrix2d(this.items);
  }

  ngOnDestroy() {}

  toggleExpansion(item: Gif): void {
    item.expanded = !item.expanded;
  }

  getStarRating(item: Gif): number {
    return GifsRating.alignTextToNumberRating(item.rating);
  }
}
