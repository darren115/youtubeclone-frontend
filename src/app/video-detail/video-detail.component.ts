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
  uploadDate!: number;
  uploadDiff!: string;

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
      this.uploadDate = data.uploadDate;
      this.parseDifference()
    });
  }

  parseDifference() {
    var hours = Math.abs(this.uploadDate / 60);
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

    console.log(hours, days, months, years);
    if (years > 0) {
      this.uploadDiff = Math.floor(years) + ' years ago';
    } else if (months > 0) {
      this.uploadDiff = Math.floor(months) + ' months ago';
    } else if (hours > 0) {
      this.uploadDiff = Math.floor(hours) + ' hours ago';
    } else {
      this.uploadDiff = Math.floor(this.uploadDate) + ' minutes ago';
    }
  }

  // findDifference(){
  //   const date = new Date(this.uploadDate);
  //     const curr = new Date();

  //     var diff = curr.getTime() - date.getTime();
  //     var msec = diff;
  //     var hh = Math.floor(msec / 1000 / 60 / 60);
  //     msec -= hh * 1000 * 60 * 60;
  //     var mm = Math.floor(msec / 1000 / 60);
  //     console.log(hh + ':' + mm);

  //   if(hh < 60){
  //     this.uploadDiff = mm + ' minutes ago';
  //   }
  //   else if( hh >= 1 ){
  //     this.uploadDiff = hh + ' hours ago';
  //   }
  // }

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
