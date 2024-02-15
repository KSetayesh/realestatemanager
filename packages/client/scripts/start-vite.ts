// start-vite.ts
import { spawn } from 'child_process';

// Start the Vite dev server using ts-node
const vite = spawn('npx', ['vite'], {
    stdio: 'pipe',
    env: process.env,
});

vite.stdout.on('data', (data: Buffer) => {
    process.stdout.write(data);

    // Parse the output to find the port number and log it
    const match = data.toString().match(/http:\/\/localhost:(\d+)/);
    if (match) {
        console.log(`Vite server is running on port: ${match[1]}`);
    }
});

vite.stderr.on('data', (data: Buffer) => {
    process.stderr.write(data);
});

vite.on('close', (code: number) => {
    console.log(`Vite server stopped with code ${code}`);
});
