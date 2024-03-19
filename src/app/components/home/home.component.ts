import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { GridListComponent } from 'src/app/components/grid-list/grid-list.component';
import { Gif } from 'src/app/assets/models/gif-model';
import { Subject, debounceTime } from 'rxjs';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    GridListComponent,
    HeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  trendingGifs: Gif[] = []; // Default gits (Trending)
  searchResults: Gif[] = []; // Gifs search results
  searchQuery = ''; // Search text
  searchLimit = 20;

  selectedGif: Gif | null = null; // Variable on/off gif description

  page = 0; // Track page number for pagination
  isLoading = false; // Flag to prevent multiple requests

  constructor(private http: HttpClient) {}
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 750;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.onScroll(event);
  }

  ngOnInit() {
    this.fetchTrendingGifs();

    // Add debounce time for search
    this.searchSubject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue) => {
        this.performSearch(searchValue);
      });
  }

  // Api fetch gifs from Giphy Gifs https://giphy.com/
  fetchTrendingGifs() {
    this.isLoading = true;
    this.http
      .get<any>(
        `https://api.giphy.com/v1/gifs/trending?api_key=${
          environment.giphyApiKey
        }&limit=${this.searchLimit}&offset=${this.searchLimit * this.page}`
      )
      .subscribe((response) => {
        const newGifs = response.data.map((gif: any) => ({
          id: gif.id,
          title: gif.title,
          username: gif.username,
          rating: gif.rating,
          url: gif.images.original.url,
          isLoadDone: false,
        }));
        this.trendingGifs = this.trendingGifs.concat(newGifs);
        this.isLoading = false;
      });
  }

  // Search
  performSearch(searchValue: string) {
    this.isLoading = true;

    if (searchValue) {
      this.http
        .get<any>(
          `https://api.giphy.com/v1/gifs/search?api_key=${
            environment.giphyApiKey
          }&q=${searchValue}&limit=${this.searchLimit}&offset=${
            this.searchLimit * this.page
          }`
        )
        .subscribe((response) => {
          const newGifs = response.data.map((gif: any) => ({
            id: gif.id,
            title: gif.title,
            username: gif.username,
            rating: gif.rating,
            url: gif.images.original.url,
            isLoadDone: false,
          }));
          this.searchResults = this.searchResults.concat(newGifs);
          this.isLoading = false;
        });
    } else {
      this.searchResults = [];
    }
  }

  onSearch() {
    this.page = 0; // Reset page
    this.searchSubject.next(this.searchQuery); // Search query
  }

  selectGif(gif: Gif) {
    this.selectedGif = gif;
  }

  closeExpandedGif() {
    this.selectedGif = null;
  }

  onScroll(event: any) {
    const pageHeight = window.innerHeight;
    const scrollPosition = pageHeight + window.scrollY;
    const currentScrollYHeight = scrollPosition - (this.page + 1) * pageHeight;
    const bottomThreshold = 0.95 * pageHeight + this.page * pageHeight;
    if (currentScrollYHeight >= bottomThreshold && !this.isLoading) {
      this.page++;
      if (this.searchQuery) this.performSearch(this.searchQuery);
      else this.fetchTrendingGifs();
    }
  }
}
