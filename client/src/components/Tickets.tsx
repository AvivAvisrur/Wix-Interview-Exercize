import React, { SetStateAction, useMemo, useRef } from 'react'
import { Ticket } from '../api'
import { TicketItem } from './TicketItem'
export const Tickets = ({
  tickets,
  search,
  setHideTickets,
  hideTickets,
  setOffset,
  offset,
  limit,
}: {
  tickets: Ticket[]
  search: string
  setHideTickets: Function
  hideTickets: string[]
  setOffset: Function
  offset: number
  limit: number
}) => {
  const filteredTickets = tickets.filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(search.toLowerCase()))
  // const listInnerRef = React.useRef<any>()

  const hideTicketHandler = (ticketId: string) => {
    setHideTickets((prev: string[]) => {
      return [...prev, ticketId]
    })
  }

  // const handleScroll = () => {
  //   if (listInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current

  //     if (scrollTop + clientHeight === scrollHeight) {
  //       console.log('Last element')

  //       // This will be triggered after hitting the last element.
  //       // API call should be made here while implementing pagination.
  //     }
  //   }
  //   console.log('last child')
  // }

  return (
    <ul className='tickets'>
      {filteredTickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} hideTicketsHandler={hideTicketHandler} hideTickets={hideTickets} />
      ))}
    </ul>
  )
}
