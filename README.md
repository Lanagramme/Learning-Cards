# Learning Cards

## Description

Delayed repetition tool and knowledge tracker

- système de cartes de savoir

  - question
  - réponse

- 3 Stasks
  1.  Inconnu
  2.  Peu connu
  3.  Connu

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
- Mode shuffle 25 card dans tous les themes
- Contre la montre : faire passer tout le deck en stack 3
- Mort subite : défaite après 5 mauvaises réponses
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

- [ ] Afficher le tally et le stack de chaque carte sous la question
- [ ] Afficher le nombre de carte dans chaque stack
- [ ] Auto scroll les stacks

**Sprint n°2**

- [ ] Associer des tags aux cartes
- [ ] Trier les cartes par tag
- [ ] Créer des deck par filtre de tags
- [ ] Placer une limite sur le nombre de cartes dans un deck
