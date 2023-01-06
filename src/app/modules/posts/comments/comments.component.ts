import { HttpService } from 'src/app/core/services/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

    postId = 1;
    comments = [];
    postDetails:any;
    
    constructor(
        private httpService : HttpService,
        private router : ActivatedRoute
    ) {

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

        this.httpService.get(`https://jsonplaceholder.typicode.com/posts/${this.postId}/comments`, (response:any) => {
            this.comments = response;
        });

    } 
    
    /**
     * Get the post details from post id
     * @return void
     */
    private getPostDetails() {

        this.httpService.get(`https://jsonplaceholder.typicode.com/posts/${this.postId}`, (response: any) => {
            this.postDetails = response;
        });
    }

}
