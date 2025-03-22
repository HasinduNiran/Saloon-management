import React from 'react'
import { useSelector } from 'react-redux' ;

function Home() {
  const {user} = useSelector((state) => state.auth) ;

  return (
    
    <>
      <h1>Welcome {user.name}</h1>
    

    </>
  )
}

export default Home