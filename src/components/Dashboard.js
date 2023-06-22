import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';


const Dashboard = ({ setAuth }) => {

  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }
      })

      const parseRes = await response.json()

      setName(parseRes.user_name)
    } catch (error) {
      console.error(error.message)
    }
  }

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setAuth(false)
    toast.success("Logged out successfully!")
  }

  useEffect(() => {
    getName()
  }, [])


  return (
    <>
      <h1 className="mt-5">Dashboard</h1>
      <h2>Welcome {name}</h2>
      <button className="btn btn-primary" onClick={e => logout(e)}>
        Logout
      </button>
    </>
  )
}

export default Dashboard