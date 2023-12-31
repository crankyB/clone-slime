import Head from 'next/head'
import Image from 'next/image'

import Nav from '../components/homepage/nav'
import Button from '../components/homepage/button'

export default function Home({user, setUser}) {
  return (
    <div className="w-screen flex flex-col">
      <Head>
        <title>Slime Scholars</title>
        <meta name="description" content="Lorem ipsum solor sit amet." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen flex flex-col items-center justify-center flex-1">
        <Nav 
          user={user}
          setUser={setUser}
        />
        <header className="w-screen h-screen flex flex-col items-center justify-center">
          <h1 className="font-black text-7xl max-w-4xl text-center">
            Make Learning Exciting with Slime Scholars
          </h1>
          <h2 className="font-light text-3xl my-6 text-center max-w-4xl leading-relaxed text-gray-600">
            Slime Scholars is a project that motivates students to learn by making the process gratifying.
          </h2>
          <Button text="Sign up for free" style="Primary" onClick="/signup" />
        </header>
      </main>
    </div>
  )
}
