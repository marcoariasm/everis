const ProcedureDetailResponse = {
    "id": 2,
    "requestTypeId": 1,
    "requestType": "Actualización de datos",
    "requestCode": "ACTA-ASE-0000000002",
    "statusId": 1,
    "status": "ACCEPTED",
    "registerDate": "2020-10-14T17:29:53.833",
    "affiliate": {
        "documentType": "DNI",
        "documentNumber": "40404033",
        "firstName": "Juan",
        "secondName": null,
        "fatherLastname": "Perez",
        "motherLastname": "Gomez",
        "gender": "M",
        "birthdate": null,
        "maritialStatus": "S",
        "email": "jperez@gmail.com"
    },
    "applicant": null,
    "statuses": [
        {
            "id": 1,
            "name": "ACCEPTED",
            "registerDate": "2020-10-14T17:29:54.13"
        }
    ],
    "beneficiaries": [
        {
            "firstName": "Jorge",
            "secondName": null,
            "fatherLastname": "Quispe",
            "motherLastname": "Manrique",
            "documentType": "DNI",
            "documentNumber": "10101020",
            "relationship": 2,
            "gender": "H",
            "birthdate": null
        },
        {
            "firstName": "Ana",
            "secondName": null,
            "fatherLastname": "Manrique",
            "motherLastname": "Riquelme",
            "documentType": "DNI",
            "documentNumber": "60606060",
            "relationship": 2,
            "gender": "M",
            "birthdate": null
        }
    ],
    "documents": [
        {
            "id": 2,
            "idDocument": 1,
            "name": "Copia simple de antecedentes médicos",
            "idBeneficiary": 10002,
            "documentName": "nombre prueba",
            "documentCode": "codigo prueba",
            "registerDate": "2020-10-07T13:22:18"
        },
        {
            "id": 3,
            "idDocument": 1,
            "name": "Copia simple de antecedentes médicos",
            "idBeneficiary": null,
            "documentName": "nombre prueba",
            "documentCode": "codigo prueba",
            "registerDate": "2020-10-10T15:22:18"
        }
    ],
    "messages": [
        {
            "id": 9,
            "requestId": 1,
            "affiliateId": "1",
            "executiveId": null,
            "message": "mensaje de prueba requestId - 1",
            "documentName": "mensaje de prueba",
            "documentCode": null,
            "dateRegister": "17/10/2020"
            },
            {
            "id": 8,
            "requestId": 1,
            "affiliateId": "1",
            "executiveId": null,
            "message": "mensaje de prueba requestId - 1",
            "documentName": "mensaje de prueba",
            "documentCode": null,
            "dateRegister": "17/10/2020"
            }
    ]
}

export default ProcedureDetailResponse;