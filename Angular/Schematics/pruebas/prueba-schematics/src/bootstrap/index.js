"use strict";
exports.__esModule = true;
var tasks_1 = require("@angular-devkit/schematics/tasks");
var dependencies_1 = require("@schematics/angular/utility/dependencies");
function install() {
    return function (tree, context) {
        dependencies_1.addPackageJsonDependency(tree, {
            name: 'bootstrap',
            version: '4.6.0',
            type: dependencies_1.NodeDependencyType.Default
        });
        context.addTask(new tasks_1.NodePackageInstallTask());
        return tree;
    };
}
exports["default"] = install;
