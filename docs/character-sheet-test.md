---
title: Character Sheet Test
---

# Character Sheet Test

This page exists temporarily while I build the digital character creation system.

<div id="character-manager">

<div>
    <label for="new-character-name">Character Name</label><input id="new-character-name" type="text" placeholder="Enter character name" />

<button id="create-character-btn" type="button">Create Character</button>

</div>

<div>
    <label for="import-character">Import Saved Character</label>
    <button id="import-character-btn" type="button">Import Character</button>
    <input id="import-character-file" type="file" accept=".json,application/json" hidden />

<h2>Active Character</h2>
<p id="active-character-display">No character selected.</p>

<h2>Character Editor</h2>
<div id="character-editor">
    <div>
        <label for="edit-character-name">Character Name</label>
        <input id="edit-character-name" type="text" />
    </div>
    <div>
        <label for="edit-character-level">Level</label>
        <input id="edit-character-level" type="number" min="1" />
    </div>
    <div>
        <label for="edit-character-background">Background</label>
        <input id="edit-character-background" type="text" />
    </div>
</div>

<h2>Saved Characters</h2>
<div id="character-list"></div>

</div>

<script src="../assets/js/character-sheet.js"></script>
