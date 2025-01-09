import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PublishedPostsComponent} from './published-posts/published-posts.component';
import {AuthGuard} from './auth.guard';
import {CreatePostComponent} from './create-post/create-post.component';
import {AllPostsComponent} from './all-posts/all-posts.component';
import {EditPostComponent} from './edit-post/edit-post.component';
import {ReviewComponent} from './review/review.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {AddCommentComponent} from './add-comment/add-comment.component';
import {EditCommentComponent} from './edit-comment/edit-comment.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'publishedPosts', component: PublishedPostsComponent, canActivate: [AuthGuard]},
  { path: 'createPost', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'allPosts', component: AllPostsComponent, canActivate: [AuthGuard] },
  { path: 'editPost/:id', component: EditPostComponent, canActivate: [AuthGuard] },
  { path: 'review/:id', component: ReviewComponent, canActivate: [AuthGuard] },
  { path: 'post-detail/:id', component: PostDetailComponent, canActivate: [AuthGuard] },
  { path: 'comment/:id', component: AddCommentComponent, canActivate: [AuthGuard] },
  { path: 'edit-comment/:id', component: EditCommentComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
