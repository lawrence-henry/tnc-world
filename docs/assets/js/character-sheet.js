// --------------------
// CHARACTER TEMPLATE
// --------------------

function createCharacter() {
  return {
    system: "TNC",
    saveVersion: 1,

    id: crypto.randomUUID(),
    name: "",
    playerName: "",
    campaign: "",

    progression: {
      level: 1,
      experiencePoints: 0,
      survivorPoints: 0,
    },

    background: "",

    abilities: {
      might: {
        score: 0,
        primary: false,
      },
      reflexes: {
        score: 0,
        primary: false,
      },
      constitution: {
        score: 0,
        primary: false,
      },
      wits: {
        score: 0,
        primary: false,
      },
      willpower: {
        score: 0,
        primary: false,
      },
      perception: {
        score: 0,
        primary: false,
      },
    },

    health: {
      current: 0,
      max: 0,
    },

    chancePool: {
      current: 0,
      max: 18,
    },

    infectionLevel: 0,
    requisitionPoints: 0,

    combat: {
      defense: 0,
      speed: 0,
      damageResist: 0,
      initiative: 0,
    },

    armor: {
      type: "",
      armorDefense: 0,
      armorPoints: 0,
    },

    traits: [
      // {
      //   id: "trait-id",
      //   name: "Trait Name",
      // }
    ],

    expertises: [],
    specializations: [],
    chanceBreaks: [],
    weapons: [],
    conditions: [],
    inventory: [],
    mutations: [],
    connections: [],

    notes: "",
  };
}

// --------------------
// CHARACTER STORAGE
// --------------------

const STORAGE_KEY = "tnc_characters";

function loadCharacters() {
  const savedCharacters = localStorage.getItem(STORAGE_KEY);

  if (!savedCharacters) {
    return [];
  }

  return JSON.parse(savedCharacters);
}

let characters = loadCharacters();

function saveCharacters() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
}

const ACTIVE_CHARACTER_KEY = "tnc_active_character";

const CREATION_DRAFT_KEY = "tnc_character_creation_draft";

// --------------------
// CHARACTER MANAGER
// --------------------

function renderCharacterList() {
  const characterList = document.getElementById("character-list");

  if (!characterList) {
    return;
  }

  characterList.innerHTML = "";

  characters.forEach((character) => {
    const characterRow = document.createElement("div");
    const characterName = document.createElement("span");
    const openButton = document.createElement("button");
    const duplicateButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const exportButton = document.createElement("button");

    characterName.textContent = `${character.name || "Unnamed Character"} - Level ${character.progression.level}`;

    openButton.textContent = "Open";
    deleteButton.textContent = "Delete";
    duplicateButton.textContent = "Duplicate";
    exportButton.textContent = "Export";

    exportButton.type = "button";

    openButton.addEventListener("click", () => {
      openCharacter(character.id);
    });

    exportButton.addEventListener("click", () => {
      exportCharacter(character.id);
    });

    deleteButton.addEventListener("click", () => {
      const confirmed = confirm(
        `Are you sure you want to delete "${character.name}"? This action cannot be undone.`,
      );
      if (confirmed) {
        deleteCharacter(character.id);
      }
    });

    duplicateButton.addEventListener("click", () => {
      duplicateCharacter(character.id);
    });

    characterRow.appendChild(characterName);
    characterRow.appendChild(openButton);
    characterRow.appendChild(duplicateButton);
    characterRow.appendChild(deleteButton);
    characterRow.appendChild(exportButton);
    characterList.appendChild(characterRow);
  });
}

function startCharacterCreation() {
  const newCharacter = createCharacter();

  localStorage.setItem(CREATION_DRAFT_KEY, JSON.stringify(newCharacter));

  window.location.href = "../character-create/";
}

function addCharacter() {
  const nameInput = document.getElementById("new-character-name");

  if (!nameInput) {
    return;
  }

  const newCharacter = createCharacter();

  newCharacter.name = nameInput.value.trim() || "Unnamed Character";

  characters.push(newCharacter);

  saveCharacters();

  nameInput.value = "";

  renderCharacterList();
}

function openCharacter(characterId) {
  localStorage.setItem(ACTIVE_CHARACTER_KEY, characterId);
  window.location.href = "../character-sheet/";
}

function duplicateCharacter(characterId) {
  const originalCharacter = characters.find(
    (character) => character.id === characterId,
  );

  if (!originalCharacter) {
    return;
  }

  const duplicate = structuredClone(originalCharacter);

  duplicate.id = crypto.randomUUID();
  duplicate.name = `${originalCharacter.name || "Unnamed Character"} (Copy)`;

  characters.push(duplicate);

  saveCharacters();
  renderCharacterList();
}

function exportCharacter(characterId) {
  const character = characters.find(
    (character) => character.id === characterId,
  );

  if (!character) {
    return;
  }

  // Perform export logic here (e.g., save to file, upload, etc.)

  const characterJson = JSON.stringify(character, null, 2);

  const blob = new Blob([characterJson], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${character.name || "unnamed_character"}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function deleteCharacter(characterId) {
  characters = characters.filter((character) => character.id !== characterId);

  saveCharacters();

  const activeCharacterId = localStorage.getItem(ACTIVE_CHARACTER_KEY);

  if (activeCharacterId === characterId) {
    localStorage.removeItem(ACTIVE_CHARACTER_KEY);
  }

  renderCharacterList();
  renderActiveCharacter();
  renderCharacterEditor();
}

function getActiveCharacter() {
  const activeCharacterId = localStorage.getItem(ACTIVE_CHARACTER_KEY);

  if (!activeCharacterId) {
    return null;
  }

  return characters.find((character) => character.id === activeCharacterId);
}

function renderActiveCharacter() {
  const activeDisplay = document.getElementById("active-character-display");

  if (!activeDisplay) {
    return;
  }

  const activeCharacter = getActiveCharacter();

  if (!activeCharacter) {
    activeDisplay.textContent = "No active character selected.";

    return;
  }

  activeDisplay.textContent = `Active Character: ${activeCharacter.name} - Level ${activeCharacter.progression.level}`;
}

function renderCharacterEditor() {
  const activeCharacter = getActiveCharacter();

  const nameInput = document.getElementById("edit-character-name");

  const levelInput = document.getElementById("edit-character-level");

  const backgroundInput = document.getElementById("edit-character-background");

  if (!nameInput || !levelInput || !backgroundInput) {
    return;
  }

  if (!activeCharacter) {
    nameInput.value = "";
    levelInput.value = "";
    backgroundInput.value = "";

    nameInput.disabled = true;
    levelInput.disabled = true;
    backgroundInput.disabled = true;

    return;
  }

  nameInput.disabled = false;
  levelInput.disabled = false;
  backgroundInput.disabled = false;

  nameInput.value = activeCharacter.name;
  levelInput.value = activeCharacter.progression.level;
  backgroundInput.value = activeCharacter.background;
}

function updateActiveCharacter() {
  const activeCharacter = getActiveCharacter();

  if (!activeCharacter) {
    return;
  }

  const nameInput = document.getElementById("edit-character-name");

  const levelInput = document.getElementById("edit-character-level");

  const backgroundInput = document.getElementById("edit-character-background");

  activeCharacter.name = nameInput.value;

  activeCharacter.progression.level = Number(levelInput.value) || 1;

  activeCharacter.background = backgroundInput.value;

  saveCharacters();

  renderActiveCharacter();
  renderCharacterList();
  renderCharacterSheet();
}

function renderCharacterSheet() {
  const sheetDisplay = document.getElementById("sheet-active-character");

  if (!sheetDisplay) {
    return;
  }

  const activeCharacter = getActiveCharacter();

  if (!activeCharacter) {
    sheetDisplay.textContent = "No active character selected.";
    return;
  }

  sheetDisplay.textContent = `Character Sheet: ${activeCharacter.name} - Level ${activeCharacter.progression.level}`;
}

async function importCharacter(event) {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  try {
    const fileContent = await file.text();
    const importedCharacter = JSON.parse(fileContent);

    if (importedCharacter.system !== "TNC") {
      throw new Error(
        "Invalid Character File. This is not a TNC character file.",
      );
    }

    if (importedCharacter.saveVersion !== 1) {
      throw new Error(
        "This TNC character file is from an unsupported version.",
      );
    }

    const duplicateId = characters.some(
      (character) => character.id === importedCharacter.id,
    );

    if (duplicateId) {
      importedCharacter.id = crypto.randomUUID();

      importedCharacter.name = `${importedCharacter.name || "Unnamed Character"} (Imported)`;
    }

    characters.push(importedCharacter);

    saveCharacters();
    renderCharacterList();

    event.target.value = "";
  } catch (error) {
    console.error("Error importing character:", error);

    alert("That file could not be imported as a TNC character.");
  }
}

function getCreationDraft() {
  const savedDraft = localStorage.getItem(CREATION_DRAFT_KEY);

  if (!savedDraft) {
    return null;
  }

  return JSON.parse(savedDraft);
}

function saveCreationDraft(draft) {
  localStorage.setItem(CREATION_DRAFT_KEY, JSON.stringify(draft));
}

function renderCharacterCreation() {
  const nameInput = document.getElementById("creation-name");

  const playerNameInput = document.getElementById("creation-player-name");

  const campaignInput = document.getElementById("creation-campaign");

  const backgroundInput = document.getElementById("creation-background");

  const statusDisplay = document.getElementById("character-creation-status");

  if (!nameInput || !playerNameInput || !campaignInput || !backgroundInput) {
    return;
  }

  const draft = getCreationDraft();

  if (!draft) {
    nameInput.disabled = true;
    playerNameInput.disabled = true;
    campaignInput.disabled = true;
    backgroundInput.disabled = true;

    if (statusDisplay) {
      statusDisplay.textContent = "No character creation draft found.";
    }

    return;
  }

  nameInput.value = draft.name;

  playerNameInput.value = draft.playerName;

  campaignInput.value = draft.campaign;

  backgroundInput.value = draft.background;

  if (statusDisplay) {
    statusDisplay.textContent = "Character creation in progress.";
  }
}

function updateCreationDraft() {
  const draft = getCreationDraft();

  if (!draft) {
    return;
  }

  const nameInput = document.getElementById("creation-name");

  const playerNameInput = document.getElementById("creation-player-name");

  const campaignInput = document.getElementById("creation-campaign");

  const backgroundInput = document.getElementById("creation-background");

  const statusDisplay = document.getElementById("character-creation-status");

  if (!nameInput || !playerNameInput || !campaignInput || !backgroundInput) {
    return;
  }

  draft.name = nameInput.value;
  draft.playerName = playerNameInput.value;
  draft.campaign = campaignInput.value;
  draft.background = backgroundInput.value;

  saveCreationDraft(draft);

  if (statusDisplay) {
    statusDisplay.textContent = "Draft saved.";
  }
}

// --------------------
// BUTTON & INPUT EVENTS
// --------------------

function initializeCharacterApp() {
  const createCharacterButton = document.getElementById("create-character-btn");

  if (createCharacterButton) {
    createCharacterButton.addEventListener("click", startCharacterCreation);
  }

  const editorInputs = [
    document.getElementById("edit-character-name"),
    document.getElementById("edit-character-level"),
    document.getElementById("edit-character-background"),
  ];

  editorInputs.forEach((input) => {
    if (input) {
      input.addEventListener("input", updateActiveCharacter);
    }
  });

  const importCharacterButton = document.getElementById("import-character-btn");

  const importCharacterFile = document.getElementById("import-character-file");

  if (importCharacterButton && importCharacterFile) {
    importCharacterButton.addEventListener("click", () => {
      importCharacterFile.click();
    });

    importCharacterFile.addEventListener("change", importCharacter);
  }

  const creationInputs = [
    document.getElementById("creation-name"),
    document.getElementById("creation-player-name"),
    document.getElementById("creation-campaign"),
    document.getElementById("creation-background"),
  ];

  creationInputs.forEach((input) => {
    if (input) {
      input.addEventListener("input", updateCreationDraft);
    }
  });

  renderCharacterList();
  renderActiveCharacter();
  renderCharacterEditor();
  renderCharacterSheet();
  renderCharacterCreation();
}

// --------------------
// INITIAL PAGE RENDER
// --------------------

if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    initializeCharacterApp();
  });
} else {
  initializeCharacterApp();
}
