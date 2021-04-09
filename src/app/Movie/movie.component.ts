import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  response: any;
  getMovieResponse: any[] = [];
  showMore: boolean = true;
  list: any;
  MovieById: any;
  getMovieResponsePage2: any[] = [];
  responsePag2: any;

  nextpage: any

  constructor(public api: ApiService, public dialog: MatDialog, private http: HttpClient,
              public router: Router) {
  }

  ngOnInit(): void {
    const res = this.api.getMovie().subscribe(data => {
      this.response = data;
      this.nextpage = this.response.next;
      let result = null;
      for (let i = 0; i < this.response.results.length; i++) {
        result = this.response.results[i];
        result['logo'] = result.title.replaceAll(' ', "%20");
        result['partialDescription'] = result.description.split('\.')[0] + '.';
        this.response.results[i] = result;
      }
      this.getMovieResponse = Object.values(this.response.results);

    });
  }

  getMovies(movieList: any): any {

    this.api.getNextMoviePage(movieList).subscribe(data => {
      this.responsePag2 = data;
      this.nextpage = this.responsePag2.next;
      this.getMovieResponsePage2 = Object.values(this.responsePag2.results);
    })

    if (this.response.is_success) {
      this.router.navigateByUrl('/');
    }
    this.showMore = false;
    for (let i = 0; i < this.getMovieResponsePage2.length; ++i) {
      this.list = this.getMovieResponsePage2[i];
      this.getMovieResponse.push({
        title: this.list.title,
        logo: this.list.title.replaceAll(' ', "%20"),
        uuid: this.list.uuid,
        description: this.list.description,
        partialDescription: this.list.partialDescription,
        genres: this.list.genres

      });

    }
    this.showMore = true;
  }

  onScroll(e: any): any {
    console.log(e);
  }

  refresh() {
    window.location.reload();
  }

  showModal(movie: any, res: any): any {
    this.MovieById = res;
    const dialogRef = this.dialog.open(movie, {
      width: '400px',
      height: '550px'
    });
  }

}
