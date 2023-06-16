import {Page} from "./page";

export class PageVideo{
  private _multipartFile?: any

  private _id?: number

  private _videoPath?: string

  private _page?: Page


  get multipartFile(): any {
    return this._multipartFile;
  }

  set multipartFile(value: any) {
    this._multipartFile = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get videoPath(): string {
    return this._videoPath;
  }

  set videoPath(value: string) {
    this._videoPath = value;
  }

  get page(): Page {
    return this._page;
  }

  set page(value: Page) {
    this._page = value;
  }
}
