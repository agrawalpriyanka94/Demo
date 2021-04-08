import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {MovieComponent} from './Movie/movie.component';


const routes: Routes = [{
  path: '',
  component: LoginPageComponent
},
  {
    path: 'Movie',
    component: MovieComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
