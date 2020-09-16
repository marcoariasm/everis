import React from 'react'
import FileUploader from 'global/components/Button/ButtonFileUpload/ButtonFileUpload'
import ButtonIcon from 'global/components/Button/ButtonIcono'
import {Button as ButtonImage} from "global/components/Button/ButtonImagen"
import {Button as ButtonLink} from 'global/components/Button/ButtonLink'
import {Button as ButtonNormal} from 'global/components/Button/ButtonNormal'
import {ButtonValidation} from 'global/components/Button/ButtonValidation'
import CheckBox from 'global/components/CheckBox/CheckBox'
import Input from 'global/components/Input/Input'
import CerrarSesion from 'global/components/Menu/components/CerrarSesion'
import Header from 'global/components/Menu/components/Header'
import Menu from 'global/components/Menu/components/Menu'
import Option from 'global/components/Menu/components/Option'
import Username from 'global/components/Menu/components/Username'
import Navbar from 'global/components/Menu/Navbar'
import {Modal} from 'global/components/Modal/index'
import {Modal as Modal2} from 'global/components/Modal/Modal'
import {ModalPac} from 'global/components/Modal/ModalPac'
import Paginator from 'global/components/Paginator/Paginator'
import RadioButton from 'global/components/RadioButton/RadioButton'
import Select from 'global/components/Select'
import Tab from 'global/components/Tabs/Tab'
import Tabs from 'global/components/Tabs/Tabs'

export default function Catalog () {
  render (
    <div>
      <h1>Buttons</h1>
        <FileUploader />
        <ButtonIcon />
        <ButtonImage />
        <ButtonLink />
        <ButtonNormal />
        <ButtonValidation />
      <h1>CheckBox</h1>
        <CheckBox />
      <h1>Input</h1>
        <Input />
      <h1>Menu</h1>
        <CerrarSesion />
        <Header/>
        <Menu></Menu>
        <Option></Option>
        <Username></Username>
        <Navbar></Navbar>
      <h1>Modal</h1>
        <Modal></Modal>
        <Modal2></Modal2>
        <ModalPac></ModalPac>
      <h1>Paginator</h1>
        <Paginator></Paginator>
      <h1>RadioButton</h1>
        <RadioButton></RadioButton>
      <h1>Select</h1>
        <Select></Select>
      <h1>Tabs</h1>
        <Tab></Tab>
        <Tabs></Tabs>
    </div>
  )
}