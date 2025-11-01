// Updates the Prices of items to be a little more consistent.

// Price random factor
const priceRandomFactor = 0.2;

// Modified central price for rarity / category
const pricing = {
  common: {
    ammo: 5,
    consumable: 25,
    permanent: 200,
    weapon: 200,
  },
  uncommon: {
    ammo: 25,
    consumable: 150,
    permanent: 1000,
    weapon: 1000,
  },
  rare: {
    ammo: 100,
    consumable: 450,
    permanent: 4000,
    weapon: 4000,
  },
  veryRare: {
    ammo: 250,
    consumable: 1350,
    permanent: 16000,
    weapon: 16000,
  },
};

// Gets category or null if nothing should be changed
function getCategory(item) {
  // Only magical items
  if (
    !["common", "uncommon", "rare", "veryRare"].includes(item.system.rarity)
  ) {
    return null;
  }

  // Ignore non gp items
  if (item.system.price.denomination in ["cp", "sp", "ep", "pp"]) {
    return null;
  }

  // Set category
  try {
    if (item.system.type.value === "ammo") {
      return "ammo";
    } else if (item.type === "weapon") {
      return "weapon";
    } else if (item.type in ["equipment", "container", "loot"]) {
      return "permanent";
    } else if (
      item.type === "consumable" &&
      item.system.type.value in ["potion", "poison", "scroll", "trinket"]
    ) {
      return "consumable";
    } else if (item.type === "consumable") {
      return "permanent";
    }
    return null;
  } catch (e) {
    console.log("Error: ", e);
    return null;
  }
}

// Convert to 2 sig figs
function setToTwoSignificantFigures(value) {
  return Number(value.toPrecision(2));
}

// Get new price or return null
function getNewPrice(item) {
  const rarity = item.system.rarity;
  const quantity = item.system.quantity;
  const category = getCategory(item);

  if ((category !== null) & (rarity !== null)) {
    const meanPricePerItem = pricing[rarity][category];
    const price =
      meanPricePerItem *
      quantity *
      (1 + (Math.random() - 0.5) * priceRandomFactor);

    return setToTwoSignificantFigures(price);
  }
  return null;
}

// Iterate through each Item in the world and recalculated price
async function run() {
  // Get the game items object
  const items = game.items;

  // Store updates
  const updates = [];
  const filtered = await items.search({});

  // Run through each item in turn
  for (let item of filtered) {
    // Calculate new price
    const newPrice = await getNewPrice(item);

    // Add new price to the updates array
    if (newPrice) {
      updates.push({
        _id: item._id,
        name: item.name,
        "system.price.value": newPrice,
      });
    }
  }

  // Dialog to prompt for updating items
  const numberOfUpdates = updates.length;
  const showUpdates = updates
    .map((update) => {
      return `<li>${update.name}: ${update["system.price.value"]} gp</li>`;
    })
    .join("");

  // Show dialog
  await Dialog.confirm({
    title: "Make changes to " + numberOfUpdates + " prices?",
    content: "<ul>" + showUpdates + "</ul>",
    yes: async () => {
      try {
        // Update item records
        const updated = await Item.updateDocuments(updates);
        console.log("Items updated: ", updated);
        await Dialog.prompt({
          title: "Items updated",
          content: "Items updated: " + updated.length,
        });
      } catch (error) {
        console.error("Error updating items:", error);
      }
    },
    no: () => {},
  });
}

await run();
