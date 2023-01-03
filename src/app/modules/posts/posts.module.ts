import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormErrorsComponent } from 'src/app/core/components/form-errors/form-errors.component';
import { PostsRoutesModule } from './posts.routing';

@NgModule({
    declarations: [
        PostsComponent
    ],
    imports: [
        CommonModule,
        FormErrorsComponent,
        TableModule,
        ButtonModule,
        ReactiveFormsModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule,
        PostsRoutesModule
    ]
})
export class PostsModule { }
