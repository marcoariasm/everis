"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = require("@angular-devkit/schematics/tasks");
const dependencies_1 = require("@schematics/angular/utility/dependencies");
const componentLibraries = {
    'bootstrap': "4.6.0",
    '@angular/material': '11.2.1'
};
function default_1(options) {
    return (tree, context) => {
        const componentLibrary = options.componentLibrary;
        const componentLibraryDependency = _nodeDependencyFactory(componentLibrary, componentLibraries[componentLibrary]);
        dependencies_1.addPackageJsonDependency(tree, componentLibraryDependency);
        context.addTask(new tasks_1.NodePackageInstallTask());
    };
}
exports.default = default_1;
function _nodeDependencyFactory(packageName, version) {
    return {
        type: dependencies_1.NodeDependencyType.Default,
        name: packageName,
        version: version,
        overwrite: true
    };
}
//# sourceMappingURL=index.js.map