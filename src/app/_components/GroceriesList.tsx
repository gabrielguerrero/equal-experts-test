"use client";
import React, { useState } from "react";
import { Grocery } from "equal-experts/server/db";
import { api } from "equal-experts/trpc/react";

const GroceryList = () => {
  const utils = api.useUtils();
  const {
    data: groceries,
    isFetching,
    error,
  } = api.groceries.list.useQuery(undefined, { initialData: [] });
  const updateMutation = api.groceries.update.useMutation();
  const addMutation = api.groceries.add.useMutation();
  const deleteMutation = api.groceries.delete.useMutation();
  const deleteAllMutation = api.groceries.deleteAll.useMutation();

  const [editingGrocery, setEditingGrocery] = useState<Grocery | null>(null);
  const [newGrocery, setNewGrocery] = useState("");

  if (isFetching)
    return <div className={"m-auto items-center"}>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleUpdate = (grocery: Grocery) => {
    updateMutation.mutate(grocery, {
      onSuccess: () => {
        // eslint-disable-next-line
        utils.groceries.list.refetch();
      },
    });
    setEditingGrocery(null);
  };

  const handleAdd = () => {
    addMutation.mutate(
      { name: newGrocery, done: false },
      {
        onSuccess: () => {
          // eslint-disable-next-line
          utils.groceries.list.refetch();
        },
      },
    );
    setNewGrocery("");
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        // eslint-disable-next-line
        utils.groceries.list.refetch();
      },
    });
  };

  const handleDeleteAll = () => {
    deleteAllMutation.mutate(undefined, {
      onSuccess: () => {
        // eslint-disable-next-line
        utils.groceries.list.refetch();
      },
    });
  };

  return (
    <div className=" m-4 mt-12 max-w-md">
      <div className="grid grid-cols-[1fr_auto]  align-baseline ">
        <h1 className="mb-4 text-2xl font-bold">Groceries List</h1>
        <button
          className={` ml-2 p-2 text-white ${groceries.length === 0 ? "text-gray-300" : "ee-text-blue"}`}
          onClick={handleDeleteAll}
          disabled={groceries.length === 0}
        >
          Delete All
        </button>
      </div>
      <div className="rounded-lg bg-white p-4 shadow-md sm:w-96">
        {groceries.length === 0 ? (
          <div>Please add some groceries</div>
        ) : (
          <ul>
            {groceries.map((grocery) => (
              <li
                key={grocery.id}
                className="flex items-center justify-between border-b py-2 last:border-none"
              >
                {editingGrocery?.id === grocery.id ? (
                  <input
                    type="text"
                    className="mr-2 flex-grow rounded border border-gray-300 p-1"
                    value={editingGrocery.name}
                    placeholder="Update grocery"
                    onChange={(e) =>
                      setEditingGrocery({ ...grocery, name: e.target.value })
                    }
                    // onBlur={() => setEditingGrocery(null)}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        handleUpdate(editingGrocery);
                      }
                    }}
                  />
                ) : (
                  <span
                    className={`flex-grow cursor-pointer ${grocery.done ? "line-through" : ""}`}
                    onClick={() => setEditingGrocery(grocery)}
                  >
                    {grocery.name}
                  </span>
                )}
                <input
                  type="checkbox"
                  className="ml-2"
                  aria-label="Done Checkbox"
                  readOnly={true}
                  checked={grocery?.done}
                  onChange={() => {
                    // setEditingGrocery({ ...grocery, done: !grocery.done });
                    handleUpdate({ ...grocery, done: !grocery.done });
                  }}
                />

                <button
                  className="ee-text-blue ml-2 rounded p-1"
                  onClick={() => handleDelete(grocery.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow rounded border border-gray-300 p-2"
          value={newGrocery}
          onChange={(e) => setNewGrocery(e.target.value)}
          placeholder="Add new grocery"
        />
        <button
          className="ee-background-blue ml-2 rounded p-2 text-white"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default GroceryList;
