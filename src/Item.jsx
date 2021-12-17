export default function Item({ task: { id, title }, onClickDelete }) {
  return (
    <li data-testid="item">
      <span>{title}</span>
      <button type="button" onClick={() => onClickDelete(id)} data-testid="doneButton">
        완료
      </button>
    </li>
  );
}
