import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, map, tap } from 'rxjs';
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
    parentScope:any;
    totalRecords:number = 1;
    postsPerPage:number = 1;
    currentPage: number = 0;
    isLoading:boolean = true;

    // @Select(PostState.getPostList) posts!: Observable<Post[]>;

    constructor(
        private formBuilder : FormBuilder,
        private store: Store
    ) {
        super();
        this.createForm(); // Init Form Object
    }

    ngOnInit(): void {

        this.cols = [
            { field: 'imagePath', header: 'Image' },
            { field: 'title', header: 'Title' },
            { field: 'body', header: 'Description' },
            { field: 'action', header: 'Action' }
        ];

        this.getPosts(this.postsPerPage, 1); // Load 

        // this.store.dispatch(new GetPosts());
    }

    /**
     * Create Form
     * @return void
     */
    private createForm(): void {

        this.postForm = this.formBuilder.group({
            _id     : [''],
            title   : ['', [Validators.required, Validators.minLength(2)]],
            body    : ['', [Validators.required, Validators.minLength(5)]],
            files   : [],
            creator : [this.baseAuthService.getUserId()],
        });
    } 

    /**
     * Getter of Post Media form Object
     * @return Object
     */
    private get getFilesControls() {
        return this.postForm.get('files') as FormArray;
    }

    /**
     * Get the posts
     * @retun void 
     */
    private getPosts(pagesize: number, page:number): void {
        
        this.baseHttpService.get(`http://localhost:3000/api/posts?page=${page}&pagesize=${pagesize}`, (responseData:any) => {
            this.posts = responseData.data;
            this.totalRecords = responseData.totalPosts;
            this.isLoading = false;
        });

    }

    /**
     * Open Add New Post Dialog
     * @return void
     */
    openAddNewPostDialog(): void {
        
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
    saveOrUpdate(postId: string): void {
        
        let url:string;

        if (postId) { // has post unique id 
            url = `http://localhost:3000/api/posts/${postId}/update`;
        } else {
            url = `http://localhost:3000/api/posts/add`;
        }

        console.log({
            postForm: this.postForm.value
        });

        this.baseHttpService.postForm(url, {
            payload      : this.postForm.value,
            formData     : false,
            showSuccessMsg : false
        }, (response:any) => {

            this.closeDialog(); // Close Dialog after sucess

            this.getPosts(this.postsPerPage, this.currentPage); // Load 
            
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
    clearForm(): void {
        this.postForm.reset();
        // this.store.dispatch(new SetSelectedPost(undefined));
    }
    
    /**
     * Close Dialog
     * @return void
     */
    closeDialog(): void {
        this.display = false;
        this.postForm.reset();
    }

    /**
     * Request to server for Delete a Post
     * @param event object
     * @param postId string
     * @return void
     */
    deletePost(event:object, postId:string) : void {

        this.baseConfirmPopupService.confirm(event, {
            message : 'Are you sure you want to delete this post.',
        }, 
        (accepResponse:any) => {

            this.baseHttpService.delete(`http://localhost:3000/api/posts/${postId}/delete`, {}, (response: any) => {
                this.baseNotifyService.success(response.message);
                this.getPosts(this.postsPerPage, this.currentPage); // Load 
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
        
        if (event.currentFiles.length > 0) { 

            this.postForm.get('files').patchValue(event.currentFiles[0]);
            this.getFilesControls.updateValueAndValidity();
        }

    }

    /**
     * Get callback of remove uploaded file
     * @param event - object
     * @return void
     */
    onRemoveSelectedFile(event: any) : void {

        let index = 0;

        for (let value of this.getFilesControls.value) {

            if (value.name == event.file.name) {
                this.getFilesControls.removeAt(index);
            }

            index++;
        }

    }

    /**
     * 
     * @param event 
     * @return void
     */
    onPageChange(event:any) {
        this.currentPage = event.page;
        this.postsPerPage = event.rows;
        this.getPosts(this.postsPerPage, event.currentPage);
    }

}
