import styles from "./editablecontent.module.css";
import React, { useState } from "react";

export default function EditableForm({
  labelName,
  existingValue,
  handleSubmit,
}) {
  const [value, setValue] = useState(existingValue);
  const [isEditing, setEditing] = useState(false);

  const handleEditClick = () => {
    if (isEditing) {
        // If in editing mode, submit the form and toggle editing mode
        handleSubmit();
        setEditing(false);
      } else {
        // If not in editing mode, toggle editing mode
        setEditing(true);
      }
  }
  
  return (
    <form onSubmit={handleSubmit} className={styles.profileForm}>
      <div className={styles.leftDiv}>
        <label htmlFor="description" className={styles.formLabel}>
          {labelName}
        </label>
        <button
          type="button"
          onClick={handleEditClick}
          className={styles.editButton}
        >
          {isEditing ? "Submit" : "Edit"}
        </button>
      </div>
      {isEditing ? (
        <textarea
          id="description"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className={styles.formTextArea}
        />
      ) : (
        <textarea id="description" value={value} readOnly className={styles.formTextArea} style={{color: 'var(--grey'}}/>
      )}
    </form>
  );
}
