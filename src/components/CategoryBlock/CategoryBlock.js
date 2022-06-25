import styles from "./CategoryBlock.module.scss";

function CategoryBlock({ icon, title }) {
  return (
    <div className={styles.CategoryBlock}>
      <aside>
        <img src={icon} alt="music" />
      </aside>
      <div>{title}</div>
    </div>
  );
}

export default CategoryBlock;
