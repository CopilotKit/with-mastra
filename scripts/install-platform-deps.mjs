import { execSync } from 'child_process';
import os from 'os';

// Check if we're on macOS with ARM64 architecture
const isDarwinArm64 = os.platform() === 'darwin' && os.arch() === 'arm64';

if (isDarwinArm64) {
    console.log('Detected macOS ARM64, installing platform-specific dependencies...');

    const packages = [
        '@rollup/rollup-darwin-arm64@^4.45.1',
        'lightningcss-darwin-arm64@^1.30.1',
        '@libsql/darwin-arm64@^0.5.15'
    ];

    try {
        // Detect which package manager is being used
        const userAgent = process.env.npm_config_user_agent || '';
        let installCommand;

        if (userAgent.includes('pnpm')) {
            installCommand = 'pnpm add';
        } else if (userAgent.includes('yarn')) {
            installCommand = 'yarn add';
        } else {
            installCommand = 'npm install';
        }

        // Install the packages
        execSync(`${installCommand} ${packages.join(' ')}`, {
            stdio: 'inherit',
            encoding: 'utf-8'
        });

        console.log('✓ Platform-specific dependencies installed successfully');
    } catch (error) {
        console.error('Failed to install platform-specific dependencies:', error.message);
        // Don't fail the entire install process
        process.exit(0);
    }
} else {
    console.log(`Skipping Darwin ARM64 specific dependencies (current platform: ${os.platform()} ${os.arch()})`);
} 