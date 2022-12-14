import './global.css'
import styles from './App.module.css'

import { PlusCircle } from 'phosphor-react'
import { Header } from './components/Header'

import clipboard from './assets/clipboard.svg'
import { Task } from './components/Task'
import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from 'react'

const LOCAL_STORAGE_KEY = "todo:savedTasks"

export interface Tasks {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Tasks[]>([])

  function loadSavedTasks() {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }

  useEffect(() => {
    loadSavedTasks()
  }, [])

  function setTasksAndSave(newTasks:Tasks[]) {
    setTasks(newTasks)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
  }

  const [title, setTitle] = useState("");

  function addTask(event: FormEvent) {
    event.preventDefault()
    setTasksAndSave([...tasks, {
      id: crypto.randomUUID(),
      title: title,
      isCompleted: false
    }])
    setTitle("")
  }

  function handleInvalidTask(event:InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
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
    });
    setTasksAndSave(newTasks)
  }

  function handleChangeText(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setTitle(event.target.value)
  }

  function handleDeleteTask(taskId:string) {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasksAndSave(newTasks)
  }

  const taskQuantity = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length

  const emptyInputText = title.length === 0;

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <form className={styles.formGroup} onSubmit={addTask}>
          <input
            placeholder="Adicione uma nova tarefa"
            onChange={handleChangeText} 
            value={title}
            onInvalid={handleInvalidTask}
            required
          />
          <button type="submit" disabled={emptyInputText}>
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