# Material Uploader

### Componente uploader, lista documentos, elimina, descarga y contiene un loader de carga.

![image](https://user-images.githubusercontent.com/32302890/95782185-f29cfd80-0c94-11eb-83fc-573912e8ed25.png)

<br />

## Material Uploader Props

| Prop | Descripción | Default | Type |
|---|---|---|--|
|**`loading`**|Muestra en la parte inferior un loader intermitente. |`false`| `boolean`
|**`error`**|Objeto que contiene los textos que se mostraran en caso de error: { error: string, advice: string } |null| `object`
|**`files`**|Lista de documento a mostrar. Estructure de cada documento: { name: string, size: string } |[]| `Array<object>`
|**`onChange`**|Permite obtener el valor del uploader(Retorna la lista de documentos). |null| `Function`
|**`deleteFile`**|Función que se ejecuta al darle click al boton de los tachitos en la lista de documentos. |null| `Function`
|**`description`**|Descripción que se mostrará como texto principal en el uploader. |''| `string`
|**`btnLabel`**|Texto que se mostrará como label del boton de upload. |''| `string`

## Uso básico

```JSX
import MaterialUploader from '../../../ubicación-del-archivo';

export default function SurvivorPension() {

const documents = [
  {
      name: 'identity-document.jpg',
      size: '153Kb'
  },
  {
      name: 'acta-de-nacimiento.pdf',
      size: '153Kb'
  },
  {
      name: 'acta.jpg',
      size: '153Kb'
  }
]

  return (
      <MaterialUploader
        files={documents}
        loading={false}
        description={'Copia de documento de identidad de persona que realizó el gasto}
        btnLabel={'Subir archivo'}
      />
  )
}
```