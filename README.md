# RubikHelper
Rubik Helper tools

[RubikHelper test page](http://fabiodimonte.github.io/RubikHelper/)

# Rubik Blindfold Tutorial
#### vademecum for beginners

Table of contents:
- [Naming](#naming)
- [Introduction](#introduction)
- [Edges orientation](#edges-orientation)

## Naming

### Faces and Slices
- faces: **F**ront, **B**ack, **U**p, **D**own, **L**eft, **R**ight
- slices: **M**edian, **E**quator, **S**tanding (o **S**ide)

| Front | Up | Right |
| --- | --- | --- |
| ![Front](readme/small/face-f.png) | ![Up](readme/small/face-u.png) | ![Right](readme/small/face-r.png) |

| Back | Down | Left |
| --- | --- | --- |
|![Back](readme/small/face-b.png) | ![Down](readme/small/face-d.png) | ![Left](readme/small/face-l.png) |

| Median | Equator | Standing |
| --- | --- | --- |
| ![Median](readme/small/slice-m.png) | ![Equator](readme/small/slice-e.png) | ![Standing](readme/small/slice-s.png) |

### Pieces
- centers (1 color), edges (2 colors), corners (3 colors)  
there is a specific criteria in order to check a correctly oriented piece (for [edges](#orient-edges) and [corners](orient-corners))
- to determine a piece's name:
    - corners: read stickers colors starting from the one in position `U` or `D` and go on clockwise
eg. `UFL`, `URF`, `ULB`, `DLF`, `DRB`, ... are correctly oriented.  
eg. `LUF` should be oriented counterclockwise. `FLU` should be oriented clockwise.  
to get practice, place your thumb on the first sticker, your index finger on the second one and the middle finger on the third: this way you'll read colors clockwise
    - edges, read stickers colors starting from the one in position `U`, `D`, `F` or `B`  
eg. `FR`, `BL`, `UL`, `DF`, `UB`, ... are correctly oriented.

| Centers | Edges | Corners |
| --- | --- | --- |
| ![Centers](readme/small/centers.png) | ![Edges](readme/small/edges.png) | ![Corners](readme/small/corners.png) |

### Moves
- clockwise (`F`, `R`, `U`) and counterclockwise (`F'`, `R'`, `U'` or `Fi`, `Ri`, `Ui`)
- the full cube rotation is specified with the rotation axis in lower case: after the cube rotation, faces names won't matches anymore their original colors.
    - eg. after executing `x'`, face `B` became `U`, face `U` became `F` and so on...
- eventually lower case letters can be used (`f`, `r'`, `ui`, ...): this is intended for specify more than one face or slice
    - eg. the pattern `x'L'` equals `r'` (or `R'M`)
- Note: keep in mind these comparisons when thinking about face/slice/cube rotation
    - `M` = `L`
    - `x` = `R`
    - `y` e `E` = `U`
    - `z` e `S` = `F`
- Note: lower case letters are mostly used referring to bigger cubes (4x4, 5x5, ...) where, for instance, `r` means face `R` rotation along with all other slices between `R` and `M` (M not included)

## Introduction

### How the blindfold method works (basis)
- this method allows to solve the cube without rotate it, as other methods do ([“beginners”](http://www.youcandothecube.com/secret-unlocked/solution-stage-one.aspx), [Fridrich](http://en.wikipedia.org/wiki/CFOP_Method), ...), and placing on piece at a time keeping the rest of the cube unmodified.
- this way is possible memorize the full sequence of pieces in order to solve the whole cube
- convention wants to have the cube facing the red face on position `F` and the yellow one on position `U` (so  `L`=blue, `R`=green, `B`=orange, `D`=white)

![Cube colors](readme/small/cube-colors.png)

### How M2R2 works (basis)
- all permutation patterns for edges and corners of `L` and `R` faces are composed this way:  
Setup -> M2 or R2 -> UnSetup
- every single piece have a Setup move
- the Unsetup move is the exact inverse of its Setup move  
eg. U’LU -> M2 -> U’L’U
- every permutation pattern include `M2` or `R2` move, this way it needs 2 patterns to be executed in order to have the cube exactly the same it was before concerning pieces not interested in the patterns

### What are and "buffer" pieces and what's their purpose
- pieces in position `DF` (edge) and `DFR` (corner) are named _*buffer*_
- M2R2 method foresee the permutation of one piece at a time from _buffer_ position to _"target"_ position (the correct one)
- the buffer piece will be swapped with the one in target position at every permutation
- the Setup move swap the piece in the _target_ position with the one opposite to _buffer_
- when the second piece of a couple of permutations is the _buffer_ piece and every other piece of the same kind (edges or corners) are in their respective _target_ position (excluded the piece opposed to _buffer_), then is the case of _*parity*_ (about 50% of solving processes)

### Before starting
- get familiarity with pieces and moves naming starting with a solved cube
- try to execute each following pattern twice (first time to understand its purpose, second one to get the cube back to initial state)
- given this method place 2 pieces at a time, in order to permutate pieces on `M` slice (edges) or `R` face (corners) keep in mind their target position for in the second permutation `M` or `R` will be rotated by 180°
    - eg. edges:  
if the first of 2 pieces to be permutated is `UF`, execute pattern `UF`  
if `UF` is the second one (and so `M` is rotated), execute the opposite pattern (that is `DB`)
    - eg. corners:  
if the first of 2 pieces to be permutated is `URF`, execute pattern `URF`  
if `URF` is the second one (and so `R` is rotated), execute the opposite pattern (that is `DRB`)

## Edges orientation
(1 common use pattern, 2 rare patterns)

### determinare quali spigoli orientare
- per ogni spigolo da orientare, verificarne i colori e la loro posizione sulle facce
- sulle facce `U`,`D`,`F`,`B` devono esserci solo i relativi colori (quindi né `L` né `R`)
- i primi 2 pattern orientano 2 o 4 pezzi sulla faccia `U` (se 2, sono uno di fronte all’altro)
- applicare il concetto di Setup e UnSetup per orientare gli spigoli non posizionati correttamente (quindi per portarli tutti sulla faccia `U` oppure ruotare il cubo finchè non sono tutti posizionati sulla faccia superiore)

### orientare 2 spigoli sulla stessa faccia
- `[M'U]*3 U [MU]*3 U`

![Orient 2 edges](readme/small/o2e.png)

### opzionale: 4 spigoli sulla stessa faccia
- `[M'U]*4 [MU]*4`

![Orient 4 edges](readme/small/o4e.png)

### opzionale: 4 spigoli su 2 facce diverse
- `[M'U]*4` oppure `[MU]*4`

## Permutazione spigoli già orientati correttamente
(10 patterns)

### Permutazione spigoli L e R
NB: tutti i pattern della faccia `L` avranno la prima mossa di `U` in senso antiorario  
NB: tutti i pattern della faccia `R` avranno la prima mossa di `U` in senso orario

#### Faccia L
- `BL`: `U'LU    M2  U'L'U`
- `FL`: `U'L'U   M2  U'LU`
- `DL`: `U'L2U   M2  U'L2U`
- `UL`: `LU'L'U  M2  U'LUL'`

#### Faccia R
- `BR`: `UR'U'   M2  URU'`
- `FR`: `URU'    M2  UR'U'`
- `DR`: `UR2U'   M2  UR2U'`
- `UR`: `R'URU'  M2  UR'U'R`

### Permutazione spigoli M-side
NB: per questi pattern considerare la posizione target  
NB: i pattern per `UF` e `DB` sono rispettivamente uno l’inverso dell’altro

- `DF`: _buffer_
- `UB`: `M2`
- `UF`: `[U2M']*2`
- `DB`: `[MU2]*2`

## Orientamento angoli
(4 patterns)

### determinare quali angoli orientare
- per ogni angolo da orientare, verificarne i colori e la loro posizione sulle facce
- sulle facce `U` e `D` devono esserci solo i relativi colori (giallo o bianco)
- se sono solo 2 angoli, avranno orientamento inverso (uno orario e uno antiorario)
- se sono 3 angoli, avranno lo stesso orientamento (tutti e 3 in senso orario o antiorario)
- ciascuno dei seguenti pattern orienta l’angolo nella posizione `UFL`
- per orientare 2 o 3 angoli, eseguire per ciascuno il pattern corretto alternandone la posizione ruotando la faccia `L`
- applicare il concetto di Setup e UnSetup per orientare gli angoli non posizionati correttamente
- NB: in ogni coppia di pattern, uno è l’inverso dell’altro
- NB: se l’angolo in posizione `UFL` va orientato in senso orario, iniziare con il pattern che muove R in senso orario (e viceversa)

### orientare 2 angoli (1 pattern per senso orario)
- `U' RUR'U'R  U` (orario)
- `U' R'URU'R' U` (antiorario)

### orientare 3 angoli (1 pattern per senso orario)
- `R'U' RU R'U' RU` (orario)
- `U'R' UR U'R' UR` (antiorario)

## Permutazione angoli già orientati correttamente
(6 patterns)

### permutare angoli faccia L
NB: la prima parte dei pattern Setup di `DBL` e `UFL` portano il relativo pezzo in posizione `ULB`  
NB: la seconda parte dei pattern Setup di `DBL` e `UFL`, infatti, corrisponde al pattern per `ULB`

- `ULB`: `L'U'LU         R2  U'L'UL`
- `DLF`: `U'L2U          R2  U'L2U`
- `DBL`: `U'L2U  L'U'LU  R2  U'L'UL U'L2U`
- `UFL`: `LU'L'U L'U'LU  R2  U'L'UL U'LUL'`

### permutare angoli faccia R
NB: per questi pattern considerare la posizione target  
NB: i pattern per URF e DRB sono rispettivamente uno l’inverso dell’altro

- `DFR`: _buffer_
- `UBR`: `R2`
- `URF`: `U'RF'rU      R2  U'r'FRU R2`
- `DRB`: `R2 U'R'F'rU  R2  U'r'FR'U`

## Orientamento + permutazione spigoli
(8 patterns: 1 nuovo pattern per ogni spigolo di L e R)

#### Faccia L
- `LB`: `x L'ULU'  M2  UL'U'L x'`
- `LF`: `x UL2U'   M2  UL2U'  x'`
- `LD`: `x ULU'    M2  UL'U'  x'`
- `LU`: `x UL'U'   M2  ULU'   x'`

#### Faccia R
- `RB`: `x RU'R'U  M2  U'RUR' x'`
- `RF`: `x U'R2U   M2  U'R2U  x'`
- `RD`: `x U'R'U   M2  U'RU   x'`
- `RU`: `x U'RU    M2  U'R'U  x'`

## Orientamento + permutazione angoli
(14 patterns: 2 nuovi patterns per ogni angolo ad esclusione del buffer)

### permutare e orientare angoli faccia L
- `BUL`: `y RU R2 U'R'  F2  RU R2 U'R' y'`
- `LBU`: `U' L' U       R2  U' L U`
- `FDL`: `U'L' U L'U' LU  R2  U'L' UL U' LU`
- `LFD`: `L2 U'L'U        R2  U'LU L2`
- `LDB`: `LU'L'U  R2  U'LUL'`
- `BLD`: `U'LU    R2  U'L'U`
- `LUF`: `L'U'L'U  R2  U'LUL`
- `FLU`: `R' ULU'  R2  UL'U' R`

### permutare e orientare angoli faccia R
- `RDF`: _buffer_
- `FRD`: _buffer_
- `RUB`: `U' LU L'U' LU   R2  U'L' UL U'L' U`
- `BRU`: `U'L' UL U'L' U  R2  U' LU L'U' LU`
- `FUR`: `R2 U'R M' x L2M2 ULU' R' UL'U'L' R' U`
- `RFU`: `F'RU R2 U'R'F RU R2 U'R`
- `BDR`: `RUR' D L2 x2 U'RU L2 x2 U' D' R`
- `RBD`: `R'U R2 U'R'F' RU R2 U'R'F`

## Parità
(1 pattern)

- questo pattern è più noto come J-Perm, che scambia 2 spigoli e 2 angoli tra di loro posizionati a forma di J (o di L), ereditato direttamente dal metodo Fridrich (PLL)
- la mossa di Setup sposta i 4 pezzi interessati nella posizione adatta per il J-Perm e l’Unsetup li riporta alla loro posizione corretta.
    - Setup:   `U'F2`
    - J-perm:  `L'U2 LU L'U2 RU' LUR'`
    - UnSetup: `F2U`

| Parity | J-perm |
| --- | --- |
| ![Parity](readme/small/parity.png) | ![J-perm](readme/small/j-perm.png) |

## Riepilogo
TOTALE PATTERNS: 45  
dei quali:  
3 molto lunghi (difficilmente comprensibili)  
28 molto semplici (corti e di facile comprensione)  
14 pressoché inutili (orientamento+permutazione angoli)  

reference: [Stefan Pochmann M2R2](http://www.stefan-pochmann.info/spocc/blindsolving/M2R2/)
