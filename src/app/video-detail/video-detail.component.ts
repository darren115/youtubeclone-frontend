import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
})
export class VideoDetailComponent {
  videoId!: string;
  videoTitle!: string;
  videoDescription!: string;
  tags: Array<string> = [];
  videoUrl!: string;
  videoAvailable: boolean = false;
  likeCount: number = 0;
  dislikeCount: number = 0;
  viewCount: number = 0;

  showUnSubscribeButton: boolean = false;
  showSubscribeButton: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private userService: UserService
  ) {
    this.videoId = activatedRoute.snapshot.params['videoId'];

    this.videoService.getVideo(this.videoId).subscribe((data) => {
      this.videoUrl = data.videoUrl;
      this.videoTitle = data.title;
      this.videoDescription = data.description;
      this.tags = data.tags;
      this.videoAvailable = true;
      this.likeCount = data.likeCount;
      this.dislikeCount = data.dislikeCount;
      this.viewCount = data.viewCount;
    });
  }

  likeVideo() {
    this.videoService.likeVideo(this.videoId).subscribe((data) => {
      this.likeCount = data.likeCount;
      this.dislikeCount = data.dislikeCount;
    });
  }

  dislikeVideo() {
    this.videoService.dislikeVideo(this.videoId).subscribe((data) => {
      this.dislikeCount = data.dislikeCount;
      this.likeCount = data.likeCount;
    });
  }

  subscribeToUser() {
    let userId = this.userService.getUserId();

    this.userService.subscribeToUser(userId).subscribe((data) => {
      this.showSubscribeButton = false;
      this.showUnSubscribeButton = true;
    });
  }

  unSubscribeToUser() {
    let userId = this.userService.getUserId();

    this.userService.unsubscribeToUser(userId).subscribe((data) => {
      this.showSubscribeButton = true;
      this.showUnSubscribeButton = false;
    });
  }
}
