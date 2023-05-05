import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { join } from 'path';
import { FileUpload } from 'graphql-upload-ts';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class FileService {
  GOOGLE_API_FOLDER_ID = '1cFv62i5fCTk1v3fLxgIq0WxwQJpdn0Fn';
  constructor() {}

  async uploadToDrive(file: FileUpload) {
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: join(process.cwd(), 'secret_google_key.json'),
        scopes: ['https://www.googleapis.com/auth/drive.file'],
      });
      const drive = google.drive({ version: 'v3', auth });
      const { createReadStream, filename, mimetype } = file;

      const media = {
        mimeType: mimetype,
        body: createReadStream(),
      };

      const res = await drive.files.create({
        requestBody: {
          name: `${filename}_${uuid()}`,
          parents: [this.GOOGLE_API_FOLDER_ID],
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
