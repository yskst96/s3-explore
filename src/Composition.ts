import { File } from "./File"
import Folder from "./Folder"

export type S3Object = {
    key: string
    isFile: boolean
    size?: number
}
export type CompositionProps = {
    object: S3Object;
    updateList: (prefix: string) => Promise<void>
};


export const composition = (obj: S3Object) => {

    return obj.isFile ? File : Folder

}