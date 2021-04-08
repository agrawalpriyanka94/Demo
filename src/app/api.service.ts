import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Login} from './login';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url: any = 'https://demo.credy.in/api/v1/usermodule/login/';
  public movieUrl: any = 'https://demo.credy.in/api/v1/maya/movies/';
  public accessToken = null;

  constructor(
    private http: HttpClient) {
  }

  loginPage(opost: Login): Observable<any> {
    const loginResponse = this.http.post(this.url, opost);
    return loginResponse;
  }

  getMovie(): Observable<any> {
    const res = this.http.get(this.movieUrl, {'headers': {'authorization': 'Token ' + localStorage.getItem('accessToken')}});
    return res;
  }

  getNextMoviePage(list:any): Observable<any> {
    // const data=localStorage.getItem('next') as string;
    const res = this.http.get(list, {'headers': {'authorization': 'Token ' + localStorage.getItem('accessToken')}});
    return res;
  }
 
}




