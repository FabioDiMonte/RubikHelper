# RubikHelper
Rubik Helper tools

[RubikHelper test page](http://fabiodimonte.github.io/RubikHelper/)

# Rubik Blindfold Tutorial
#### vademecum for beginners

## Nomenclatura

### Facce e Slices
- facce: **F**ront, **B**ack, **U**p, **D**own, **L**eft, **R**ight
- slices: **M**edian, **E**quator, **S**tanding (o **S**ide)

Front:  
![Front](readme/small/face-f.png)

Back:  
![Back](readme/small/face-b.png)

Up:  
![Up](readme/small/face-u.png)

Down:  
![Down](readme/small/face-d.png)

Left:  
![Left](readme/small/face-l.png)

Right:  
![Right](readme/small/face-r.png)

Median:  
![Median](readme/small/slice-m.png)

Equator:  
![Equator](readme/small/slice-e.png)

Standing (or Side):  
![Standing](readme/small/slice-s.png)

### Pezzi
- centri (1 colore), spigoli (2 colori), angoli (3 colori)  
per gli spigoli e per gli angoli si segue un criterio ben preciso per identificare un pezzo già orientato o meno (vedi punti 1 e 3)
- per nominare un pezzo bisogna:
    - per gli angoli, leggere i colori partendo da quello in posizione `U` o `D` e proseguire in senso orario  
eg. `UFL`, `URF`, `ULB`, `DLF`, `DRB`, … sono orientati correttamente.  
eg. `LUF` bisogna orientarlo in senso antiorario. `FLU` invece in senso orario.  
per prendere dimestichezza, posizionare il pollice sul primo colore, l’indice sul secondo e il medio sul terzo: in questo modo si leggeranno i colori sempre in senso orario  
    - per gli spigoli, leggere i colori partendo da quello in posizione `U`, `D`, `F` o `B`  
eg. `FR`, `BL`, `UL`, `DF`, `UB`, … sono orientati correttamente

Centri:  
![Centers](readme/small/centers.png)

Spigoli:  
![Edges](readme/small/edges.png)

Angoli:  
![Corners](readme/small/corners.png)

### Mosse
- orario (`F`, `R`, `U`) e antiorario (`F'`, `R'`, `U'` o `Fi`, `Ri`, `Ui`)
- la rotazione dell’intero cubo è indicata con l’asse di rotazione in minuscolo: dopo la rotazione del cubo, il nome delle facce non corrisponderà più al colore originale
    - eg. dopo aver eseguito `x'`, la faccia `B` diventa `U`, la faccia `U` diventa `F` e così via…
- di tanto in tanto si possono trovare le lettere delle facce in minuscolo (`f`, `r`, `u`, …): questa nomenclatura serve ad indicare che la rotazione prevede la faccia indicata insieme a `M`, `E` o `S`
- per esempio, il pattern `x'L'` corrisponde a `r'` (o `R'M`)
- NB: il senso di rotazione in alcuni casi potrebbe non essere chiaro:
    - `M` = `L`
    - `x` = `R`
    - `y` e `E` = `U`
    - `z` e `S` = `F`
- NB: la nomenclatura in minuscolo per le facce è per lo più utilizzata con i cubi più grandi del 3x3 (4x4, 5x5, …) dove però non viene considerato lo slice M: quindi per esempio `r` indica la rotazione della faccia `R` e di quelle ad essa adiacente fino ad `M` escluso (nel 4x4 non esiste M, nel 5x5 sono le 2 facce a destra, nel 6x6 sono 3 e così via)

## Introduzione

### Come funziona il metodo blindfold (le basi)
- questo metodo permette di risolvere il cubo senza ruotarlo tra le mani, come avviene per gli altri metodi più comuni ([“a strati”](http://www.youcandothecube.com/secret-unlocked/solution-stage-one.aspx), [Fridrich](http://en.wikipedia.org/wiki/CFOP_Method), …) e posizionando sempre un pezzo alla volta senza intaccare il resto del cubo
- in questo modo è possibile memorizzare la sequenza di pezzi da permutare per risolvere il cubo
- la convenzione è avere sempre il cubo tra le mani posizionato con la faccia F sul rosso e la faccia U sul giallo (di conseguenza `L`=blu, `R`=verde, `B`=arancio, `D`=bianco)

![Cube colors](readme/small/cube-colors.png)

### Come funziona il metodo M2R2 (le basi)
- tutti i pattern di permutazione per spigoli e angoli delle facce L e R sono composti da:  
Setup -> M2 o R2 -> UnSetup
- ogni singolo pezzo ha una sua mossa di Setup
- la mossa di UnSetup corrisponde all’inverso di quella di Setup  
eg. U’LU -> M2 -> U’L’U
- ogni pattern di permutazione include la mossa M2 o R2, di conseguenza vanno eseguiti sempre 2 pattern consecutivi per avere sempre la situazione del cubo invariata per i pezzi non interessati

### Cosa sono e a cosa servono i pezzi "buffer"
- i pezzi nella posizione `DF` per gli spigoli e `DFR` per gli angoli sono nominati _*buffer*_
- il metodo M2R2 prevede la permutazione di un pezzo alla volta dalla posizione _buffer_ alla posizione _“target”_ (corretta)
- il pezzo buffer e quello nella posizione di target vengono scambiati ad ogni permutazione
- la mossa di Setup serve a posizionare il pezzo della posizione _target_ alla posizione opposta al _buffer_
- quando il secondo pezzo da posizionare è un _buffer_ e tutti gli altri dello stesso tipo (spigoli o angoli) sono già alla rispettiva posizione di _target_ (ad esclusione del pezzo opposto al _buffer_), allora si incorre nella _*parità*_ (circa il 50% dei casi)

### Prima di iniziare
- prendere dimestichezza con la nomenclatura dei pezzi e tutti i pattern, partendo dal cubo risolto.
- provare ad eseguire ciascuno dei pattern riportati di seguito 2 volte (la prima volta per capirne lo scopo, la seconda volta per ripristinare il cubo alla situazione di partenza)
- dal momento che questo metodo posiziona correttamente 2 pezzi per volta, per la permutazione dei pezzi appartenenti alle facce `M` (spigoli) e `R` (angoli) considerare la posizione di target in quanto nella seconda permutazione `M` o `R` saranno girate di 180°
    - eg. per gli spigoli:  
se il primo dei 2 pezzi da permutare è `UF`, eseguire direttamente il pattern `UF`  
se `UF` è il secondo pezzo (quindi `M` è girato), eseguire il pattern opposto (ovvero `DB`)
    - eg. per gli angoli:  
se il primo dei 2 pezzi da permutare è `URF`, eseguire direttamente il pattern `URF`  
se `URF` è il secondo pezzo (quindi `R` è girato), eseguire il pattern opposto (ovvero `DRB`)

## Orientamento spigoli
(1 pattern di uso comune, 2 patterns più rari)

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

Parity:  
![Parity](readme/small/parity.png)

J-perm:  
![J-perm](readme/small/j-perm.png)

## Riepilogo
TOTALE PATTERNS: 45  
dei quali:  
3 molto lunghi (difficilmente comprensibili)  
28 molto semplici (corti e di facile comprensione)  
14 pressoché inutili (orientamento+permutazione angoli)  

reference: [Stefan Pochmann M2R2](http://www.stefan-pochmann.info/spocc/blindsolving/M2R2/)
