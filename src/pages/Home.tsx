
import { Outlet } from 'react-router';


export default function Home() {
  return (
    <>
    <div>
        Home
      <section>
        <Outlet />
      </section>
    </div>
    </>
  )
}
