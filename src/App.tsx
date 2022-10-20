import './global.css'
import styles from './App.module.css'

import { PlusCircle } from 'phosphor-react'
import { Header } from './components/Header'

import clipboard from './assets/clipboard.svg'

export function App() {
  const tasks = [
    
  ]

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <form className={styles.formGroup}>
          <input type="text" placeholder="Adicione uma nova tarefa" />
          <button type="submit">
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        <div className={styles.taskCounter}>
          <div className={styles.createdTasks}>
            <strong>Tarefas criadas</strong>
            <span>0</span>
          </div>

          <div className={styles.completedTasks}>
            <strong>Concluídas</strong>
            <span>0</span>
          </div>
        </div>

        {tasks.length === 0 ? (
          <section className={styles.notFoundTasks}>
            <img src={clipboard} alt="Icone prancheta com lista" />
            <div className={styles.paragraph}>
              <p className={styles.nothingTasks}>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </section>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}