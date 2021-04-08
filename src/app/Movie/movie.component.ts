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

  constructor(public api: ApiService, public dialog: MatDialog, private http: HttpClient,
              public router: Router) {
  }

  ngOnInit(): void {
    const res = this.api.getMovie().subscribe(data => {
      this.response = data;
      console.log(this.response);
      localStorage.setItem('response', JSON.stringify(this.response));

      let result = null;
      for (let i = 0; i < this.response.results.length; i++) {
        result = this.response.results[i];
        result['partialDescription'] = result.description.split('\.')[0] + '.';
        this.response.results[i] = result;
      }
      this.getMovieResponse = Object.values(this.response.results);

    });
  }

  getMovies(): any {
    this.http.get(this.response.next, {'headers': {'authorization': 'Token' + localStorage.getItem('accessToken')}}).subscribe(data => {
      this.responsePag2 = data;
      console.log(this.responsePag2);
      this.getMovieResponsePage2 = Object.values(this.responsePag2.results);
    });
    this.showMore = false;
    for (let i = 0; i < this.getMovieResponsePage2.length; ++i) {
      this.list = this.getMovieResponsePage2[i];
      this.getMovieResponse.push({
        title: this.list.title,
        uuid: this.list.uuid,
        description: this.list.description,
        partialDescription: this.list.partialDescription,
        genres: this.list.genres

      });
    }
  }

  Refresh(): any {
    window.location.reload();
  }

  onScroll(e: any): any {
    console.log(e);
  }

  showModal(movie: any, res: any): any {
    this.MovieById = res;
    const dialogRef = this.dialog.open(movie, {
      width: '400px',
      height: '550px'
    });
  }

}
