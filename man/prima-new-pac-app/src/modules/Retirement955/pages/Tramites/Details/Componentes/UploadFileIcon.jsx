import React from 'react';
import PropTypes from 'prop-types';
import addFile from '../../../../../../shared/images/iconos/add_file.svg';

const UploadFileIcon = ({
  handleFile, icon, accept, disabled,
}) => {
  const randomID = Math.floor(Math.random() * 1000000000);
  const handleClick = () => {
    document.getElementById(`hiddenFileInput-${randomID}`).click();
  };
  const handleChange = () => {
    const { files } = document.getElementById(`hiddenFileInput-${randomID}`);
    handleFile({ name: files[0].name, fileID: `hiddenFileInput-${randomID}` });
  };
  return (
    <div className="add-file-box" onClick={handleClick}>
      <img src={icon} alt="Upload File" />
      {' '}
      Añadir archivo
      <input
        type="file"
        id={`hiddenFileInput-${randomID}`}
        onChange={handleChange}
        style={{ display: 'none' }}
        accept={accept}
        disabled={disabled}
        className="uploadFile-input"
      />
    </div>
  );
};

UploadFileIcon.propTypes = {
  handleFile: PropTypes.func,
  icon: PropTypes.string,
  accept: PropTypes.string,
  disabled: PropTypes.bool,
};

UploadFileIcon.defaultProps = {
  handleFile: PropTypes.func,
  icon: addFile,
  accept: 'image/jpeg,image/jpg,image/png',
  disabled: false,
};

export default UploadFileIcon;
