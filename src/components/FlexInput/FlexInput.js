import styles from "./FlexInput.module.scss";
import "./../../width.scss";
import console from "console-browserify";

function FlexInput({ inputs }) {
  // alert(styles.FlexInput)
  return (
    <div className={styles.FlexInput}>
      {inputs.map((input, index) => {
        console.log(input.className);
        return (
          <div key={index} className={input.className}>
            {!!input.title ? (
              <label className={styles.FlexInputInput}>
                <span>{input.title}</span>
                {input.element}
              </label>
            ) : (
              <label className={styles.FlexInputInputPlain}>
                {input.element}
              </label>
            )}
            {!!input.extraData && (
              <p className={styles.FlexInputExtraData}>
                {input.extraData.map((extraData, index) => (
                  <span key={index}>{extraData}</span>
                ))}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FlexInput;
