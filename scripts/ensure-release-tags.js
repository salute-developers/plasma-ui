const { execFileSync } = require('child_process');

const baselineCommit = '0076dc7347aa6458567e7a0140fa8ec16417e724';
const baselineTags = [
    '@salutejs/plasma-colors@0.16.0',
    '@salutejs/plasma-core@1.231.0',
    '@salutejs/plasma-tokens@1.143.0',
    '@salutejs/plasma-typo@0.46.0',
    '@salutejs/plasma-ui@1.354.0',
];

const git = (...args) => execFileSync('git', args, { stdio: 'inherit' });

git('cat-file', '-e', `${baselineCommit}^{commit}`);

for (const tag of baselineTags) {
    try {
        git('show-ref', '--verify', '--quiet', `refs/tags/${tag}`);
    } catch {
        git(
            '-c',
            'user.name=github-actions[bot]',
            '-c',
            'user.email=41898282+github-actions[bot]@users.noreply.github.com',
            'tag',
            '--annotate',
            tag,
            baselineCommit,
            '--message',
            `Release baseline for ${tag}`,
        );
        console.log(`Created release baseline tag ${tag}`);
    }
}
