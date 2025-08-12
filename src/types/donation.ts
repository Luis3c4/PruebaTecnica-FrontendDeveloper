export type Support = {
  name: string;
  email: string;
  amount: number;
  message: string;
};
 export type Donation = Support & {
  id: string;
};