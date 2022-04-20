import {Link} from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
        <h2>Missing</h2>
        <p>Well, that's disappointing</p>
        <Link to='/'> Visit Our Homepage</Link>
    </main>
  )
}

export default Missing