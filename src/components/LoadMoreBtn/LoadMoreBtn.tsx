import css from "./LoadMoreBtn.module.css";
import { LoadMoreBtnProps } from "./LoadMoreBtn.type";

export default function LoadMoreBtn({
  onLoading,
  handleLoadMoreClick,
}: LoadMoreBtnProps) {
  return (
    <button
      type="button"
      className={css.btn}
      onClick={handleLoadMoreClick}
      disabled={onLoading}
    >
      Load more
    </button>
  );
}
