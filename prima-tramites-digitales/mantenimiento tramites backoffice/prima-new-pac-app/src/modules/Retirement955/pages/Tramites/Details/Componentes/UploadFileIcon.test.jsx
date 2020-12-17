import React from 'react';
import { mount } from 'enzyme';
import UploadFileIcon from './UploadFileIcon';
import addFile from '../../../../../../shared/images/iconos/add_file.svg';

describe('Test Tramites Detalle - Upload File Icon ', () => {
  let wrapper;

  test('Test de Loading', () => {
    wrapper = mount(<UploadFileIcon
      handleFile={() => { console.log('uploaded'); }}
      icon={addFile}
      accept="image/jpeg,image/jpg,image/png"
    />);

    expect(wrapper.find('div[className="add-file-box"]').exists()).toBe(true);
  });
});
