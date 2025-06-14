import GithubSVG from '../assets/svg/github.svg?react'
import LinkendinSVG from '../assets/svg/linkedin.svg?react'
import LogoSVG from '../assets/svg/logo2.svg?react'

export const Header = () => {
  return (
    <header className="header">
      <div className="title-container">
        <LogoSVG />
        <h1 className="title-container__title">React/TS To-do Manager</h1>
      </div>
      <div className="author-info">
        <p className="author-info__name">
          Created by: <b>Marco Del Boccio</b>
        </p>
        <div className="author-info__links">
          <a
            target="_blank"
            href="https://github.com/codentide/ts-react-todo-app"
          >
            <GithubSVG />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/marco-del-boccio-99b31824a/"
          >
            <LinkendinSVG />
          </a>
        </div>
      </div>
    </header>
  )
}
