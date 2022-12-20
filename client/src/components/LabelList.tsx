export const LabelList = ({ labels }: { labels: string[] }) => {
  console.log(labels)

  return (
    <div className='labelsDiv'>
      {labels &&
        labels.map((label) => {
          return <label key={label}>{label}</label>
        })}
    </div>
  )
}
