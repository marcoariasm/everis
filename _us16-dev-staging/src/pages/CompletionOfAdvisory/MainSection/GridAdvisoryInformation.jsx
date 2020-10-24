import React from 'react'

import LegalMax100k from './LegalMax100k'
import RejaMin100k from './RejaMin100k'
import LegalMin100k from './LegalMin100k'

function GridAdvisoryInformation({ amount, perfil, ruc }) {
  return (
    <>
      {amount < 100000 && (
        <>
          {perfil === 'REJA' && <RejaMin100k ruc={ruc}/>}
          {perfil === 'LEGAL_AGE' && <LegalMin100k />}
        </>
      )}
      {amount >= 100000 && <LegalMax100k/>}
    </>
  )
}
export default GridAdvisoryInformation
