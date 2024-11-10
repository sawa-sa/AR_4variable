// CSVManager.js

// CSVファイルを読み込む関数
async function loadCSVData(url) {
  const response = await fetch(url);
  const text = await response.text();
  const rows = text.split('\n').slice(1); // ヘッダーを除去

  const data = [];
  rows.forEach(row => {
    const cols = row.split(',');
    if (cols.length >= 3) {
      data.push({
        x: parseFloat(cols[0]),
        y: parseFloat(cols[1]),
        z: parseFloat(cols[2])
      });
    }
  });
  return data;
}

// データを0〜1の範囲に正規化する関数
function normalizeData(data) {
  const min = { x: Infinity, y: Infinity, z: Infinity };
  const max = { x: -Infinity, y: -Infinity, z: -Infinity };

  // データの最大・最小値を求める
  data.forEach(point => {
    min.x = Math.min(min.x, point.x);
    min.y = Math.min(min.y, point.y);
    min.z = Math.min(min.z, point.z);
    max.x = Math.max(max.x, point.x);
    max.y = Math.max(max.y, point.y);
    max.z = Math.max(max.z, point.z);
  });

  // 正規化
  return data.map(point => ({
    x: (point.x - min.x) / (max.x - min.x),
    y: (point.y - min.y) / (max.y - min.y),
    z: (point.z - min.z) / (max.z - min.z)
  }));
}

export { loadCSVData, normalizeData };
