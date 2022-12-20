import React from 'react'
import './App.scss'
import { Tickets } from './components/Tickets'
import { createApiClient, Ticket } from './api'
import { HideTickets } from './components/HideTickets'

export type AppState = {
  tickets?: Ticket[]
  search: string
}

const api = createApiClient()
const App = () => {
  const [search, setSearch] = React.useState<string>('')
  const [tickets, setTickets] = React.useState<Ticket[]>([])
  const [hideTickets, setHideTickets] = React.useState<string[]>([])
  const [offset, setOffset] = React.useState(0)

  const LIMIT = 20

  React.useEffect(() => {
    async function fetchTickets() {
      setTickets(await api.getTickets(search, offset, LIMIT))
    }
    fetchTickets()
  }, [search, offset])

  let searchDebounce: any
  const onSearch = (val: string, newPage?: number) => {
    clearTimeout(searchDebounce)
    searchDebounce = setTimeout(async () => {
      setSearch(val)
    }, 300)
  }
  const restoreTicketsHandler = () => {
    setHideTickets((prev: string[]) => {
      return []
    })
  }
  
  return (
    <main >
      <h1>Tickets List</h1>
      <header>
        <input type='search' placeholder='Search...' onChange={(e) => onSearch(e.target.value)} />
      </header>
      {tickets ? (
        <div className='results'>
          <span>Showing {tickets.length - hideTickets.length} results</span>
          {!!hideTickets.length && <HideTickets hideTickets={hideTickets} restoreTicketsHandler={restoreTicketsHandler} />}
        </div>
      ) : null}
      {tickets ? <Tickets limit={LIMIT} setOffset={setOffset} offset={offset} tickets={tickets} search={search} setHideTickets={setHideTickets} hideTickets={hideTickets} /> : <h2>Loading..</h2>}
    </main>
  )
}
export default App
