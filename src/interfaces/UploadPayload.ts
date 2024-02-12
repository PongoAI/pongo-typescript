import { UploadMetadata } from "./UploadMetadata";

export interface Payload {
    sub_org_id: string;
    data: string | string[]; 
    metadata: UploadMetadata;
    timestamp: number;
}