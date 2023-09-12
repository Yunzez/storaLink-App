import { LinkViewProps } from "../../Test/MockData";
import { FolderCardProps } from "../../components/FolderCard";

/**
 * 
 * @param folder, a folderCardProps object that do not have the folder id yet
 * @returns a folderCardProps object with a newly created ID 
 */

export function postCreateFolder(folder: FolderCardProps): FolderCardProps {
  const randomId = Math.floor(Math.random() * 99999) + 1; // Generate a random ID between 1 and 99999
  folder = { ...folder, id: randomId };
  return folder;
}

export function postCreateLink(link: LinkViewProps, description?:string): LinkViewProps {
    const randomId = Math.floor(Math.random() * 99999) + 1;
    const finalDes = description.length > 0 ? description : 'This link has no description' 
    link = { ...link, id: randomId, description: finalDes };
    return link;
}


export enum statusType {
    initialize,
    creating,
    finished,
  }