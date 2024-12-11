# Document for Developers of this package

In the published package, we want to have the content of `./dist` directory as the root of the package. Because it would be difficult if not imposible to make all systems resolve `./dist` correctly.

To do so, our `make build` script copies the `package.json` to the `./dist` directory. In the main `package.json` file, we have `private=true` so we won't publish it by mistake.

Then, in the `publish.sh` script, we also copy `README.md` and other files to the `./dist` directory before publishing.

## Run the example using local changes

Unfortunately, Metro bundler cannot import from symlinks, so `npm link` won't work.

Maybe we can follow this? https://medium.com/@alielmajdaoui/linking-local-packages-in-react-native-the-right-way-2ac6587dcfa2

For now, the simplest solution is to just copy files from `./dist` to `example/node_modules/react-native-pie-chart`!

Another way:

```
make build
cd dist
npm pack
```

Then in the example folder:

```
npm install ../dist/react-native-pie-chart-4.0.0.tgz
```
