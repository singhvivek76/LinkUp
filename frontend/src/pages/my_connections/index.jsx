import React, { act, useEffect } from 'react'
import UserLayout from '@/layout/UserLayout'
import DashboardLayout from '@/layout/DashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import { AcceptConnection, getMyConnectionRequests } from '@/config/redux/action/authAction';
import styles from './index.module.css';
import { BASE_URL } from '@/config';
import { useRouter } from 'next/router';
import { connection } from 'next/server';

export default function MyConnectionsPage() {

  const router = useRouter();

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyConnectionRequests({token: localStorage.getItem("token")}));
  }, [])

  useEffect(() => {

    if (authState.connectionRequest.length !== 0) {
      console.log(authState.connectionRequest)
    }

  }, [authState.connectionRequest])

  return (
    <UserLayout>
      
        <DashboardLayout>
            <div style={{display: 'flex', flexDirection: "column", gap: "1.7rem"}}>
                
                <h3>My Connections</h3>
                {authState.connectionRequest.length === 0 && <h1>Connection Request Pending!</h1>}

                {authState.connectionRequest.length !== 0 && authState.connectionRequest.filter((connection) => connection.status_accepted === null).map((user, index) => {
                  return (
                    <div onClick={() => {
                      router.push(`/view_profile/${user.userId.username}`)
                    }} className={styles.userCard} key={index}>
                      <div style={{display: "flex", alignItems: "center", gap: '1.2rem', cursor: "pointer"}}>
                        <div className={styles.profilePicture}>

                          <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt='' />

                        </div>

                        <div className={styles.userInfo}>
                          <h3>{user.userId.name}</h3>
                          <p>{user.userId.username}</p>
                        </div>

                        <button onClick={(e) => {
                          e.stopPropagation();

                          dispatch(AcceptConnection( {
                            connectionId: user._id,
                            token: localStorage.getItem("token"),
                            action: "accept"
                          }))
                        }} className={styles.connectedButton}>Accept</button>

                      </div>

                    </div>
                  )
                })}

                <h3>My Network</h3>

                

                {authState.connectionRequest.filter((connection) => connection.status_accepted !== null).map((user, index) => {

                  return (

                    <div onClick={() => {
                      router.push(`/view_profile/${user.userId.username}`)
                    }} className={styles.userCard} key={index}>
                      <div style={{display: "flex", alignItems: "center", gap: '1.2rem', cursor: "pointer"}}>
                        <div className={styles.profilePicture}>

                          <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt='' />

                        </div>

                        <div className={styles.userInfo}>
                          <h3>{user.userId.name}</h3>
                          <p>{user.userId.username}</p>
                        </div>

                      </div>

                    </div>

                  )

                })}
            </div>
        </DashboardLayout>

    </UserLayout>
  )
}
