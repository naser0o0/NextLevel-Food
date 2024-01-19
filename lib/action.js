"use server";
import { saveMeal } from "./meals";

function invalidText (text) {
    return !meal.title || meal.title.trim() === "";
}


export async function shareMeal(formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.image) ||
    isInvalidText(meal.name) ||
    isInvalidText(meal.email) ||
    !meal.creator_email.includes('@') ||
    !meal.image || meal.image.size === 0
  ) {
    throw new Error('Invalid input ')
  }

    await saveMeal(meal);

  redirect('/meals');
}
