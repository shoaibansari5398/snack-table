import React, { useState } from "react";

const snacks = [
	{
		id: 1,
		product_name: "Granola Bar",
		product_weight: "21g",
		price: 299,
		calories: 150,
		ingredients: ["Oats", "Honey", "Nuts", "Dried Fruits"],
	},
	{
		id: 2,
		product_name: "Fruit and Nut Mix",
		product_weight: "73g",
		price: 749,
		calories: 353,
		ingredients: [
			"Almonds",
			"Cashews",
			"Dried Cranberries",
			"Dried Blueberries",
		],
	},
	{
		id: 3,
		product_name: "Veggie Chips",
		product_weight: "28g",
		price: 279,
		calories: 130,
		ingredients: ["Sweet Potatoes", "Beets", "Kale", "Sea Salt"],
	},
	{
		id: 4,
		product_name: "Protein Balls",
		product_weight: "100g",
		price: 499,
		calories: 318,
		ingredients: ["Dates", "Almond Butter", "Protein Powder", "Chia Seeds"],
	},
];

const SnackTable = () => {
	const [searchText, setSearchText] = useState("");
	const [sortColumn, setSortColumn] = useState(null);
	const [sortOrder, setSortOrder] = useState("asc");

	const handleSearch = (e) => {
		console.log(e.target.value);
		setSearchText(e.target.value);
	};

	const handleSort = (columnIndex) => {
		if (sortColumn === columnIndex) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(columnIndex);
			setSortOrder("asc");
		}
	};

	const filteredSnacks = snacks.filter((snack) => {
		return (
			snack.product_name.toLowerCase().includes(searchText) ||
			snack.ingredients.join(" ").toLowerCase().includes(searchText)
		);
	});

	const sortedSnacks = filteredSnacks.sort((a, b) => {
		const valueA =
			typeof a[Object.keys(a)[sortColumn]] === "string"
				? a[Object.keys(a)[sortColumn]].toLowerCase()
				: a[Object.keys(a)[sortColumn]];

		const valueB =
			typeof b[Object.keys(b)[sortColumn]] === "string"
				? b[Object.keys(b)[sortColumn]].toLowerCase()
				: b[Object.keys(b)[sortColumn]];

		if (valueA < valueB) {
			return sortOrder === "asc" ? -1 : 1;
		}
		if (valueA > valueB) {
			return sortOrder === "asc" ? 1 : -1;
		}
		return 0;
	});

	return (
		<div className="w-[1000px] mx-auto p-5">
			<h1 className="font-bold text-2xl">Snack Table</h1>
			<input
				onChange={handleSearch}
				value={searchText}
				type="text"
				placeholder="Search with Product or Ingredients"
				className="border border-black px-2 w-72 mt-3 mb-2 rounded-sm py-1"
			/>
			<table className="min-w-full border border-collapse border-gray-300">
				<thead>
					<tr>
						<th
							className="border p-2 border-black cursor-pointer"
							onClick={() => handleSort(0)}
						>
							ID {sortColumn === 0 && (sortOrder === "asc" ? "▲" : "▼")}
						</th>
						<th
							className="border p-2 border-black cursor-pointer"
							onClick={() => handleSort(0)}
						>
							Product Name{" "}
							{sortColumn === 0 && (sortOrder === "asc" ? "▲" : "▼")}
						</th>
						<th
							className="border p-2 border-black cursor-pointer"
							onClick={() => handleSort(0)}
						>
							Product Weight{" "}
							{sortColumn === 0 && (sortOrder === "asc" ? "▲" : "▼")}
						</th>
						<th
							className="border p-2 border-black cursor-pointer"
							onClick={() => handleSort(0)}
						>
							Price (INR){" "}
							{sortColumn === 0 && (sortOrder === "asc" ? "▲" : "▼")}
						</th>
						<th
							className="border p-2 border-black cursor-pointer"
							onClick={() => handleSort(0)}
						>
							Calories {sortColumn === 0 && (sortOrder === "asc" ? "▲" : "▼")}
						</th>
						<th
							className="border p-2 border-black cursor-pointer"
							onClick={() => handleSort(0)}
						>
							Ingredients{" "}
							{sortColumn === 0 && (sortOrder === "asc" ? "▲" : "▼")}
						</th>
					</tr>
				</thead>
				<tbody className="">
					{sortedSnacks.map((snack) => (
						<tr key={snack.id}>
							<td className="border p-2 border-black">{snack.id}</td>
							<td className="border p-2 border-black">{snack.product_name}</td>
							<td className="border p-2 border-black">
								{snack.product_weight}
							</td>
							<td className="border p-2 border-black">{snack.price}</td>
							<td className="border p-2 border-black">{snack.calories}</td>
							<td className="border p-2 border-black">
								{snack.ingredients.join(",")}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default SnackTable;
