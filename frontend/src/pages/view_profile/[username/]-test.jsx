import React from 'react'

export default function ViewProfilePage({ userProfile }) {
  return (
    <div>
      <h1>View Profile: {userProfile?.userId?.name || 'Loading...'}</h1>
      <p>Username: {userProfile?.userId?.username}</p>
    </div>
  )
}

export async function getServerSideProps(context){
  console.log('getServerSideProps called for username:', context.query.username)

  try {
    const response = await fetch(`http://localhost:9080/user/get_profile_based_on_username?username=${context.query.username}`)
    const data = await response.json()
    console.log('API response:', data)

    if (!data.profile) {
      console.log('Profile not found, returning notFound')
      return { notFound: true }
    }

    return { props: { userProfile: data.profile } }
  } catch (error) {
    console.error("Error fetching profile:", error.message)
    console.error("Error details:", error)
    return { notFound: true }
  }
}