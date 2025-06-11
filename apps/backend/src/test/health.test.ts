import request from "supertest";
import { createServer } from '../server';

const app = createServer();


describe("GET /health", () => {
    it("should return OK", async () => {
        const res = await request(app).get("/health");
        expect(res.status).toBe(200);
        expect(res.text).toBe("OK");
    });
});
