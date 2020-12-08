# DropdownInput

### Componente que permite la agrupación visual y de estado de un select y un input.

![compuesto-input](https://user-images.githubusercontent.com/32302890/95360657-4cff1e00-0891-11eb-9b8d-94d2fde5e33b.gif)

<br />

## DropdownInput Props

| Prop | Descripción | Default | Type |
|---|---|---|--|
|**`containerStyles`**|Estilos que serán aplicados al contenedor del componente. |{}| `object`
|**`percentageWidth`**|Asigna un width en porcentajes al contenedor del componente. |100%| `string`
|**`placeholder`**|Texto que se mostrará como placeholder del input del componente compuesto. |null| `string`
|**`selectOptions`**|Lista de opciones que tendra el select perteneciente al componente. Cada opción es un objeto que contiene tres propiedades: (textContent: Texto que se visualizará en las opciones del select y en el contenedor principal del select al ser seleccionada la opción, value: El valor de la opción, shortContent: Si se proporciona, este será el que se muestre en el contenedor principal del select si la opción es seleccionada). |[]| `Array<Object>`
|**`onChange`**|Función que retorna un objeto con el estado del componente. |`{ inputValue: string }`| `string`
|**`selectWidth`**|Ancho del contenedor del select. |5em| `string`
|**`noPadding`**|Remueve el padding del contenedor del componente. |`false`| `boolean`
|**`name`**|Atributo `name` se le asigna al input del dropdown select. Es requerido si se va a trabajar con `react-hook-form` | '' | `string`
|**`selectName`**|Atributo `selectName` se le asigna al select del dropdown select. Es requerido si se va a trabajar con `react-hook-form` | '' | `string`
|**`registerInput`**|Register de los controladores de `react-hook-form` para el input del dropdown select. | undefined | `Function`
|**`registerSelect`**|Register de los controladores de `react-hook-form` para el select del dropdown select. | undefined | `Function`
|**`inputType`**|El `type` del input del dropdown select. |`text`| `string`
|**`numericInput`**|Restringe los valores del input a recibir sólo números (Esta propiedad solo funciona cuando no se está usando la librería `react-hook-form`, debido a que esta ya maneja este tipo de validaciones internamente). |`false`| `Boolean`
|**`defaultValueSelect`**|Asigna un valor inicial o por default a el select(Sólo se debe usar si no se esta empleando `react-hook-form` de lo contrario habrán problemas de performance). |''| `string`
|**`defaultValueInput`**|Asigna un valor inicial o por default a el select(Sólo se debe usar si no se esta empleando `react-hook-form` de lo contrario habrán problemas de performance). |''| `string`


**Nota: Los valores por default no se recomienda usar cuando se esta empleando `react-hook-form` porque este de por si ya maneja internamente validaciones y estado del componente**

## Uso básico

```JSX
import DropdownInput from '../../../ubicación-del-archivo';

const selectOptions = [
    { textContent: 'Documento de identidad', value: 'dni', shortContent: 'DNI' },
    { textContent: 'Carnet de extranjería', value: 'carnet', shortContent: 'CE' }
];

export default function SurvivorPension() {
    const [idDocument, setIdDocument] = useState({});
  return (
      <DropdownInput
        onChange={setIdDocument}
        selectOptions={selectOptions}
        placeholder={'Nro de documento'}
      />
  )
}
```
