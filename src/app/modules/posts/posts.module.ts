import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormErrorsComponent } from '@core/components/form-errors/form-errors.component';
import { PostsRoutesModule } from './posts.routing';
import { CommentsComponent } from './comments/comments.component';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { PostState } from './posts.state';
import { PostsService } from './posts.service';

@NgModule({
    declarations: [
        PostsComponent,
        CommentsComponent
    ],
    imports: [
        CommonModule,
        NgxsModule.forFeature([PostState]),
        FormErrorsComponent,
        TableModule,
        ButtonModule,
        ReactiveFormsModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule,
        PostsRoutesModule,
        TimelineModule,
        CardModule,
        FileUploadModule,
        HttpClientModule
    ],
    providers:[PostsService]
})
export class PostsModule { }
