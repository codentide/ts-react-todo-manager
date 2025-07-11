import { Link } from 'react-router'
import GithubIcon from '../../assets/svg/github.svg?react'
import LinkendinIcon from '../../assets/svg/linkedin.svg?react'
import LogoIcon from '../../assets/svg/logo2.svg?react'

export const Header = () => {
  return (
    <header className="header">
      <div className="title-container">
        <Link to={'/'} children={<LogoIcon />} />
        <h1 className="title-container__title">TS/React To-do Manager</h1>
      </div>
      <div className="author-info">
        <p className="author-info__name">Marco Del Boccio</p>
        <ul className="author-info__link-list">
          <li>
            <a target="_blank" href="https://github.com/codentide/ts-react-todo-manager">
              <GithubIcon />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.linkedin.com/in/marco-del-boccio-99b31824a/">
              <LinkendinIcon />
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
