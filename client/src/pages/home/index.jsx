import './style.css'
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'

/**
 * useState: Serve para guardar informações (como um número, texto ou lista) que podem mudar enquanto você usa o site.
 * useEffect: É usado para dizer ao React que ele deve fazer algo depois que a tela carregar ou quando algo mudar, como buscar dados ou atualizar a página.
 * useRef: Ajuda a guardar algo que você quer lembrar (como um número ou uma referência a um botão), mas sem fazer o React redesenhar a tel
 */

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })

    getUsers()

  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()

  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div className='container'>
        <form>
          <h1>Cadastro de Usuários</h1>
          <input type='text' placeholder='Nome' name='nome' ref={inputName} />
          <input type='number' placeholder='Idade' name='idade' ref={inputAge} />
          <input type='email' placeholder='Email' name='email' ref={inputEmail} />
          <button type='button' onClick={createUsers}>Cadastrar</button>
        </form>


        {users.map(user => (
          <div key={user.id} className='card'>
            <div>
              <p>Nome:  <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <p>Deletar</p>
            </button>
          </div>
        ))}

      </div>

    </>
  )
}
export default Home
