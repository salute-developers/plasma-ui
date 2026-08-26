const npmOptions = {
    setRcToken: false,
    commitNextVersion: true,
};

/** Auto configuration */
module.exports = {
    baseBranch: 'main',
    prereleaseBranches: ['dev'],
    plugins: [['npm', npmOptions], 'conventional-commits'],
};
