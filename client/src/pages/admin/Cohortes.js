import React from 'react'
import { useQuery } from '@apollo/client';
import { TabCohortes } from 'components/TabCohortes';
import COHORTES from 'apollo/querys/cohortes'

function Cohortes({ className }) {
  const { loading, error, data } = useQuery(COHORTES);
  return (
    <div className={className}>
      <TabCohortes data={data} />
    </div>
  )
}

export default Cohortes
