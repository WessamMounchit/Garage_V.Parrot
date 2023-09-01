import React from 'react'
import Helmet from '../components/Helmet'
import CommonSection from '../components/UI/CommonSection'
import FormContact from '../components/UI/FormContact'

const Contact = () => {
  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <FormContact />
    </Helmet>
  )
}

export default Contact