import React from 'react';

import { PLACEHOLDER, ADDTASK_TEXT } from './Fixture/UserInterfaceText';

export default function Input({ value, onChange, onClick }) {
  return (
    <p>
      <label htmlFor="input-task-title">
        할 일
      </label>
      <input
        id="input-task-title"
        type="text"
        placeholder={PLACEHOLDER}
        value={value}
        onChange={onChange}
      />
      <button type="button" onClick={onClick}>
        {ADDTASK_TEXT}
      </button>
    </p>
  );
}
