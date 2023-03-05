import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDto } from './comment-dto';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private httpClient: HttpClient) {}

  postComment(commentDto: CommentDto, videoId: String): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:8080/api/videos/' + videoId + '/comment',
      commentDto
    );
  }

  getAllComments(videoId: string): Observable<Array<CommentDto>> {
    return this.httpClient.get<Array<CommentDto>>(
      'http://localhost:8080/api/videos/' + videoId + '/comment'
    );
  }
}
