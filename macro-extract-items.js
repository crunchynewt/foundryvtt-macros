// Extract items from the world into JSON object to copy from console

// Get the game items object
const items = game.items;

// Iterate through each Item in the world and add to the data for output
const data = [];
const filtered = await items.search({});
for (let item of filtered) {
  data.push(item);
}

// Convert the array to a JSON string
const jsonString = JSON.stringify(data, null, 2);

console.log(jsonString);
