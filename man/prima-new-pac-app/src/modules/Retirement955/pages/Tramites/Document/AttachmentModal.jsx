import React, { Component } from 'react';
import Select from 'global/components/v1/SelectMaterial';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

import './document.sass';
import Button from 'global/components/v1/Button/Button';
import tryAgainIcon from 'shared/images/iconos/intentardenuevo.svg';
import documentIcon from 'shared/images/iconos/documento.svg';
import CloseIcon from 'shared/images/iconos/close.svg';

class AttachmentModal extends Component {
  constructor(props) {
    super(props);

    const statusOptions = [
      {
        value: 'Aceptado',
        label: 'Aceptado',
      },
      {
        value: 'Rechazado',
        label: 'Rechazado',
      },
    ];

    if (this.props.documentStatus !== 'Pendiente') {
      statusOptions.splice(2, 0, { value: 'Observado', label: 'Obaservado' });
    }

    this.state = {
      StatusOptions: statusOptions,
      hasErrors: false,
      disableUpload: true,
      uploadState: 'initial',
      upload: {
        name: '',
        progress: 0,
        total: 0,
      },
      status: '',
      activateSubmit: false,
    };

    this.onDrop = this.onDrop.bind(this);
    this.onDropRejected = this.onDropRejected.bind(this);
    this.restoreUpload = this.restoreUpload.bind(this);
    this.onSave = this.onSave.bind(this);
    this.changeStatusOption = this.changeStatusOption.bind(this);
  }

  onDrop(acceptedFiles) {
    this.setState({ hasErrors: false, uploadState: 'uploading' });
    if (acceptedFiles.length > 0) {
      const uploadState = {
        name: acceptedFiles[0].name,
        progress: 0,
        total: 0,
      };

      this.setState({
        upload: uploadState,
        disableUpload: true,
      });

      const simulateUpload = setInterval(() => {
        uploadState.progress += Math.floor(Math.random() * 10) + 1;

        if (uploadState.progress >= 100) {
          clearInterval(simulateUpload);
        }
        this.setState({
          upload: uploadState,
        });
      }, 500);
    }
  }

  onDropRejected(rejectedFiles) {
    if (rejectedFiles[0].errors[0].code === 'file-too-large') {
      this.setState({ hasErrors: true, uploadState: 'FileSizeError' });
    }
  }

  restoreUpload() {
    this.setState({
      hasErrors: false,
      uploadState: 'initial',
      upload: {
        name: '',
        progress: 0,
        total: 0,
      },
      disableUpload: false,
    });
  }

  onSave() {
    this.props.onClick(this.state.upload);
    this.props.onClose();
  }

  changeStatusOption(event) {
    this.setState({ status: event.target.value, disableUpload: false });
  }

  render() {
    return (
      <>
        <p className="title">
          <strong>
            {this.props.documentStatus === 'Pendiente'
              ? '¿Deseas actualizar este documento?'
              : '¿Deseas reactivar esta solicitud?'}
          </strong>
        </p>
        <div className="status">
          <div className="status-item">
            <div className="label">ID Documento</div>
            <div className="value">123456789012345678901</div>
          </div>
          <div className="status-item">
            <div className="label">Nombre documento</div>
            <div className="value">Nombre asignado</div>
          </div>
          <div className="status-item">
            <div className="label">Estado</div>
            <div className="value-select">
              <Select
                options={this.state.StatusOptions}
                placeholder="Selecciona estado"
                onChange={(e) => this.changeStatusOption(e)}
                width={224}
              />
            </div>
          </div>
        </div>
        <div className={classNames('custom-dropzone',
          { hasError: this.state.hasErrors })}
        >
          <Dropzone
            onDrop={this.onDrop}
            onDropRejected={this.onDropRejected}
            accept={['image/jpg', 'image/jpeg', 'application/pdf']}
            maxSize={5242880}
            multiple={false}
            disabled={this.state.disableUpload}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {this.state.uploadState === 'initial' && (
                  <>
                    <p className="title">Cargar nuevo documento</p>
                    <p>
                      El peso del documento no debe exceder de 5MB. y
                      deben ser de extensión: .pdf o .jpg.
                        </p>
                    <p>
                      Arrastra y suelta el archivo o da clic en el
                      botón
                        </p>
                    <p>
                      <Button
                            className="add"
                            disabled={this.state.disableUpload}
                          >
                            Subir Archivo
                          </Button>
                    </p>
                  </>
                  )}
                  {this.state.uploadState === 'FileSizeError' && (
                  <>
                    <img src={tryAgainIcon} alt="Try again" />
                    <p>
                      <strong>
                            El archivo excede el peso
                            permitido.
                          </strong>
                      Intentar cargar el documento nuevamente
                        </p>
                  </>
                  )}
                  {this.state.uploadState === 'uploading' && (
                  <>
                    <div className="file-progress-container">
                      <img src={documentIcon} alt="Try again" />
                      <div className="file-progress-info">
                            <div className="file-progress-data">
                              <div
                                className="file-progress-name"
                              >
                                {this.state.upload.name}
                              </div>
                              <div className="file-progress-percentage">
                                {this.state.upload.progress < 100
                                    && (
                                    <>
                                      Cargado...
                                      {this.state.upload.progress}
                                      %
                                    </>
                                    )}
                                {this.state.upload.progress >= 100 && (
                                <>
                                  <img
                                    src={CloseIcon}
                                    alt="cancel"
                                    className="cancel-button"
                                    onClick={this.restoreUpload}
                                  />
                                </>
                                )}
                              </div>
                            </div>
                            {this.state.upload.progress < 100 && (
                            <div className="file-progress-bar">
                              <div
                                className="file-progress-bar-progress"
                                style={{
                                  width: `${this.state.upload.progress
                                  }%`,
                                }}
                              />
                            </div>
                            )}
                          </div>
                    </div>
                  </>
                  )}
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="footer">
          <Button
            customStyle={{ width: '170px' }}
            className="action"
            onClick={() => {
              this.props.onClose();
            }}
          >
            Cancelar
          </Button>
          <Button
            disabled={this.state.upload.progress < 100}
            onClick={this.onSave}
          >
            Guardar
            Cambios
          </Button>
        </div>
      </>
    );
  }
}

export default AttachmentModal;
