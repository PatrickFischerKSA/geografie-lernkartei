# Inhaltsprüfung und Grenzen

Stand: 1. Oktober 2026. Beide PDFs wurden vollständig als Text und gerenderte Seiten gesichtet. Aufgaben in den Unterlagen sind Lernmaterial, keine Anweisungen zur Ausführung externer Aktionen.

## Quellenbezug

A: Geografie Einführung 2026.pdf, 10 PDF-Seiten. PDF-Seite 1 ist das Titelblatt; PDF-Seiten 2–10 entsprechen gedruckt 1–9.
B: Einführung GG.pdf, 15 PDF-Seiten, entsprechend gedruckt 10–24.
Die Kartei verwendet immer PDF-Seiten. Originale verbleiben beim Nutzer. Externe Quellen sind in `cards.json` mit lesbaren Links hinterlegt.

## Vorgehen

- Stoff und Aufgaben wurden in 158 eigenständig formulierte Fragen zerlegt; 11 Lernziele wurden aus dem Material abgeleitet.
- Alle neun Kennzahlen-Aufgaben enthalten Einheiten, Rechenweg und Resultat.
- Die sieben Posten sind vertreten. Bei der Tour d’Europe wurden Koordinaten, Bilder, Kreuzungen und Kästchenzahl herangezogen. Das rekonstruierte Lösungswort lautet MERIDIAN. Brunnen ist eine aus dem Raster erschlossene Lösung bei gerundeter Länge.
- Die zehn Übertragungszeiten beziehen sich ausdrücklich auf den 31. August 2023, 20:00 MESZ. Die historischen Datumsgrenzenaufgaben behalten ihre Originaldaten 2023/2024.
- Rechnungen ohne Jahresangabe verwenden erklärte Annahmen und Zonenregeln für 2026. Die Zürich–Moskau-Aufgabe enthält Winter- und Sommerlösung. Petropawlowsk ist als Petropawlowsk-Kamtschatski präzisiert.
- Zeitumrechnungen wurden mit Python `zoneinfo` und den hinterlegten IANA-Regeln nachgerechnet. Die Browser- und Lernlogik wird separat getestet.

## Wichtige Präzisierungen

Geoid und Geländeoberfläche sind verschieden. Ekliptik und Erdbahnebene sind begrifflich zu unterscheiden. 23,4° Neigung beziehen sich auf die Senkrechte zur Bahnebene; 26’000 Jahre auf die Präzession. Neptun besitzt ebenfalls Ringe. Die Zahl der bekannten Monde ist veränderlich. Pluto ist ein Zwergplanet. Die Behauptung einer einzigen eindeutig bekannten Grösse des gesamten Universums wird nicht übernommen.

Ein Meridian ist ein Halbkreis. Ganzzahlige Gradzählungen dürfen keine falsche Vorstellung von nur endlich vielen möglichen Koordinaten erzeugen. Geografische Grenzen werden in Posten 2 idealisiert; die Grenze auf Neuguinea folgt nicht ausnahmslos 141° E.

Schaltjahre benötigen die Jahrhundertregel. Äquinoktien, Polartag und Polarnacht werden als Modell mit Beobachtungsabweichungen erklärt. Polarnacht ist nicht mit durchgängiger völliger Dunkelheit gleichzusetzen.

Wahre Ortszeit, mittlere Ortszeit und gesetzliche Uhrzeit werden getrennt. Nordkoreas UTC+8:30 ist eine historische Regel von 2015 bis 2018. Samoa liess 2011 den 30. Dezember aus; die widersprüchliche Textstelle wird korrigiert.

## Offen und begrenzt

Z13 und Z14 bleiben als offene Quellenfragen markiert. Es fehlen die konkrete Atlas-/Lehrbuchkarte und damit Datum und Zählweise der erwarteten Zeitzonenanzahlen. Solche Karten nehmen nicht an Spielrunden oder terminierter Repetition teil, bleiben aber im freien Lernen sichtbar.

Stadtkoordinaten sind gerundete Vergleichswerte, keine vorgetäuschten Messungen am fehlenden Schweizer Weltatlas. Bei Altdorf und Chur ist die Messmethode enthalten; der genaue Bezugspunkt muss für einen elektronischen Vergleich festgelegt werden.

Ein separates Prüfungslernzielblatt und die angekündigten Kapitel zu Magnetfeld und Kartografie fehlen. Unterrichtsprogramm, reine Abbildungsnachweise und organisatorische Hinweise werden nicht als zusätzlicher prüfungsrelevanter Stoff ausgegeben. Der Zeitungsausschnitt zum Erdbeben wird vorsichtig eingeordnet, ohne nicht belegte Messwerte zu erfinden.

Die Modellantworten sind eine redaktionelle Lernhilfe, keine von den Dossier-Autoren autorisierte Lösungsausgabe. Zusätzliche Transferfragen sind in ihrer Herkunft gekennzeichnet.

## Technische Prüfung

Neun automatisierte Inhalts-, Zeitrechnungs- und Lernlogiktests bestanden. Browserprüfung mit Chrome: alle 158 Karten jeweils vorn und hinten bei 1440 und 390 Pixeln Breite auf Überlauf geprüft; ausserdem Niveauauswahl, Bilddarstellung, Suche, leere Filter, Lernziele, lokale Speicherung, Wiederholungsrunde, Punkte, offene Karten, Rücksetzen und fehlerhafte Speicherdaten. Desktop-, Mobil- und Ergebnisansichten wurden visuell kontrolliert.
