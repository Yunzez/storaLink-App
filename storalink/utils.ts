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

export function hexToRGBA(hex: string, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

