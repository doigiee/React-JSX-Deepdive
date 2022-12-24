import React from 'react';
import { render } from '@testing-library/react';
import App, { BoldParagraph, FoodItem, LinkTo, ListItems, SectionHeading, Section } from './App';
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6



describe("LinkTo component", () => {
  test('returns correct JSX', () => {
    const { getByText } = render(<LinkTo href="#foo" text="bar" />)
    const link = getByText("bar")
    expect(link).toBeInTheDocument()
  })
  test('renders correctly in the nav', () => {
    const { getByText } = render(<App />)
    const aboutMe = getByText("About Me")
    const foods = getByText("Favourite Foods")
    const contact = getByText("Contact Details")
    expect(aboutMe).toBeInTheDocument()
    expect(foods).toBeInTheDocument()
    expect(contact).toBeInTheDocument()
  })
  test("renders correctly the 'to top' anchors", () => {
    const { getAllByText } = render(<App />)
    const links = getAllByText("Top")
    expect(links.length).toBe(3)
    expect(links[0].getAttribute('href')).toEqual("#top")
    expect(links[0].textContent).toEqual("Top")
    expect(links[1].getAttribute('href')).toEqual("#top")
    expect(links[1].textContent).toEqual("Top")
    expect(links[2].getAttribute('href')).toEqual("#top")
    expect(links[2].textContent).toEqual("Top")
  })
})

describe("SectionHeader component", () => {
  test('returns correct JSX', () => {
    const { getByText } = render(<SectionHeading text="Hello World"/>)
    const heading = getByText("Hello World")
    const toTop = getByText("Top")
    expect(heading).toBeInTheDocument()
    expect(toTop).toBeInTheDocument()
  })
  test("contains a LinkTo component", () => {
    const renderer = new ShallowRenderer()
    renderer.render(<SectionHeading text="This Is Me!" />)
    const result = renderer.getRenderOutput()
    expect(result.props.children[1]).toEqual(<LinkTo href="#top" text="Top" />)
  })
})

describe("BoldParagraph component", () => {
  test('returns correct JSX', () => {
    render(<BoldParagraph firstWord="Pop" theRest="culture maven..."/>)
    const firstParagraph = document.querySelector("p")
    expect(firstParagraph).toBeInTheDocument()
    expect(firstParagraph.firstChild.localName).toEqual('b')
    expect(firstParagraph.firstChild.innerHTML).toEqual("Pop")
    expect(firstParagraph.lastChild.data).toEqual('culture maven...')
  })
  test('are used in the <App /> contact section', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<App />);
    const result = renderer.getRenderOutput();
    const contactSection = result.props.children[result.props.children.length-2]
    expect(contactSection.props.children[0]).toEqual(<BoldParagraph firstWord="Phone:" theRest={<LinkTo external={true} href="tel:12345678" text="+12345678" />} />)
    expect(contactSection.props.children[1]).toEqual(<BoldParagraph firstWord="Email:" theRest={<LinkTo external={true} href="mailto:test@test.com" text="thatsme@test.com" />} />)
    expect(contactSection.props.children[2]).toEqual(<BoldParagraph firstWord="Twitter:" theRest={<LinkTo external={true} href="#twitter" text="#superfun" />} />)
  })
})

describe("FoodItem component", () => {
  test('returns JSX elements', () => {
    const {getByRole, getByText} = render(<FoodItem name="Pizza" src="pizza.jpg" time="All the time" place="Queen Margharitas"/>)
    const heading = getByRole("heading")
    const image = getByRole("img")
    const firstP = getByText("Best time to eat:")
    const secondP = getByText("Best place:")
    expect(heading).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    expect(firstP).toBeInTheDocument()
    expect(secondP).toBeInTheDocument()

  })
  test("correctly passes props to child elements", () => {
    const {getByRole, getByText} = render(<FoodItem name="Pizza" src="pizza.jpg" time="All the time" place="Queen Margharitas"/>)
    const heading = getByRole("heading")
    const image = getByRole("img")
    const firstP = getByText("Best time to eat:")
    const secondP = getByText("Best place:")
    expect(heading.textContent).toEqual("Pizza")
    expect(image.getAttribute('src')).toEqual('pizza.jpg')
    expect(image.getAttribute('height')).toEqual("400")
    expect(image.getAttribute('width')).toEqual("400")
    expect(firstP.textContent).toEqual("Best time to eat: All the time")
    expect(firstP.children.length).toEqual(1)
    expect(firstP.children[0].textContent).toEqual("All the time")
    expect(secondP.textContent).toEqual("Best place: Queen Margharitas")
    expect(secondP.children.length).toEqual(1)
    expect(secondP.children[0].textContent).toEqual("Queen Margharitas")
  })
  test('should be in the <App> fav-foods section', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<App />);
    const result = renderer.getRenderOutput();
    const [pizza, quesadillas, icecreamPancakes, loadedFries] 
      = result.props.children[result.props.children.length-3].props.children
    expect(pizza).toEqual(<FoodItem name="Pizza" place="Queen Margharitas" src="pizza.jpg" time="All the time" />)
    expect(quesadillas).toEqual(<FoodItem name="Quesadillas" place="Mejico" src="quesadilla.jpg" time="Afternoon Siesta" />)
    expect(icecreamPancakes).toEqual(<FoodItem name="Icecream Pancakes" place="Pancakes on the Rocks" src="icecream_pancakes.jpg" time="Brekky" />)
    expect(loadedFries).toEqual(<FoodItem name="Loaded Fries" place="My House" src="loaded_fries.jpg" time="During the game" />)
  })
})

describe("ListItems component should", () => {
  test("render only the fragment and no list items when given an empty array", () => {
    render(<ListItems items={[]} />)
    expect(document.body.firstChild.innerHTML).not.toBeTruthy()
  })
  test("render each of the list items passed into the items prop", () => {
    render(<ListItems items={["First", "Second", "Third"]} />)
    const listItems = document.body.firstChild.childNodes
    expect(listItems.length).toEqual(3)
    expect(listItems[0].localName).toEqual('li')
    expect(listItems[1].localName).toEqual('li')
    expect(listItems[2].localName).toEqual('li')
    expect(listItems[0].innerHTML).toEqual('First')
    expect(listItems[1].innerHTML).toEqual('Second')
    expect(listItems[2].innerHTML).toEqual('Third')
  })
  test("be present in the nav and contain the 3 LinkTo components ", () => {
    const renderer = new ShallowRenderer()
    renderer.render(<App />);
    const result = renderer.getRenderOutput();
    const listItems = result.props.children[0].props.children[1].props.children.props.children.props.items
    expect(listItems.length).toEqual(3)
    expect(listItems[0]).toEqual(<LinkTo href="#about-me" text="About Me" />)
    expect(listItems[1]).toEqual(<LinkTo href="#fav-foods" text="Favourite Foods" />)
    expect(listItems[2]).toEqual(<LinkTo href="#contact" text="Contact Details" />)
  })
  test("be present in the about-me section and contain the BoldParagraph components", () => {
    const renderer = new ShallowRenderer()
    renderer.render(<App />);
    const result = renderer.getRenderOutput();
    const sectionItems = result.props.children[1].props.children
    const listItems = sectionItems[sectionItems.length-1].props.children.props.children.props.items
    expect(listItems.length).toEqual(4)
    expect(listItems[0]).toEqual(<BoldParagraph firstWord="Pop" theRest="culture maven. Beer fan. Award-winning music junkie. Extreme coffee enthusiast. Thinker. Tv specialist." />)
    expect(listItems[1]).toEqual(<BoldParagraph firstWord="Friendly" theRest="web maven. Bacon lover. General internet specialist. Incurable travel scholar." />)
    expect(listItems[2]).toEqual(<BoldParagraph firstWord="Subtly" theRest="charming twitter lover. Social media fan. Incurable travel geek. Lifelong pop culture specialist. Tv scholar." />)
    expect(listItems[3]).toEqual(<BoldParagraph firstWord="Unable" theRest="to type with boxing gloves on. Proud bacon fan. Music junkie. Coffee ninja. Beer specialist." />)
  })
})

describe("Section component should", () => {
  test("return 'section' as parent container", () => {
    render(<Section />)
    expect(document.body.firstChild.firstChild.localName).toEqual('section')
  })
  test("have that section with an id of the passed name prop", () => {
    render(<Section name="about-me" />)
    expect(document.body.firstChild.firstChild.id).toEqual('about-me')
  })
  test("render a SectionHeading component inside", () => {
    const renderer = new ShallowRenderer()
    renderer.render(<Section name="about-me" heading="This Is Me!" />);
    let result = renderer.getRenderOutput();
    let section = result.props.children[0]
    expect(section).toEqual(<SectionHeading text="This Is Me!" />)
    renderer.render(<Section name="testing" heading="Time to Test!" />);
    result = renderer.getRenderOutput();
    section = result.props.children[0]
    expect(section).toEqual(<SectionHeading text="Time to Test!" />)

  })
  test("pass down children", () => {
    let { getByText } = render(<Section name="about-me" heading="This Is Me!"><p>Hello World</p></Section>)
    let paragraph = getByText("Hello World")
    expect(paragraph).toBeInTheDocument()
    getByText = render(<Section name="testing" heading="Time to Test!"><p>Testing is fun!</p></Section>).getByText
    paragraph = getByText("Testing is fun!")
    expect(paragraph).toBeInTheDocument()
  })
  test("be used in the <App />", () => {
    const renderer = new ShallowRenderer()
    renderer.render(<App />);
    const result = renderer.getRenderOutput();
    expect(result.props.children[1].type).toEqual(Section)
    expect(result.props.children[2].type).toEqual(Section)
    expect(result.props.children[3].type).toEqual(Section)
  })
})
