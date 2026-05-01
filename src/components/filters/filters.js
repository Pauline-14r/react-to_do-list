export function Filters({ filter, handleFilter, handleClear }) {
  return (
    <div className="all-tasks_tasks-filter">
      <div className="all-tasks_visible-buttons">
        <button className="all-tasks_button" onClick={() => handleFilter('all')}>
          Все задачи
        </button>
        <button className="all-tasks_button" onClick={() => handleFilter('completed')}>
          Завершенные
        </button>
        <button className="all-tasks_button" onClick={() => handleFilter('active')}>
          В процессе
        </button>
      </div>
      {filter === 'completed' && (
        <button className="all-tasks_button" onClick={() => handleClear()}>
          Очистить
        </button>
      )}
    </div>
  );
}
