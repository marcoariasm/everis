"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNewProject = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const dependencies_1 = require("@schematics/angular/utility/dependencies");
function generateNewProject(_options) {
    const name = _options.name;
    return (tree, _context) => {
        const filesJestPuppeteer = schematics_1.apply(schematics_1.url('./files/config'), [
            schematics_1.move(core_1.normalize(`${name}/`))
        ]);
        const rule = schematics_1.chain([
            generateRepo(name),
            schematics_1.mergeWith(filesJestPuppeteer),
            installAllDependencies(name),
            updatePackageJson(name)
        ]);
        return rule(tree, _context);
    };
}
exports.generateNewProject = generateNewProject;
function installAllDependencies(name) {
    return (tree) => {
        addDependencies(tree, name);
        return tree;
    };
}
function addDependencies(host, name) {
    const dependencies = [
        { type: dependencies_1.NodeDependencyType.Default, version: '^26.6.3', name: 'jest' },
        { type: dependencies_1.NodeDependencyType.Default, version: '^4.4.0', name: 'jest-puppeteer' },
        { type: dependencies_1.NodeDependencyType.Default, version: '^7.1.0', name: 'puppeteer' }
    ];
    dependencies.forEach(dependency => dependencies_1.addPackageJsonDependency(host, dependency, `${name}/package.json`));
    return host;
}
function generateRepo(name) {
    return schematics_1.externalSchematic('@schematics/angular', 'ng-new', {
        name,
        version: '11.2.1',
        directory: name,
        routing: true,
        style: 'scss',
        inlineStyle: false,
        inlineTemplate: false
    });
}
function updatePackageJson(name) {
    return (tree, _) => {
        const path = `/${name}/package.json`;
        const file = tree.read(path);
        const json = JSON.parse(file.toString());
        json.scripts = Object.assign(Object.assign({}, json.scripts), { 'test': 'jest' });
        tree.overwrite(path, JSON.stringify(json, null, 2));
        return tree;
    };
}
//# sourceMappingURL=index.js.map