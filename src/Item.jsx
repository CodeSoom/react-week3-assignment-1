export default function Item({ task: { id, title }, onClickDelete }) {
  return (
    <li>
      {title}
      <button type="button" onClick={() => onClickDelete(id)}>
        <span>완료</span>
      </button>
    </li>
  );
}
