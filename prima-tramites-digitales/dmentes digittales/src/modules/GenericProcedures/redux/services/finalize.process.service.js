import SharedModule from 'modules/shared/index';
const { libs: { AppSession, ServiceFetcher } } = SharedModule;

export const finaliceProcessService = {
  finalizeProcess
}

function finalizeProcess(captchaToken, documentType, document, password) {
  return ServiceFetcher('/financial-advices', {
    method: 'POST',
    body: { 
        "statements": [
          {
            "accepted": true,
            "statement": "string"
          }
        ],
        "storageId": "string"
    }
  })
    .then(response => {
      console.log('finalizeProcess', response)
    })
  }