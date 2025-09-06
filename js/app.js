let map, geocoder, marker;

// 地図初期化
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const { Geocoder } = await google.maps.importLibrary("geocoding");

  const center = { lat: 35.681236, lng: 139.767125 }; // 東京駅

  map = new Map(document.getElementById("map"), {
    center,
    zoom: 12,
    mapId: window.MAPS_CONFIG.mapId, // config.js から取得
  });

  geocoder = new Geocoder();

  marker = new AdvancedMarkerElement({
    map,
    position: center,
    title: "起点",
  });
}

// ジオコーディングしてピンを立てる
async function geocodeAndPin(q) {
  q = (q || "").trim();
  if (!q || !geocoder || !map) return;

  try {
    const res = await geocoder.geocode({ address: q, region: "jp" });
    const first = res.results?.[0];
    if (!first) {
      alert("場所が見つかりませんでした。");
      return;
    }
    const loc = first.geometry.location;
    const pos = { lat: loc.lat(), lng: loc.lng() };

    if (marker) {
      marker.position = pos;
      marker.title = first.formatted_address;
    } else {
      const { AdvancedMarkerElement } = await google.maps.importLibrary(
        "marker"
      );
      marker = new AdvancedMarkerElement({
        map,
        position: pos,
        title: first.formatted_address,
      });
    }

    map.panTo(pos);
    map.setZoom(16);
  } catch (err) {
    console.error(err);
    alert("ジオコーディングに失敗しました。");
  }
}

$(function () {
  initMap();

  $("#btn-pin").on("click", function () {
    geocodeAndPin($("#query").val());
  });

  $("#query").on("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      $("#btn-pin").trigger("click");
    }
  });
});
