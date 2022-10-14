import { AppShell, Header, Navbar } from '@mantine/core'
import React from 'react'

function Page({children}) {
  return (
    <AppShell
    padding="md"
    header={<Header height={60} p="xs">
        <div style={{color: "black"}}>
            <div>
                NER
            </div>
        </div>
    </Header>}
    
  >
    {children}
  </AppShell>
  )
}

export default Page