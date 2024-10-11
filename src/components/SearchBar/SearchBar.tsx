import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

import { SearchBarProps } from "./SearchBar.type";
import { FormEvent } from "react";

export default function SearchBar({ onSubmit }: SearchBarProps) {
  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const search = form.elements.namedItem("search") as HTMLInputElement;

    const searchString = search.value.trim();

    if (!searchString) {
      return toast("Your query is empty!!!", {
        duration: 3000,
        position: "top-right",
        icon: "⚠️",
      });
    }

    onSubmit(searchString);
  }

  return (
    <header className={css.header}>
      <form onSubmit={submitHandler} className={css.form}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
