import {PageContent} from "./pageContent";
import {PageImage} from "./pageImage";
import {PageVideo} from "./pageVideo";

export class Page{
  private _id?: number

  private _pageContentSet?: PageContent[]

  private _pageImageSet?: PageImage[]

  private _pageVideoSet?: PageVideo[]


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get pageContentSet(): PageContent[] {
    return this._pageContentSet;
  }

  set pageContentSet(value: PageContent[]) {
    this._pageContentSet = value;
  }

  get pageImageSet(): PageImage[] {
    return this._pageImageSet;
  }

  set pageImageSet(value: PageImage[]) {
    this._pageImageSet = value;
  }

  get pageVideoSet(): PageVideo[] {
    return this._pageVideoSet;
  }

  set pageVideoSet(value: PageVideo[]) {
    this._pageVideoSet = value;
  }
}
