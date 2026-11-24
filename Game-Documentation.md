# MISSION ESCAPE — GAME DOCUMENTATION

## Cover Page
**Game Title:** Mission Escape  
**Course:** Game Design and Programming  
**Team Members:** [Add each team member's full name]  
**University IDs:** [Add each member's university ID]  
**Instructor:** [Add instructor's name]

## Game Title
Mission Escape

## Game Description
Mission Escape is a browser-based adventure and puzzle game. A systems failure locks down a research station, and the player controls an explorer who must complete seven missions to restore the station and reach the final exit. The game combines exploration, collecting objects, logical reasoning, memory, and sequence challenges.

## Game Genre
2D Adventure, Puzzle, and Educational Game.

## Gameplay
The player starts at the mission-control screen and enters the facility. The explorer moves through a tile-based environment using the keyboard, jumps over platforms, and interacts with nearby objects. The player completes seven missions in order: collecting energy cells, solving a number sequence, repeating a memory pattern, navigating a route, repairing a circuit, finding security symbols, and solving the final code before reaching the exit. The interface displays mission progress and points. Audio feedback can be switched on or off.

## Motivations for Playing
- Complete a sequence of increasingly challenging missions.
- Earn points by solving tasks and restoring the station.
- Explore the facility and discover interactive objects.
- Improve logical reasoning, attention, memory, and planning.

## Target Audience
Teenagers and young adults who enjoy adventure games, logic puzzles, memory challenges, and problem-solving activities.

## Controls
- A / D or Left / Right arrows: move.
- Space: jump.
- E: interact with a nearby object.
- Sound button: turn sound effects on or off.

## Implementation of the Nine Required Concepts
1. **Scenes:** intro screen, gameplay screen with mission changes, and completion screen.
2. **Background Images:** layered illustrated facility backgrounds created with CSS gradients and Canvas drawing.
3. **Object Manipulation:** player movement, jumping, collecting objects, and activating puzzle nodes.
4. **Spritesheets:** four-frame explorer sprite sheet generated and animated in JavaScript.
5. **Physics:** gravity, jumping, landing, and collisions with tile platforms.
6. **Input:** keyboard movement, jump and interact controls, plus interface buttons.
7. **Cameras:** horizontal follow camera that tracks the explorer through the larger world.
8. **Tile Sprites:** the facility world is drawn from a tile map of floor, wall, and platform tiles.
9. **Audio Output:** synthesized sound effects for actions, puzzle feedback, and mission completion, with a mute toggle.

## Technologies
HTML5, CSS3, JavaScript, Canvas 2D API, and the Web Audio API.
