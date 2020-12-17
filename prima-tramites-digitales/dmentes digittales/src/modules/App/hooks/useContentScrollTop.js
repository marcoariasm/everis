import React, { useEffect } from 'react'

function useContentScrollTop() {
    useEffect(() => {
        document.getElementById("app-main-content").scrollTop = 0    
    })
    return
}

export default useContentScrollTop

