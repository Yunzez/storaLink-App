import { LinkViewProps } from "../../Test/MockData";
import { FolderCardProps } from "../../components/FolderCard";

/**
 *
 * @param folder, a folderCardProps object that do not have the folder id yet
 * @returns a folderCardProps object with a newly created ID
 */

export function postCreateFolder(
  folder: FolderCardProps,
  backendLink: string,
  userId: any
): FolderCardProps {
  const randomId = Math.floor(Math.random() * 99999) + 1; // Generate a random ID between 1 and 99999
  folder = { ...folder, id: randomId };
  console.log('create folder: ', folder);

  // Map FolderCardProps to CreateFolderRequest
  const createFolderRequest = {
    folderDescription: folder.desc,
    creatorId: userId,  // Assuming this is correct; you might want to get this from somewhere else
    folderName: folder.title,
    imageUrl: folder.imgUrl,
    linkIds: [],  // Empty array since it's a new folder
    parentFolderId: null,  // Assuming no parent folder; you might want to set this
    subFolderIds: [],  // Empty array since it's a new folder
    modifierId: null  // Assuming no modifier; you might want to set this
  };

  fetch(backendLink + "/api/v1/folder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createFolderRequest),
  }).then((response) => {
    if (response.ok) {
      console.log(response);
      return response.json();
    } else {
      console.log("status not ok");
      console.log(response);
    }
  });

  return folder;
}

export function postCreateLink(
  link: LinkViewProps,
  description?: string
): LinkViewProps {
  const randomId = Math.floor(Math.random() * 99999) + 1;
  const finalDes =
    description.length > 0 ? description : "This link has no description";
  link = { ...link, id: randomId, description: finalDes };
  return link;
}

export enum statusType {
  initialize,
  creating,
  finished,
}
