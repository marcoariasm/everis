# Material Date Input

### Input inspirado en el comportamiento y el diseño visual del componente input de Material UI. Especial para fechas.

![date-input](https://user-images.githubusercontent.com/32302890/95689117-4dbaeb80-0bd4-11eb-9739-f4979c4c2943.gif)

<br />

## Material Input Props

| Prop | Descripción | Default | Type |
|---|---|---|--|
|**`initialValue`**|Valor inicial del input. Se espera un valor con el siguiente formato: `15/05/1998` |''| `string`
|**`type`**|Tipo de input. Este componente tiene disponible un botón especial para ocultar y mostrar contraseñas en caso el input sea de tipo `password` | `text` | `string`
|**`placeholder`**|Texto que se mostrará como placeholder y label. |''| `string`
|**`containerStyles`**|Estilos que se aplican al contenedor del input, que de por si ya tiene un width del 100%. |{}| `object`
|**`onChange`**| Función que permite obtener el valor actual del componente desde un componente padre(Retorna el valor del input el cual es tipo `string`). |null| `function`
|**`name`**|Atributo `name` se le asigna al input. Es requerido si se va a trabajar con `react-hook-form` | '' | `string`
|**`getTarget`**| Sirve para obtener mas información del estado del input. Retorna un objeto: { target: { name, value, type } } | `false` | `Boolean`
|**`register`**|Register de los controladores de `react-hook-form` para el input. | undefined | `Function`

**Nota: Los valores por default no se recomienda usar cuando se esta empleando `react-hook-form` porque este de por si ya maneja internamente validaciones y estado del componente**

## Uso básico

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


