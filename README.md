# Last Man Typing
## Background 
LMT is a typing game where aliens are trying attack a town as one man tries to defend it. Each alien will have a word over their head and the shooter (the player) has to type out the words before they reach the town. There will occassionally be special aliens which when destroyed, the shooter will get fortifications to add health to the base. If too many aliens get through, the town will be destroyed and the game will end. 

As the game progresses, aliens with larger words will start to spawn and will do so at a quicker rate. Additional information and features will be mapped out in the **Functionality & MVP** and **Features** sections.

## Functionality & MVP

- [ ] Objects will spawn on one side of the screen with a word associated with it
- [ ] Typing out words in anyorder will remove object from play
- [ ] WPM counter will be seen with live updates
- [ ] When screen is populated with overlapping words, an array will appear to distinguish each word

_BONUS_
- [ ] The game will have a unique skin 
- [ ] Special aliens will have drops/bonuses when destroyed
- [ ] Mini-bosses will appear if the player survives long enough
- [ ] Multiple skins/themes will be available for player's preference
- [ ] Player has tracking of the word it typed and its position on the screen


## Wireframes

This app will consist of a single screen with all the animations happening in a playbox. Nav links for my LinkedIn, Github, and Angel list will be featured at the top of page above the title. Within the playbox, the player's object will be on the right side of the screen with the alien objects spawning on the left. There will be barricades towards the center of the screen which will give the player some delay to type out the words. Additionally, any bonus features will available at the bottom of the play box with themes available underneath.

## Architecture and Technologies

This project will be implemented in the following technologies:
- `Javascript` for game logic
- `NOT 100% sure which to use for rendering effects`


## Implementation Timeline
**Day 1:** Setup all modules and basic packages and create a barebone outline of the project. Look into what would be the best tool for rendering the objects and which would have the best ability to change skins on the fly. 

Additional setup will be creating the game logic and object files. This would include creating a random word generator paired with alien objects. Alien objects will have random spawn rates chosen between 0.1s and 3s and move at a specified x-velocity. Y-positioning will be chosen randomly between 0-x tiles high. 

**Day 2:** Further develop the alien object and movement functionality. A dynamic array will track all words on the board and will check the user input to see if there are any matches. By the end of the day, we should expect moving objects on screen with a word above them. If time allow, creating barrier blocks in the game with health bars will be added to help give the player additional time. 

**Day 3:** Fine tune the movement counter and RNG objects for a fair yet difficult experience. Include a remaining health bar feature and begin looking at adding skins for the game.  Additional time will be spent adding additional features such as the WPM display and the array of overlapping words.
