# Mission Escape

A browser-based adventure and puzzle game built with HTML, CSS, JavaScript, and the Canvas 2D API.

## Run the game
1. Extract the ZIP file.
2. Open `index.html` in a modern browser. No build step or server is required.
3. For GitHub Pages, upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root (not inside an extra nested folder).
4. In GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.

## Controls
- **A / D** or **Left / Right arrows:** move
- **Space:** jump
- **E:** interact with nearby objects
- **Sound button:** turn audio on or off

## Seven missions
1. **Power Core** — explore and collect three energy cells.
2. **Logic Terminal** — solve a number sequence.
3. **Memory Grid** — repeat a five-step light pattern.
4. **Final Route** — navigate the side-scrolling facility to the exit.
5. **Circuit Repair** — activate circuit nodes in the correct order.
6. **Security Puzzle** — collect three access symbols and enter their order.
7. **Final Escape** — collect the final clue, solve the final number code, and reach the exit.

## Instructor's nine required concepts
1. **Scenes:** intro, active gameplay, and completion screens; each mission changes the active challenge.
2. **Background Images:** layered CSS gradients and a distinct illustrated facility background in the game world.
3. **Object Manipulation:** move the explorer, jump, collect energy cells and symbols, and activate puzzle objects.
4. **Spritesheets:** the explorer animation is drawn from a four-frame sprite sheet generated in JavaScript.
5. **Physics:** gravity, jumping, landing, and collision with tile platforms.
6. **Input:** keyboard controls (WASD/arrows, Space, E) and on-screen buttons.
7. **Cameras:** a horizontal follow camera keeps the explorer in view while the facility scrolls.
8. **Tile Sprites:** the facility is rendered from a tile map with floor, wall, and platform tiles.
9. **Audio Output:** generated sound effects for movement actions, selections, and mission completion; the sound toggle controls audio.

## Target audience
Teenagers and young adults who enjoy adventure games, logic puzzles, memory challenges, and problem-solving.

## Technologies
- HTML5 for structure and game screens.
- CSS3 for layout, backgrounds, and responsive design.
- JavaScript for mission logic, keyboard input, animation, physics, camera movement, and sound.
- Canvas 2D for the tile-based game world and character sprite animation.
