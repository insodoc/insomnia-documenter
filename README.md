# Insomnia Documenter

Like [Postman Documenter](https://www.getpostman.com/api-documentation-generator) but for [Insomnia](https://insomnia.rest)! With this tool you can generate beautiful API documentation pages using your Insomnia export file.

Demo coming soon :)

## Requirements
  * Node.js (8.x or higher is recommended)
  * An exported Insomnia workspace JSON (v4)

## Getting Started

Insomnia documenter is a CLI tool. You can use it in two ways.

### Using `npx`

```sh
npx insomnia-documenter --config /path/to/insomnia/config.json
```

### By installing the package globally

```sh
npm i -g insomnia-documenter
insomnia-documenter --config /path/to/insomnia/config.json
```

### Options

```
Options:
  -c, --config <location>  Location of the exported Insomnia JSON config.
  -l, --logo <location>    Project logo location (48x48px PNG).
  -o, --output <location>  Where to save the file (defaults to current working directory).    
  -h, --help               output usage information
```

## Contribution

The CLI tool is a commander applet, while the frontend itself is a Svelte app. This project is still in beta, which means it has bugs and can be improved here and there. Contribution is most welcome :)

**Clone the repository:**

```sh
git clone git@github.com:jozsefsallai/insomnia-documenter.git
cd insomnia-documenter
```

**Install the dependencies:**

```sh
npm install
```

**Run a development build with hot reload:**

```sh
npm run dev
```

**Create a production build:**

```sh
npm run build
```

## License

MIT.

*Note: this project is not affiliated with Insomnia.*
