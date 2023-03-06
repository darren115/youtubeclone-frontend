import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentDto } from '../comment-dto';
import { CommentsService } from '../comments.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input()
  videoId: string = '';
  commentsForm!: FormGroup;
  commentsDto: CommentDto[] = [];

  constructor(
    private userService: UserService,
    private commentsService: CommentsService,
    private matSnackBar: MatSnackBar
  ) {
    this.commentsForm = new FormGroup({
      comment: new FormControl('comment'),
    });
  }

  ngOnInit(): void {
    this.commentsForm.get('comment')?.reset();
    this.getComments();
  }

  postComment() {
    const comment = this.commentsForm.get('comment')?.value;

    const commentDto = {
      commentText: comment,
      authorId: this.userService.getUserId(),
      likes: 0,
      dislikes: 0,
      uploadDifference: 0,
    };

    this.commentsService
      .postComment(commentDto, this.videoId)
      .subscribe((data) => {
        this.matSnackBar.open('Comment Posted Successfully', 'OK');
        this.commentsForm.get('comment')?.reset();
        this.getComments();
      });
  }

  getComments() {
    this.commentsService.getAllComments(this.videoId).subscribe((data) => {
      this.commentsDto = data;
    });
  }

  parseDifference(difference: number): string {
    var uploadDiff;

    var hours = Math.abs(+difference / 60);
    var days = 0;
    var months = 0;
    var years = 0;
    if (hours >= 24) {
      days = hours / 24;
    }
    if (days >= 30) {
      months = days / 30;
    }

    if (months >= 12) {
      years = months / 12;
    }

    if (years > 0) {
      uploadDiff = Math.floor(years) + ' years ago';
    } else if (months >= 1) {
      uploadDiff = Math.floor(months) + ' months ago';
    } else if (hours >= 1) {
      uploadDiff = Math.floor(hours) + ' hours ago';
    } else {
      uploadDiff = Math.floor(Math.abs(+difference)) + ' minutes ago';
    }

    return uploadDiff;
  }
}
