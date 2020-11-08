# Material Select

### Input inspirado en el comportamiento y el diseño visual del componente input de Material UI. Especial para fechas.


![select](https://user-images.githubusercontent.com/32302890/95689715-501f4480-0bd8-11eb-9fd7-b08b1816c38f.gif)

<br />

## Material Select Props

| Prop | Descripción | Default | Type |
|---|---|---|--|
|**`optionsContainerStyles`**|Estilos que se aplican a el contenedor de las opciones desplegables, aqui se le puede asignar el margin o padding necesarios para que se posicione en el lugar deseado. |{}| `object`
|**`selectWidth`**| El ancho del contenedor principal del select. | `100%` | `string`
|**`selectOptions`**|Lista de opciones que tendra el select. Cada opción es un objeto que contiene tres propiedades: (textContent: Texto que se visualizará en las opciones del select y en el contenedor principal del select al ser seleccionada la opción, value: El valor de la opción, shortContent: Si se proporciona, este será el que se muestre en el contenedor principal del select si la opción es seleccionada). |[]| `Array<Object>`
|**`onChange`**|Función que recibirá el estado actual del select. |undefined| `Function`
|**`placeholder`**| Valor que se mostrará por default en el select en caso ninguna opción este seleccionada. |undefined| `string`
|**`fontFamily`**|Fuente de texto que se le asignará al texto que está en el contenedor principal. | 'Calibri' | `string`
|**`name`**|Atributo `name` se le asigna al select. Es requerido si se va a trabajar con `react-hook-form` | '' | `string`
|**`initialValue`**|Asigna un valor inicial o por default a el select(Sólo se debe usar si no se esta empleando `react-hook-form` de lo contrario habrán problemas de performance). |default| `string`
|**`register`**|Register de los controladores de `react-hook-form` para el select. | undefined | `Function`

**Nota: Los valores por default no se recomienda usar cuando se esta empleando `react-hook-form` porque este de por si ya maneja internamente validaciones y estado del componente**

## Uso básico (Sin contenedor)
En este caso al no tener contenedor la sección desplegable del select prodría no ubicarse en la posición esperada.

```JSX
import MaterialDateInput from '../../../ubicación-del-archivo';

export default function SurvivorPension() {

  return (
    <MaterialDateInput
        placeholder={'Fecha de nacimiento'}
     />
  )
}
```

## Uso con contenedor (styled-component)
El componente MaterialSelect tiene internamente un styled-component que esta listo para usar como contenedor `OutlinedSelectContainer`.

## OutlinedSelectContainer props

| Prop | Descripción | Default | Type |
|---|---|---|--|
|**`width`**| Asigna un ancho al contenedor. |`100%`| `string`

```JSX
import MaterialSelect, { OutlinedSelectContainer } from '../../../ubicación-del-archivo';

const idDocumentOptions = [
    { textContent: 'Documento de identidad', value: 'dni', shortContent: 'DNI' },
    { textContent: 'Carnet de extranjería', value: 'carnet', shortContent: 'CE' }
];

export default function SurvivorPension() {

  return (
    <OutlinedSelectContainer>
      <MaterialSelect selectOptions={idDocumentOptions} />
    </OutlinedSelectContainer>
  )
}
```


