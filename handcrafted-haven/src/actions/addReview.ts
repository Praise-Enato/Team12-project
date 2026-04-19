"use server";

import { addReview as dbAddReview } from "@/data/db";
import { revalidatePath } from "next/cache";

export async function submitReview(formData: FormData) {
  const productId = formData.get("productId") as string;
  const rating = parseInt(formData.get("rating") as string);
  const comment = formData.get("comment") as string;
  const userName = formData.get("userName") as string;

  if (!productId || !rating || !comment || !userName) {
    throw new Error("Missing required fields");
  }

  await dbAddReview(productId, rating, comment, userName);
  
  // Refresh the page data
  revalidatePath(`/shop/${productId}`);
}
