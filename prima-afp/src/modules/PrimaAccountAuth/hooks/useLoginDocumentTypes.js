import React, {useEffect, useState} from "react";
import useDocumentType from "../../Retirement955/api/Login/useDocumentType";
export default function useLoginDocumentTypes() {
  const [selectOptions, setSelectOptions] = useState([{ name: '', value: '', shortName: '' }]);
  const { documentType } = useDocumentType({ authenticated: false });

  useEffect(() => {
    if (documentType.data) {
      const options = documentType.data.map((res) => {
        return {
          name: res.type,
          value: res.description,
          shortName: res.shortName,
        }
      })
      setSelectOptions(options)
    }
  }, [documentType.data])

  return {
    selectOptions
  };
};