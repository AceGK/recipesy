// components/input/index.tsx

import styles from "./styles.module.scss";
import { ChangeEvent, FC } from "react";

interface InputFieldProps {
  type: "text" | "password" | "email" | "number";
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholderText: string;
  required?: boolean;
  autoComplete?: string;
  align?: "left" | "right";
}

const InputField: FC<InputFieldProps> = ({
  type,
  name,
  value,
  onChange,
  placeholderText,
  required = false,
  autoComplete = "off",
  align,
}) => {
  const isNumber = type === "number";

  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-labelledby={name}
        required={required}
        autoComplete={autoComplete}
        className={`${align === "right" ? styles.alignRight : styles.alignLeft} ${
          value ? styles.hasValue : ""
        }`}
        {...(isNumber && {
          inputMode: "decimal",
          pattern: "^\\d+(\\.\\d{0,2})?$",
        })}
      />
      <label className={styles.placeholderText} htmlFor={name} id={name}>
        <div className={styles.text}>{placeholderText}</div>
      </label>
    </div>
  );
};

export default InputField;
