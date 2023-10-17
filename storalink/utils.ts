import { MockSingleFolderData } from "./Test/MockData";
import { FolderProps, User } from "./context/GlobalProvider";
import useSse from "./hooks/useSse";
export enum SocialMediaSrc {
  INS = "Instagram",
  FB = "Facebook",
  YT = "Youtube",
  TK = "TikTok",
}

export const checkEmail = (email: string, rule?: RegExp) => {
  const emailRegex = rule ?? /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  if (!emailRegex.test(email)) {
    return "please enter a valid email address";
  }

  return "";
};

export const checkPassword = (password: string) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  return "";
};

// * check if the image is local path
export const isLocalPath = (url: string) => {
  if (typeof url === "string") {
    return false; // Check if the url does not start with "http" (i.e., local path)
  }
  return true;
};

export function hexToRGBA(hex: string, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function fetchFolderDataById(id: string | number) {
  console.log(id);
  const target = MockSingleFolderData.find((value) => {
    return value.id === Number(id);
  });

  return target;
}

export const isValidUrl = (url: string): boolean => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?" + // port
      "(\\/[-a-z\\d%_.~+]*)*" + // path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(url);
};

export const getFolderNameById = (
  id: string | number,
  folderCache: FolderProps[]
) => {
  const target = folderCache.find((value) => {
    return value.id === id;
  });
  return target?.name;
};

export const getLinkById = (
  folderId: string | number,
  linkId: string | number,
  folderCache: FolderProps[]
) => {
  const target = folderCache.find((value) => {
    return value.id === folderId;
  });

  const targetLink = target?.links.find((value) => {
    return value.id === linkId;
  });
  return targetLink;
};

/**
 *
 * @returns an empty user of @
 */
export function getEmptyUser(): User {
  return {
    user: {
      id: "",
      username: "",
      email: "",
      dob: "",
      profileImg: "",
      userType: "basic",
    } as User,
  };
}
