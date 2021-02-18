import { Tree, SchematicContext, Rule } from '@angular-devkit/schematics';

export function funcion(): Rule {
  return (tree:Tree, context: SchematicContext) => {

    context.logger.info('soy la funcion de schematics hola');
    tree.create('alvaro.ts', 'console.log("hola mundo")');
  
    return tree;
  };
}