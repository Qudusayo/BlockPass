import styles from "./BasicInfo.module.scss";

function BasicInfo({ children }) {
  return (
    <div className={styles.BasicInfo}>{children}</div>
  )
}

export default BasicInfo