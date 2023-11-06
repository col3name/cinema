const path = require('path');
const { mkdirSync, writeFileSync } = require('fs');

const createComponent = (name: string) =>
  `import { FC } from 'react'
import ${name}Props from './${name}.props'

const ${name}: FC<${name}Props> = () => {
  return (
    <div>
      It was automatically generated
    </div>
  )
}

export default ${name}
`

const createComponentProps = (name: string) =>
  `type ${name}Props = {
  className?: string
}

export default ${name}Props
`

const createIndexFile = (name: string) =>
  `export { default } from './${name}'
`

const defaultDir = path.join('src', 'components')

const main = (name: string, dir: string = defaultDir) => {
  const root = path.join(__dirname, '..', dir, name)
  console.log(root)
  mkdirSync(root)
  writeFileSync(path.join(root, `${name}.tsx`), createComponent(name))
  writeFileSync(path.join(root, `${name}.props.ts`), createComponentProps(name))
  writeFileSync(path.join(root, `index.ts`), createIndexFile(name))

  // eslint-disable-next-line no-console
  console.log(`'${name}' was generated in '${path.join(dir, name)}'`)
}

// eslint-disable-next-line prefer-destructuring
const fileName = process.argv[2]
// eslint-disable-next-line prefer-destructuring
const dir = process.argv[3]

if (!fileName) {
  throw new Error('Component name is required')
}

main(fileName, dir)