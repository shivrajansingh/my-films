**Toggle Switch Component Documentation**
==============================================

**Overview**
------------

The `ToggleSwitch` component is a React functional component that displays a toggle switch button. The button's state is persisted across page reloads using both Firebase Firestore and IndexedDB storage.

**Props**
--------

### `name`

* Type: `string`
* Description: A unique identifier for the watchlist being toggled.
* Required: Yes

```jsx
interface ToggleSwitchProps {
  name: string;
}
```

**State**
---------

The component uses the following state:

### `isChecked`

* Type: `boolean`
* Description: The current toggle switch button's checked state.

```jsx
const [isChecked, setIsChecked] = useState(false);
```

**Effects**
------------

The component uses a single effect to fetch and initialize the toggle switch button's state from IndexedDB storage when the component mounts or unmounts:

### `useEffect` hook

* Description: Fetches the watchlist data from IndexedDB storage and sets the initial toggle switch button state.
* Dependencies: `[wl_lists, name]`

```jsx
useEffect(() => {
  const fetchData = async () => {
    let idbData = await getIDB(name, wl_lists);
    if (idbData && Object.keys(idbData).length > 0 && idbData.hasOwnProperty("isPublic")) {
      const { isPublic } = idbData;
      setIsChecked(isPublic);
    }
  };
  fetchData();
}, [wl_lists, name]);
```

**Handlers**
------------

The component uses a single handler to update the toggle switch button's state and persist it to both Firebase Firestore and IndexedDB storage:

### `handleChange` function

* Description: Updates the toggle switch button's state and persists it to both Firebase Firestore and IndexedDB storage.
* Trigger: When the user clicks on the toggle switch button.

```jsx
const handleChange = async () => {
  setIsChecked(!isChecked);
  let user = localStorage.getItem('user');
  let userData = user && JSON.parse(user);
  if (!userData) return;
  let condition = { email: userData.email, name: name };
  saveOrUpdateDataToFireStore(wl_lists, { isPublic: !isChecked }, condition);
  let idbData = await getIDB(name, wl_lists);
  idbData = { ...idbData, isPublic: !isChecked };
  updateIDB(name, idbData, wl_lists);
};
```

**Render**
---------

The component renders the following:

### Toggle switch button

* Type: `input` element
* Properties:
	+ `type`: `checkbox`
	+ `checked`: The current toggle switch button state
	+ `onChange`: The `handleChange` function

```jsx
<input type="checkbox" checked={isChecked} onChange={handleChange} />
```

### Slider container

* Type: `span` element
* Class: `slider round`

```jsx
<span className={`${styles.slider} ${styles.round}`}></span>
```

**Styles**
---------

The component uses the following styles:

### `container` class

* Description: The outer container for the toggle switch button.
* Styles:
	+ `.container { ... }`

```css
.container {
  ...
}
```

### `switch` class

* Description: The inner container for the toggle switch button.
* Styles:
	+ `.switch { ... }`

```css
.switch {
  ...
}
```

### `slider` and `round` classes

* Description: Styles for the slider container.
* Styles:
	+ `.slider { ... }`
	+ `.round { ... }`

```css
.slider {
  ...
}

.round {
  ...
}
```

Note that this documentation assumes you have already set up your project with React, Firebase Firestore, and IndexedDB storage.