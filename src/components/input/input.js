import addIcon from '../../pictures/add_plus.svg';
export function InputArea({ inputText, setText, onAdd, onKeyDown }) {
  return (
    <div className="input-area">
      <input
        className="input-area_input"
        value={inputText}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Добавить новую задачу..."
      ></input>
      <button className="input-area_button" onClick={onAdd}>
        Добавить <img src={addIcon} alt="add_plus"></img>
      </button>
    </div>
  );
}
