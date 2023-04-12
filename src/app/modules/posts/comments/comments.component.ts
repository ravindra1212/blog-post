import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/components/base/base.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent extends BaseComponent implements OnInit {

    postId = 1;
    comments = [];
    postDetails:any;
    
    constructor() {
        super();
    }

    ngOnInit() {
        
        // this.router.params.subscribe( (param) => {
        //     this.postId = param['postId']
        // });

        this.getPostDetails(); // get the post details
        this.getComments(); // Call function on component init
    }

    /**
     * Get All Comments of Post
     * @return void
     */
    private getComments() {

        this.baseHttpService.get(`https://jsonplaceholder.typicode.com/posts/${this.postId}/comments`, (response:any) => {
            this.comments = response;
        });

    } 
    
    /**
     * Get the post details from post id
     * @return void
     */
    private getPostDetails() {

        this.baseHttpService.get(`https://jsonplaceholder.typicode.com/posts/${this.postId}`, (response: any) => {
            this.postDetails = response;
        });
    }

}
