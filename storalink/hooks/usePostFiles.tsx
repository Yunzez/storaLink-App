import { LinkViewProps } from "../Test/MockData";
import { FolderCardProps } from "../components/FolderCard";
import * as Keychain from 'react-native-keychain';
/**
 *
 * @param folder, a folderCardProps object that do not have the folder id yet
 * @returns a folderCardProps object with a newly created ID
 */

import { UserCredentials } from 'react-native-keychain';

export async function postCreateFolder(
  folder: FolderCardProps,
  backendLink: string,
  userId: any
): Promise<FolderCardProps> {
  const token = await getToken(); 
  console.log("create folder: ", folder);

  const createFolderRequest = {
    folderDescription: folder.desc,
    creatorId: userId,
    folderName: folder.title,
    imageUrl: folder.imgUrl,
    linkIds: [],
    parentFolderId: null,
    subFolderIds: [],
    modifierId: null,
  };

  try {
    const response = await fetch(backendLink + "/api/v1/folder", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token?.password}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(createFolderRequest),
    });

    if (response.ok) {
      const data = await response.json();
      return {...folder, id: data.id};
    } else {
      console.log("status not ok");
      console.log(response);
      return folder; // You might want to throw an error or return a different value here
    }
  } catch (error) {
    console.error("Error in postCreateFolder:", error);
    return folder; // You might want to throw an error or return a different value here
  }
}


const getToken = async () => { 
  const token: UserCredentials | false = await Keychain.getGenericPassword()
  return token
}

export async function postCreateLink(
  link: LinkViewProps,
  backendLink: string,
  userId: any,
  folderId: any,
  description?: string,
): Promise<LinkViewProps> {
  const token = await getToken(); 
  const finalDes =
    description.length > 0 ? description : "This link has no description";
  link = {
    ...link,
    description: finalDes,
    linkUrl: link.linkUrl ?? link.title,
  };
  console.log("add a link : ", link);
  const createLinkRequest = {
    folderId: folderId,
    creatorId: userId,
    modifierId: userId,
    linkName: link.title,
    description: finalDes,
    note: "", // Add your note here
    linkUrl: link.linkUrl || "",
    imageUrl: link.imgUrl || "",
    sourceType: link.socialMediaType,
  };
  console.log("add a link request: ", createLinkRequest);
  console.log("logging backendlink", backendLink + "/api/v1/link");
  fetch(backendLink + "/api/v1/link", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token?.password}`,  
    },
    credentials: 'include',
    body: JSON.stringify(createLinkRequest),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("add link status not ok");
        console.log(response);
      }
    })
    .then((data) => {
      link = { ...link, id: data.id };
      console.log('data: ', data); // Log the JSON data
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  return link;
}

export enum statusType {
  initialize,
  creating,
  finished,
}


export const postDeleteFolder = async (id: string, backendLink: string): Promise<boolean> => {
  const token = await getToken(); 
  if(token === false || !token.password) {
    console.log('no token, or no password')
    return false
  }
  fetch(backendLink + "/api/v1/folder/" + id, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token.password}`,  
    },
    credentials: 'include',
  }).then((response) => {
    return response.ok
  })
}


export const postDeleteLink = async (id: string, backendLink: string): Promise<boolean> => {
  const token = await getToken(); 
  if(token === false || !token.password) {
    console.log('no token, or no password')
    return false
  }
  fetch(backendLink + "/api/v1/link/" + id, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token.password}`,  
    },
    credentials: 'include',
  }).then((response) => {
    return response.ok
  })
}

