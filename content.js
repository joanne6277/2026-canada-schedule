/* ============================================================================
   內容設定檔 —— 行程和費用結算的文字、金額都在這個檔案
   ----------------------------------------------------------------------------
   小提醒：
   1. 每一行結尾的逗號「,」不要刪掉。
   2. 文字要用雙引號 " " 包起來。文字裡如果要用雙引號，請改用單引號 ' '。
   3. must: true  代表這是特別重要的項目，會用紅字標示。不需要就整段拿掉。
   4. note 是灰色小字補充說明，不需要就整段拿掉。
   5. 改完存檔，重新整理網頁就會看到結果。
   ========================================================================== */

var CONTENT = {

  /* ---------- 頁面標題 ---------- */
  title: "2026 加拿大之旅",
  subtitle: "行程與團費明細",
  dates: "10月8日（四）～ 10月25日（日）",

  /* 每次更新內容時順手改這個日期，家人就知道有沒有新版本 */
  updated: "2026年10月29日（行程最終版）",

  /* ---------- 各地天氣（行程分頁每個城市的「天氣」那一行會用到） ---------- */
  weather: {
    title: "各地天氣",
    cards: [
      {
        id: "yellowknife",
        place: "黃刀鎮（10/9 - 10/14）",
        temp: "白天約 3 至 5°C ／ 晚上 2 至 -3°C",
        highlight: true          // 加這行會變成藍底、提醒文字變紅
      },
      {
        id: "toronto",
        place: "多倫多（10/14 - 10/16）",
        temp: "白天 9 - 15°C ／ 晚上 7 - 10°C"
      },
      {
        id: "montreal",
        place: "蒙特婁（10/16 - 10/19）",
        temp: "白天約 10 - 15°C ／ 晚上約 5°C",
      },
      {
        id: "quebec",
        place: "魁北克市（10/19 - 10/22）",
        temp: "白天 8 - 12°C ／ 晚上 2 - 5°C",
      },
      {
        id: "vancouver",
        place: "溫哥華（10/22 - 10/24）",
        temp: "白天約 16°C ／ 晚上 10 - 12°C",
      }
    ]
  },

  /* ---------- 團費明細分頁 ----------
     資料來源：加拿大行程總表.xlsx「收費版」一、每人團費明細。
     amount 是每人金額（新台幣），照金額大到小排列；note 是灰色小字，寫包含什麼。
     每人合計和上方長條的比例都由程式自動算。
  ------------------------------------- */
  settlement: {
    title: "團費明細",
    heroNote: "機票、住宿、交通、餐費、門票等大家共用的花費",
    items: [
      { name: "機票", amount: 50700, note: "國際線來回＋加拿大境內 3 段" },
      { name: "住宿", amount: 32500, note: "15 晚，6 個城市" },
      { name: "極光團與門票", amount: 17100, note: "極光團、Casa Loma、AURA、Citadelle" },
      { name: "當地交通", amount: 14100, note: "高鐵、VIA 火車、租車、Uber、地鐵、停車加油" },
      { name: "餐飲", amount: 10600, note: "餐廳、咖啡、外送、超市採買" }
    ],
    footnote: "個人購物、伴手禮不含在團費內。"
  },

  /* ---------- 行程分頁 ----------
     行程最終版（紀錄用）：依旅途中的收據、訂單與航班紀錄整理實際走過的行程，
     只保留實際進行的行程；班機延誤造成的變動用 note 備註。
     注意：這個網頁是公開的，訂位代號、確認碼、門鎖資訊、金額都不要寫進來（詳見 README）。
  ------------------------------------- */
  itinerary: {
    title: "行程",
    intro: "行程最終版（紀錄用）：依旅途中的收據、訂單和航班紀錄，整理實際走過的行程。時間皆為當地時間。",

    cities: [

      {
        id: "departure",
        nav: "出發日",
        name: "出發・溫哥華（Richmond）",
        dates: "10/8（四）– 10/9（五）",
        nights: 1,
        weather: "vancouver",
        transport: [
          { date: "10/8（四）", items: [
            { title: "高雄 → 桃園機場", note: "高鐵" },
            { when: "13:20 → 16:50", title: "台北 → 首爾", note: "大韓航空 KE2022" },
            { when: "22:40 → 16:30", title: "首爾 → 溫哥華", note: "大韓航空 KE075" },
            { when: "抵達後", title: "溫哥華機場 → 飯店 check in → McArthurGlen Outlet" }
          ] },
          { date: "10/9（五）", items: [
            { when: "11:23", title: "飯店 → 溫哥華機場", note: "Uber" }
          ] }
        ],
        stay: [
          { name: "River Rock Casino Hotel", address: "8888 River Road, Richmond", city: "BC",
            checkin: "10/8 晚上", checkout: "10/9 11:00 前",
            rooms: "兩間四人房" }
        ],
        days: [
          { date: "10/8（四）", title: "首爾轉機，抵達溫哥華",
            items: [
              { time: "16:50", text: "抵達首爾仁川機場，轉機約 6 小時" },
              { time: "22:40", text: "首爾起飛" },
              { time: "16:30", text: "抵達溫哥華機場" },
              { time: "傍晚", text: "McArthurGlen Outlet 逛街＋晚餐", link: "https://maps.app.goo.gl/8RjuPLNZUd86ie138?g_st=ic", linkText: "開地圖" },
              { time: "晚上", text: "住 River Rock 飯店" }
            ] },
          { date: "10/9（五）", title: "飛黃刀鎮",
            items: [
              { time: "早上", text: "在飯店餐廳吃早餐" },
              { time: "11:00", text: "退房" },
              { time: "11:23", text: "搭 Uber 去溫哥華機場" },
              { time: "13:40", text: "飛往黃刀鎮" }
            ] }
        ]
      },

      {
        id: "yellowknife",
        nav: "黃刀鎮",
        name: "黃刀鎮",
        dates: "10/9（五）– 10/14（三）",
        nights: 5,
        weather: "yellowknife",
        transport: [
          { date: "10/9（五）", items: [
            { when: "13:40 → 17:06", title: "溫哥華 → 黃刀鎮", note: "加拿大航空 AC8024" },
            { when: "抵達後", title: "機場 → 住處", note: "極光團接機" }
          ] },
          { date: "10/9（五）– 10/13（二）每晚", items: [
            { when: "約 21:55", title: "住處 ↔ 極光觀賞區", note: "極光行程以外的其他交通：步行或搭計程車" }
          ] },
          { date: "10/14（三）", items: [
            { when: "04:30", title: "住處 → 機場", note: "極光團送機" }
          ] }
        ],
        stay: [
          { name: "Airbnb", address: "4922 44 St, Yellowknife", city: "NT",
            checkin: "10/9 傍晚", checkout: "10/14 清晨",
            rooms: "四間雙人房",
            features: ["廚房", "洗烘衣機"],
            parking: "建物內停車位" }
        ],
        days: [
          { date: "10/9（五）", title: "抵達日・第 1 晚極光",
            items: [
              { time: "17:06", text: "抵達黃刀鎮，極光團接機到住處" },
              { time: "晚上", text: "Independent Grocer 超市採買這幾天的食材" },
              { time: "21:55", text: "極光團：開車到不同地點追極光（4 小時）" }
            ] },
          { date: "10/10（六）", title: "市區觀光・第 2 晚極光",
            items: [
              { time: "白天", text: "極光團黃刀市區觀光（2.5 小時）" },
              { time: "18:42", text: "Old Town 的 Woodyard Brewhouse 晚餐" },
              { time: "21:55", text: "極光團：開車到不同地點追極光（4 小時）" }
            ] },
          { date: "10/11（日）", title: "第 3 晚極光（小木屋）",
            items: [
              { text: "Independent Grocer 補自煮食材，買楓糖巧克力、Oreo 楓糖等零食伴手禮" },
              { time: "21:55", text: "極光團：夢幻小木屋與原住民帳篷觀賞極光（4.5 小時）" }
            ] },
          { date: "10/12（一）", title: "第 4 晚極光",
            items: [
              { text: "Shoppers Drug Mart 買保養品和日用品" },
              { text: "Independent Grocer 買楓糖漿、楓糖餅乾等伴手禮" },
              { time: "21:55", text: "極光團：開車到不同地點追極光（4 小時）" }
            ] },
          { date: "10/13（二）", title: "第 5 晚極光（小木屋）",
            items: [
              { time: "21:55", text: "極光團：夢幻小木屋與原住民帳篷觀賞極光（4.5 小時）" }
            ] },
          { date: "10/14（三）", title: "離開",
            items: [
              { time: "04:30", text: "出門去機場", note: "極光團送機" },
              { time: "07:00", text: "飛往埃德蒙頓轉機到多倫多" }
            ] }
        ],
        tips: [
          { text: "極光團每晚約 22:00 出發、凌晨才回住處，白天行程安排得比較輕鬆" },
          { text: "看極光時人要站在野外不動，體感比溫度更冷" }
        ],

        contacts: [
          { name: "Aurora Dream Tours（黃刀鎮極光團）", phone: "+1 867 444 3888", note: "電話、LINE、WhatsApp 同號" }
        ]
      },

      {
        id: "toronto",
        nav: "多倫多",
        name: "多倫多",
        dates: "10/14（三）– 10/16（五）",
        nights: 2,
        weather: "toronto",
        alert: "10/14 埃德蒙頓轉多倫多的 AC164 延誤約 8 小時，10/15 凌晨 01:08 才抵達多倫多。尼加拉瀑布因此取消，租車和瀑布的飯店都退掉，改在多倫多住兩晚。",
        transport: [
          { date: "10/14（三）", items: [
            { when: "07:00 → 08:50", title: "黃刀鎮 → 埃德蒙頓", note: "加拿大航空 AC8114" },
            { when: "19:42 → 01:08", title: "埃德蒙頓 → 多倫多", note: "加拿大航空 AC164。原訂 11:10 起飛、16:52 抵達，因前一段班機機械故障延誤約 8 小時，10/15 凌晨抵達第 1 航廈" }
          ] },
          { date: "10/15（四）", items: [
            { when: "凌晨", title: "機場 → 住處" },
            { when: "15:41", title: "Bloor St → Casa Loma", note: "Uber" },
            { when: "17:08", title: "Casa Loma → 唐人街 Spadina Ave", note: "Uber" }
          ] },
          { date: "10/16（五）", items: [
            { when: "11:13", title: "住處 → Union Station", note: "Uber 兩台，先到車站寄放行李" },
            { when: "14:50", title: "St. Lawrence Market → Union Station", note: "Uber" },
            { when: "15:23 → 20:25", title: "多倫多 → 蒙特婁（火車）", note: "VIA Rail 66 次，多倫多 Union Station 發車，抵達蒙特婁 Gare Centrale。" }
          ] }
        ],
        stay: [
          { name: "10/14｜三房兩衛公寓（Union Station 旁）", address: "65 Bremner Blvd, Toronto", city: "ON",
            checkin: "10/15 凌晨（班機延誤）", checkout: "10/15",
            rooms: "三房兩衛" },
          { name: "10/15｜Airbnb The McCaul", address: "168 McCaul St, Toronto", city: "ON",
            checkin: "10/15", checkout: "10/16",
            note: "唐人街附近。尼加拉瀑布的飯店取消後，臨時改住這裡" }
        ],
        days: [
          { date: "10/14（三）", title: "移動日（班機延誤）",
            items: [
              { time: "04:30", text: "從黃刀鎮住處出發去機場" },
              { time: "07:00", text: "黃刀鎮起飛" },
              { time: "08:50", text: "抵達埃德蒙頓轉機" },
              { time: "11:10", text: "原訂班機延誤，在埃德蒙頓機場等了約 8 小時",},
              { time: "19:42", text: "埃德蒙頓起飛" }
            ] },
          { date: "10/15（四）", title: "多倫多市區",
            note: "備註：原訂今天取車去尼加拉瀑布，因班機延誤凌晨才到，取消瀑布行程，改在多倫多市區。",
            items: [
              { time: "01:08", text: "抵達多倫多，入住 65 Bremner Blvd 公寓" },
              { time: "中午", text: "換住宿地點，入住 Airbnb The McCaul" },
              { time: "下午", text: "逛市區：多倫多大學、Casa Loma古堡" },
              { time: "17:08", text: "搭 Uber 回住處" },
              { time: "晚上", text: "Eaton Centre 逛街" },
            ] },
          { date: "10/16（五）", title: "St. Lawrence Market，搭火車去蒙特婁",
            items: [
              { time: "11:13", text: "搭 Uber 到 Union Station，在車站寄放行李" },
              { time: "中午", text: "St. Lawrence Market 吃午餐" },
              { time: "14:50", text: "搭 Uber 回 Union Station" },
              { time: "15:23", text: "搭火車出發" },
              { time: "晚上", text: "抵達蒙特婁 Gare Centrale（表定 20:25）" }
            ] }
        ]
      },

      {
        id: "montreal",
        nav: "蒙特婁",
        name: "蒙特婁",
        dates: "10/16（五）– 10/19（一）",
        nights: 3,
        weather: "montreal",
        transport: [
          { date: "10/16（五）", items: [
            { when: "21:45", title: "Gare Centrale 中央車站 → 住處" }
          ] },
          { date: "10/17（六）", items: [
            { when: "11:36", title: "Joliette 站 → 市中心", note: "地鐵，去取車" },
            { when: "中午", title: "Hertz 取車", note: "市中心 Maisonneuve O 門市，一路開到魁北克市，10/22 在魁北克機場還車" },
            { title: "蒙特婁 ↔ Mont-Tremblant", note: "自駕，單程約 1.5 小時" }
          ] },
          { date: "10/18（日）", items: [
            { when: "12:13", title: "Joliette 站 ↔ 市區", note: "這天搭地鐵進出市區" }
          ] },
          { date: "10/19（一）", items: [
            { title: "蒙特婁 → 魁北克市", note: "自駕走 20 號公路" }
          ] }
        ],
        stay: [
          { name: "Airbnb", address: "2410 Rue Joliette, Montréal", city: "QC",
            checkin: "10/16 晚上", checkout: "10/19 11:00 前",
            rooms: "四間雙人房＋客廳沙發床",
            features: ["廚房", "洗烘衣機"],
            parking: "路邊停車位",
            note: "Hochelaga 區，地鐵綠線 Joliette 站旁，到市中心約 15 分鐘" }
        ],
        days: [
          { date: "10/16（五）", title: "抵達日",
            items: [
              { time: "晚上", text: "火車抵達，搭 Uber 到住處" },
              { time: "晚上", text: "入住休息" }
            ] },
          { date: "10/17（六）", title: "Mont-Tremblant 自駕日",
            items: [
              { time: "09:30", text: "Uber Eats 外送 St-Viateur 貝果當早餐" },
              { time: "11:36", text: "搭地鐵到市中心取車" },
              { time: "中午", text: "Hertz 取車，開往 Mont-Tremblant" },
              { time: "17:10", text: "抵達 Mont-Tremblant，但纜車已經關了" },
              { time: "晚上", text: "La Forge Bar & Grill 晚餐" },
              { time: "20:42", text: "開回蒙特婁" }
            ] },
          { date: "10/18（日）", title: "市區日",
            items: [
              { time: "12:13", text: "搭地鐵進市區" },
              { time: "下午", text: "Ste-Catherine 街逛街" },
              { time: "下午", text: "舊蒙特婁 Notre-Dame 街 Tommy Cafe 吃午餐" },
              { time: "19:00", text: "聖母聖殿 AURA 光影秀，可先在網路上買票" },
              { time: "19:40", text: "買晚餐，回住處" }
            ] },
          { date: "10/19（一）", title: "移動日",
            items: [
              { time: "上午", text: "退房，開車出發去魁北克市" },
              { time: "14:30", text: "St-Louis-de-Blandford 休息站午餐" },
              { time: "下午", text: "抵達魁北克市" }
            ] }
        ]
      },

      {
        id: "quebec",
        nav: "魁北克市",
        name: "魁北克市",
        dates: "10/19（一）– 10/22（四）",
        nights: 3,
        weather: "quebec",
        transport: [
          { date: "10/19（一）", items: [
            { title: "蒙特婁 → 魁北克市", note: "自駕走 20 號公路" },
          ] },
          { date: "10/20（二）", items: [
            { title: "奧爾良島", note: "自駕" },
          ] },
          { date: "10/21（三）", items: [
            { when: "11:56", title: "住處 → 舊城", note: "Uber" },
            { when: "17:35", title: "Citadelle → Rue St-Jean", note: "Uber" },
            { when: "19:32", title: "Rue St-Jean → 住處", note: "Uber" }
          ] },
          { date: "10/22（四）", items: [
            { when: "12:40", title: "加油後到魁北克 YQB 機場還車", note: "兩台都在機場還車" },
            { when: "14:50 → 15:40", title: "魁北克 → 蒙特婁", note: "加拿大航空 AC1155" },
            { when: "16:30 → 19:02", title: "蒙特婁 → 溫哥華", note: "加拿大航空 AC307" }
          ] }
        ],
        stay: [
          { name: "Airbnb", address: "20 Bd Charest O, Québec", city: "QC",
            checkin: "10/19 傍晚", checkout: "10/22 11:00 前",
            rooms: "兩間雙人房＋一間三人房",
            features: ["廚房", "洗烘衣機"],
            parking: "住處一個免費車位；第二台車停附近的 INRS 停車場（480 de la Couronne，付費），附近車位非常難找",
            note: "Saint-Roch 區，走路可以到舊城下城，開車 5 分鐘" }
        ],
        days: [
          { date: "10/19（一）", title: "抵達日",
            items: [
              { time: "下午", text: "抵達魁北克市" },
              { time: "16:45", text: "到魁北克機場換車" },
              { time: "晚上", text: "St-Romuald 的 IGA Extra 超市採買" },
              { time: "晚上", text: "入住" }
            ] },
          { date: "10/20（二）", title: "奧爾良島",
            items: [
              { time: "13:00", text: "開車出發" },
              { time: "下午", text: "Île d'Orléans 奧爾良島",
                note: "Cassis Monna & Filles 黑醋栗酒莊喝黑醋栗氣泡飲、吃蛋白霜；Cidrerie Bilodeau 蘋果酒莊買冰蘋果酒、蘋果醬和楓糖油醋" },
              { time: "傍晚", text: "回住處" }
            ] },
          { date: "10/21（三）", title: "舊城徒步日（搭 Uber 進出）",
            items: [
              { time: "11:56", text: "搭 Uber 到舊城" },
              { time: "中午", text: "Café-Terrasse La Nouvelle-France、Bottega Pizza 吃午餐和點心" },
              { time: "下午", text: "上城逛街", note: "Rue Buade 的 Roots、Mary's Popcorn 爆米花、Chocolats Favoris 巧克力沾醬霜淇淋" },
              { time: "16:00", text: "下城 Quartier Petit Champlain 小香普蘭街" },
              { time: "16:50", text: "La Citadelle 星形要塞博物館" },
              { time: "17:35", text: "搭 Uber 到 Rue St-Jean" },
              { time: "晚上", text: "Le Billig 可麗餅餐館吃晚餐" },
              { time: "19:32", text: "搭 Uber 回住處" }
            ] },
          { date: "10/22（四）", title: "離開日",
            items: [
              { time: "11:00", text: "退房" },
              { time: "13:00", text: "魁北克機場還車、託運行李" },
              { time: "14:50", text: "起飛，經蒙特婁轉機到溫哥華" }
            ] }
        ], 
      },

      {
        id: "vancouver",
        nav: "溫哥華・返程",
        name: "溫哥華與返程",
        dates: "10/22（四）– 10/25（日）",
        nights: 1,
        weather: "vancouver",
        transport: [
          { date: "10/22（四）", items: [
            { when: "20:14", title: "溫哥華機場 → 飯店", note: "Uber" }
          ] },
          { date: "10/23（五）", items: [
            { when: "00:15", title: "Gastown → 飯店", note: "Uber" },
            { when: "17:58", title: "Canada Place → E Broadway", note: "Uber" },
            { when: "20:30", title: "市區 → 溫哥華機場", note: "Uber" }
          ] },
          { date: "10/24（六） → 10/25（日）", items: [
            { when: "00:55 → 04:25", title: "溫哥華 → 首爾", note: "大韓航空 KE076" }
          ] },
          { date: "10/25（日）", items: [
            { when: "09:00 → 11:00", title: "首爾 → 台北", note: "大韓航空 KE2025" },
            { title: "桃園 → 高雄", note: "高鐵" }
          ] }
        ],
        stay: [
          { name: "Hotel BLU（布魯酒店）", address: "177 Robson Street, Vancouver", city: "BC",
            checkin: "10/22 晚上", checkout: "10/23 12:00 前",
            rooms: "兩間四人房" }
        ],
        days: [
          { date: "10/22（四）", title: "抵達",
            items: [
              { time: "19:02", text: "抵達溫哥華" },
              { time: "20:14", text: "搭 Uber 到飯店入住" },
              { time: "晚上", text: "Gastown 煤氣鎮散步" },
              { time: "00:15", text: "搭 Uber 回飯店" }
            ] },
          { date: "10/23（五）", title: "市區觀光，晚上去機場",
            items: [
              { time: "12:00", text: "退房" },
              { time: "白天", text: "Robson St 逛街" },
              { time: "傍晚", text: "Canada Place 加拿大廣場" },
              { time: "17:58", text: "搭 Uber 到 E Broadway 一帶" },
              { time: "20:30", text: "搭 Uber 去機場" }
            ] },
          { date: "10/24（六）– 10/25（日）", title: "回台灣",
            items: [
              { time: "00:55", text: "溫哥華起飛" },
              { time: "04:25", text: "10/25 抵達首爾，轉機" },
              { time: "11:00", text: "抵達台北，搭高鐵回高雄" }
            ] }
        ]
      }

    ]
  },
};
