import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error('Loading meals failed');
  return db.prepare("SELECT * FROM meals").all();
}

// Get meal from database
export function getMeal(slug) {
  // Prepare SQL query
  const query = db.prepare("SELECT * FROM meals WHERE slug = ?");
  // Execute query with slug parameter
  return query.get(slug); // Return meal data
}

// Convert meal title to slug and sanitize instructions
export async function saveMeal(meal) {
 meal.slug = slugify(meal.title, { lower: true });  // Convert title to slug
 meal.instructions = xss(meal.instructions);  // Sanitize instructions

 // Get image file extension and name
 const extension = meal.image.name.split(".").pop();
 const fileName = `${meal.slug}.${extension}`;

 // Create write stream for image and write buffer to it
 const stream = fs.createWriteStream(`public/images/${fileName}`);
 const bufferedImage = await meal.image.arrayBuffer();
 stream.write(Buffer.from(bufferedImage), (error) => {
   if (error) {
     throw new Error("Saving image failed!");  // Throw error if image save fails
   }
 });

 // Set image URL and save meal to database
 meal.image = `/images/${fileName}`;

 db.prepare(`
   INSERT INTO meals (title, summary, instructions, creator, creator_email, image , slug  )
   VALUES(
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
   )`).run(meal);
}

