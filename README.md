# react-counter-package
This is my first publically published NPM package for React JS.

It’s a simple counter package that starts counting from 0 to 100 and then resets back to 0.

## Tutorial article link:
> https://blog.logrocket.com/the-complete-guide-to-publishing-a-react-package-to-npm/#:~:text=From%20your%20terminal%2C%20run%20npm,installed%20to%20the%20node_modules%20folder.


## For this package, we’ll be using the following technologies:

React (obviously)
TypeScript
Sass


## While building this package, we’ll apply the following concepts that we’ve learned about so far:

Semantic versioning
Package bundling
Package testing
Documentation


--------------------------------

# react-counter-package

A simple React component that counts from 0 - 100 and then resets back to 0. This runs for infinity and yes, this is not meant to be functional in any way.

## How to use

Clone this repo to your local computer, then run:

- `npm install && npm run build`

- To make this component available to other projects on your local computer, run `yarn link`.
- Then go to the project where you want to use this package and run `yarn link "react-counter-package"`.

Finally, to fix the multiple copies of React bug that shows up with linked React packages:

- navigate to the root of the `react-counter-package` package
- run `npm link "../path/to/your/project"`

You can now import `react-counter-package` as a normal package installed from npm like so:

```
import Dummy from 'react-counter-package'
...
```

You can also import the type definitions if you're using TypeScript like so:

```
import Dummy, { ICounterProps } from 'react-counter-package'
...
```

## Available props

```

className: string (optional)

```

To customise this component, pass in a class name to the `className` prop and style that class name in your custom CSS.

```

// your-component.js
import Dummy from 'react-counter-package'

...
<Dummy className="dummy" />
...

// your-component.css
.dummy {
  color: white;
  background-color: purple;
}

```

**This component was built for an article on how to publish a React component as a package to npm.**