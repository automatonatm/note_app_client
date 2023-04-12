import { Configuration } from 'webpack';

const config: Configuration = {
    // ... other webpack configuration options
    devServer: {
        allowedHosts: ['localhost'],
        // ... other devServer options
    },
};

export default config;