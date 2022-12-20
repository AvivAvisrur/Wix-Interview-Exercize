import { Ref, RefAttributes, useEffect, useRef, useState } from 'react'
import { Ticket } from '../api'
import { LabelList } from './LabelList'

export const TicketItem = ({ ticket, hideTicketsHandler, hideTickets }: { ticket: Ticket; hideTicketsHandler: Function; hideTickets: string[] }) => {
  const [elementId, setElementId] = useState<string>()
  const ref = useRef<any>()
  const [isThreeLines, setIsThreeLines] = useState<boolean>(false)
  const [toggleButton, setToggleButton] = useState<boolean>(false)

  const hideTicketStyle = hideTickets.includes(ticket.id) ? { display: 'none' } : { display: 'block' }

  useEffect(() => {
    if (ref.current && ref.current.clientHeight < ref.current.scrollHeight) {
      setIsThreeLines(true)
    }
  }, [ref])
  return (
    <li
      style={hideTicketStyle}
      key={ticket.id}
      className='ticket'
      onMouseOver={() => {
        setElementId(ticket.id)
      }}
      onMouseLeave={() => setElementId('')}
    >
      {elementId === ticket.id && (
        <button
          className='hide-ticket-button'
          onClick={() => {
            hideTicketsHandler(ticket.id)
          }}
        >
          Hide
        </button>
      )}
      <h5 className='title'>{ticket.title}</h5>
      <p ref={ref} className={`contentCollapse ${toggleButton && 'show-more'} `}>
        {ticket.content}
      </p>
      {isThreeLines && (
        <button className='content-button' onClick={() => setToggleButton(!toggleButton)}>
          {!toggleButton ? 'show more' : 'show less'}
        </button>
      )}
      <LabelList labels={ticket.labels!} />
      <footer>
        <div className='meta-data'>
          By {ticket.userEmail} | {new Date(ticket.creationTime).toLocaleString()}
        </div>
      </footer>
    </li>
  )
}
