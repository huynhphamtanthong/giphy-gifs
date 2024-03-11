import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { GridListComponent } from 'src/app/screens/grid-list/grid-list.component';
import { Gif } from 'src/app/assets/models/gif-model';
import { Subject, debounceTime } from 'rxjs';
import { CommonUtils } from 'src/app/utils/common-utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, GridListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  trendingGifs: Gif[] = [];
  searchQuery = '';
  searchResults: Gif[] = [];
  selectedGif: Gif | null = null;

  constructor(private http: HttpClient) {}
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 750;
  ngOnInit() {
    this.fetchTrendingGifs();
    this.searchSubject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue) => {
        this.performSearch(searchValue);
      });
  }

  fetchTrendingGifs() {
    this.http
      .get<any>(
        `https://api.giphy.com/v1/gifs/trending?api_key=${environment.giphyApiKey}&limit=10`
      )
      .subscribe((response) => {
        this.trendingGifs = response.data.map((gif: any) => ({
          id: gif.id,
          title: gif.title,
          username: gif.username,
          rating: gif.rating,
          url: gif.images.original.url,
        }));
      });
  }

  onSearch() {
    this.searchSubject.next(this.searchQuery);
  }

  selectGif(gif: Gif) {
    this.selectedGif = gif;
  }

  closeExpandedGif() {
    this.selectedGif = null;
  }

  onResize(event: Event) {
    // Handle resizing logic here if needed
  }
  performSearch(searchValue: string) {
    if (this.searchQuery) {
      this.http
        .get<any>(
          `https://api.giphy.com/v1/gifs/search?api_key=${environment.giphyApiKey}&q=${this.searchQuery}&limit=10`
        )
        .subscribe((response) => {
          this.searchResults = response.data.map((gif: any) => ({
            id: gif.id,
            title: gif.title,
            username: gif.username,
            rating: gif.rating,
            url: gif.images.original.url,
          }));
        });
    } else {
      this.searchResults = [];
    }
  }
}
