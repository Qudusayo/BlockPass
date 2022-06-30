import styles from "./BlockSelector.module.scss";

function BlockSelector({ name, values, currentValue, onChange }) {
  return (
    <div className={styles.BlockSelector}>
      {values.map((value, index) => (
        <label
          key={index}
          className={currentValue === value.id ? styles.active : ""}
        >
          <input
            id={value.id}
            name={name}
            type={"radio"}
            checked={currentValue === value.id}
            onChange={onChange}
            value={value.id}
          />
          {value.name}
        </label>
      ))}
    </div>
  );
}

export default BlockSelector;
