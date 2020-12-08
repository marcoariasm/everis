import React, { useState } from 'react'
import { fieldValidationConstraint } from 'modules/shared/constant/ParametersValidation'
import { validatedDocumentType, validateTextLogin } from 'modules/shared/helpers/HelperForm'
import {isEmpty, prop} from 'ramda'
import { textLogin } from 'modules/PrimaAccountAuth/constant/ConstLogin'
import Input from 'global/components/v2/InputV2'
import DropdownInput from 'global/components/v1/DropdownInput'
import Button from 'global/components/v1/Button/ButtonNormal/Button'
import WallpaperPageContainer from '../../components/WallpaperPageContainer/WallpaperPageContainer';
import LoadingSpinner from 'global/components/v2/Loading';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import useLogin from '../../hooks/useLogin';
import useLoginDocumentTypes from '../../hooks/useLoginDocumentTypes';

import {
	FormContainer,
	AffiliateForm,
	ContentDataForm,
	ContentForm,
	ContentTitle,
	ContentSubTitle,
	Line,
	RecoverAccountSection,
	ButtonContainer,
	UrlStyles,
} from './styles'

import Alert from 'global/components/v1/Alert/Alert'

const Login = () => {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const { loginSubmit, loading, error } = useLogin();
	const { selectOptions } = useLoginDocumentTypes();

	const [password, setPassword] = useState('')
	const [document, setDocument] = useState('')
	const [documentTypeSelected, setDocumentTypeSelected] = useState(null)

	const handleAuth = async () => {
		const token = await executeRecaptcha('login')
		loginSubmit({ token, documentTypeSelected, document, password });
	}

	const documentNumberHandleChange = (event) => {
		if (validateTextLogin(event, documentTypeSelected.name)) {
			setDocument(event.target.value);
		}
	}

	const checkDocumentTypeLength = (type) => validatedDocumentType(type);
	const handleSelectChange = (event) => {
		setDocumentTypeSelected(event);
		setDocument('');
	};

	return (
		<WallpaperPageContainer>
			<FormContainer>
				<ContentForm>
					<ContentDataForm>
						<ContentSubTitle> {textLogin.subtitle} </ContentSubTitle>
						<ContentTitle>{textLogin.title}</ContentTitle>
						<Line />
						<AffiliateForm>
							<DropdownInput
								onChangeInput={documentNumberHandleChange}
								onChangeSelect={handleSelectChange}
								disabledInput={loading}
								defaultSelectValue={documentTypeSelected}
								inputValue={document}
								idInput='documentNumber'
								selectOptions={selectOptions}
								placeholder={textLogin.dropdownPlaceholder}
								textError='Ingresa tu número de documento'
								maxLength={checkDocumentTypeLength(prop('name', documentTypeSelected)).length}
								className='dropdownID'
							/>
							<Input
								label='Contraseña (Clave web)'
								type='password'
								id='pass'
								placeholder={textLogin.passwordPlaceholder}
								name='password'
								theme2={true}
								textError='Ingresa tu contraseña'
								value={password}
								disabled={loading}
								onChange={(e) => setPassword(e.target.value)}
								className='dropdownInput'
								maxLength={fieldValidationConstraint.password.maxLength}
							/>

							{!loading && error && <Alert type='error' message={error} />}
							{loading ? (
								<LoadingSpinner className="small-spinner">Cargando...</LoadingSpinner>
							) : (
								<RecoverAccountSection>
									<div>
										<UrlStyles className='informationFooterText link' href={textLogin.link1} target='_blank'>
											{textLogin.forgotPassword}
										</UrlStyles>
									</div>
								</RecoverAccountSection>
							)}

							{
								!loading && <ButtonContainer>
									<Button
										classButton='btn-pagina-principal'
										widthB='100%'
										heightB='45px'
										onClick={handleAuth}
										disabled={isEmpty(document) || isEmpty(password) || loading}>
										Ingresar
									</Button>
								</ButtonContainer>
							}
						</AffiliateForm>
					</ContentDataForm>
				</ContentForm>
			</FormContainer>
		</WallpaperPageContainer>
	)
}

export default Login
