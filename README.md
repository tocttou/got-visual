**Writeup available at: [https://ashishchaudhary.in/game-of-thrones-visualization](https://ashishchaudhary.in/game-of-thrones-visualization)**

## Deployment instructions

**If there are any build errors, please remove the `package-lock.json` file and continue.**

Tested on: Nodev8.9.1+

1. `git clone <this-repo>`
2. `npm install` (please use `npm` and not `yarn`)
3. install neo4j

Using docker:

```
docker run -d \
    --publish=7474:7474 --publish=7687:7687 \
    --volume=$HOME/neo4j/data:/data \
    --volume=$HOME/neo4j/logs:/logs \
    neo4j:3.0
```

Make sure to setup password before going further (go to `http://localhost:7474`).

4. Edit `src/config/index.ts` according to the ports, addresses, and passwords that you are going to use so that the application knows where to point its queries.

## Seeding the DB

5. execute `external/import-data/01-insert-characters.js` and `external/import-data/02-insert-relationships.js` **in order**.

## Running the proxy

6. execute `external/proxy/index.js`. By default it runs at port 3000. This value is reflected in the `src/config/index.ts` file too.

### Development build

7. `npm start -s`

### Deployment build

7. `npm run build -s` // this produces build in `dist/`
8. `npm run static -s` // to quickly view the build in the browser at port 8080 // configurable in `static` command in `package.json`.
