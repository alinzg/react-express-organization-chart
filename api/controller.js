import fs from "fs/promises";

if (
  !(await fs.readFile("../data/db.json", "utf-8")) ||
  JSON.parse(await fs.readFile("../data/db.json", "utf-8")).cells == 0
) {
  await fs.writeFile(
    "../data/db.json",
    JSON.stringify(
      {
        cells: [
          {
            id: "1",
            parentId: "",
            name: "COMPANY",
            subGroups: [],
          },
        ],
      },
      null,
      2
    )
  );
}

let list = JSON.parse(await fs.readFile("../data/db.json", "utf-8"));

async function refreshList() {
  if (!list || list.cells == 0) {
    await fs.writeFile(
      "../data/db.json",
      JSON.stringify(
        {
          cells: [
            {
              id: "1",
              parentId: "",
              name: "COMPANY",
              subGroups: [],
            },
          ],
        },
        null,
        2
      )
    );
    list = JSON.parse(await fs.readFile("../data/db.json", "utf-8"));
  } else {
    list = JSON.parse(await fs.readFile("../data/db.json", "utf-8"));
  }
}

export function GET(req, res) {
  refreshList();
  res.send(list);
}

export async function DELETE(req, res) {
  const id = req.params.id;

  function deleteObjectById(arr, id) {
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      if (obj.id === id) {
        // If the object is found, remove it from the array
        arr.splice(i, 1);
        return true;
      } else if (obj.subGroups && obj.subGroups.length > 0) {
        // If the object has nested objects, recursively call this function on the nested array
        const deleted = deleteObjectById(obj.subGroups, id);
        if (deleted) {
          return true;
        }
      }
    }
    return false;
  }
  deleteObjectById(list.cells, id);
  await fs.writeFile("../data/db.json", JSON.stringify(list, null, 2));

  res.redirect("http://localhost:3000");
}

export async function NEW(req, res) {
  const id = req.params.id;
  function newObjectByParentId(arr, id) {
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      if (obj.id === id) {
        // If the object is found, remove it from the array
        obj.subGroups.push({
          id: crypto.randomUUID(),
          parentId: id,
          name: "",
          subGroups: [],
        });
        return true;
      } else if (obj.subGroups && obj.subGroups.length > 0) {
        // If the object has nested objects, recursively call this function on the nested array
        const deleted = newObjectByParentId(obj.subGroups, id);
        if (deleted) {
          return true;
        }
      }
    }
    return false;
  }
  newObjectByParentId(list.cells, id);

  await fs.writeFile("../data/db.json", JSON.stringify(list, null, 2));

  res.redirect("http://localhost:3000");
}

export async function ADD(req, res) {
  const body = req.body;
  function newObjectByParentId(arr, id) {
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      if (obj.id === id) {
        // If the object is found, remove it from the array
        obj.name = body[1];
        return true;
      } else if (obj.subGroups && obj.subGroups.length > 0) {
        // If the object has nested objects, recursively call this function on the nested array
        const deleted = newObjectByParentId(obj.subGroups, id);
        if (deleted) {
          return true;
        }
      }
    }
    return false;
  }
  newObjectByParentId(list.cells, body[0]);

  await fs.writeFile("../data/db.json", JSON.stringify(list, null, 2));

  res.sendStatus(202);
}
