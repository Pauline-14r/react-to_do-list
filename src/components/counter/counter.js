export function TaskCounter({ total, completed }) {
  return (
    <div className="all-tasks_counter">
      <span className="all-tasks_counter-text">
        Всего задач <span className="counter">{total}</span>
      </span>
      <span className="all-tasks_counter-text">
        Завершено{' '}
        <span className="counter">
          {completed} из {total}
        </span>
      </span>
    </div>
  );
}
