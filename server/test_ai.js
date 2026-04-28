import 'dotenv/config'; 
async function test() {
    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=" + process.env.GEMINI_API_KEY);
        const json = await response.json();
        console.log("MODELS:", json);
    } catch (e) {
        console.error(e);
    }
}
test();
