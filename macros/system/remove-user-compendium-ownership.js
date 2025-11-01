// Removes compendium ownership for all compendium packs.  
// Back up world before using this one!
for (const pack of game.packs){
  await pack.configure({
    ownership:{
      PLAYER:"NONE",
      ASSISTANT:"OWNER"
    }
  });
}