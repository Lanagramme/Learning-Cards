# Learning Cards

## Description

Outil d'aide à l'apprentissage et aux révisions, basé sur les recherches actuelles en psychologie cognitive.

Mots clés:

- Apprentissage
- Delayed repetition
- Flash card

## Features:

- système de **cartes** de savoir : les information sont présentées sous formes de flash-card (Question / Réponse)
- Les _cartes_ sont triées par themes appelés **tags**
- Les _cartes_ sont tirée aléatoirement selon des critères selectionnables afin de former un **deck**
- Durans la cession, en fonction des réponses de l'utilisateur, les _cartes_ seront triées dans **Stasks**
- Les trois stacks sont :
  1.  Inconnu
  2.  Peu connu
  3.  Connu
- Les questions sont posées à la chaine, en priorisant celles avec lesquelles l'utilisateur à du mal

## Life Cycle

1. _Choose_ a **deck**
2. _Pick a random_ **card**
   - _Lire_ **card** **question**
   - _Donner_ **answer**
   - Si bonne **answer**, _add_ **tally**
     - Si 3 **tally**, **stack_level** +1
   - Si mauvaise réponse **remove** 2 **tallys**
     - Si 0 **tally**, **stack_level** -1
3. Ts ls 5 **cards** du **stack** 1 _lire_ une **card** du **stack** 2
4. Ts ls 3 **cards** du **stack** 2 _lire_ une **card** du **stack** 3

## Améliorations

- Limite de card par deck
- Tri cards par theme
- Mode "shuffle" : un deck 25 card tirées dans tous les themes
- Mode "contre la montre" : faire passer tout le deck en stack 3 en un temps limité
- mode "mort subite" : défaite après 5 mauvaises réponses
- Donner un score : échec / réussites
- QCM: prendre des réponses dans le meme deck comme leures

## Objects

**Card**

- id
- question
- answer
- stack_level
- tally_count

## Tasks

**Sprint n°1**

- [x] Choisir une carte au hasard

- [x] Lire question
- [x] Donner réponse
- [x] vérifier réponse

- [x] Increase tally_count
- [x] Decrease tally_count
- [x] Increase stack_level
- [x] Decrease stack_level

- [x] Save data
- [x] Load data

**Sprint n°2**

- [x] Afficher le tally et le stack de chaque carte sous la question
- [x] Afficher le nombre de carte dans chaque stack
- [x] Auto scroll les stacks
- [x] Afficher toutes les cartes

**Sprint n°3**

- [ ] Designer l'UI **(en cours)**

**Sprint n°4**

- [ ] Associer des tags aux cartes
- [ ] Trier les cartes par tag
- [ ] Créer des deck par filtre de tags
- [ ] Placer une limite sur le nombre de cartes dans un deck
- [ ] Page edition de deck

**Sprint n°5**

- [ ] Equilibrage
