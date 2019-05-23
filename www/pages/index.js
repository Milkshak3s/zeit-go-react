import Users from '../components/users'
import 'isomorphic-unfetch'

const langs = [
  { name: 'Go', path: 'go', ext: '.go' },
]

const Page = ({nows}) => <div className="container">
    <div className="logo">
      <svg width={40} height={36}>
        <path
          d="M20 .1L.1 35.8h39.7L20 0zm-1.7 7.2l14.5 26.4H3.6L18.3 7.3z"
          fill="#fff"
          fillRule="nonzero"
        />
      </svg>
    </div>
    <div className="clocks">
      {nows.map(({name, path, ext, now}) => 
        <a href="/" target="_blank" title={name} key={path}>
          <Users 
            name={name}
            path={path}
            now={now}
          />
        </a>
      )}
    </div>
  </div>

Page.getInitialProps = async ({req}) => {
  const protocol = req.headers['x-forwarded-proto']
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const baseUrl = `${protocol}://${host}/api`
  const nows = await Promise.all(langs.map(async ({name, path, ext}) => {
    const now = await (await fetch(`${baseUrl}/${path}`)).text()
    return {name, path, now, ext}
  }))

  return { nows }
}

export default Page