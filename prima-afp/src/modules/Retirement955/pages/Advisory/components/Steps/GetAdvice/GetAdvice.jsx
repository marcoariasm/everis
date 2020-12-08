import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import ReactPlayer from 'react-player'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import { connect } from 'react-redux'

import { setViewVideo } from 'redux/actions/Advisor'

import { size } from 'global/styles/Responsive'

import WhiteCard from 'modules/shared/components/WhiteCard'
import PopPupWarning from 'modules/shared/components/PopPupValidation/PopPupWarning'
import Paginator from 'global/components/v1/Paginator/Paginator'
import Header from 'modules/Retirement955/pages/Advisory/components/Steps/GetAdvice/TitleSection/Header'

import Play from 'shared/images/play.svg'
import CloseVideo from 'shared/images/closeVideo.svg'
import BackgroundVideo from 'shared/images/backgroundVideo.svg'

const ContentPlay = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 27px;
  > div {
    display: flex;
    justify-content: center;
    align-content: center;
    background-image: url(${BackgroundVideo});
    background-repeat: no-repeat;
    background-position: center;
    width: 284px;
    height: 185px;
    box-shadow: 0px 2.5px 43px rgba(0, 0, 0, 0.04);
    border-radius: 15px;
    s > img {
      cursor: pointer;
    }
  }
  @media only screen and (min-width: ${size.tablet}) {
    margin-top: 50px;
    > div {
      width: 341px;
      height: 222px;
    }
  }
`
const Video = styled.div`
  display: flex !important;
  position: fixed;
  align-items: center;
  justify-content: center;
  animation: modal 0.2s;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgb(0, 0, 0, 70%);
  @keyframes modal {
    0% {
      transform: scale(0.1);
    }
    100% {
      transform: scale(1);
    }
  }
`
const ContentCloseVideo = styled.div`
  width: 100%;
  text-align: right;
  > div {
    height: 40px;
    > img {
      cursor: pointer;
      height: 40px;
    }
  }
`
const ContentVideo = styled.div`
  display: flex;
  width: 100%;
  margin: auto;
`

const GetAdvice = ({ setStep, viewVideo, setViewVideo }) => {
  const refModal = useRef()
  const widthDisplayLandscape = window.innerWidth * 0.9
  const heightDisplayLandscape = window.innerHeight * 0.8
  const widthDisplayMobile = window.innerWidth
  const heightDisplayMobile = window.innerHeight * 0.45
  const widthDisplayTablet = window.innerWidth * 0.65
  const [video, setVideo] = useState(false)
  const [validateVideo, setValidateVideo] = useState(viewVideo)
  const [validation, setValidation] = useState(false)
  const [redirection, setRedirection] = useState(false)
  const [showModalValidation, setShowModalValidation] = useState(false)
  const [messageValidation, setMessageValidation] = useState(null)

  const handleShowModalValidation = () => {
    setShowModalValidation(true)
  }

  const handleCloseModalValidation = () => {
    setShowModalValidation(false)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    window.addEventListener('click', hiddenModalIf)
    return () => {
      window.removeEventListener('click', hiddenModalIf)
    }
  })

  const hiddenModalIf = (e) => {
    if (e.target === refModal.current) {
      refModal.current.style.visibility = 'hidden'
      setVideo(false)
    }
  }
  const handleVideo = () => {
    setValidateVideo(true)
    setViewVideo(true)
  }
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

  const handleNextStep = () => {
    return true
  }
  const handleNextPage = (e) => {
    setMessageValidation('Es necesario reproducir el vídeo para continuar.')

    if (e === 'next') {
      if (validateVideo) {
        setValidation(true)
        setStep((step) => step + 1)
      } else {
        setValidation(false)
        handleShowModalValidation()
      }
    } else if (e === 'return') {
      setRedirection(true)
    }
  }

  return (
    <>
      {ReactDOM.createPortal(
        <PopPupWarning
          widthB="170px"
          heightB="45px"
          marginT="50px"
          marginB="40px"
          justifyContent="center"
          nameButton="Entendido"
          hideButtonCancel={true}
          show={showModalValidation}
          onClose={handleCloseModalValidation}
          onClick={handleCloseModalValidation}
          texto={messageValidation}
        />,
        document.getElementById('modal')
      )}
      <WhiteCard>
        <Header />
        <ContentPlay>
          <div onClick={handleVideo}>
            <img src={Play} alt="Play Vídeo" onClick={() => setVideo(true)} />
          </div>
        </ContentPlay>
        {video && (
          <Video ref={refModal}>
            <div>
              <ContentCloseVideo>
                <div>
                  <img src={CloseVideo} alt="Cerrar vídeo" onClick={() => setVideo(false)}></img>
                </div>
              </ContentCloseVideo>
              <ContentVideo>
                <div>
                  {isPortrait ? (
                    isTabletOrMobile ? (
                      <ReactPlayer
                        width={`${widthDisplayMobile}px`}
                        height={`${heightDisplayMobile}px`}
                        url="https://www.youtube.com/watch?v=7ySKyXVoGCE"
                        controls={true}
                        playing={true}
                      />
                    ) : (
                      <ReactPlayer
                        width={`${widthDisplayTablet}px`}
                        url="https://www.youtube.com/watch?v=7ySKyXVoGCE"
                        controls={true}
                        playing={true}
                      />
                    )
                  ) : (
                    <ReactPlayer
                      width={`${widthDisplayLandscape}px`}
                      height={`${heightDisplayLandscape}px`}
                      url="https://www.youtube.com/watch?v=7ySKyXVoGCE"
                      controls={true}
                      playing={true}
                    />
                  )}
                </div>
              </ContentVideo>
            </div>
          </Video>
        )}
      </WhiteCard>
      <MediaQuery maxDeviceWidth={375}>
        <Paginator
          widthB="120px"
          heightB="45px"
          backTo="/proceso95-5/homeAdvice"
          nextTo="/proceso95-5/advisory"
          step="first"
          setStep={setStep}
          next={handleNextStep}
          validation={validation}
          onClick={handleNextPage}
        />
      </MediaQuery>
      <MediaQuery minDeviceWidth={376}>
        <Paginator
          widthB="138px"
          heightB="45px"
          backTo="/proceso95-5/homeAdvice"
          nextTo="/proceso95-5/advisory"
          step="first"
          setStep={setStep}
          next={handleNextStep}
          validation={validation}
          onClick={handleNextPage}
        />
      </MediaQuery>

      {redirection && <Redirect to="/proceso95-5/homeAdvice"></Redirect>}
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    viewVideo: state.viewVideo,
  }
}
const mapDistpatchToProps = {
  setViewVideo,
}
export default connect(mapStateToProps, mapDistpatchToProps)(GetAdvice)
