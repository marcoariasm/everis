# MaterialCheckbox

### Componente checkbox estilo material design.

![checkbox-material](https://user-images.githubusercontent.com/32302890/95364084-fd6f2100-0895-11eb-9d04-a9c5071750a8.gif)

<br />

## MaterialCheckbox Props

| Prop | Descripción | Default | Type |
|---|---|---|--|
|**`label`**|String que se muestra como opción seleccionable. |null| `string`
|**`name`**|Nombre o ID asignado al checkbox. Es requerido si se va a trabajar con `react-hook-form`. |null| `string`
|**`radio`**|Permite cambiar la forma del checkbox a circular. |`false`| `Boolean`
|**`onChange`**|Permite obtener el valor del checkbox(Retorna un valor booleano). |null| `Function`
|**`register`**|Register de los controladores de `react-hook-form` para el select. | undefined | `Function`
|**`initialValue`**|Valor inicial del checkbox (Sólo se debe usar si no se esta empleando `react-hook-form` de lo contrario habrán problemas de performance). |`false`| `Boolean`

**Nota: Los valores por default no se recomienda usar cuando se esta empleando `react-hook-form` porque este de por si ya maneja internamente validaciones y estado del componente**

## Uso básico

```JSX
import MaterialCheckbox from '../../../ubicación-del-archivo';

export default function SurvivorPension() {
  return (
      <MaterialCheckbox name={'remember'} label={'Recuérdame'} />
  )
}
```

## Enviando un componente como label

```JSX
import MaterialCheckbox, { StepSections, BulletedList, DoubleLabel } from '../../../ubicación-del-archivo';

export default function SurvivorPension() {
  return (
    <MaterialCheckbox name={'remember'}>
      <LabelComponent />
    </MaterialCheckbox>
  )
}
```