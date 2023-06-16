import {Page} from "./page";

export class PageImage {
  private _id?: number

  private _imagePath?: string

  private _page?: Page

  private _multipartFile?: any

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get imagePath(): string {
    return this._imagePath;
  }

  set imagePath(value: string) {
    this._imagePath = value;
  }

  get page(): Page {
    return this._page;
  }

  set page(value: Page) {
    this._page = value;
  }

  get multipartFile(): any {
    return this._multipartFile;
  }

  set multipartFile(value: any) {
    this._multipartFile = value;
  }
}
