import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';
import { AddPost, GetPosts, UpdatePost, SetSelectedPost, DeletePost } from './posts.action';
import { Post } from "./posts.interface";
import { PostsService } from "./posts.service";

export class PostStateModel {
    posts: Post[] = [];
    selectedPost: Post | undefined;
}

@State<PostStateModel>({
    name: 'posts',
    defaults: {
        posts: [],
        selectedPost: undefined
    }
})
@Injectable()
export class PostState {

    constructor(private postService: PostsService) {}

    @Selector()
    static get(state: PostStateModel) {
        return state.posts;
    }

    @Selector()
    static getSelectedPost(state: PostStateModel) {
        return state.selectedPost;
    }

    @Action(GetPosts)
    getPosts({ getState, setState }: StateContext<PostStateModel>) {
        return this.postService.fetchPosts().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                posts: result,
            });
        }));
    }

    @Action(AddPost)
    addPost({ getState, patchState }: StateContext<PostStateModel>, { payload }: AddPost) {
        return this.postService.addPost(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                posts: [...state.posts, result]
            });
        }));
    }

    @Action(UpdatePost)
    updatePost({ getState, setState }: StateContext<PostStateModel>, { payload, id }: UpdatePost) {
        return this.postService.updatePost(payload, id).pipe(tap((result) => {
            const state = getState();
            const postList = [...state.posts];
            const postIndex = postList.findIndex(item => item._id === id);
            postList[postIndex] = result;
            setState({
                ...state,
                posts: postList,
            });
        }));
    }


    @Action(DeletePost)
    deletePost({ getState, setState }: StateContext<PostStateModel>, { id }: DeletePost) {
        return this.postService.deletePost(id).pipe(tap(() => {
            const state = getState();
            const filteredArray = state.posts.filter(item => item._id !== id);
            setState({
                ...state,
                posts: filteredArray,
            });
        }));
    }

    @Action(SetSelectedPost)
    setSelectedPostId({ getState, setState }: StateContext<PostStateModel>, { payload }: SetSelectedPost) {
        const state = getState();
        setState({
            ...state,
            selectedPost: payload
        });
    }
}