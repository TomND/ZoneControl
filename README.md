#README

The following document will contain information about the proposed gameplay, monetization and work threshold for the game Zone Control. This document is meant to be edited and reviewed upon, and its purpose is to dictate the flow of development. This will simply serve as a guideline, and a reference point to what needs to be done, and how. Major Gameplay decisions and thematic ideas will also be explained thoroughly.

#Introduction
Zone Control is a fast paced, micro intensive game which combines real-time reflexes with on the fly strategy. Zone Control emphasizes its quick game times and intuitive game mechanics to deliver an overall fun experience. Players will be able to play casually, or test their skill among the best players in the world to compete on a global ladder.

##Lore
The setting of the game is a modern warfield, taking place in present time. (I think this’ll be good if we were to implement reallifestuff in the game since it’d be easier to research) 

#Gameplay

##Real Time
The Zone Control game is unique in its gaming experience, as it provides a commonly conceptualized turn based style game and transforms it into real time gameplay. Players are required to micromanage resources, and fight versus one another to gain territory and dominate the nation.  This means all players will be engaged throughout the duration of the game, and there will be no standstills in gameplay.

##Game Details
Each game will last to a maximum of 8 minutes, with the game ending earlier if either of the players have met a win condition or the other players have left the game. Every 30 seconds a “turn” will have passed.

##Game Phase
The game begins with the four players scattered randomly with one unit placed inside every territory. Each territory is equipped with an army camp which has the ability to train units. The army camp also serves as a defensive building, which damages nearby enemies. The goal of the game is to conquer the entire world and eliminate other players.

##Resources
The main resource in the game is money. Money allows you to buy troops and deploy them in any territory where you own an army camp. Money is generated every 30 seconds (turn) and is a flat amount plus bonuses. Bonuses can come from owning a certain number of territories as well as owning a nation. Future ideas for bonuses could also include most units killed during a turn, most land taken in a turn, etc.
##Match Making
Matchmaking will be based on the user’s rank / rating. The user’s ELO or score will be publicly displayed, with divisions created based on intervals. A leaderboard displaying the highest ranked players in each division will be available for players to see at anytime.

#Gameplay Mechanics

##Units
Similar to most RTS games, units will be controlled via individually clicking units, or drag clicking (to form a box). Units will collide with one another, and each unit has its own individual stats. Units have the following stats:
-	HP
-	Damage
-	Armor (Similar to AOE and it’s damage bonuses)
-	Range
-	Movement Speed
When a unit reaches 0 HP, it dies. Units will automatically attack anything within its range, but will not aggro onto enemy units unless an attack command is sent by the player. 
There are several types of units, each with its own perks and abilities. The current units proposed are:
-	Soldier (Standard unit, ranged attack with balanced stats, also cheapest unit)
-	Field Medic (Unit with no attack, heals nearby units with a casted ability – animation)
-	Artillery (Unit with long range, strong against infantry/tanks but extremely slow)
-	Tank (Unit with medium range, strong against infantry but costly)

##Buildings
There is one building in each territory. This building is able to train all units, at varying costs. The building also has a passive buff which gives units in its “zone” +50% attack/hp. Attached to each building is a “zone” where a unit must be kept in at all times. In the beginning of the game a soldier will be placed into it, however the player has the option to allow any unit inside it.

#First Steps

##Gameplay
-	Movement
o	Drag to select
o	Click to select
o	Player to server to player interaction
o	Unit collision
-	Combat
o	HP Updating
