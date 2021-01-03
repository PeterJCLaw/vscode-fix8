# VSCode Fix8

VSCode extension for [fix8][] -- automated Flake8 fixing.

[fix8]: https://github.com/PeterJCLaw/fix8

## Features

This extension current provides a single command, equivalent to calling `fix8`
against the current file.

Fixes:

* `F401`: Unused imports are removed
* `C812`, `C813`, `C814`, `C815`, `C816`: Trailing commas are added

## Release Notes

See [CHANGELOG.md](./CHANGELOG.md).

## Attribution

Fix8 uses [`parso`][parso] to aid its handling of the Python AST.
`parso` is included in the extension, licensed under MIT License.

[parso]: https://pypi.org/project/parso/
