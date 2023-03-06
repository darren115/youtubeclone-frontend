export interface videoDto {
  id: string;
  userId: string;
  title: string;
  tags: Array<string>;
  description: string;
  videoUrl: string;
  videoStatus: string;
  thumbnailUrl: string;
  likeCount: number;
  dislikeCount: number;
  viewCount: number;
  uploadDate: number;
}
