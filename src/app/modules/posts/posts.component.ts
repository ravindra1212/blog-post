import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Post } from './posts.interface';
import { PostState } from './posts.state';
import { BaseComponent } from '@core/components/base/base.component';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent extends BaseComponent implements OnInit {

    posts: Array<any>[] = [];
    cols: any[] = [];
    postForm:any;
    display:boolean = false;
    formTitle:any;
    formBtnLabel:string = '';
    inProgressForm : boolean = false;
    postId = '';
    uploadedFiles: any[] = [];
    showUploadButton : boolean = false;
    showCancelButton: boolean = false;
    multiple: boolean = true;
    // @Select(PostState.getPostList) posts!: Observable<Post[]>;

    constructor(
        private formBuilder : FormBuilder,
        private store: Store
    ) {
        super();
        this.createForm(); // Init Form Object
    }

    ngOnInit(): void {

        console.log({
            superFunction : this
        });

        this.cols = [
            { field: 'title', header: 'Title' },
            { field: 'body', header: 'Description' },
            { field: 'action', header: 'Action' }
        ];

        this.getPosts(); // Load 

        // this.store.dispatch(new GetPosts());

        console.log(this.posts);
    }

    /**
     * Create Form
     * @return void
     */
    private createForm() {

        this.postForm = this.formBuilder.group({
            _id     : [''],
            title   : ['', [Validators.required, Validators.minLength(2)]],
            body    : ['', [Validators.required, Validators.minLength(5)]],
            postMedia : new FormArray([]),
            userId  : [this.baseAuthService.getUserId()],
        });
    } 

    /**
     * Get the posts
     * @retun void 
     */
    private getPosts() {

        this.baseHttpService.get('http://localhost:3000/api/posts', (responseData:any) => {
            this.posts = responseData.data;
        });

    }

    /**
     * Open Add New Post Dialog
     * @return void
     */
    openAddNewPostDialog() {
        
        this.display = true;
        this.formTitle = `Add New Post`;
        this.formBtnLabel   = 'Submit';
    }

    /**
     * Open edit post dialog
     * @param post - Object
     * @return void
     */
    openEditPostDialog(post:any): void {

        this.display = true;
        this.formTitle = `Edit Post : ${post.title}`;
        this.formBtnLabel = 'Update';
        this.postForm.patchValue(post);

        // this.store.dispatch(new SetSelectedPost(post));

    }

    /**
     * Add Or Update Post
     * @postId string | null
     * @return void
     */
    saveOrUpdate(postId:string) {
        
        let url:string;

        if (postId) { // has post unique id 
            url = `http://localhost:3000/api/posts/${postId}/update`;
        } else {
            url = `http://localhost:3000/api/posts/add`;
        }
        
        this.baseHttpService.postForm(url, this.postForm.value, (response:any) => {

            this.closeDialog(); // Close Dialog after sucess

            this.baseNotifyService.success(response.message);

            this.getPosts(); // Load 
        });

        // if (postId) {
        //     this.store.dispatch(new UpdatePost(this.postForm.value, this.postForm.value._id)).subscribe(() => {
        //         this.clearForm();
        //     });
        // } else {
        //     this.store.dispatch(new AddPost(this.postForm.value)).subscribe(() => {
        //         this.clearForm();
        //     });
        // }

    }

    /**
     * Reset Form
     * @return void
     */
    clearForm() {
        this.postForm.reset();
        // this.store.dispatch(new SetSelectedPost(undefined));
    }
    
    /**
     * Close Dialog
     * @return void
     */
    closeDialog() {
        this.display = false;
        this.postForm.reset();
    }

    /**
     * Request to server for Delete a Post
     * @param event object
     * @param postId string
     * @return void
     */
    deletePost(event:object, postId:string) {

        this.baseConfirmPopupService.confirm(event, {
            message : 'Are you sure you want to delete this post.',
        }, 
        (accepResponse:any) => {

            this.baseHttpService.delete(`http://localhost:3000/api/posts/${postId}/delete`, {}, (response: any) => {
                this.baseNotifyService.success(response.message);
                this.getPosts(); // Load 
            });

            // this.store.dispatch(new DeletePost(postId));

        }, (rejectResponse: any) => {});

    }

    /**
     * View Comments
     * @param postId - number
     * @return void
     */
    viewComments(postId:any) {
        this.baseRouter.navigate([`./posts/${postId}/comments`]);
    }

    /**
     * On Select File
     * @param event - select file object
     * @return void
     */
    onSelectFile(event:any) {

        let files = [];

        for (let file of event.files) {
            files.push(file);
        }
        
        if (files.length > 0) { 
            this.postForm.get('postMedia').patchValue(files);
        }

    }

    /**
     * Get callback of remove uploaded file
     * @param event - object
     * @return void
     */
    onRemoveSelectedFile(event: any) {

        let files = [];

        for (let file of this.postForm.value.postMedia) {

            if (file.name !== event.file.name) {
                files.push(file);
            }
        }

        this.postForm.get('postMedia').patchValue(files);

    }

}
