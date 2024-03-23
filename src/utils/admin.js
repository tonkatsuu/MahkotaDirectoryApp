export const ADMIN_EMAILS = ["info@southpaw.com.my"];

export function isAdmin(user) {
  return ADMIN_EMAILS.includes(user?.email);
}
