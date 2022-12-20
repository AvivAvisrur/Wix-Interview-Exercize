import axios from 'axios'

export type Ticket = {
  id: string
  title: string
  content: string
  creationTime: number
  userEmail: string
  labels?: string[]
}

export type ApiClient = {
  getTickets: (search: string, offset: number, LIMIT: number) => Promise<Ticket[]>
}

export const createApiClient = (): ApiClient => {
  return {
    getTickets: async (search: string, offset: number, LIMIT: number) => {
      return await axios.get(`http://localhost:3232/api/tickets`, { params: { search, offset, limit: LIMIT } }).then((res) => res.data)
    },
  }
}
