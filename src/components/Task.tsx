import styles from './Task.module.css'

import { Trash } from 'phosphor-react'
import checked from '../assets/checked.svg'
import unchecked from '../assets/unchecked.svg'
import { Tasks } from '../App';

interface Task {
  tasks: Tasks;
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
}

export function Task({ tasks, onDelete, onComplete }: Task) {
  return (
    <article
      className={styles.task}>
      <button
        className={styles.toggleChecked}
        onClick={() => onComplete(tasks.id)}
      >
        {tasks.isCompleted ?
            <img src={checked} alt="" /> 
            :
            <img src={unchecked} alt="" /> 
        }
      </button> 

      <p className={tasks.isCompleted ? styles.textCompleted : ''}>
        {tasks.title}
      </p>

      <button className={styles.deleteTask} onClick={() => onDelete(tasks.id)}>
        <Trash size={22} />
      </button>
    </article>
  )
}