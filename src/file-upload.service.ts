import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';

// const sasToken = process.env.AZURE_SAS || "";
const containerName = `wildlifephotos`;
// const storageAccountName = process.env.AZURE_STORAGE || ""; 

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async uploadFileToBlob(file: File | null ) : Promise<[]> {
    if (!file) return [];

    console.log(localStorage.getItem('sasToken'));
    const blobService = new BlobServiceClient(
      `https://wildlifephotos.blob.core.windows.net/${containerName}?${localStorage.getItem('sasToken')}`
    );

    const containerClient: ContainerClient = blobService.getContainerClient(containerName);
    await this.createBlobInContainer(containerClient, file);

    return;
  }

  async createBlobInContainer(containerClient: ContainerClient, file: File) : Promise<void> {
    //add error handling or checking the sas token
    const blobClient = containerClient.getBlockBlobClient(file.name);
    const options = { blobHTTPHeaders: { blobContentType: file.type } };
    await blobClient.uploadData(file, options);
  }

}
