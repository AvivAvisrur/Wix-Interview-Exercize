export const HideTickets = ({ hideTickets, restoreTicketsHandler }: { hideTickets: string[]; restoreTicketsHandler: Function }) => {
  const hiddenTicketText = hideTickets.length === 1 ? `${hideTickets.length} hidden ticket` : `${hideTickets.length} hidden tickets`
  return (
    <div className='hideTicketDiv'>
      <span className='hideTicketSpan'>{hiddenTicketText}</span>
      <button onClick={() => restoreTicketsHandler()}>restore</button>
    </div>
  )
}
