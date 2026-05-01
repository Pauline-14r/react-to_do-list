import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import trash from '../../pictures/trash.svg';
import edit from '../../pictures/edit-icon.svg';

export function ListItem({
  task,
  editingId,
  editText,
  setEditText,
  isChecked,
  handleDelete,
  handleEditing,
  handleSave,
  saveChanges,
}) {
  return (
    <li className="all-tasks_list-item">
      <div className="all-tasks_left-area">
        <input
          className="all-tasks_checkbox"
          type="checkbox"
          checked={task.completed}
          onClick={() => isChecked(task.id)}
        />
        {editingId === task.id ? (
          <input
            className="all-tasks_change-area"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={saveChanges}
            onBlur={handleSave}
          ></input>
        ) : (
          <span className={task.completed ? 'all-tasks_task-completed' : ''}>
            <span class="all-tasks_task-text">
              {task.text}
              <span class="all-tasks_task-time">
                {' '}
                cоздана {formatDistanceToNow(task.createdAt, { locale: ru, addSuffix: true })}
              </span>
            </span>
          </span>
        )}
      </div>
      <div className="all-tasks_right-area">
        {!task.completed && (
          <button className="edit-button" onClick={() => handleEditing(task.id, task.text)}>
            <img src={edit} alt="edit-icon" />
          </button>
        )}
        <button className="trash-button" onClick={() => handleDelete(task.id)}>
          <img src={trash} alt="trash" />
        </button>
      </div>
    </li>
  );
}
