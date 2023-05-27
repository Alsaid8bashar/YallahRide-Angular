import {PageContent} from "./pageContent";
import {PageImage} from "./pageImage";
import {PageVideo} from "./pageVideo";

export default interface Page{
  id?: number

  pageContentSet?: PageContent[]

  pageImageSet?: PageImage[]

  pageVideoSet?: PageVideo[]
}
