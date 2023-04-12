import { HttpClient } from '@angular/common/http';
import { HttpService } from '@core/services/http.service';
import { Injectable } from '@angular/core';
import { Post } from './posts.interface';

@Injectable()
export class PostsService {

    constructor(
        private httpService : HttpService,
        private http : HttpClient
    ) { }

    fetchPosts() {
        return this.http.get<Post[]>('http://localhost:3000/api/posts');
    }

    deletePost(id: string) {
        return this.http.delete(`http://localhost:3000/api/posts/${id}/delete`);
    }

    addPost(payload: Post) {
        return this.http.post<Post>('http://localhost:3000/api/posts/add', payload);
    }

    updatePost(payload: Post, id: string) {
        return this.http.put<Post>(`http://localhost:3000/api/posts/${id}/update`, payload);
    }

    
}
