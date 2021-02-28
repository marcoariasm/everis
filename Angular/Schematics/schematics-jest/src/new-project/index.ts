import { normalize } from '@angular-devkit/core';
import { apply, 
    chain, 
    mergeWith, 
    move, 
    Rule, 
    url, 
    Tree, 
    SchematicContext, 
    externalSchematic 
} from '@angular-devkit/schematics';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies'


export function generateNewProject(_options: any): Rule {
    const name = _options.name;

    return (tree: Tree, _context: SchematicContext) => {
        const filesJestPuppeteer = apply(url('./files/config'), [
            move(normalize(`${name}/`))
        ]);

        const rule = chain([
            generateRepo(name),
            mergeWith(filesJestPuppeteer),
            installAllDependencies(name),
            updatePackageJson(name)
        ])

        return rule(tree, _context) as Rule;
    }
}

function installAllDependencies(name: string): Rule {
    return (tree: Tree) => {
        addDependencies(tree, name);

        return tree;
    };
}

function addDependencies(host: Tree, name: string): Tree {
    const dependencies: NodeDependency[] = [
        { type: NodeDependencyType.Default, version: '^26.6.3', name: 'jest' },
        { type: NodeDependencyType.Default, version: '^4.4.0', name: 'jest-puppeteer' },
        { type: NodeDependencyType.Default, version: '^7.1.0', name: 'puppeteer' },
        { type: NodeDependencyType.Default, version: '^26.6.3', name: 'jest-cli' }
    ];

    dependencies.forEach(dependency => addPackageJsonDependency(host, dependency, `${name}/package.json`));

    return host;
}

function generateRepo(name: string): Rule {
    return externalSchematic('@schematics/angular', 'ng-new', {
        name,
        version: '11.2.1',
        directory: name,
        routing: true,
        style: 'scss',
        inlineStyle: false,
        inlineTemplate: false
    });
}

function updatePackageJson(name: string): Rule {
    return (tree: Tree, _: SchematicContext): Tree => {
        const path = `/${name}/package.json`;
        const file = tree.read(path);
        const json = JSON.parse(file!.toString());

        json.scripts = {
            ...json.scripts,
            'test': 'jest',
        };

        tree.overwrite(path, JSON.stringify(json, null, 2));
        return tree;
    }
}
