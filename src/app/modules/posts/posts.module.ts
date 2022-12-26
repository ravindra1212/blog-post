import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
    declarations: [
        PostsComponent
    ],
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        ReactiveFormsModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule
    ]
})
export class PostsModule { }
