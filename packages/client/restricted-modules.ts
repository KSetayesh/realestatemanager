/**
 * restricted-modules.ts
 * 
 * Purpose:
 * This file is used to prevent certain modules from being imported in the client-side code.
 * It ensures that restricted modules cannot be used in unintended environments by intercepting
 * imports and throwing a clear error message if an attempt is made to use them.
 * 
 * How It Works:
 * - The `restrictedModules` object defines a list of modules that are not allowed.
 * - A JavaScript Proxy (`restrictedProxy`) intercepts any attempts to import these modules.
 * - If a restricted module is accessed, an error message is thrown.
 * - If an unknown module (not listed) is accessed, a default error message is shown.
 * 
 * Usage:
 * - To restrict additional modules, simply add them to the `restrictedModules` object.
 * - Ensure this file is properly aliased in Vite (`vite.config.ts`) to redirect restricted imports.
 */

const restrictedModules = {
    '@realestatemanager/utilities': 'The module "@realestatemanager/utilities" is restricted and cannot be used in the client.',

    // Example: To restrict another module, uncomment and modify the line below
    // 'another-restricted-module': 'The module "another-restricted-module" is restricted and cannot be used in the client.',
};

// Dynamically throw an error when a restricted module is accessed
const restrictedHandler = {
    get(_, moduleName) {
        if (restrictedModules[moduleName]) {
            throw new Error(restrictedModules[moduleName]);
        }
        throw new Error(
            `The module "${moduleName}" is not available. Ensure it is listed as a dependency or is allowed to be imported.`
        );
    },
};

// Export a Proxy that intercepts import attempts and throws an error
const restrictedProxy = new Proxy({}, restrictedHandler);

export default restrictedProxy;
