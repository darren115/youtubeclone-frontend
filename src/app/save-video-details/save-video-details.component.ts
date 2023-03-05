import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { videoDto } from '../video-dto';

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css'],
})
export class SaveVideoDetailsComponent {
  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  selectedFile!: File;
  selectedFilename: string = '';

  videoId: string;
  fileSelected: boolean = false;
  videoUrl!: string;
  thumbnailUrl!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private matSnackBar: MatSnackBar
  ) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];

    this.videoService.getVideo(this.videoId).subscribe((data) => {
      this.videoUrl = data.videoUrl;
      this.thumbnailUrl = data.thumbnailUrl;
      console.log(this.videoUrl);
    });

    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus,
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const index = this.tags.indexOf(value);
    // Add our tag
    if (value && index < 0) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }

  onFileSelected(event: Event) {
    if (!event.target) return;

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;
    this.selectedFile = input.files[0];
    this.selectedFilename = this.selectedFile.name;
    this.fileSelected = true;
  }

  onUpload() {
    this.videoService
      .uploadThumbnail(this.selectedFile, this.videoId)
      .subscribe((data) => {
        console.log(data);
        this.matSnackBar.open('Thumbnail Upload Successful', 'OK');
      });
  }

  saveVideo() {
    const videoMetaData: videoDto = {
      id: this.videoId,
      title: this.saveVideoDetailsForm.get('title')?.value,
      description: this.saveVideoDetailsForm.get('description')?.value,
      tags: this.tags,
      videoStatus: this.saveVideoDetailsForm.get('videoStatus')?.value,
      videoUrl: this.videoUrl,
      thumbnailUrl: this.thumbnailUrl,
      viewCount: 0,
      likeCount: 0,
      dislikeCount: 0,
    };
    console.log(videoMetaData);
    this.videoService.saveVideo(videoMetaData).subscribe((data) => {
      this.matSnackBar.open('Video Metadata Updated Successfully', 'OK');
    });
  }
}
