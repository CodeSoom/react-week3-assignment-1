import React from 'react';

import { COMPLETE_TEXT } from './Fixture/UserInterfaceText';

export default function Item({ task: { id, title }, onClickDelete }) {
  return (
    <li>
      {title}
      <button type="button" onClick={() => onClickDelete(id)}>
        {COMPLETE_TEXT}
      </button>
    </li>
  );
}
