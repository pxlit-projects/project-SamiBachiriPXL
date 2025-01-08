import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PublishedPostsComponent} from './published-posts/published-posts.component';
import {AuthGuard} from './auth.guard';
import {CreatePostComponent} from './create-post/create-post.component';
import {AllPostsComponent} from './all-posts/all-posts.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'publishedPosts', component: PublishedPostsComponent, canActivate: [AuthGuard]},
  { path: 'createPost', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'allPosts', component: AllPostsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
