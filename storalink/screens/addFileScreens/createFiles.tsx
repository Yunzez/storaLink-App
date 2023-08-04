import { FolderCardProps } from "../../components/FolderCard";

/**
 * 
 * @param folder, a folderCardProps object that do not have the folder id yet
 * @returns a folderCardProps object with newly created ID 
 */
export function postCreateFolder(folder: FolderCardProps): FolderCardProps {
    folder = {...folder, id: 1}
    return folder
}