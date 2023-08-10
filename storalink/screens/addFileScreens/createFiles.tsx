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

export function postCreateLink(link: LinkViewProps): LinkViewProps {
    const randomId = Math.floor(Math.random() * 99999) + 1;
    link = { ...link, id: randomId };
    return link;
}


export enum statusType {
    initialize,
    creating,
    finished,
  }