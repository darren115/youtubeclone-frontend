import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
})
export class VideoDetailComponent {
  private videoId!: string;
  videoTitle!: string;
  videoDescription!: string;
  tags: Array<string> = [];
  videoUrl!: string;
  videoAvailable: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService
  ) {
    this.videoId = activatedRoute.snapshot.params['videoId'];

    this.videoService.getVideo(this.videoId).subscribe((data) => {
      this.videoUrl = data.videoUrl;
      this.videoTitle = data.title;
      this.videoDescription = data.description;
      this.tags = data.tags;
      this.videoAvailable = true;
    });

    console.log(this.videoTitle);
  }
}
