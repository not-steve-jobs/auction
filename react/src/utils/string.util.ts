export const formatPhoneNumber = (phoneNumber: string): string => {
  if (phoneNumber.length < 7) {
    return phoneNumber;
  }

  const prefix = phoneNumber.substring(0, 6);
  const suffix = phoneNumber.substring(phoneNumber.length - 2);
  return `${prefix}xxxx${suffix}`;
};

export const formatEmail = (email: string): string => {
  const atIndex = email.indexOf("@");

  if (atIndex === -1) {
    return "Invalid email address";
  }

  const username = email.slice(0, -1).substring(0, 3);
  const domain = email.substring(atIndex - 1);
  return `${username}***${domain}`;
};
