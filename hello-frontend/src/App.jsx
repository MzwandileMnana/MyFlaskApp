import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [newUser, setNewUser] = useState({ name: '', email: '' })

  // Fetch users from Flask backend
  useEffect(() => {
    fetch('http://127.0.0.1:5000/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching users:', error)
        setLoading(false)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://127.0.0.1:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        setUsers([...users, data])
        setNewUser({ name: '', email: '' })
      })
      .catch(error => console.error('Error creating user:', error))
  }

  if (loading) return <div className="card">Loading users...</div>

  return (
    <>
      <div>
        <h1>User Management System</h1>
        <p>Connected to Flask Backend</p>
      </div>
      
      {/* Add User Form */}
      <div className="card">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
            style={{ margin: '5px', padding: '8px' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
            style={{ margin: '5px', padding: '8px' }}
          />
          <button type="submit" style={{ margin: '5px', padding: '8px 15px' }}>
            Add User
          </button>
        </form>
      </div>

      {/* Users List */}
      <div className="card">
        <h2>Current Users ({users.length})</h2>
        {users.map(user => (
          <div key={user.id} style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            margin: '10px 0', 
            borderRadius: '8px' 
          }}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>ID: {user.id}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App