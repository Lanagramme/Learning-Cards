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
   - _Give_ **answer**
   - Si good **answer**, **tally** +1
     - Si 5 **tally**, **stack_level** +1
   - Si bad **answer**, **tallys** -2
     - Si **tally** < 1, **stack_level** -1 & tally = 3
3. Ts ls 5 **cards** du **stack** 1 _lire_ une **card** du **stack** 2
4. Ts ls 3 **cards** du **stack** 2 _lire_ une **card** du **stack** 3

## Améliorations

- Mode "QCM" : prendre des réponses dans le meme deck comme leures
- Mode "shuffle" : un deck 25 card tirées dans tous les themes
- mode "mort subite" : défaite après 5 mauvaises réponses
- Mode "contre la montre" : faire passer tout le deck en stack 3 en un temps limité
- Donner un score : échec / réussites par carte ou par deck

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
- [x] Mise en place du code de logique des quizz

**Sprint n°3**

- [ ] Designer l'UI **(en cours)**

**Sprint n°4**

- [ ] Associer des tags aux cartes
- [ ] Ajouter options de tri
- [ ] Créer des deck
- [ ] Créer des deck (automatiquement)

**Sprint n°5**

- [ ] Page edition de deck
- [ ] Page CRUD
- [ ] Equilibrage
