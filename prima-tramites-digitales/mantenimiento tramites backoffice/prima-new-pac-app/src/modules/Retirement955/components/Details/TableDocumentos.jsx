import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Tooltip from 'global/components/v1/Tooltip/Tooltip';
import {
  isEmpty, prop, propEq, find,
} from 'ramda';
import downloadIcon from '../../../../shared/images/iconos/download.svg';
import loading from '../../../../shared/images/loading.svg';

class TableDocumentos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDownloading: [],
      reversedDocuments: props.documents.reverse(),
    };
  }

  setDownloading(item, action = 'add') {
    const {
      isDownloading,
      reversedDocuments,
    } = this.state;
    const a = isDownloading;
    if (action === 'add') {
      a.push(item.financialAdviceDocumentId);
    } else {
      a.splice(a.indexOf(item.financialAdviceDocumentId), 1);
    }

    this.setState({
      isDownloading: a,
    }, () => {
      isDownloading.forEach((itemD) => {
        const b = find(propEq('financialAdviceDocumentId', itemD))(reversedDocuments);
        this.downloadFile(b);
      });
    });
  }

  downloadFile(reason) {
    const self = this;
    const { cuspp } = this.props;
    fetch(
      `${process.env.REACT_APP_API_URL}/document-manager/download?affiliateId=${cuspp}&fileType=${reason.type}&storageId=${reason.storageId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${prop('accessToken', JSON.parse(sessionStorage.getItem('user')))}`,
        },
      },
    )
      .then((response) => response.blob())
      .then((data) => {
        self.setDownloading(reason, 'remove');
        const blob = new Blob([data], { type: reason.storageId.indexOf('jpg') >= 0 ? 'image/jpg' : 'application/pdf' });
        const blobURL = URL.createObjectURL(blob);
        window.open(blobURL);

        self.setDownloading(reason, false);
      });
  }

  render() {
    const {
      showTitle,
      documentData,
      isReja,
    } = this.props;

    const {
      reversedDocuments,
      isDownloading,
    } = this.state;

    return (
      <div className="table validacion-documentos">
        {showTitle && <h2 className="sub-title">Documentación del Trámite</h2>}
        <div className="table-header">
          <div className="table-header-items">
            <div className="table-item column1">
              Fecha
            </div>
            <div className="table-item column2">
              Tipo de documento
            </div>
            <div className="table-item column3">
              Nombre del documento
            </div>
            <div className="table-item column4">
              Acciones
            </div>
          </div>
        </div>
        {isEmpty(reversedDocuments) && isReja && (
          <div className="table-body table-empty">
            <div className="table-item column1">
              {documentData.noDocumentValidationDate}
            </div>
            <div className="table-item column2">
              Indicador
            </div>
            <div className="table-item column3">
              DJ de no RUC
            </div>
            <div className="table-item column4" />
          </div>
        )}
        {isEmpty(reversedDocuments) === false && reversedDocuments.map((value) => (
          <div className="table-body" key={value.financialAdviceDocumentId}>
            <div className="table-item column1">
              {value.attachmentDate ? moment(value.attachmentDate).format('DD/MM/YYYY') : '- -'}
            </div>
            <div className="table-item column2">
              {value.typeName}
            </div>
            <div className="table-item column3">
              {value.typeName === 'Constancia de Rentas de 4ta Categoría'
                ? 'Reporte Tributario de Rentas de Cuarta Categoria'
                : value.typeName}
            </div>
            <div
              className="table-item column4"
            >
              <Tooltip tooltip="Visualizar documento">
                {isDownloading.includes(value.financialAdviceDocumentId)
                  ? (
                    <img
                      src={loading}
                      alt="Loading"
                      className="is-loading"
                    />
                  )
                  : (
                    <div role="button">
                      <img
                        src={downloadIcon}
                        alt="Pop Doc"
                        onClick={() => this.setDownloading(value)}
                      />
                    </div>
                  )}
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default TableDocumentos;

TableDocumentos.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.object),
  documentData: PropTypes.objectOf(PropTypes.string),
  cuspp: PropTypes.string,
  showTitle: PropTypes.bool,
  isReja: PropTypes.bool,
};

TableDocumentos.defaultProps = {
  documents: {},
  documentData: { pending: true, validationDate: '- -' },
  cuspp: null,
  showTitle: true,
  isReja: false,
};
