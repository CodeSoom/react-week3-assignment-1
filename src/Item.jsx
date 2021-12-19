export default function Item({ task: { id, title }, onClickDelete }) {
  return (
    <li>
      <span>{title}</span>
      <button type="button" onClick={() => onClickDelete(id)}>
        완료
      </button>
    </li>
  );
}
