// import { Rule, url, mergeWith } from '@angular-devkit/schematics'

// export function funcion2(): Rule {
//     return () => {

//         const sourceFile = url('../files');

//         return mergeWith(sourceFile);
//     };
// }

import { Rule, url, mergeWith, apply, template } from '@angular-devkit/schematics'
import { strings } from '@angular-devkit/core';

export interface Schema {
    name: string;
}

export function generateTemplate(options: Schema): Rule {
    return () => {

        const sourceFile = url('../files');

        const newSource = apply(sourceFile, [
            template({
                ...options,
                ...strings
            })
        ])

        return mergeWith(newSource);
    };
}