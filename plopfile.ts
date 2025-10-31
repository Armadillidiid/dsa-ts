import { type NodePlopAPI } from "plop";
import * as fs from "fs";
import * as path from "path";

export default function (plop: NodePlopAPI) {
  // Reset practice file(s) generator
  plop.setGenerator("reset", {
    description:
      "Reset practice file(s) to empty shell (use spacebar to select, 'a' to toggle all)",
    prompts: [
      {
        type: "checkbox",
        name: "selections",
        message: "Select the DSA(s) to reset:",
        choices: function () {
          const srcPath = path.join(process.cwd(), "src");
          try {
            const choices: Array<{
              name: string;
              value: { type: string; name: string };
            }> = [];

            // Check ds (data structures) folder
            const dsPath = path.join(srcPath, "ds");
            if (fs.existsSync(dsPath)) {
              const dsFolders = fs
                .readdirSync(dsPath, { withFileTypes: true })
                .filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name)
                .filter((name) => {
                  const practiceFile = path.join(
                    dsPath,
                    name,
                    `${name}.practice.ts`,
                  );
                  return fs.existsSync(practiceFile);
                });

              dsFolders.forEach((name) => {
                choices.push({
                  name: `[Data Structure] ${name}`,
                  value: { type: "data-structure", name },
                });
              });
            }

            // Check algo (algorithms) folder
            const algoPath = path.join(srcPath, "algo");
            if (fs.existsSync(algoPath)) {
              const algoFolders = fs
                .readdirSync(algoPath, { withFileTypes: true })
                .filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name)
                .filter((name) => {
                  const practiceFile = path.join(
                    algoPath,
                    name,
                    `${name}.practice.ts`,
                  );
                  return fs.existsSync(practiceFile);
                });

              algoFolders.forEach((name) => {
                choices.push({
                  name: `[Algorithm] ${name}`,
                  value: { type: "algorithm", name },
                });
              });
            }

            if (choices.length === 0) {
              throw new Error(
                "No DSA practice files found in src/ds/ or src/algo/",
              );
            }

            return choices;
          } catch (error) {
            console.error("Error reading src directory:", error);
            return [];
          }
        },
        validate: function (answer) {
          if (answer.length < 1) {
            return "You must select at least one DSA to reset.";
          }
          return true;
        },
      },
    ],
    actions: function (data) {
      if (!data || "selections" in data === false)
        throw new Error("selections is required");
      const selections = data["selections"] as Array<{
        type: string;
        name: string;
      }>;

      const actions = [];
      for (const selection of selections) {
        const folder = selection.type === "data-structure" ? "ds" : "algo";
        const filePath = `src/${folder}/${selection.name}/${selection.name}.practice.ts`;
        const sourcePath = `src/${folder}/${selection.name}/${selection.name}.ts`;

        actions.push({
          type: "add",
          path: filePath,
          templateFile: `templates/${folder}/practice.hbs`,
          force: true,
          data: {
            name: selection.name,
            sourcePath: sourcePath,
          },
        });
      }

      return actions;
    },
  });

  // Create new DSA structure
  plop.setGenerator("new", {
    description: "Create a new DSA implementation with test and practice files",
    prompts: [
      {
        type: "list",
        name: "type",
        message: "What type of DSA are you creating?",
        choices: [
          { name: "Data Structure", value: "data-structure" },
          { name: "Algorithm", value: "algorithm" },
        ],
      },
      {
        type: "input",
        name: "name",
        message: function (answers: Record<string, unknown>) {
          const type =
            answers["type"] === "data-structure"
              ? "Data Structure"
              : "Algorithm";
          return `${type} name (e.g., heap, binary-search):`;
        },
      },
    ],
    actions: function (data) {
      if (!data || "type" in data === false || "name" in data === false) {
        throw new Error("type and name are required");
      }

      const type = data["type"] as string;
      const folder = type === "data-structure" ? "ds" : "algo";

      return [
        {
          type: "add",
          path: `src/${folder}/{{name}}/{{name}}.ts`,
          templateFile: `templates/${folder}/implementation.hbs`,
        },
        {
          type: "add",
          path: `src/${folder}/{{name}}/{{name}}.test.ts`,
          templateFile: `templates/${folder}/test.hbs`,
        },
        {
          type: "add",
          path: `src/${folder}/{{name}}/{{name}}.practice.ts`,
          templateFile: `templates/${folder}/practice.hbs`,
        },
      ];
    },
  });
}
