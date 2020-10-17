# Accordion

### Hace mucho mas fácil la organización de información por secciones en una pantalla gracias a su estructura desplegable.

![image](https://user-images.githubusercontent.com/32302890/95225912-f4ad1b00-07c1-11eb-953c-b2224f189085.png)

<br />

## Accordion Props

| Prop | Descripción | Default | Type |
|---|---|---|--|
|**`title`**|String que se muestra en la cabecera del componente. |null| `string`
|**`labelComponent`**|Componente que se renderiza en la cabecera del componente. |null| `Component`
|**`disableDefaultStyles`**|Permite desabilitar las propiedades del contenedor del cuerpo del acordeon. |`false`| `Boolean`

## Uso básico

```JSX
import Accordion from '../../../ubicación-del-archivo';

export default function SurvivorPension() {
  return (
      <Accordion
        title={'Importante'}
      >
        Se recomienda que el trámite incluya a todos...de los beneficiarios o apoderados.
      </Accordion>
  )
}
```

## Enviando un componente como header

```JSX
import Accordion, { StepSections, BulletedList, DoubleLabel } from '../../../ubicación-del-archivo';

export default function SurvivorPension() {
  return (
    <Accordion
    labelComponent={
        <DoubleLabel 
            title={'Beneficiario 01'}
            subtitle={'Álvares Perez Andrea Fernanda'}
        />
    }>
    Se recomienda que el trámite incluya a todos...de los beneficiarios o apoderados.
    </Accordion>
  )
}
```

## Enviando contenido al accordeon
El componente acordeon utiliza el `children` como parámetro para renderizar su contenido, lo que le da la flexibilidad de poder mostrar desde `strings` hasta componentes complejos.

```JSX
import Accordion, { StepSections, BulletedList, DoubleLabel } from '../../../ubicación-del-archivo';

export default function SurvivorPension() {
  return (
    <Accordion
        title={'Importante'}
    >
        Se recomienda que el trámite incluya a todos...de los beneficiarios o apoderados.
        <ComponenteEjemplo />
    </Accordion>
  )
}
```

## Componentes utilitarios

El accordion contiene dentro de si componentes utilitarios que pueden ser utilizados de forma independiente, a continuación la lista de los mismos:

- **StepSections:** Es una lista de ítems con un título principal.

    | Prop | Descripción | Default | Type |
    |---|---|---|--|
    |**`steps`**|Lista de strings. |`REQUIRED`| `object[]`

   ![image](https://user-images.githubusercontent.com/32302890/95228820-689cf280-07c5-11eb-834d-30da2b2a131b.png)

   ```JSX
    import { StepSections } from '../../../ubicación-del-accordeon';

    const steps = [
    {
        title: 'Al dar click en Iniciar trámite podrás completar esta etapa:',
        items: [ { title: 'Etapa 01:', description: 'Solicita el trámite de pensión' }]
    },
    {
        title: 'La siguiente etapa del trámite las podrás completar con el acompañamiento de la ejecutiva asignada.',
        items: [
          { title: 'Etapa 02:', description: 'Recibe la conformidad' },
          { title: 'Etapa 03:', description: 'Solicita las modalidades de pensión' },
          { title: 'Etapa 04:', description: 'Elige la modalidad de pensión' },
          { title: 'Etapa 05:', description: 'Recibe la pensión' }
        ]
    }
  ];

    export default function SurvivorPension() {
        return <StepSections steps={steps} />;
    }
    ```

- **BulletedList:** Es una lista de strings con viñetas.

    | Prop | Descripción | Default | Type |
    |---|---|---|--|
    |**`textList`**|Lista de strings. |[]| `string[]`
    |**`color`**|Color de las viñetas. |#FF4F00| `string`


    ![image](https://user-images.githubusercontent.com/32302890/95230352-63d93e00-07c7-11eb-85f2-7168666fc2f9.png)

    ```JSX
    import { BulletedList } from '../../../ubicación-del-accordeon';

    const itemList = [
        'Acta de defunción',
        'Certificado médico de defunción',
        'Atestado policial',
        'Certificado de necropsia'
    ];

    export default function SurvivorPension() {
        return <BulletedList textList={itemList} />;
    }
    ```

- **AccordionItemTitle:** Es un styled-component para títulos ubicados en el cuerpo del acordeon.

    ![image](https://user-images.githubusercontent.com/32302890/95235567-6342a680-07cb-11eb-95d0-57f257e8035c.png)

    ```JSX
        import { AccordionItemTitle } from '../../../ubicación-del-accordeon';

        export default function SurvivorPension() {
            return <AccordionItemTitle>Concubino(a):</AccordionItemTitle>;
        }
    ```


- **DoubleLabel:** Es una componente que muestra un antetítulo y un título principal. Este componente fue hecho principalmente para ser enviado como título en el componente acordeon.

    | Prop | Descripción | Default | Type |
    |---|---|---|--|
    |**`title`**| Antetítulo. |`REQUIRED`| `string`|
    |**`subtitle`**| Título principal. |`REQUIRED`| `string`|


    ![image](https://user-images.githubusercontent.com/32302890/95236430-89b51180-07cc-11eb-90a8-5a0ba03a6685.png)


    ```JSX
    import { DoubleLabel } from '../../../ubicación-del-accordeon';

    export default function SurvivorPension() {
        return <DoubleLabel title={'Beneficiario 01'} subtitle={'Álvares Perez Andrea Fernand'} />;
    }
    ```