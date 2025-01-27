export interface IReview {
  userId: string;
  productId: string;
  description: string;
  star: number;
  isDeleted?: boolean;
}
