import React, { ReactElement, ReactNode } from 'react';
import './App.css';

// Conventinal props
function Heading({ title }: { title: string; }) { //properties with different types of props
  return <h1>{title}</h1>
}
function HeadingWithContent({ children }: { children: ReactNode }): ReactElement {
  return <h1>{children}</h1>;
}

// defaultProps
const defaultContainerProps = {
  heading: <strong>My Heading</strong>
};
type ContainerProps = { children: ReactNode } & typeof defaultContainerProps //calling defaultContainerProps
function Container({ heading, children }: ContainerProps): ReactElement {
  return <div><h1>{heading}</h1>{children}</div>
}
Container.defaultProps = defaultContainerProps; // setting it

// Functinal props
function TextWithNumber({
  header,
  children,
}: {
  header?: (num: number) => ReactNode;
  children: (num: number) => ReactNode;
}) {
  const [state, stateSet] = React.useState<number>(1);

  return (
    <div>
      {header && <h2>{header?.(state)}</h2>}
      <div>
        {children(state)}
      </div>
      <div>
        <button onClick={() => stateSet(state + 1)}>Add</button>
      </div>
    </div>
  )
}

// List
function List<ListItem>({ //defining a List Component as a "Generic"
  items,
  render,
}: {
  items: ListItem[], //expecting a List of items
  render: (item: ListItem) => ReactNode //and returning it as ReactNode
  }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  )
}

// Class component
class MyHeader extends React.Component<{
  title: ReactNode,
}> {
  render() {
    return (
      <h1>{this.props.title}</h1>
    )
  }
}
 
function App() {
  return (
    <div>
      <Heading title="Hello"></Heading>
      <HeadingWithContent><strong>Hi!</strong></HeadingWithContent>
      <Container>Foo</Container>
      <TextWithNumber>
        {(num: number) => <div> Today's number is {num} </div>}
      </TextWithNumber>
      <List
        items={["Jack", "Lisa", "Oslo"]}
        render={(item: string) => <div>{item.toLowerCase()}</div>}
      ></List>
      <MyHeader title="There you go!" />
    </div>
  )
};

export default App;
