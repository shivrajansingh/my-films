**ViewType Component Documentation**
=====================================

**Overview**
------------

The `ViewType` component is a React functional component that allows users to switch between grid and list views. It is designed to be used in a watchlist movie application.

**Props**
-----

### Required Props

* `type`: A string representing the type of view (e.g., "watchlistMovie")
* `title`: A string representing the title of the watchlist movie
* `onChangeViewType`: A function that takes a string as an argument and updates the view type accordingly

### Optional Props

* `...rest`: Additional HTML attributes to be passed to the component's container element

**State**
-----

The `ViewType` component uses the `useState` hook to manage its state, which consists of:

* `activeViewType`: A string representing the currently active view type (either "grid" or "list")

**Methods**
--------

### handleClick(viewType: string)

A method that updates the `activeViewType` state and calls the `onChangeViewType` prop function with the new view type.

```jsx
const handleClick = (viewType: string) => {
  setActiveViewType(viewType);
  onChangeViewType(viewType);
};
```

**Styles**
-----

The component defines a style object called `activeStyle`, which is applied to the buttons when they are active:

```jsx
const activeStyle = {
  color: '#FFB443',
  background: '#353510',
};
```

**JSX**
----

The component returns a JSX fragment containing two buttons, one for grid view and one for list view. The buttons are rendered conditionally based on the `activeViewType` state:

```jsx
<button
  type="button"
  style={activeViewType === 'grid' ? activeStyle : {}}
  onClick={() => handleClick('grid')}
>
  <Image src={activeViewType === 'grid' ? "/assets/images/SquaresFour-r.svg" : "/assets/images/SquaresFour-r-1.svg"} style={{padding : '0 0 4px 0'}}/> Grid View
</button>&nbsp; &nbsp;
<button
  type="button"
  style={activeViewType === 'list' ? activeStyle : {}}
  onClick={() => handleClick('list')}
>
  <Image src={activeViewType === 'list' ? "/assets/images/ListBullets-r.svg" : "/assets/images/ListBullets-r-1.svg"} style={{padding : '0 0 4px 0'}}/> List View
</button>
```

**Container Element**
--------------------

The component's container element is a `div` with the classes "col-md-6 col-6". The additional HTML attributes passed as props are applied to this element.

```jsx
<div className="col-md-6 col-6" {...rest}>
  {/* JSX fragment */}
</div>
```

**Image Component**
------------------

The component uses an `Image` component from a separate file (`./common/Image`) to render the grid and list view icons.

```jsx
import Image from './common/Image';
```

Note that this documentation assumes you have familiarity with React and JavaScript. If you're new to these technologies, I recommend starting with some introductory resources before diving into this codebase.