import { exec } from "child_process";

function runCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                reject(`stderr: ${stderr}`);
                return;
            }
            resolve(stdout);
        });
    });
}

// Example usage
runCommand('kill -9 $(lsof -ti:3000)')
    .then(output => console.log(output))
    .catch(err => console.error(err));

// Example usage
runCommand('nest start --watch')
    .then(output => console.log(output))
    .catch(err => console.error(err));