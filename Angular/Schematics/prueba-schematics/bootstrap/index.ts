import { Tree, SchematicContext, Rule } from '@angular-devkit/schematics'
import {  NodePackageInstallTask } from '@angular-devkit/schematics/tasks'
import { addPackageJsonDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies'

export default function install(): Rule {
    return (tree: Tree, context: SchematicContext) => {

        addPackageJsonDependency(tree, {
            name: 'bootstrap',
            version: '4.6.0',
            type: NodeDependencyType.Default
        });

        context.addTask(new NodePackageInstallTask());

        return tree;
    };
}