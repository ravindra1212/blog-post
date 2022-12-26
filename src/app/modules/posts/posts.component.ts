import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

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

    constructor(
        private httpService : HttpService,
        private formBuilder : FormBuilder,
        private authService : AuthService
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
            id      : [''],
            title   : ['', [Validators.required, Validators.minLength(2)]],
            body    : ['', [Validators.required, Validators.minLength(5)]],
            userId  : [this.authService.getUserId()],
        });
    } 

    /**
     * Get the posts
     * @retun void 
     */
    private getPosts() {

        this.httpService.get('http://localhost:3000/api/posts', (responseData:any) => {
            this.posts = responseData.posts;
            console.log(this.posts, responseData);
        });

    }

    /**
     * Open Add New Post Dialog
     * @return void
     */
    openAddPostDialog() {
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
        console.log({
            post: post
        });

    }

    /**
     * Add new Post
     * @return void
     */
    submit() {

    }
    
    /**
     * Update Post
     * @return void
     */
    update() {

    }
    
    /**
     * Close Dialog
     * @return void
     */
    closeDialog() {

        this.display = false;

    }

}
