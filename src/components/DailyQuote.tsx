import { useRandomQuote } from '../hooks/useRandomQuote.'

export const DailyQuote = () => {
  const currentQuote = useRandomQuote()

  // const value = getValue<string>('Hola')

  return (
    <div className="daily-quote">
      <p>{currentQuote.quote}</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.google.com/search?q=${currentQuote.author}`}
      >
        <cite>{currentQuote.author}</cite>
      </a>
    </div>
  )
}
