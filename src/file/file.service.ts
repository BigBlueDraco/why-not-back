import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { join } from 'path';
import { FileUpload } from 'graphql-upload-ts';
import { v4 as uuid } from 'uuid';
import { uploadToDrive } from './dto/uploadToDrive';

@Injectable()
export class FileService {
  private readonly GOOGLE_API_FOLDER_ID = '1cFv62i5fCTk1v3fLxgIq0WxwQJpdn0Fn';
  private readonly driveService;
  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: join(process.cwd(), 'secret_google_key.json'),
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    this.driveService = google.drive({ version: 'v3', auth });
  }
  async findFolderInDirectory(folderName: String) {
    const res = await this.driveService.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and trashed=false and name='${folderName}' and parents in '${this.GOOGLE_API_FOLDER_ID}'`,
      fields: 'nextPageToken, files(id, name, createdTime)',
    });

    if (res.data.files.length) {
      const folder = res.data.files[0];
      console.log(`Знайдено папку: ${folder.name}`);
      console.log(`Її ID: ${folder.id}`);
      return folder.id;
    } else {
      console.log(
        `Папку з назвою "${folderName}" не знайдено в директорії з ID "${this.GOOGLE_API_FOLDER_ID}".`,
      );
      return '';
    }
  }

  async createFolder(folderName: String) {
    const metadata = {
      name: folderName,
      parents: [this.GOOGLE_API_FOLDER_ID],
      mimeType: 'application/vnd.google-apps.folder',
    };

    const res = await this.driveService.files.create({
      resource: metadata,
      fields: 'id',
    });

    console.log(
      `Створено нову папку з назвою "${folderName}" та ID "${res.data.id}".`,
    );
    return res.data.id;
  }

  async uploadToDrive({ file, userId }: uploadToDrive) {
    try {
      let parentFolder = await this.findFolderInDirectory(userId);
      if (!!!parentFolder) {
        parentFolder = await this.createFolder(userId);
      }
      const { createReadStream, filename, mimetype } = file;

      const media = {
        mimeType: mimetype,
        body: createReadStream(),
      };

      const res = await this.driveService.files.create({
        requestBody: {
          name: `${userId}_${filename}_${uuid()}`,
          parents: [parentFolder],
        },
        media: media,
        fields: 'id',
      });
      const url = `https://drive.google.com/uc?export=view&id=${res.data.id}`;
      return url;
    } catch (e) {
      console.log(e);
    }
  }
}
