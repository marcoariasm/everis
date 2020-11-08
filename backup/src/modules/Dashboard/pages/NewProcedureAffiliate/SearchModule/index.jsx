import React from 'react'
import SearchBox from '../../../../GenericProcedures/components/SearchBox'

export default function SearchModule({ informationTramitesPersonales }) {
    return (
        <div>
            <SearchBox text={"Buscar trámite"}
                information={informationTramitesPersonales} />
        </div>
    )
}
