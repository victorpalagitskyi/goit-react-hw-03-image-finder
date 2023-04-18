import css from '../styles.module.css'
export const LoadMoreBtn = ({ onClick }) => {
  return (
    <div>
      <button type="button" className={css.Button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};