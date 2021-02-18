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
                name: options.name,
                // ...options,
                ...strings
            })
        ])

        return mergeWith(newSource);
    };
}