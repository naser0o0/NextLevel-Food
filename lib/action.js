"use server";
import { revalidatePath } from "next/cache";
import { saveMeal } from "./meals";

// Check if meal title is invalid
function isInvalidText(text) {
  // Check if meal title exists and is not empty
  return !meal.title || meal.title.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  // Check if meal title exists and is not empty
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.image) ||
    isInvalidText(meal.name) ||
    isInvalidText(meal.email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }

  await saveMeal(meal); // save meal to database
  revalidatePath("/meals");

  redirect("/meals");
}
