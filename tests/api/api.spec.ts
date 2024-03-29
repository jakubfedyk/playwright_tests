import { expect, test } from "@playwright/test";

test.describe.parallel("API Tests", () => {
  test.describe.parallel("API Tests", () => {
    test("GET: Verify correct posts endopint status", async ({ request }) => {
      const response = await request.get("/posts");
      expect(response.status()).toBe(200);
    });
    test("GET: Verify single post", async ({ request }) => {
      const response = await request.get("/posts/3");
      const responseBody = JSON.parse(await response.text());
      expect(response.status()).toBe(200);
      expect(responseBody.id).toBe(3);
      expect(responseBody.userId).toBe(1);
      expect(responseBody.title).toMatch(new RegExp("exercitationem"));
    });
    test("POST: Create new post", async ({ request }) => {
      const response = await request.post("/posts", {
        data: {
          title: "Panda",
          body: "Zwinna",
          userId: 1,
        },
      });
      const responseBody = JSON.parse(await response.text());
      expect(response.status()).toBe(201);
      expect(responseBody.id).toBe(101);
      expect(responseBody.userId).toBe(1);
      expect(responseBody.title).toMatch("Panda");
      expect(responseBody.body).toMatch("Zwinna");
    });
    test("PUT: Update first post", async ({ request }) => {
      const response = await request.put("/posts/1", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        data: {
          title: "Panda",
          body: "Zwinna",
          userId: 1,
        },
      });
      const responseBody = JSON.parse(await response.text());
      expect(response.status()).toBe(200);
      expect(responseBody.id).toBe(1);
      expect(responseBody.userId).toBe(1);
      expect(responseBody.title).toMatch("Panda");
      expect(responseBody.body).toMatch("Zwinna");
      console.log(responseBody);
    });
    test("Delete: Delete a  post", async ({ request }) => {
      const response = await request.delete("/posts/1");
      // console.log(response);
      expect(response.status()).toBe(200);
    });
  });
});
