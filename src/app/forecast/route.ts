import { promisify } from "util";
import { exec } from "child_process";

const promisifiedExec = promisify(exec);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    console.log("searchParams", searchParams);
    console.log("I am here");
    let { lat, lon } = Object.fromEntries(searchParams);

    if (!lat || !lon) {
      lat = "5.65178";
      lon = "5";
    }

    const command = `curl --location --request GET 'https://b2b.ignitia.se/api/ocp/forecast/longrange' --header 'auth-key: 4rKtCc6YvWnsS8EPzCEb9SuS3xEzp5KM' --header 'Content-Type: application/json' --data-raw '{ "lat": ${lat}, "lon": ${lon} }'`;

    const { stdout, stderr } = await promisifiedExec(command);

    console.log(`stdout: ${stdout}`);

    return Response.json({ stdout, stderr, command });
  } catch (error: any) {
    console.error(`exec error: ${error}`);
    return Response.json({ error: error.message || error.toString() });
  }
}
