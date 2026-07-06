#!/usr/bin/env node
/**
 * Build Vietnam 2-level address JSON (province → ward) from TSV exports.
 * Input: data/raw/provinces.tsv, data/raw/wards.tsv
 * Output: src/data/address/provinces.json, src/data/address/wards-by-province.json
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const rawDir = path.join(root, "data/raw");
const outDir = path.join(root, "src/data/address");

function parseProvinces(tsv) {
  return tsv
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [code, name, , type] = line.split("\t");
      return {
        code: code.trim(),
        name: name.trim(),
        type: (type || "").trim() || undefined,
      };
    });
}

function parseWards(tsv) {
  const wards = [];
  for (const line of tsv.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || !/^\d{5}\t/.test(trimmed)) continue;

    const parts = trimmed.split("\t");
    const code = parts[0].trim();
    let name = parts[1].replace(/^"|"$/g, "").replace(/\s+/g, " ").trim();
    const type = (parts[3] || parts[2] || "").trim();
    const provinceCode = parts[parts.length - 2]?.trim();
    const provinceName = parts[parts.length - 1]?.trim();

    if (!code || !name || !provinceCode) continue;

    wards.push({
      code,
      name,
      type: type || "Phường",
      provinceCode,
      provinceName,
    });
  }
  return wards;
}

function main() {
  const provincesPath = path.join(rawDir, "provinces.tsv");
  const wardsPath = path.join(rawDir, "wards.tsv");

  if (!fs.existsSync(provincesPath) || !fs.existsSync(wardsPath)) {
    console.error("Missing data/raw/provinces.tsv or data/raw/wards.tsv");
    process.exit(1);
  }

  const provinces = parseProvinces(fs.readFileSync(provincesPath, "utf8"));
  const wards = parseWards(fs.readFileSync(wardsPath, "utf8"));

  const wardsByProvince = {};
  for (const w of wards) {
    if (!wardsByProvince[w.provinceCode]) wardsByProvince[w.provinceCode] = [];
    wardsByProvince[w.provinceCode].push({
      code: w.code,
      name: w.name,
      type: w.type,
      provinceCode: w.provinceCode,
    });
  }

  for (const code of Object.keys(wardsByProvince)) {
    wardsByProvince[code].sort((a, b) => a.name.localeCompare(b.name, "vi"));
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, "provinces.json"),
    JSON.stringify(provinces, null, 2)
  );
  fs.writeFileSync(
    path.join(outDir, "wards-by-province.json"),
    JSON.stringify(wardsByProvince, null, 2)
  );

  const meta = {
    generatedAt: new Date().toISOString(),
    provinceCount: provinces.length,
    wardCount: wards.length,
    schema: "province → ward (2-level, NQ 2025)",
  };
  fs.writeFileSync(path.join(outDir, "meta.json"), JSON.stringify(meta, null, 2));

  console.log(`Built ${provinces.length} provinces, ${wards.length} wards`);
}

main();
