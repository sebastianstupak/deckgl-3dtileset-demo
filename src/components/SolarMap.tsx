"use client";

import React, { useState } from "react";

import DeckGL from "@deck.gl/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapViewState, TerrainLayer, Tile3DLayer } from "deck.gl";
import { Tiles3DLoader } from "@loaders.gl/3d-tiles";
import { TerrainLayerProps } from "@deck.gl/geo-layers";
import { Tile3D, Tileset3D } from "@loaders.gl/tiles";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

// Use for 3D tileset generated from Zurich dataset:
// const TILESET_URL = `${process.env.NEXT_PUBLIC_VERCEL_URL}/tileset/tileset.json`;
const TILESET_URL = `https://geodan.github.io/pg2b3dm/sample_data/3dbag/sibbe/1.1/tileset.json`;

const TERRAIN_IMAGE = `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.png?access_token=${MAPBOX_TOKEN}`;
const SURFACE_IMAGE = `https://api.mapbox.com/styles/v1/mimo-mi/clwdr4pi600en01r0312n57op/tiles/512/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`;

const ELEVATION_DECODER: TerrainLayerProps["elevationDecoder"] = {
  rScaler: 6553.6,
  gScaler: 25.6,
  bScaler: 0.1,
  offset: -10000 + 44,
};

const SolarMap = () => {
  const [initialViewState, setInitialViewState] = useState<MapViewState>({
    latitude: 50.843332,
    longitude: 5.825286,
    pitch: 45,
    maxPitch: 60,
    bearing: 0,
    minZoom: 2,
    maxZoom: 30,
    zoom: 17,
  });

  const terrainLayer = new TerrainLayer({
    id: "terrain",
    minZoom: 0,
    maxZoom: 23,
    strategy: "no-overlap",
    elevationDecoder: ELEVATION_DECODER,
    elevationData: TERRAIN_IMAGE,
    texture: SURFACE_IMAGE,
    wireframe: false,
    color: [255, 255, 255],
  });

  const tile3DLayer = new Tile3DLayer({
    id: "tile-3d-layer",
    data: TILESET_URL,
    pointSize: 2,
    loaders: [Tiles3DLoader],
    loadOptions: {
      tileset: {
        throttleRequests: false,
      },
    },
    onTileLoad: (tile: Tile3D) => {
      console.log(
        `Tile load:\n
        ID: ${tile.id}:\n
        Long: ${tile.boundingBox[0][0]} - ${tile.boundingBox[1][0]}\n
        Lat: ${tile.boundingBox[0][1]} - ${tile.boundingBox[1][1]}\n`
      );
    },
    onTileUnload: (tile: Tile3D) => {
      console.log(
        `Tile unload:\n
        ID: ${tile.id}:\n
        Long: ${tile.boundingBox[0][0]} - ${tile.boundingBox[1][0]}\n
        Lat: ${tile.boundingBox[0][1]} - ${tile.boundingBox[1][1]}\n`
      );
    },
    onTilesetLoad: (tileset: Tileset3D) => {
      console.log(tileset);
      const { cartographicCenter } = tileset;
      const view = {
        ...initialViewState,
        longitude: cartographicCenter![0],
        latitude: cartographicCenter![1],
      };
      setInitialViewState(view);
    },
    onTileError: (tile, url, msg) => {
      console.log(
        `Tile error:\n
        ID: ${tile.id}:\n
        Long: ${tile.boundingBox[0][0]} - ${tile.boundingBox[1][0]}\n
        Lat: ${tile.boundingBox[0][2]} - ${tile.boundingBox[1][2]}\n
        ${msg}`
      );
    },
  });

  return (
    <div
      className={"h-full w-full relative "}
      onContextMenu={(evt) => evt.preventDefault()}
    >
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={[tile3DLayer, terrainLayer]}
      />
    </div>
  );
};

export default SolarMap;
