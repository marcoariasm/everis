import React, { useMemo, useState } from "react"

const ModalConfirmContext = React.createContext()

export function ModalConfirmLeaveProvider(props) {
  const [showConfirmModalLeave, setShowConfirmModalLeave] = useState(false)
  const [isHoldNavigation, setHoldNavigation] = useState(false)
  const [holdEvents, setHoldEvents] = useState({ onHoldNavigationOk: () => {} })
  const [confirmContent, setConfirmContent] = useState({ title: '', content: ''} )

  const interceptorHoldNavigation = (onHoldNavigationOk) => {
    if (!isHoldNavigation) {
      onHoldNavigationOk()
    } else {
      setShowConfirmModalLeave(true);
      setHoldEvents({ onHoldNavigationOk })
    }
  };

  const hideConfirmModalLeave = () => {
    setShowConfirmModalLeave(false)
    setTimeout(() => {
      setHoldNavigation(false);
      holdEvents.onHoldNavigationOk()
    }, 500);
  };

  const cancelConfirmModalLeave = () => {
    setShowConfirmModalLeave(false)
  };

  const modalData = useMemo(() => ({
    showConfirmModalLeave,
    hideConfirmModalLeave,
    cancelConfirmModalLeave,
    setHoldNavigation,
    interceptorHoldNavigation,
    setConfirmContent,
    confirmContent
  }), [isHoldNavigation, showConfirmModalLeave]);

  return <ModalConfirmContext.Provider value={modalData} {...props} />
};

export function useModalConfirmLeave() {
  const context = React.useContext(ModalConfirmContext)
  if (!context) {
    throw new Error('ModalConfirmContext provider is required')
  }
  return context
}
