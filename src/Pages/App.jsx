import { useState } from 'react'

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Button {count > 0 ? `You clicked me ${count} times.` : ''}
    </button>
  )
}

const user = {
  name: 'Ade Hendrawan',
  imageUrl: 'https://avatars.githubusercontent.com/u/87872009',
  imageSize: 90
}

const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

function ShoppingList() {
  const listItems = products.map(product => {
    return (
      <li 
        style={{
          color: product.isFruit ? 'magenta' : 'darkgreen'
        }}
        key={product.id}>
        {product.title}
      </li>
    )
  })

  return (
    <ul
      style={{
        color: '#ffffff',
        textAlign: 'left'
      }}>
      {listItems}
    </ul>
  )
}

function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <>
      <div style={{ marginTop: '30px' }}>
        <small><em>Component and Props</em></small>
        <h1>Welcome to my app</h1>
        <MyButton count={count} onClick={handleClick}/>
        <MyButton count={count} onClick={handleClick}/>
      </div>
      <hr />
      <div style={{ marginTop: '30px' }}>
        <small><em>Show Data From Object</em></small>
        <h1>{user.name}</h1>
        <img 
          className="avatar" 
          src={user.imageUrl}
          alt={`Photo of ${user.name}`}
          style={{
            width: user.imageSize,
            height: user.imageSize,
            borderRadius: '50px'
          }}
          />
      </div>
      <hr />
      <div style={{ marginTop: '30px' }}>
        <small><em>Rendering List</em></small>
        <ShoppingList />
      </div>
    </>
  )
}

export default App
