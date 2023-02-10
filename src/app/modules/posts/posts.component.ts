import { SpinnerService } from './../../core/services/spinner.service';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ConfirmPopupService } from './../../core/services/confirmPopup.service';
import { NotifyService } from '../../core/services/notify.service';
import { has } from 'lodash-es';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

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

    constructor(
        private httpService : HttpService,
        private formBuilder : FormBuilder,
        private authService : AuthService,
        private notifyService: NotifyService,
        private confirmPopupService: ConfirmPopupService,
        private router : Router,
        private spinnerService: SpinnerService
    ) {
        this.createForm(); // Init Form Object
    }

    ngOnInit(): void {

        this.cols = [
            { field: 'title', header: 'Title' },
            { field: 'body', header: 'Description' },
            { field: 'action', header: 'Action' }
        ];

        this.getPosts(); // Load 
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
            userId  : [this.authService.getUserId()],
        });
    } 

    /**
     * Get the posts
     * @retun void 
     */
    private getPosts() {

        this.httpService.get('http://localhost:3000/api/posts', (responseData:any) => {
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
        console.log({
            value: this.postForm.value
        });
        this.httpService.postForm(url, this.postForm.value, (response:any) => {

            console.log({
                response: response
            });

            this.closeDialog(); // Close Dialog after sucess

            this.notifyService.success(response.message);

            this.getPosts(); // Load 
        });

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

        this.confirmPopupService.confirm(event, {
            message : 'Are you sure you want to delete this post.',
        }, 
        (accepResponse:any) => {
            this.httpService.delete(`http://localhost:3000/api/posts/${postId}/delete`, {}, (response: any) => {
                this.notifyService.success(response.message);
                this.getPosts(); // Load 
            });
        }, (rejectResponse: any) => {});

    }

    /**
     * View Comments
     * @param postId - number
     * @return void
     */
    viewComments(postId:any) {
        this.router.navigate([`./posts/${postId}/comments`]);
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

        console.log({
            postForm: this.postForm.get('postMedia').value
        });

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
