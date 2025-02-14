export interface IReview {
  userName: string;
  productId: string;
  description: string;
  star: number;
  isDeleted?: boolean;
}
