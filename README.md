# 📖 Google Maps × jQuery Sample

## 概要
このリポジトリは **jQuery + Google Maps JavaScript API** を使って  
入力住所からジオコーディング → 地図上にピン（AdvancedMarker）を立てるサンプルです。  

APIキーや Map ID は **Git 管理外ファイル（`js/config.js`）** に分離し、  
誤って公開リポジトリに含めないようにしています。  
---

## 🚀 セットアップ手順

### 1. Google Cloud Console で準備
1. プロジェクトを作成  
2. API を有効化  
   - Maps JavaScript API  
   - Geocoding API  
3. **APIキーを発行**し、**HTTP リファラ制限**を設定  
   - 開発用: `http://localhost/*`  
   - 本番用: `https://example.com/*`  
4. **Map ID を作成**（Map Management → Create Map ID）  
   - テストだけなら `"DEMO_MAP_ID"` でも可  

---

### 2. config.js を作成
雛形をコピーし、実際のキー・ID を記入します。

```bash
cp js/config.sample.js js/config.js