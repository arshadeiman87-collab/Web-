export const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type, gocardless-signature"};
export function json(body:any,status=200){return new Response(JSON.stringify(body),{status,headers:{"Content-Type":"application/json",...cors}})}
