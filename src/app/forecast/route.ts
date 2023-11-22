import { headers } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  var myHeaders = new Headers();
  myHeaders.append("auth-key", "4rKtCc6YvWnsS8EPzCEb9SuS3xEzp5KM");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    lat: 5.65178,
    lon: 5,
  });

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const res = await fetch(`https://b2b.ignitia.se/api/ocp/forecast/longrange`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const product = await res.json();

  return Response.json({ product });
}
