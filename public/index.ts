// import { sql, serve } from "bun";
// import { Glob } from "bun";
// import config from '../config/autoload'

// const glob = new Glob("**/*.ts");

// function BASE_DIR(path: string): string {
//     return `${process.cwd()}/${path}`;
// }

// config.autoload.forEach( async (value) => {

//     for await (const file of glob.scan({ cwd: value })) {
//         const filePath = BASE_DIR(`${value}/${file}`);
    
//         const module = await import(filePath);
    
//         console.log(module.default);
//     }
// })



// const server = serve({
//     routes: {
//         "/": async (req) => {
//             return Response.json({ message: true }, { status: 200 });
//         },
//         "/api/users": {
//             async GET(req) {
//                 const users = await sql`SELECT * FROM users`;
//                 return Response.json(users);
//             },
//         },
//     },
//     development: {
//         hmr: true,
//         console: true
//     },

//     // Prior to v1.2.3, the `fetch` option was used to handle all API requests. It is now optional.
//     // async fetch(req) {
//     //   // Return 404 for unmatched routes
//     //   return new Response("Not Found!", { status: 404 });
//     // },
// });

// console.log(`Listening on ${server.url}`);

const loadModule = async (name: string) => {
    console.log(`Starting: ${name}`);
    await new Promise(resolve => setTimeout(resolve, 100)); // Kurze Verzögerung
    
    if (name === "bad-module") {
        throw new Error(`💥 ${name} hat einen Fehler!`);
    }
    
    console.log(`✅ Successfully loaded: ${name}`);  // <-- NEU!
    return `${name} loaded`;
};

// Test 1: for...of mit Fehler
console.log("\n--- for...of Test ---");
try {
    const modules1 = [];
    for (const name of ["good1", "bad-module", "good2"]) {
        const module = await loadModule(name);
        modules1.push(module);
    }
    console.log("Geladene Module:", modules1);
} catch (e) {
    console.error("Fehler:", e.message);
}

// Test 2: Promise.all mit Fehler
console.log("\n--- Promise.all Test ---");
try {
    const modules2 = await Promise.all(
        ["good1", "bad-module", "good2"].map(name => loadModule(name))
    );
    console.log("✨ Diese Zeile siehst du NIE!:", modules2);
} catch (e) {
    console.error("Fehler:", e.message);
    console.log("❓ Aber was ist mit good1 und good2? Sie WURDEN geladen, aber ihre Ergebnisse sind weg!");
}