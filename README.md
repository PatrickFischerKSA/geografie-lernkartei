# Geografie zum Wenden

[**Lernumgebung öffnen**](https://patrickfischerksa.github.io/geografie-lernkartei/)

Das Projekt ist öffentlich auf GitHub verfügbar und wird über GitHub Pages veröffentlicht. Lokal lässt sich `index.html` direkt öffnen.

158 drehbare Frage-Antwort-Karten auf Grundlage von **Geografie Einführung 2026.pdf** und **Einführung GG.pdf** (A. Blatter & C. Göldi, August 2026). Aufbau und Lernmechanik entsprechen der [Geschichte-Lernkartei](https://github.com/PatrickFischerKSA/geschichte-lernkartei).

- Drei aufeinander aufbauende Niveaus: Basis, Vertieft und Profi.
- Freies Lernen mit Suche, Themen- und Lernzielfiltern.
- Spielrunden mit bis zu zehn Karten, XP und Erfolgsserien; unsichere Karten kommen erneut.
- Repetition nach 1, 3, 7, 14 und 30 Tagen; Bewertung per Selbsteinschätzung nach dem Aufdecken.
- Lokaler Lernstand im Browser, unabhängig von der Geschichte-Kartei. Kein Login, kein Tracking und keine Übermittlung von Antworten. Löschen der Browserdaten entfernt den Lernstand; kein Geräteabgleich.
- Tastaturbedienung und mobile Darstellung. Alle Daten und Funktionen funktionieren auch durch direktes Öffnen von `index.html` (Browserspeicherung bei file-URLs kann eingeschränkt sein).

## Inhalt und Abdeckung

Elf Lernbereiche: Geografie als Fach, Erdgestalt, Sonnensystem, Erdgrössen-Rechnungen, Hemisphären, Koordinaten, Atlas-Posten, Jahreszeiten, Zeitzonen, Flugrechnungen und Datumsgrenze. Die vollständige Zuordnung steht in [docs/ABDECKUNG.md](docs/ABDECKUNG.md), Grenzen und Korrekturen in [docs/PRUEFBERICHT.md](docs/PRUEFBERICHT.md).

Die Lernziele sind didaktisch abgeleitet; ein separates Prüfungslernzielblatt fehlt. Magnetfeld und Kartografie sind in den vorliegenden PDF-Ausschnitten nicht enthalten. Die Original-PDFs und fremden Dossier-Abbildungen werden nicht erneut öffentlich verteilt; der eigenständig formulierte Kartensatz nennt ihre Seiten.

## Bearbeiten und prüfen

`cards.json` ist die unmittelbar nutzbare Inhaltsdatei. `scripts/create-content.py` enthält die redaktionelle Ausgangsfassung und erzeugt Karten und Aufgaben-Zuordnung. Bei späteren Inhaltsänderungen entweder den Generator ändern oder bewusst direkt die JSON-Datei pflegen; der Generator überschreibt die JSON-Datei.

```sh
python3 scripts/create-content.py
npm run sync
npm test
npm run build
python3 -m http.server 8766
```

`data.js` ist die lokale Browserfassung von `cards.json` und muss nach Datenänderungen synchronisiert werden. Die Browserprüfung benötigt Playwright und Chromium; eine vorhandene Installation kann über `NODE_PATH` bzw. `CHROME_EXECUTABLE` genutzt werden. Der Test startet seinen eigenen lokalen HTTP-Server.

```sh
npm run test:browser
```

## Veröffentlichung

Quellcode und Inhalte liegen vollständig auf GitHub. `.github/workflows/pages.yml` prüft bei einem Push auf `main` die Inhalte und Lernlogik, baut den statischen Ordner `dist` und veröffentlicht ihn über **GitHub Pages**. Kein Sites-Dienst und keine externen Laufzeitbibliotheken.
