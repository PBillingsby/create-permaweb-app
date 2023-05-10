const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const cpy = require('cpy');
const checkWriteable = require('./helpers/is-writeable');
const makeDir = require('./helpers/make-dir');
const checkFolder = require('./helpers/is-folder-empty');
const gitInit = require('./helpers/git');

const init = async ({
  appPath,
  useNpm,
  typescript,
  framework,
  backend,
  css,
  bundlr
}) => {
  console.log('running create-permaweb-app');
  const template = typescript ? 'typescript' : 'default';
  const root = path.resolve(appPath);

  if (!(await checkWriteable.isWriteable(path.dirname(root)))) {
    console.error(
      'The application path is not writable, please check folder permissions and try again.'
    );
    console.error(
      'It is likely you do not have write permissions for this folder.'
    );
    process.exit(1);
  }

  const appName = path.basename(root);

  await makeDir.makeDir(root);
  if (!checkFolder.isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const useYarn = useNpm ? false : true;
  const originalDirectory = process.cwd();

  const displayedCommand = useYarn ? 'yarn' : 'npm';
  console.log(`Creating a new Web3 app in ${chalk.green(root)}.`);
  console.log();

  process.chdir(root);

  console.log(chalk.bold(`Using ${displayedCommand}.`));

  // /**
  //  * Write it to disk. ==> Does not write a second package.json, just copies from template
  //  * // @TODO fix app name in template package JSONs
  //  */
  // fs.writeFileSync(
  //   path.join(root, 'package.json'),
  //   JSON.stringify(packageJson, null, 2) + os.EOL
  // );

  /**
   * Copy common files.
   */
  await cpy('**', root, {
    cwd: path.join(__dirname, 'templates', 'common'),
    rename: (name) => {
      switch (name) {
        case 'gitignore':
        case 'env.example':
        case 'eslintrc.json': {
          return '.'.concat(name);
        }
        case 'README-template.md': {
          return 'README.md';
        }
        default: {
          return name;
        }
      }
    },
  });

  /**
   * Copy framework files.
   */

  await cpy('**', root + '/', {
    parents: true,
    cwd: path.join(__dirname, 'templates', framework, template),
    filter: (name) => {
      if (name.relativePath === 'package.json') {
        return false;
      }
      return true;
    },
    rename: (name) => {
      switch (name) {
        case 'package-template.json': {
          return 'package.json';
        }
        default: {
          return name;
        }
      }
    },
  });

  /**
   * Copy css framework files.
   */

  if (css) {
    await cpy('**', root + '/', {
      parents: true,
      cwd: path.join(__dirname, 'templates/css', css, framework, template),
    });
  }

  if (bundlr) {
    const packageJsonPath = path.join(root, '/package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (bundlr !== 'no') {
      packageJson.scripts.fundBundlr = `arkb fund-bundler --use-bundler https://${bundlr}.bundlr.network -w wallet.json $AMOUNT`;
      packageJson.scripts.balance = `arkb balance --w wallet.json --use-bundler https://${bundlr}.bundlr.network`;
    }
    switch (bundlr) {
      case 'no':
        packageJson.scripts.deploy =
          framework === "vite" || framework === "svelte" ?
            "vite build && arkb deploy dist --wallet wallet.json" :
            "next build && next export && arkb deploy out --wallet wallet.json";
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        break;
      default:
        packageJson.scripts.deploy =
          framework === "vite" || framework === "svelte" ?
            `vite build && arkb deploy dist --wallet wallet.json --use-bundler https://${bundlr}.bundlr.network` :
            `next build && next export && arkb deploy out --wallet wallet.json --use-bundler https://${bundlr}.bundlr.network`;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }
  }

  /**
   * Init git.
   */

  if (gitInit.tryGitInit(root)) {
    console.log('Initialized a git repository.');
    console.log();
  }

  let cdpath = '';
  if (path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  console.log(`${chalk.green('Success!')} Created ${appName} at ${appPath}`);
  console.log();
  console.log(
    'Get started by going into the directory and install dependencies.'
  );
  console.log(chalk.cyan('  cd'), cdpath);
  console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'install '}`));
  console.log();
  console.log(
    `For a walk through guild, visit https://www.create-permaweb-app.arweave.dev`
  );
  console.log();
};

module.exports = {
  init,
};
