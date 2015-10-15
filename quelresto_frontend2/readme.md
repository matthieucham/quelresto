## sepamail-rubis-admin-bo : a SEPAmail Rubis admin BO project


## Introduction


## Installation

Install dependencies
`npm install`


### App
Launch webapp:

```bash
grunt serve
```
To add specific page style :
* go to resources/lyra/sass/app/pages
* add your _style.scss file
* add the import in the _pages.scss file

## Testing

Run local tests (in terminal):
```bash
grunt test
```

## Nexus
Deploy on Nexus server:
```bash
grunt publish --env=prod --restUri=https://sepamail-q01.lyra-labs.fr 
```

## License

[Lyra](http://opensource.org/licenses/Lyra-license.php)
