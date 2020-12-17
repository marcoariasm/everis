# Material Input

### Input inspirado en el comportamiento y el diseño visual del componente input de Material UI.

![gif-input](https://user-images.githubusercontent.com/32302890/95356524-5df96080-088c-11eb-99ba-c6db81e74eba.gif)

<br />

## Material Input Props

| Prop | Descripción | Default | Type |
|---|---|---|--|
|**`initialValue`**|Valor inicial del input (Sólo se debe usar si no se esta empleando `react-hook-form` de lo contrario habrán problemas de performance). |''| `string`
|**`type`**|Tipo de input. Este componente tiene disponible un botón especial para ocultar y mostrar contraseñas en caso el input sea de tipo `password` | `text` | `string`
|**`placeholder`**|Texto que se mostrará como placeholder y label. |''| `string`
|**`containerStyles`**|Estilos que se aplican al contenedor del input, que de por si ya tiene un width del 100%. |{}| `object`
|**`onChange`**| Función que permite obtener el valor actual del componente desde un componente padre(Retorna el valor del input el cual es tipo `string`). |null| `function`
|**`autoComplete`**|Atributo que permite al browser predecir el valor. |`off`| `string<on || off>`
|**`name`**|Atributo `name` se le asigna al input. Es requerido si se va a trabajar con `react-hook-form` | '' | `string`
|**`getTarget`**| Sirve para obtener mas información del estado del input. Retorna un objeto: { target: { name, value, type } } | `false` | `Boolean`
|**`register`**|Register de los controladores de `react-hook-form` para el input. | undefined | `Function`
|**`className`**|Clases que serán aplicadas a el contenedor del componente. | '' | `string`

**Nota: Los valores por default no se recomienda usar cuando se esta empleando `react-hook-form` porque este de por si ya maneja internamente validaciones y estado del componente**

## Uso básico

```JSX
import MaterialInput from '../../../ubicación-del-archivo';

export default function SurvivorPension() {
  const [email, setEmail] = useState('');
  return (
      <MaterialInput
        onChange={setEmail}
        placeholder={'Correo electrónico'}
      />
  )
}
```

## Input tipo password

![image](https://user-images.githubusercontent.com/32302890/95359465-cac22a00-088f-11eb-9848-199900424d6e.png)


```JSX
import MaterialInput from '../../../ubicación-del-archivo';

export default function SurvivorPension() {
    const [password, setPassword] = useState('');

  return (
    <MaterialInput
        onChange={setPassword}
        placeholder={'Correo electrónico'}
        type={'password'}
    />
  )
}
```

