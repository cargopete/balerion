import assert from "node:assert/strict";
import test from "node:test";

import { ofThisShow } from "./pick.ts";

test("a remake is not the show", () => {
  for (const name of [
    "Top.Gear.Australia.S01E08.WS.PDTV.XviD-BiA",
    "Top.Gear.America.S01E08.WEBRip.x264-TBS[ettv]",
    "Top Gear Ambitious But Rubbish S01E08 1080p AMZN WEB-DL",
    "Top.Gear.US.S01E08.Car.vs.Plane.HDTV.XviD-MOMENTUM",
  ]) {
    assert.equal(ofThisShow(name, "Top Gear", "S01E08", "GB"), false, name);
  }
});

test("the show's own releases pass, with a year or its country", () => {
  for (const name of [
    "Top.Gear.S22E01.720p.WEB.H264-13[TGx]",
    "Top Gear UK S14E01 1080p HEVC x265-MeGusta",
    "Top Gear 2002 S01E08 576p",
    "Top Gear S22E01-E04 HDTV.XviD-AFG[Pawulon]",
  ]) {
    const tag = name.match(/S\d+E\d+/)![0];
    assert.equal(ofThisShow(name, "Top Gear", tag, "GB"), true, name);
  }
});

test("the remake is still found when it is the one asked for", () => {
  assert.equal(ofThisShow("Top.Gear.Australia.S01E08.WS.PDTV", "Top Gear Australia", "S01E08", "AU"), true);
  assert.equal(ofThisShow("Top.Gear.US.S01E08.HDTV", "Top Gear", "S01E08", "US"), true);
});

test("the wrong episode is not this one", () => {
  assert.equal(ofThisShow("Top.Gear.S01E09.HDTV", "Top Gear", "S01E08", "GB"), false);
  assert.equal(ofThisShow("Top.Gear.S01.Complete", "Top Gear", "S01E08", "GB"), false);
});
