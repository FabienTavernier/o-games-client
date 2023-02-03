# Sass architecture

This project uses the [7-1 architecture pattern](https://sass-guidelin.es/#the-7-1-pattern).

Each folder has its own `README.md` file to describe its purpose.

## Main file

The main file (usually labelled `main.scss`) should be
the only Sass file from the whole code base not to begin with an underscore.
This file should not contain anything but [`@use` — Ed.] and comments.

Files should be imported according to the folder they live in,
one after the other in the following order:

1. `abstracts/`
2. `vendors/`
3. `base/`
4. `layout/`
5. `components/`
6. `pages/`
7. `themes/`

[Source](https://sass-guidelin.es/#main-file)
