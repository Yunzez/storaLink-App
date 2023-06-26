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
