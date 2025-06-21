import { useRandomQuote } from '../hooks/useRandomQuote.'

export const DailyQuote = () => {
  const currentQuote = useRandomQuote()

  // if (currentQuote == null) return <></>

  return (
    <div className="daily-quote">
      {currentQuote && (
        <>
          <p>{currentQuote.quote}</p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.google.com/search?q=${currentQuote.author}`}
          >
            <cite>{currentQuote.author}</cite>
          </a>
        </>
      )}
    </div>
  )
}
