import "./setup.ts"
import { handler, IGetOverviewResponseBody } from "../handlers/getOverview";
import { APIGatewayProxyEvent } from "aws-lambda";
import { formatTimestampAsDate } from "../../utils/date";
import { performance } from "perf_hooks";

const event = {
    pathParameters: { chain: undefined, type: "fees" },
    queryStringParameters: {
        excludeTotalDataChart: "true",
        excludeTotalDataChartBreakdown: "true",
    }
} as unknown as APIGatewayProxyEvent

(async () => {
    var startTime = performance.now()
    const r = await handler(event)
    var endTime = performance.now()
    const rr = JSON.parse(r.body) as IGetOverviewResponseBody
    console.log(rr.protocols.filter(d=>d.name.toLowerCase().includes('xdai') || d.name.toLowerCase().includes('gnosis')).map(p=>[p.name, p.displayName]))
    console.log("Current run:", (endTime - startTime) / 1000)
    /* for (const [time, datapoint] of rr.totalDataChartBreakdown) {
        console.log(formatTimestampAsDate(time), datapoint)
    } */
    /*     console.log("totalVolume", rr.totalVolume)
        console.log("changeVolume1d", rr.changeVolume1d)
        console.log("changeVolume7d", rr.changeVolume7d)
        console.log("changeVolume30d", rr.changeVolume30d) */
})()