import './global.css'
import styles from './App.module.css'

import { PlusCircle } from 'phosphor-react'
import { Header } from './components/Header'

import clipboard from './assets/clipboard.svg'
import { Task } from './components/Task'
import { ChangeEvent, FormEvent, useState } from 'react'

export interface Tasks {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Tasks[]>([
    {
      id: 'string',
      title: 'teste',
      isCompleted: true,
    },    
  ])

  const taskQuantity = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length

  const [title, setTitle] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setTasks([...tasks, {
      id: crypto.randomUUID(),
      title: title,
      isCompleted: false
    }])

    setTitle("")
  }

  function handleToggleCheckedStatus(taskId: string) {
    const newTasks = tasks.map((task) => {
      if(task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        }
      }
      return task
    })

    setTasks(newTasks)
  }

  function handleChangeText(event: ChangeEvent<HTMLInputElement>) {
    console.log(title)
    setTitle(event.target.value)
  }

  function handleDeleteTask(taskId:string) {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <form className={styles.formGroup} onSubmit={handleSubmit}>
          <input
            placeholder="Adicione uma nova tarefa"
            onChange={handleChangeText} 
            value={title}
          />
          <button type="submit">
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        <div className={styles.taskCounter}>
          <div className={styles.createdTasks}>
            <strong>Tarefas criadas</strong>
            <span>{taskQuantity}</span>
          </div>

          <div className={styles.completedTasks}>
            <strong>Concluídas</strong>
            <span>{completedTasks} de {taskQuantity}</span>
          </div>
        </div>

        {taskQuantity === 0 ? (
          <section className={styles.notFoundTasks}>
            <img src={clipboard} alt="Icone prancheta com lista" />
            <div className={styles.paragraph}>
              <p className={styles.nothingTasks}>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </section>
        ) : (
          <>
            {tasks.map(task => {
              return (
              <Task
                tasks={task}
                onDelete={handleDeleteTask}
                onComplete={handleToggleCheckedStatus}
              />
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}