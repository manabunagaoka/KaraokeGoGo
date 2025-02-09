export const isAdminUser = (userId: string | null | undefined) => {
  console.log('Admin Check:', {
    providedUserId: userId,
    envAdminId: process.env.NEXT_PUBLIC_ADMIN_USER_ID,
    match: userId === process.env.NEXT_PUBLIC_ADMIN_USER_ID
  });
  return userId === process.env.NEXT_PUBLIC_ADMIN_USER_ID;
};