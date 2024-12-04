# foundryvtt-macros

Macros for Foundry VTT

This is a set of macros for Foundry VTT.

## Installation

To use these, select the macro you wish to use from this repo and copy the contents of the file.

In Foundry VTT on the macros bar at the bottom create a new macro of type 'Script'. Paste in the macro code and save.

You can now use the Macro in Foundry VTT.

## Macros

### Update prices

Some of the DND5e magical item prices are either missing or have strange pricing values. In particular this applies to ammo such as arrows.

This macro will suggest updates for magical item prices. It will use a 20% randomisation of price around the following rules:

| Rarity   | ammo | consumable | permanent | weapon |
| -------- | ---- | ---------- | --------- | ------ |
| common   | 5    | 25         | 200       | 200    |
| uncommon | 25   | 150        | 1000      | 1000   |
| rare     | 100  | 450        | 4000      | 4000   |
| veryRare | 250  | 1350       | 16000     | 16000  |

Pricing rules:

- If no rarity exists then this is not a magical item and there should be no change to price
- There should be no price change legendary or artifact items
- Consumables priced more cheaply than permanent magical items
- consumables include poisons / potions / scroll / consumable-trinkets
- all of these prices are in gp
