import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '../../../components/DashboardHeader'

const Dashboard = () => {
  return (
    <div>
      <Container fluid className="mt-3 reduced-width-row">
        <Header HEADING={"Dashboard"} />
        </Container>
    </div>
  )
}

export default Dashboard
