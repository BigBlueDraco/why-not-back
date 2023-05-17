import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { join } from 'path';
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
  async findFolderInDirectory({
    parent,
    folderName,
  }: {
    parent: string | number;
    folderName: string | number;
  }) {
    const res = await this.driveService.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and trashed=false and name='${folderName}' and parents in '${this.GOOGLE_API_FOLDER_ID}'`,
      fields: 'nextPageToken, files(id, name, createdTime)',
    });

    if (res.data.files.length) {
      const folder = res.data.files[0];
      return folder.id;
    } else {
      console.log(
        `Папку з назвою "${folderName}" не знайдено в директорії з ID "${this.GOOGLE_API_FOLDER_ID}".`,
      );
      return '';
    }
  }

  async createFolder({
    parent,
    folderName,
  }: {
    parent: string | number;
    folderName: string | number;
  }) {
    const metadata = {
      name: folderName,
      parents: [parent],
      mimeType: 'application/vnd.google-apps.folder',
    };

    const res = await this.driveService.files.create({
      resource: metadata,
      fields: 'id',
    });

    console.log(
      `
      A new folder with the name "${folderName}" and ID "${res.data.id}" has been created.`,
    );
    return res.data.id;
  }

  async uploadToDrive({ file, userId }: uploadToDrive) {
    try {
      let parentFolder = await this.findFolderInDirectory({
        parent: this.GOOGLE_API_FOLDER_ID,
        folderName: userId,
      });
      if (!!!parentFolder) {
        parentFolder = await this.createFolder({
          parent: this.GOOGLE_API_FOLDER_ID,
          folderName: userId,
        });
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
      return res.data.id;
    } catch (error) {
      console.error(
        'An error occurred while uploading a file to Google Drive',
        error,
      );
    }
  }

  async deleteFromDrive(imgId: string) {
    try {
      const file = await this.driveService.files.get({ fileId: imgId });
      if (file) {
        await this.driveService.files.delete({
          fileId: imgId,
        });
        return imgId;
      } else {
        return null;
      }
    } catch (error) {
      console.error(
        'An error occurred while deleting a file from Google Drive',
        error,
      );
      return null;
    }
  }
}
