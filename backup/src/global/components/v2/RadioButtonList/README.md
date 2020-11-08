# Radio Button list

### Componente que permite trabajar con listas de radio buttons.


![radio-btn](https://user-images.githubusercontent.com/32302890/95870327-fdf23680-0d31-11eb-9cd7-311a2ce8d062.gif)

<br />

## RadioButtonList Props

| Prop | Descripción | Default | Type |
|---|---|---|--|
|**`items`**|Lista de opciones que se mostrarán en los radio buttons. |[]| `Array<object>`
|**`className`**|Clases que se le asignan al contenedor de la lista de radio buttons. |''| `string`
|**`onChange`**|Función que recibe el valor activo de la lista. |undefined| `Function`

## Uso básico

```JSX
import RadioButtonList from '../../../ubicación-del-archivo';

const amIBeneficiary = [
  { value: 'yes', label: 'Si' },
  { value: 'no', label: 'No' }
]

export default function SurvivorPension() {
    const [isBeneficiary, setIsBeneficiary] = useState();
  return (
      <RadioButtonList
        onChange={setIsBeneficiary}
        className="radio-button-container"
        items={amIBeneficiary}
      />
  )
}
```