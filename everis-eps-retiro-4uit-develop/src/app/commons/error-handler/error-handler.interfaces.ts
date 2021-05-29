export interface PayloadErrorResponse {
  code: string;
  description?: string;
  firstName?: string;
  amountAvailable?: string;
  retentionFlag?: string;
  accessFlag4Uit?: string;
  meta?: {
    reasonNoAccess: string;
    accessFlag4Uit: string;
    afp: string;
    validationIdentity: string;
  }
}
