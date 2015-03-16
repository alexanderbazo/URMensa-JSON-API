# Uni-Mensa: csv-2-json

Das Studentenwerk Niederbayer/Oberpfalz stellt den Speiseplan der Uni Mensa als CSV-Datei zum Download bereit. Für die Verwendung dieser Daten in einer eigenen Anwendungen ist eine (aufbereitete) Repräsentation im JSON-Format oft leichter verarbeitbar. Über die CSV2JSON-Bridge können Sie die Speisepläne der Uni Mensa im JSON-Format über eine REST-Schnittstelle beziehen. Die Speiseplänge werden täglich mit dem Server des Studentenwerks abgeglichen und können für jeden Tag der aktuellen Woche einzeln abgerufen werden. Das zurückgelieferte JSON besteht aus einem Array, in dem alle verfügbaren Hauptgerichte, Suppen, Beilagen und Desserts des entsprechenden Tags als einzelne Objekte formatiert sind. Über die Eigenschaften der Objekte kann auf deren Beschreibung, Kategorie, Preis und Labels zugegriffen werden.

## Build

Run `grunt` to install dependencies. All required node modules are copied to `api/node_modules`.

## Run

To start the node server (distributing the rest interface) call `node ./api/app.js`

## Usage
```
http://{{server url}}/mensa/uni/{{day}}
{{day}}: mo || di || mi || do || fr
Speiseplan für Montag der aktuellen Woche: http://api.regensburger-forscher.de/mensa/uni/mo
```

## Response
```
[
            {
                "name":"Feine Kräutersuppe",
                "day":"Mo",
                "category":"Suppe",
                "labels":"V",
                "cost":
                    {
                        "students":"0,60",
                        "employees":"0,80",
                        "guests":"1,30"
                    }
            },

            {
                "name":"Grüne Nudeln mit Gorgonzola",
                "day":"Mo",
                "category":"HG1",
                "labels":"V",
                "cost":
                    {
                        "students":"1,90",
                        "employees":"2,70",
                        "guests":"3,50"
                    }
            },

        ... ]

```
