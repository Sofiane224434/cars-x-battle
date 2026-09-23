# Cars x Battle : Document de Game Design & Architecture de Jeu
*Adapté du framework de Girls x Battle 2 (GXB2) vers un univers Hard Sci-Fi / Industriel Inanimé.*

---

## 1. Concept Fondamental & Piliers Thématiques

**Cars x Battle** conserve 100% des boucles mathématiques, des systèmes de progression et du rythme de combat automatisé de *Girls x Battle 2*, mais remplace :
1. **Les Personnages (Campus Belles / Waifus)** $\rightarrow$ **Châssis Mécaniques Transformables / Véhicules Tactiques Autonomes**.
2. **La Magie & les Sorts** $\rightarrow$ **Instruments Scientifiques & Modules de Calibrage** (appliqués via la logique informatique interne, capteurs, forces cinétiques et énergie dirigée).

---

## 2. Roster & Système d'Unités (Boucle "Gacha")

### 2.1. Invocations & Acquisition
Au lieu de recruter des élèves depuis un registre d'académie, les joueurs émettent des **Protocoles de Rapatriement** ou des **Bons de Commande Industriels** au Port Central.
* **Raretés (Étoiles) :** 3 Étoiles (Plans Communs), 4 Étoiles (Composants Rares), 5 Étoiles (Prototypes Épiques) et 6 Étoiles / Légendaire (Châssis Maîtres Uniques).
* **Système de Doublons :** L'obtention de châssis en double les convertit en **Fragments d'Alliage Structurel**, nécessaires pour le système d'ascension ("Limit Break" / Montée en Étoiles), identique au mécanisme d'ascension de GXB2.

### 2.2. Classification & Rôles des Unités
Les véhicules sont répartis en 5 archétypes tactiques distincts :
1. **Avant-Garde Lourde (Tanks) :** Haute densité structurelle, blindage composite épais, conçus pour absorber les dégâts cinétiques et thermiques de première ligne.
2. **Unités d'Assaut (DPS Ligne Avant) :** Mobilité équilibrée et balistique de gros calibre ciblant les lignes principales ennemies.
3. **Reconnaissance & Intercepteurs (Assassins / Rapides) :** Taux d'esquive et de coups critiques élevés, contournant les premières lignes pour cibler les unités scientifiques arrière.
4. **Artillerie / Plateformes de Siège (DPS de Zone / AoE) :** Vitesse de déploiement plus lente, mais capables de barrages dévastateurs de missiles ou de plasma de zone.
5. **Laboratoires de Soutien / Plateformes Mobiles (Soigneurs / Buffers) :** Châssis non armés ou légèrement armés, équipés d'essaims de nano-réparation et de modulateurs de fréquence pour renforcer les alliés ou dissiper les altérations d'état.

---

## 3. Système de Combat & Formations

Les combats sont entièrement automatisés (simulation Idle), se concentrant sur la préparation tactique avant l'affrontement et le déclenchement automatique des compétences/outils régis par une jauge d'énergie et de temps de recharge.

### 3.1. Grille de Formation (6 Emplacements)
* **Ligne Avant (2 Emplacements) :** Reçoit l'aggro principale. Idéale pour l'*Avant-Garde Lourde* et les *Unités d'Assaut*.
* **Ligne Arrière (4 Emplacements) :** Protégée des dégâts cinétiques directs. Réservée à l'*Artillerie*, la *Reconnaissance* et les *Laboratoires de Soutien*.

### 3.2. Déroulement du Combat & Statistiques
* **Initiative / Vitesse de Traitement :** Détermine l'ordre d'attaque.
* **Dégâts Balistiques / Cinétiques vs Absorption des Boucliers :** Remplace les boucles classiques d'attaque/défense physiques.
* **Jauge de Surchauffe :** Remplace les jauges de mana/rage. Lorsqu'un véhicule exécute son outil scientifique principal ou une frappe d'artillerie lourde, sa jauge thermique augmente. Atteindre 100% entraîne un ralentissement temporaire du temps de recharge.

---

## 4. Système d'Équipement (4 Emplacements par Châssis)

Chaque véhicule dispose de 4 emplacements modulaires, remplaçant la disposition Arme, Armure, Accessoire et Objet Exclusif de GXB2 :

1. **Emplacement 1 : Armement Balistique / Énergétique Principal**
   * *Exemples :* Canon Cinétique 155mm, Batterie Gatling Rotative, Projecteur de Plasma.
   * *Fonction :* Détermine la puissance d'attaque de base et la fréquence de tir.
2. **Emplacement 2 : Blindage Composite Structurel**
   * *Exemples :* Plaques Réactives en Titane, Bouclier Déflecteur Électromagnétique, Cloison en Nanotubes de Carbone.
   * *Fonction :* Augmente les PV Max, la réduction des dégâts physiques et la résistance thermique.
3. **Emplacement 3 : Propulsion & Noyau Moteur**
   * *Exemples :* Propulseur Ionique, Transmission à Haut Couple, Noyau à Lévitation Magnétique.
   * *Fonction :* Améliore la vitesse, le taux d'esquive et l'initiative.
4. **Emplacement 4 : Instrument Scientifique / Module de Calibrage** *(Remplace les Objets Exclusifs)*
   * *Exemples :* 
     * **Spectromètre à Résonance :** Émet des fréquences qui désorientent les systèmes de visée ennemis (contrôle de foule / silence).
     * **Émetteur d'Ondes Soniques :** Ondes de saturation qui détruisent les boucliers ennemis.
     * **Bras Robotique de Nano-Réparation :** Déploie des drones de réparation microscopiques pour restaurer l'intégrité structurelle de la coque (mécanisme de soin).
     * **Module de Catalyseur Thermique :** Optimise les taux de réaction pour augmenter la cadence de tir de toute l'équipe.

---

## 5. Mécaniques de Progression & Amélioration

* **Montée de Niveau (Baies de Maintenance) :** Consommation de **Fluides d'Alliage** et de **Cellules Énergétiques** pour augmenter le niveau de base du châssis jusqu'au plafond actuel.
* **Ascension / Limit Break (Overclocking) :** Augmentation du niveau d'étoiles à l'aide de châssis en double ou de composants d'amélioration génériques, débloquant des multiplicateurs de stats et des emplacements de calibrage secrets.
* **Amélioration d'Équipement :** Raffinage des pièces mécaniques à l'aide de ferraille et de minerais rares extraits des boucles passives (idle).

---

## 6. Modes de Jeu (Boucle PvE & PvP)

* **Campagne Cartographique (Campagne / PvE) :** Progression à travers des secteurs industriels, usines automatisées et terres désolées, générant des ressources passives (Crédits et Alliage).
* **Arène de Test de Performance (PvP) :** Combats asynchrones contre les hangars d'autres joueurs pour grimper dans le classement mondial des bancs d'essai.
* **Centre de Simulation (Mode Examen / Énigmes) :** Combats tactiques avec des contraintes de configuration précises pour tester la maîtrise approfondie des mécaniques.
* **Extraction Automatisée / Expéditions (Patrouille Idle) :** Envoi d'escouades inactives dans des secteurs dangereux pour extraire des instruments scientifiques et des composants rares hors ligne.
