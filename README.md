# Sandra's Static Site

## Setup

1. Make a fork of this repo
2. Clone your fork to your local development environment
3. Change to the project directory
4. Install dependencies: `yarn install`
5. Run the application: `yarn start`
6. Verify the application runs as expected

### What you should see
[Link to YouTube](https://youtu.be/cnI6TjEoVU4)


## Challenge
In this challenge we'll be taking the existing JSX and improving this static webpage by taking blocks of duplicated or "samey" code and refactoring it with reusable React components with props and embedded JavaScript.

You will get lots of practice in this challenge with getting the JSX syntax right, which is one of the most difficult things about getting comfortable with React.

**Before you begin**

Before starting, inspect the existing JSX and understand what is happening in the starter code. Try to identify parts of the code that look "samey".

First things first, run `yarn` to install the packages and then `yarn start` to boot up the server. After doing each **Part** below, check to make sure that your rendered document is that same as how it started, we are refactoring the existing code not changing it so nothing should be changing on your webpage and each **Part** shouldn't have any errors so if you have errors rendered you will want to go back and fix what you broke before moving on.

Lastly, at the bottom of App.js is a list of exports that are commented out. As you define each component listed and are ready to run tests, uncomment the export of the component you created. 

**Part 1: Anchors**

Lets start small and take those anchors in the `nav` and `contact` section and create a component that we can use for anchors. 

Creating an anchor component allows us to clearly identify which properties are associated with an anchor (we could even use [propTypes](https://www.npmjs.com/package/prop-types) if we wanted to enforce particular requirements on those properties). Also important is that we will have a reusable component we can control and style.

Each of the anchors in App has a class (either "internal" or "external"), an href, and the text content that is seen on the document. 

Refactor the code to create a functional component called `LinkTo` that takes 3 props: `classes`, `href` and `text`. Then replace the existing anchors with this new component you've created, passing in the required properties. You can define this component in the same App.js file, or in its own file.

**Simplifying `LinkTo`**

In our particular use case, we only have two class names - `internal` and `external`. Furthermore, notice how most of the links in this profile page are internal? We could simplify our `LinkTo` component implementation by making it more specific for our use case by using a boolean that is true when the class to be applied is `external`, and is false when the class to be applied is `internal`. When we know that a component only has to support a particular use case, it can be a good practice to simplify by being less general.

Remove the `classes` prop from the `LinkTo` component. Instead use a prop named `external`. In the JSX returned by `LinkTo`, instead of passing the `classes` value to the `className` attribute of the anchor, use conditional rendering to set `className` to "external" when the `external` prop is truthy or "internal" when that prop is falsey. 

In `App`, we can omit the `external` prop in our `<LinkTo />` when the link is internal, and pass the `external` prop when the link is external. For example:
```
<LinkTo external href="#foo" text="bar" />
```

Note that this is the same as explicitly passing true:
```
<LinkTo external={true} href="#foo" text="bar" />
```

We'll be coming back the these anchors later. Now we can move onto some more re-usable components. Is there any that stick out so far as "samey"?

**Part 2: Section Headers**

Looking at each `<section>` we can see that each one has a `<div>` that contains the heading element and a link to the top of the page. Lets convert this into a re-usable component. 

Create a component called `SectionHeading` which takes a single prop called `text`. This `text` prop will be the text that populates the `<h2>`. Ensure that the `SectionHeading` returns the `<div>`, `<h2>` and the `<LinkTo>`. Now when we call that `<SectionHeading />` in our `<App />` we only need to pass the `text` prop and by default each `<SectionHeading />` will have that `<LinkTo />` that points to the top of the page like before. 

It doesn't seem like much, but what we've done is reduced those 4 lines down to one every time we add a new section with a heading. That sort of stuff quickly adds up. Not to mention that anytime we want to make a change to this component (for example changing the h2 to an h3) we don't need to change every single instance just the component declaration.

Moving on whats another part of the code we can refactor?

**Part 3: Bold Bois**

In the "About Me" and "Contact" sections, there are paragraph elements that **embolden** or **\<b>** the first word. Even though the content of the paragraph tags are different, that is some have full sentences and some have `<LinkTo />` components, we can still refactor and reuse with components. Lets look at the easy way of doing this. 

Create a new component called `BoldParagraph` that takes 2 props called `firstWord` and `theRest` that returns a single paragraph tag. Inside this paragraph tag there will be the `firstWord` surrounded by `<b>` tags and the rest of the paragraph tag will contain the `theRest` prop value.

Replace the existing paragraph tags that have the first word **emboldened** with these new `<BoldParagraph>` components.  Any time you are passing a JavaScript expression as a property, whether that is a variable or a JSX expression, you must enclose the expression in curly brackets. Here is an example:

```
<SomeComponent name={name} content={<AnotherComponent description={description} />} />
```

In the "Contact" section, you will include the `<LinkTo />` component as the value for `theRest` prop using JSX similar to the example above.

We're making good progress and our static webpage when rendered should look exactly the same as it did before.

**Part 4: Food Items**
Inside the favourite foods section, you can see that each one of those `<article>`s are pretty much the same. Create a new component called `FoodItem` that takes the props `name`, `src`, `time` and `place`. Remember that the text "Best time to eat:" and "Best place:" are repeated in each `<article>`, these shouldn't be passed as props and should instead be hard coded into component. The `time` and `place` are the values inside the `<span>`s.

While we're here, lets fix up the size of each of these pictures of food. At the moment they are an inconsistent size, lets change them to be a fixed 400x400. Just like regular HTML we can apply a `height` and `width` attribute on the img tag.

**Part 5: Lists**

One of the last things we can do is to touch up the two lists that we have on the page. There are two ways this can be done, we'll look at one way with `map`.

Create a component called `ListItems` that takes one prop called `items`, which is going to be an array of the content for each list. Our component will return [a fragment `<>`](https://medium.com/@yurachoi/react-js-fragments-175290da6435) and inside that fragment we will `map` over the items prop and create a `<li>` for each item from the `items` array passed in props. Here is the code for the call to map with the anonymous callback function that will return the correct JSX for each item. Make sure you can explain this code snippet, including why we specify `key` with the index from the array. Figure out how to return this as a JSX fragment from your `ListItems` component:

```
items.map((item, index) => (
	<li key={index}>
		{item}
	</li>
))
```

In App, inside of the header nav's existing `<ul>`, render `<ListItems />` instead of `<li>`. To `ListItems`, pass an array with a prop called `items` that includes the three `<LinkTo />` components. Don't include the `<li>`, just what goes in the `<li>`, as your `<ListItems>` component will include the `<li>` in the JSX it returns.

In the "About Me" section, inside the existing `<ol>`, use `<ListItems />` and pass in the array of items. In this case the array will contain the four `<BoldParagraph />` elements.

Remember that when passing in the array of items, the array must be wrapped in {} as it is javascript code.

**Part 6: Sections**
Lastly, while this is the easiest thing to implement the concept is the most "out-there" to grasp. What we want to do is refactor our `<section>`s. While it doesn't look like there is much to do we can see that each `<section>` includes a `<SectionHeading>`, but each `<section>` is drastically different from the last so how can we refactor something that has so many dissimilarities? By using  the `children` props we can keep the similar thing in the component and pass everything else as `children`. [Read more about children here](https://reactgo.com/react-props-children/).

Currently, your code should look something like this in App for the About Me section:
```
<section id="about-me">
	<SectionHeading text="This is Me!" />
	...
</section>
```

There is a `SectionHeading` from part 2, followed by the rest of the content. There is an id attribute of "about-me".
  
Create a component called `Section` that takes three props `name`, `heading` and `children`. It should return:
- a `<section>` parent element with an id set to `name` that has two children:
  - a `<SectionHeading>` with the `<SectionHeading>`'s `text` prop set to the value passed in as `heading`
  - `{children}` to include all of the remaining child elements of the section

After completing all parts of the challenge, all of the tests should pass. 

## Tests and Submitting

At any time you can run `yarn test` to see your progress. By default it will run in `watch` mode, and you will have to press `q` to quit. It will run the automated tests against your code and let you know what your progress is so far. Once you have all the tests passing, you can submit your challenge. To do this make sure you have committed your work:

1. From the project root `git add .` and add all the files changed in this folder
2. Commit these files to your repository `git commit -m "challenge completed"`
3. Make sure your working tree is clear `git status`
4. Push these files to your github repository (master or main branch) `git push origin master`
5. Log on to Github and visit your fork of this challenge.
6. Make a pull request to the main branch.
7. Wait and watch the final tests run, if you are successful it will automatically let your educators know you are finished.

## Example solution

An example solution can be found in the challenge-complete branch of this repository.
