import { useState } from "react";

function ProductCategoryRow({ category }) {
	return (
		<tr>
			<th colSpan={2}>
				{category}
			</th>
		</tr>
	)
}

function ProductRow({ product }) {
	const name = product.stocked ? product.name : (
		<span
			style={{ color: 'red' }}>
				{product.name}
		</span>
	)

	return (
		<tr>
			<td style={{ textAlign: 'left' }}>{name}</td>
			<td style={{ textAlign: 'right' }}>{product.price}</td>
		</tr>
	)
}

function ProductTable({ products, filterText, filterIsStockOnly }) {
	const rows = [];
	let lastCategory = null;

	products.forEach((product) => {
		if (
			product.name.toLowerCase().indexOf(
				filterText.toLowerCase()
			) === -1
		) {
			return;
		}

		if (filterIsStockOnly && !product.stocked)
			return;

		if (product.category !== lastCategory) {
			rows.push(
				<ProductCategoryRow key={product.category} category={product.category} />
			)
			lastCategory = product.category;
		}

		rows.push(
			<ProductRow key={product.name} product={product} />
		)
	})

	if (rows.length === 0) {
		rows.push(
			<tr key={'data-kosong'}>
				<td colSpan={2}>
					<small>
						<em>Data tidak ditemukan.</em>
					</small>
				</td>
			</tr>
		)
	}

	return (
		<table border={1} cellPadding={5} cellSpacing={0} width={'100%'}>
			<thead>
				<tr>
					<th>Name</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				{rows}
			</tbody>
		</table>
	)
}

function SearchBar({ filterText, filterIsStockOnly, onFilterTextChange, onFilterIsStockOnlyChange }) {
	return (
		<form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
			<input 
				type="text" 
				placeholder="Search..." 
				value={filterText}
				onChange={(e) => onFilterTextChange(e.target.value)} />
			<label>
				<input 
					type="checkbox"
					checked={filterIsStockOnly}
					onChange={(e) => onFilterIsStockOnlyChange(e.target.checked)} />
				{' '}
				Only show product in stock
			</label>
		</form>
	)
}

function FilterableTable({ products }) {
	const [filterText, setFilterText] = useState('');
	const [filterIsStockOnly, setFilterIsStockOnly] = useState(false);

	return (
		<div>
			<SearchBar 
				filterText={filterText} 
				filterIsStockOnly={filterIsStockOnly}
				onFilterTextChange={setFilterText}
				onFilterIsStockOnlyChange={setFilterIsStockOnly} />
			<ProductTable 
				products={products} 
				filterText={filterText} 
				filterIsStockOnly={filterIsStockOnly} />
		</div>
	)
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
]

export default function Product() {
	return (
		<>
			<FilterableTable products={PRODUCTS} />
		</>
	)
}