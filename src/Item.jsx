export default function Item({ task: { id, title }, onClickDelete }) {
  return (
    <li data-testid="task-item">
      {title}
      <button type="button" onClick={() => onClickDelete(id)}>
        완료
      </button>
    </li>
  );
}
