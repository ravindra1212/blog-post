import { Routes, RouterModule } from '@angular/router';
import { CommentsComponent } from './comments/comments.component';
import { PostsComponent } from './posts.component';

const routes: Routes = [
    {   
        path : '',
        component : PostsComponent,
    },
    {
        path: ':postId/comments',
        component: CommentsComponent
    }
];

export const PostsRoutesModule = RouterModule.forChild(routes);
