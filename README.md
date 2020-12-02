# Challenge Title

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
In this challenge we'll be taking the existing JSX and  improving this static webpage by taking blocks of duplicated or "samey" code and refactor using reusable react components, props and embedded javascript. 

Before starting, inspect the existing JSX and understand what is happening and try to identify parts of the code that look "samey".

First things first, run `yarn` to install the packages and then `yarn start` to boot up the server. After doing each **Part** below, check to make sure that your rendered document is that same as how it started, we are refactoring the existing code not changing it so nothing should be changing on your webpage and each **Part** shouldn't have any errors so if you have errors rendered you will want to go back and fix what you broke before moving on.

Lastly, at the bottom of App.js is a list of exports that are commented out. After each **Part** and you are ready to run tests uncomment out the export of the component you created. 

**Part 1: Anchors**
Lets start small and take those anchors in the nav and contact section and create a component that we can use for anchors. We can see that each of these anchors has a class (either internal or external), a href and the label that is seen on the document; we can easily refactor this. Create a functional component called `LinkTo` that takes 3 props: `classes`, `href` and `text`. Then replace the existing anchors with this new component you've created and pass in the required properties.

Now, you might be thinking "Whats the big deal? If anything you've made MORE work for me to do!" And you'd be right, we can make some changes to this and reduce the amount of work we need to do for future anchor tags we need. Notice how most of the links in this profile page are internal? Lets remove the `classes` prop from our functional component and rename it to `external`. Instead of passing in the `classes` prop directly to the `class` attribute of our anchor write a ternary that will place "external" when the `external` prop is truthy or "internal" when that prop is falsey. This way we can omit the `external` prop in our `<LinkTo />`s when the link is internal and only pass the `external` prop when the link is external. Remember that when passing a boolean as a prop the value needs to be wrapped in {}, for example:
`<LinkTo external={true} src="#foo" text="bar" />`

Ok so we haven't done anything incredible yet, but we'll be coming back the these anchors later. Now we can move onto some more re-usable components. Is there any that stick out so far as "samey"?

**Part 2: Section Headers**
Looking at each `<section>` we can see that each one has a `<div>` that contains the heading element and a link to the top of the page. Lets convert this into a re-usable component. 

Create a component called `SectionHeading` which takes a single prop called `text`, this `text` prop will be the text that populates the `<h2>`. Ensure that the `SectionHeading` returns the `<div>`, `<h2>` and the `<LinkTo>`. Now when we call that `<SectionHeading />` in our `<App />` we only need to pass the `text` prop and by default each `<SectionHeading />` will have that `<LinkTo />` that points to the top of the page like before. 

It doesn't seem like much, but what we've done is reduced those 4 lines down to 1 every time we add a new section with a heading. That sort of stuff quickly adds up not to mention that anytime we want to make a change to this component (for example changing the h2 to an h3) we don't need to change every single instance just the component declaration.

Moving on whats another part of the code we can refactor?

**Part 3: Bold Bois**
In the "About Me" and "Contact" sections, there are paragraph elements that **embolden** or **\<b>** the first word. Even though the content of the paragraph tags are different, that is some have full sentences and some have `<LinkTo />` components we can still refactor and reuse with components. Lets look at the easy way of doing this. 

Create a new component called `BoldParagraph` that takes 2 props called `firstWord` and `theRest` that returns a single paragraph tag and inside this paragraph tag there will be the `firstWord` surrounded by `<b>` tags and the rest of the paragraph tag will contain the `theRest` prop.

Replace the existing paragraph tags that have the first word **emboldened** with these new `<BoldParagraph>` components. Previously you were passing "strings" or boolean as the props but now you need to pass the `<LinkTo />` component for the `<BoldParagraph />`s in the contact section. Just like before with the boolean props, you will need to wrap the value in {}.

We're making good progress and our static webpage when rendered should look exactly the same as it did before.

**Part 4: Food Items**
Inside the favourite foods section, you can see that each one of those `<article>`s are pretty much the same. Create a new component called `FoodItem` that takes the props `name`, `src`, `time` and `place`. Remember that the text "Best time to eat:" and "Best place:" are repeated in each `<article>`, these shouldn't be passed as props and should instead be hard coded into component. The `time` and `place` are the values inside the `<span>`s.

While we're here, lets fix up the size of each of these pictures of food. At the moment they are an inconsistent size, lets change them to be a fixed 400x400. Just like regular HTML we can apply a `height` and `width` attribute on the img tag.

**Part 5: Lists**
One of the last things we can do is to touch up the two lists that we have on the page. There's two ways this can be done, we'll look at one way with `map`.

Create a component called `ListItems` that takes 1 prop called `items` which is going to be an array of the content of each list. Our component will return a fragment `<>` and inside that fragment we will `map` over the items prop and create a `<li>` that will have each item from the items array prop. 

So in the header nav's existing `<ul>` when we call `<ListItems />` as the `items` prop we will pass in the 3 `<LinkTo />` components. We aren't passing in the `<li>` just what goes in the `<li>` as our `<ListItems>` component already creates them for us. When this is array is passed in our component will map over the 3 `<LinkTo>`s.

And in the "About Me" section, inside the existing `<ol>` when we call `<ListItems />` and we will pass in the array of items which is 4 `<BoldParagraph />` elements, it will create 4 `<li>` and each `<li>` will have one of the `<BoldParagraph>` components.

Remember that when passing in the array of items, the array must be wrapped in {} as it is javascript code.

**Part 6: Sections**
Lastly, while this is the easiest thing to implement the concept is the most "out-there" to grasp. What we want to do is refactor our `<section>`s. While it doesn't look like there is much to do we can see that each `<section>` includes a `<SectionHeading>`, but each `<section>` is drastically different from the last so how can we refactor something that has so many dissimilarities? By using  the `children` props we can keep the similar thing in the component as pass the things that are different as `children`. [Read more about children here](https://reactgo.com/react-props-children/).
  
Create a component called `Section` that takes 3 props `name`, `heading` and `children`. Each `<section>` currently has a `<SectionHeading />` so our `<Section />` component is going to return a `<section>` as the parent with it's id as `name`, a `<SectionHeading>` with the `<SectionHeading>`'s `text` prop as `heading` and we will include `children` as a child element. 

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