import { useState, useEffect } from 'react'
import './App.css'
import { getAllTickets } from './services/ticketService'

function App() {

  const [allTickets, setAllTickets] = useState([])
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([])

useEffect(() => {
  getAllTickets().then(ticketArray => {
    setAllTickets(ticketArray)
    console.log("ticket set")
  })

}, [])

useEffect(() => {
  if(showEmergencyOnly){
   const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true);
   setFilteredTickets(emergencyTickets);
  } 
  else
  {
    setFilteredTickets(allTickets);
  }
}, [showEmergencyOnly, allTickets])

  return (
    
    <div className="tickets-container">
      <h2>Tickets</h2>
      <div>
        <button className="filter-btn btn-primary" onClick={() => {setShowEmergencyOnly(true)}}>Emergency</button>
        <button className="filter-btn btn-primary" onClick={() => {setShowEmergencyOnly(false)}}>Show All</button>
      </div>
      <article className="tickets">
        {filteredTickets.map(ticket => {
          return (
            <section className="ticket" key={ticket.id}>
              <header className="ticket-info">#{ticket.id}</header>
              <div>{ticket.description}</div>
              <footer>
                <div>
                  <div className="ticket-info">emergency </div>
                  <div>{ticket.emergency ? "yes" : "no"}</div>
                </div>
              </footer>
            </section>
          )
        })}
      </article>
    </div>
  )
}

export default App
