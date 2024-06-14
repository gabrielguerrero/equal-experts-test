import { http, HttpResponse } from "msw";
import { getBaseUrl } from "equal-experts/trpc/react";
import { Grocery } from "equal-experts/server/db";

const groceriesList = [
  {
    id: 1,
    name: "Bananas",
    done: false,
    createdAt: "2024-06-14T08:05:51.908Z",
    updatedAt: "2024-06-14T08:05:51.908Z",
  },
  {
    id: 2,
    name: "Oranges",
    done: false,
    createdAt: "2024-06-14T08:05:54.134Z",
    updatedAt: "2024-06-14T08:05:54.134Z",
  },
  {
    id: 3,
    name: "Fish",
    done: false,
    createdAt: "2024-06-14T08:05:56.191Z",
    updatedAt: "2024-06-14T08:05:56.191Z",
  },
];

export const handlers = [
  http.get(getBaseUrl() + "/api/trpc/groceries.list", () => {
    return HttpResponse.json({
      result: {
        data: {
          json: groceriesList,
          meta: {
            values: {
              "0.createdAt": ["Date"],
              "0.updatedAt": ["Date"],
              "1.createdAt": ["Date"],
              "1.updatedAt": ["Date"],
              "2.createdAt": ["Date"],
              "2.updatedAt": ["Date"],
            },
          },
        },
      },
    });
  }),
  http.post(getBaseUrl() + "/api/trpc/groceries.add", async ({ request }) => {
    const newGrocery = await request
      .json()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .then((data) => (data as any).json as Grocery);
    const addedGrocery = {
      ...newGrocery,
      id: groceriesList.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    groceriesList.push(addedGrocery);
    return HttpResponse.json({
      result: {
        data: {
          json: [addedGrocery],
          meta: {
            values: {
              "0.createdAt": ["Date"],
              "0.updatedAt": ["Date"],
            },
          },
        },
      },
    });
  }),
  http.post(
    getBaseUrl() + "/api/trpc/groceries.update",
    async ({ request }) => {
      const newGrocery = await request
        .json()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .then((data) => (data as any).json as Grocery);
      const updatedGrocery = {
        ...newGrocery,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const index = groceriesList.findIndex(
        (grocery) => grocery.id === newGrocery.id,
      );
      groceriesList[index] = updatedGrocery;
      return HttpResponse.json({
        result: {
          data: {
            json: [updatedGrocery],
            meta: {
              values: {
                "0.createdAt": ["Date"],
                "0.updatedAt": ["Date"],
              },
            },
          },
        },
      });
    },
  ),
];
