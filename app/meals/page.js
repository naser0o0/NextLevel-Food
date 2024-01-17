import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/component/meals/meals-grid";

export default function page() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, create <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun
        </p>
        <p className={classes.cta} >
          <Link href='/meals/share'>
            Share Your Favorite recipe
          </Link>

        </p>
      </header>
      <main className={classes.main}>
        <MealsGrid meals={[]} />
      </main>
    </>
  );
}
