import { useRandomQuote } from '../hooks/useRandomQuote.'

export const DailyQuote = () => {
  const { author, quote } = useRandomQuote()

  return (
    <div className="daily-quote">
      <p>{quote}</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.google.com/search?q=${author}`}
      >
        <cite>{author}</cite>
      </a>
    </div>
  )
}
