import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "../get-current-month-transactions";

export const canUserAddTransaction = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);
  const currentMonthTransactions = await getCurrentMonthTransactions();
  if (
    user.publicMetadata.subscriptionPlan === "premium" ||
    currentMonthTransactions < 10
  ) {
    return true;
  }
  return false;
};
