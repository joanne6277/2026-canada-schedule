/* ============================================================================
   內容設定檔 —— 要改文字、增加或刪除項目，只要改這個檔案就好
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
  subtitle: "行程與打包清單",
  dates: "10月8日（四）～ 10月25日（日）",

  /* 每次更新內容時順手改這個日期，家人就知道有沒有新版本 */
  updated: "2026年9月22日",

  /* ---------- 開頭的重點提醒（黃色框） ---------- */
  notice: {
    heading: "重點提醒",
    items: [
      {
        text: "1. 黃刀鎮看極光最冷，晚上要在戶外站 4 小時以上，大件防寒外套可以黃刀鎮當地租借。"
      },
      {
        text: "2. 東岸會遇到雨天，請務必準備防水健走/登山鞋"
      },
      {
        text: "3. 住的地方幾乎都有洗衣機和烘衣機，請斟酌準備衣物。"
      }
    ]
  },

  /* ---------- 各地天氣 ---------- */
  weather: {
    title: "各地天氣",
    hint: "早晚溫差大，東部城市雨多。",
    cards: [
      {
        id: "yellowknife",
        place: "黃刀鎮（10/9 - 10/14）",
        temp: "白天約 2°C ／ 晚上 -3 至 -6°C",
        tip: "全程最冷。看極光時人要站在野外不動，體感比溫度更冷",
        highlight: true          // 加這行會變成藍底、提醒文字變紅
      },
      {
        id: "toronto",
        place: "多倫多、尼加拉瀑布（10/14 - 10/16）",
        temp: "白天 14 - 19°C ／ 晚上 8 - 9°C",
        tip: "瀑布區風大水氣重"
      },
      {
        id: "montreal",
        place: "蒙特婁（10/16 - 10/19）",
        temp: "白天約 14°C ／ 晚上約 5°C",
      },
      {
        id: "quebec",
        place: "魁北克市（10/19 - 10/22）",
        temp: "白天 8 - 12°C ／ 晚上 2 - 5°C",
        tip: "比蒙特婁更冷，雨也多，舊城區石板路多，建議穿防水防滑的鞋子"
      },
      {
        id: "vancouver",
        place: "溫哥華（10/22 - 10/24）",
        temp: "白天約 14°C ／ 晚上 7 - 8°C",
      }
    ]
  },

  /* ---------- 三層式穿衣 ---------- */
  layers: {
    title: "三層式穿衣",
    items: [
      {
        title: "裡層：發熱衣",
        desc: "發熱衣褲或羊毛長袖（要注意能否進烘衣機）。不要穿純棉，流汗以後會濕冷。"
      },
      {
        title: "中間：保暖衣",
        desc: "刷毛外套或薄羽絨。"
      },
      {
        title: "最外面：防風防水外套",
        desc: "連帽外套優。下雨、瀑布區、看極光都靠這一件擋風。"
      }
    ]
  },

  /* ---------- 可勾選的清單 ----------
     每一組 = 一個段落。nav 是上方跳頁按鈕的文字。
     id 請用英文，不要重複，改過之後該段的勾選紀錄會重來。
  ------------------------------------- */
  checklists: [

    {
      id: "docs",
      nav: "證件",
      title: "證件",
      items: [
        { text: "護照", must: true },
        { text: "國際駕照 ＋ 台灣駕照正本", note: "兩張都要帶！！！！！！！！" },
        { text: "信用卡兩張以上", note: "建議visa/mastercard至少各一" },
        { text: "加幣現金 100 元左右", note: "備用，幾乎都可以刷卡" },
        { text: "旅遊保險資料", note: "保單號碼和緊急聯絡電話存在手機裡" }
      ]
    },

    {
      id: "aurora",
      nav: "極光保暖",
      title: "黃刀鎮看極光",
      hint: "極光團一晚要在戶外 4 小時以上，中途沒辦法回室內換衣服，這些一定要帶齊。",
      items: [
        { text: "發熱衣褲 2 套", note: "看極光那幾晚每天都要穿", must: true },
        { text: "厚羊毛襪 3 雙", note: "腳最容易冷，襪子一定要厚", must: true },
        { text: "可以蓋住耳朵的毛帽", must: true },
        { text: "脖圍或面罩", must: true },
        { text: "手套", note: "會有拍照需求，可買有觸控功能", must: true },
        { text: "暖暖包", note: "貼式和手握式都帶，韓國的軍用暖暖包超級暖，轉機時可以去看看" },
        { text: "手機腳架或相機腳架", note: "手拿拍極光會糊掉" },
        { text: "行動電源、備用電池", note: "天冷電池掉電很快，要放在口袋裡保溫" },
        { text: "保溫瓶", note: "白天觀光也用得到" }
      ]
    },

    {
      id: "clothes",
      nav: "衣服",
      title: "衣服（每人）",
      items: [
        { text: "底層發熱衣褲" },
        { text: "中層長袖上衣" },
        { text: "長褲", note: "有防風防水佳" },
        { text: "刷毛外套或薄羽絨" },
        { text: "防風防水外套 1 件", note: "連帽佳", must: true },
        { text: "內衣褲、羊毛襪" },
        { text: "睡衣" },
        { text: "好走的防水鞋 1 雙", note: "每天大概走 1 到 2 萬步，鞋子舒不舒服很關鍵。迪卡儂MH500系列CP值高", must: true },
        { text: "室內拖鞋" },
        { text: "圍巾、毛帽、手套" },
        { text: "摺疊傘或輕便雨衣", note: "for尼加拉瀑布和溫哥華" }
      ]
    },

    {
      id: "health",
      nav: "藥品用品",
      title: "藥品與個人用品",
      items: [
        { text: "個人慢性病藥", note: "建議帶足全程再多 7 天的份量，放隨身行李不要托運", must: true },
        { text: "英文藥單或處方影本", note: "過海關和萬一在當地看醫生時會用到", must: true },
        { text: "常備成藥", note: "腸胃藥、感冒藥、止痛藥、暈車藥、酸痛貼布" },
        { text: "護膝或護腰", note: "舊城區石板路、斜坡和樓梯很多" },
        { text: "折疊登山杖", note: "走坡道時省力，可以放托運行李" },
        { text: "備用眼鏡、老花眼鏡" },
        { text: "護唇膏、乳液", note: "當地非常乾燥，嘴唇和皮膚容易裂" },
        { text: "個人盥洗用品" }
      ]
    },

    {
      id: "tech",
      nav: "電器",
      title: "電器與 3C",
      items: [
        { text: "手機、充電器、充電線" },
        { text: "行動電源", note: "一定要隨身，不可以放托運行李" },
        { text: "相機、記憶卡、備用電池" },
        { text: "不用帶轉接頭", note: "加拿大插座和電壓跟台灣一樣，直接插就可以" }
      ]
    },

    {
      id: "other",
      nav: "其他",
      title: "其他",
      items: [
        { text: "環保購物袋", note: "加拿大超市塑膠袋要另外付錢" },
        { text: "行李秤", note: "回程買東西後可以先確認有沒有超重" },
        { text: "大塑膠袋或洗衣袋", note: "分裝穿過的衣服" }
      ]
    }

  ],

  /* ---------- 行程分頁 ----------
     每個城市一組，依行程順序排列。
     status 可用值："booked"（已訂，綠色）、"confirmed"（已確認，黃色）、"tbd"（待補，灰色），
     不需要標籤就整段拿掉。
     新增一天：在該城市的 days 裡加一組 { date: "...", title: "...", items: [ ... ] }。
     新增一個活動：在那一天的 items 裡加一行 { time: "上午", text: "...", note: "..." }。
     注意：這個網頁是公開的，訂位代號、確認碼、門鎖資訊、金額都不要寫進來（詳見 README）。
  ------------------------------------- */
  itinerary: {
    title: "行程",
    intro: "以下時間皆為當地時間。",

    cities: [

      {
        id: "departure",
        nav: "出發日",
        name: "出發・溫哥華（Richmond）",
        dates: "10/8（四）",
        nights: 1,
        weather: "vancouver",
        transport: [
          { when: "10/8 13:20 → 16:50", title: "台北 → 首爾", note: "大韓航空 KE2022，全員同班機", status: "booked" },
          { when: "10/8 22:40 → 16:30", title: "首爾 → 溫哥華", note: "大韓航空 KE075，抵達時仍是 10/8 當天下午", status: "booked" },
          { when: "抵達後", title: "機場 → 飯店", note:"skytrain", status: "confirmed" },
          { when: "離開", title: "飯店 → 機場", note:"skytrain", status: "confirmed" }
        ],
        stay: [
          { name: "River Rock Casino Hotel", address: "8888 River Road, Richmond", city: "BC",
            checkin: "10/8 16:00", checkout: "10/9 11:00 前",
            rooms: "兩間四人房" }
        ],
        days: [
          { date: "10/8（四）", title: "抵達日",
            items: [
              { time: "16:30", text: "抵達溫哥華機場" },
              { time: "晚上", text: "入住飯店，休息", note: "隔天中午要搭機去黃刀鎮" }
            ] }
        ],
        tips: [
          { text: "10/9 11:00 前退房，13:40 從溫哥華飛黃刀鎮。搭飛機前後如果有時間可以到機場附近outlet逛逛" }
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
          { when: "10/9 13:40 → 17:06", title: "溫哥華 → 黃刀鎮", note: "加拿大航空 AC8024", status: "booked" },
          { when: "10/9 抵達後", title: "機場 → 住處", note: "極光團接機：在機場領行李區等候，導遊會舉「Aurora Dream Tours 極光夢之旅」的牌子和團員名字", status: "booked" },
          { when: "每晚約 21:55", title: "住處 ↔ 極光觀賞區", note: "極光團在住處接送", status: "booked" },
          { when: "10/14 清晨", title: "住處 → 機場", note: "極光團送機，會提前 2 小時送到機場（班機 07:00 起飛，出門時間約 05:00）", status: "confirmed" }
        ],
        stay: [
          { name: "Airbnb", address: "4922 44 St, Yellowknife", city: "NT",
            checkin: "10/9 15:00 後", checkout: "10/14 11:00 前",
            rooms: "四間雙人房",
            features: ["廚房", "洗烘衣機"],
            parking: "建物內停車位" }
        ],
        days: [
          { date: "10/9（五）", title: "抵達日",
            items: [
              { time: "17:06", text: "抵達黃刀鎮，極光團接機到住處" }
            ] },
          { date: "每晚", title: "極光團",
            note: "確認單上的日期寫法不一致（寫 10/9–13，又寫 10/13 沒有行程），實際哪幾晚出團要再向業者確認。",
            items: [
              { time: "21:55", text: "在住處集合出發", note: "觀賞時提供熱飲點心、免費攝影、華語導遊" },
              { text: "3 晚：開車到不同地點追極光", note: "每晚 4 小時", status: "booked" },
              { text: "2 晚：夢幻小木屋與原住民帳篷觀賞極光", note: "每晚 4.5 小時", status: "booked" },
              { text: "每晚是哪一種行程", status: "tbd" }
            ] },
          { date: "白天", title: "市區與自選活動",
            items: [
              { text: "黃刀市區觀光（2.5 小時）", note: "日期待補", status: "booked" },
              { text: "白天自選活動", note: "業者會在抵達第一天公布", status: "tbd" }
            ] },
          { date: "10/14（三）", title: "離開",
            items: [
              { time: "05:00", text: "出門去機場", note: "極光團送機", status: "confirmed" },
              { time: "07:00", text: "飛往埃德蒙頓轉機到多倫多" }
            ] }
        ],
        tips: [
          { text: "極光團每晚約 22:00 出發、凌晨才回住處，白天行程安排輕鬆一點" },
          { text: "大件防寒外套可以在當地租借", status: "confirmed" },
          { text: "看極光時人要站在野外不動，體感比溫度更冷" }
        ],
     
/* 全程資訊：聯絡電話 */ 
        contacts: [
      { name: "Aurora Dream Tours（黃刀鎮極光團）", phone: "+1 867 444 3888", note: "電話、LINE、WhatsApp 同號" }
    ]

        
      },

      {
        id: "toronto",
        nav: "多倫多・尼加拉",
        name: "多倫多＋尼加拉瀑布",
        dates: "10/14（三）– 10/16（五）",
        nights: 2,
        weather: "toronto",
        alert: "10/16 行程很趕：退房後 12:30 要在多倫多還車，15:23 搭火車去蒙特婁。",
        transport: [
          { when: "10/14 07:00 → 08:50", title: "黃刀鎮 → 埃德蒙頓", note: "加拿大航空 AC8114", status: "booked" },
          { when: "10/14 11:10 → 16:56", title: "埃德蒙頓 → 多倫多", note: "加拿大航空 AC164，抵達第 1 航廈", status: "booked" },
          { when: "10/14 抵達後", title: "機場 → 住處", note: "Uber", status: "confirmed" },
          { when: "10/15", title: "多倫多 → 尼加拉瀑布", note: "Hertz 租車 2 台，在多倫多 Brookfield Place 取車（取車時間待補），自駕約 1.5 小時", status: "booked" },
          { when: "10/16 12:30", title: "尼加拉瀑布 → 多倫多", note: "開回多倫多，12:30 在 Brookfield Place 還車", status: "booked" },
          { when: "10/16 15:23 → 20:25", title: "多倫多 → 蒙特婁（火車）", note: "VIA Rail 66 次，多倫多 Union Station 發車，抵達蒙特婁 Gare Centrale。第 5 車廂，座位 6A、6B、6C、6D、7A、7B", status: "booked" }
        ],
        stay: [
          { name: "10/14｜Luxury Condo Downtown Toronto", address: "251 Jarvis Street, Toronto", city: "ON",
            checkin: "10/14 16:00 – 22:00", checkout: "10/15 11:00 – 12:00",
            rooms: "兩間雙人房＋客廳沙發床",
            features: ["廚房", "洗衣機"] },
          { name: "10/15｜Howard Johnson Plaza by Wyndham by the Falls", address: "5905 Victoria Avenue, Niagara Falls", city: "ON",
            checkin: "10/15 16:00", checkout: "10/16 11:00 前",
            rooms: "兩間四人房",
            parking: "需付費停車" }
        ],
        days: [
          { date: "10/14（三）", title: "移動日",
            items: [
              { time: "05:00", text: "從黃刀鎮住處出發去機場", status: "confirmed" },
              { time: "16:56", text: "抵達多倫多，前往住處" },
              { time: "晚上", text: "入住休息" }
            ] },
          { date: "10/15（四）", title: "尼加拉瀑布",
            items: [
              { text: "多倫多市區行程", status: "tbd" },
              { text: "取車，開往尼加拉瀑布", note: "取車時間待補" },
              { text: "尼加拉瀑布行程", status: "tbd" },
              { time: "16:00", text: "入住 Howard Johnson" }
            ] },
          { date: "10/16（五）", title: "回多倫多轉火車",
            items: [
              { time: "11:00", text: "退房，開回多倫多" },
              { time: "12:30", text: "Brookfield Place 還車" },
              { time: "15:23", text: "Union Station 搭火車" },
              { time: "20:25", text: "抵達蒙特婁" }
            ] }
        ],
        tips: [
          { text: "瀑布區風大水氣重" }
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
          { when: "10/16 20:25", title: "Gare Centrale 中央車站 → 住處", note: "轉搭地鐵到住處" },
          { when: "10/17", title: "蒙特婁取車", note: "Hertz 2 台，一路開到魁北克市，10/22 在魁北克機場還車。取車時間待補", status: "booked" },
          { when: "10/19", title: "蒙特婁 → 魁北克市", note: "自駕約 3 小時，走 20 號公路" }
        ],
        stay: [
          { name: "Airbnb", address: "2410 Rue Joliette, Montréal", city: "QC",
            checkin: "10/16 16:00 後", checkout: "10/19 11:00 前",
            rooms: "四間雙人房＋客廳沙發床",
            features: ["廚房", "洗烘衣機"],
            parking: "路邊停車位",
            note: "Hochelaga 區，地鐵綠線 Joliette 站旁，到市中心約 15 分鐘" }
        ],
        days: [
          { date: "10/16（五）", title: "抵達日",
            items: [
              { time: "20:25", text: "火車抵達，轉地鐵到住處" },
              { time: "晚上", text: "入住休息" }
            ] },
          { date: "10/17（六）", title: "市區日",
            items: [
              { time: "早上", text: "採買這幾天的食材", note: "Maisonneuve 市場，或超市 Metro、IGA" },
              { text: "取車", note: "時間待補" },
              { time: "上午", text: "舊蒙特婁：聖母聖殿 Notre-Dame Basilica、Place d'Armes、Rue Saint-Paul 石板街", note: "聖母聖殿建議線上先訂票，避免排隊", status:"tbd" },
              { time: "中午", text: "Marché Bonsecours 一帶或舊港 Vieux-Port 用餐" },
              { time: "下午", text: "皇家山公園 Mont-Royal，Kondiaronk 觀景台俯瞰市區和秋色", note: "長輩省力：開車到接近山頂的 Voie Camillien-Houde 停車場，不用從山腳爬" },
              { time: "傍晚", text: "Jean-Talon 市場，或到 Mile End 吃 St-Viateur、Fairmount 貝果", note: "貝果可以帶回住處當早餐" }
            ] },
          { date: "10/18（日）", title: "郊區自駕日（三個方案選一個）",
            items: [
              { text: "方案 A：Parc Oméga 野生動物園（Montebello）", note: "車程約 1.5 小時。開車穿越園區看野牛、麋鹿、熊、狼，全程可以待在車上；十月開放 10:00–17:00（最後入場 16:00）。回程順遊 Fairmont Le Château Montebello 原木城堡飯店。混齡最輕鬆，天氣差也不影響" },
              { text: "方案 B（推薦）：Mont-Tremblant 洛朗山區", note: "車程約 1.5 小時。山腳彩色小鎮，搭全景纜車上山看山谷。纜車當季營運到 10/18，要搭務必先上網確認。風景最好，但走路較多、山上更冷", status: "tbd" },
              { text: "方案 C：東部鎮區 Eastern Townships", note: "車程約 1.5 小時。Coaticook 峽谷 169 公尺人行吊橋、沿途酒莊、起司與巧克力工坊。美食導向，吊橋段需要走一段路" }
            ] },
          { date: "10/19（一）", title: "移動日",
            items: [
              { time: "09:00", text: "退房，開車出發去魁北克市", note: "建議 09:00–10:00 出發" },
              { time: "中午", text: "Trois-Rivières 三河市午餐", note: "大約在中間點，看老城區和聖羅倫斯河景，休息 1–1.5 小時" },
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
          { when: "10/19", title: "蒙特婁 → 魁北克市", note: "自駕約 3 小時" },
          { when: "市區", title: "上城 ↔ 下城", note: "搭 Funiculaire 纜車（單程約 5 加幣），不要走斷頸梯 Escalier Casse-Cou" },
          { when: "10/22 12:00 前", title: "住處 → 魁北克 YQB 機場", note: "開車約 20 分鐘，在機場還車", status: "booked" },
          { when: "10/22 14:50 → 15:45", title: "魁北克 → 蒙特婁", note: "加拿大航空 AC1155", status: "booked" },
          { when: "10/22 16:30 → 19:02", title: "蒙特婁 → 溫哥華", note: "加拿大航空 AC307", status: "booked" }
        ],
        stay: [
          { name: "Airbnb", address: "20 Bd Charest O, Québec", city: "QC",
            checkin: "10/19 16:00 後", checkout: "10/22 11:00 前",
            rooms: "兩間雙人房＋一間三人房",
            features: ["廚房", "洗烘衣機"],
            parking: "一個免費車位",
            note: "Saint-Roch 區，走路可以到舊城下城，開車 5 分鐘" }
        ],
        days: [
          { date: "10/19（一）", title: "抵達日",
            items: [
              { time: "下午", text: "抵達入住" },
              { time: "傍晚", text: "舊城區散步，看 Château Frontenac 芳堤娜城堡打燈夜景" }
            ] },
          { date: "10/20（二）", title: "舊城區徒步日（不開車）",
            note: "上城和下城落差很大，務必搭 Funiculaire 纜車。",
            items: [
              { time: "上午", text: "Château Frontenac 芳堤娜城堡、Terrasse Dufferin 木棧露台看聖羅倫斯河" },
              { time: "中午", text: "下城 Quartier Petit Champlain 小香普蘭街", note: "北美最古老的商業街之一，周邊餐廳多" },
              { time: "下午", text: "Place Royale 皇家廣場、Notre-Dame-des-Victoires 勝利聖母堂、文明博物館 Musée de la civilisation", note: "博物館可以當雨天備案" },
              { time: "傍晚", text: "亞伯拉罕平原 Plains of Abraham 與 Citadelle 星形要塞外圍散步" }
            ] },
          { date: "10/21（三）", title: "郊區自駕日",
            items: [
              { time: "中午", text: "Sainte-Anne-de-Beaupré 大教堂", note: "全年開放，彩繪玻璃和馬賽克很值得看" },
              { time: "下午", text: "Île d'Orléans 奧爾良島環島", note: "環島公路約 67 公里，開車 1.5–2 小時。沿途蘋果酒莊、楓糖屋、小教堂。農場店家十月中後陸續休季，先查營業時間", status: "confirm" },
              { text: "替代方案", note: "Canyon Sainte-Anne 峽谷吊橋（需確認開放日）" }
            ] },
          { date: "10/22（四）", title: "離開日",
            items: [
              { time: "11:00", text: "退房" },
              { time: "上午", text: "舊城吃早餐、買伴手禮", note: "楓糖漿、冰酒、Petit Champlain 手工藝品" },
              { time: "12:00", text: "到魁北克機場還車", note: "還車和行李託運都要留緩衝時間" },
              { time: "14:50", text: "起飛，經蒙特婁轉機到溫哥華" }
            ] }
        ],
        tips: [
          { text: "舊城區石板路多、坡多，建議穿防水防滑的鞋子" }
        ]
      },

      {
        id: "vancouver",
        nav: "溫哥華・返程",
        name: "溫哥華與返程",
        dates: "10/22（四）– 10/25（日）",
        nights: 1,
        weather: "vancouver",
        alert: "回程班機 10/24 凌晨 00:55 起飛，10/23 晚上就要出發去機場。",
        transport: [
          { when: "10/22 19:02", title: "溫哥華機場 → 飯店", note: "skytrain", status: "confirmed" },
          { when: "10/23 晚上", title: "市區 → 溫哥華機場", note: "skytrain", status: "confirmed" },
          { when: "10/24 00:55 → 10/25 04:40", title: "溫哥華 → 首爾", note: "大韓航空 KE076", status: "booked" },
          { when: "10/25 09:00 → 11:00", title: "首爾 → 台北", note: "大韓航空 KE2021", status: "booked" }
        ],
        stay: [
          { name: "Hotel BLU（布魯酒店）", address: "177 Robson Street, Vancouver", city: "BC",
            checkin: "10/22 16:00", checkout: "10/23 12:00 前",
            rooms: "兩間四人房" }
        ],
        days: [
          { date: "10/22（四）", title: "抵達",
            items: [
              { time: "19:02", text: "抵達溫哥華，前往飯店入住" }
            ] },
          { date: "10/23（五）", title: "市區觀光，晚上去機場",
            items: [
              { time: "12:00", text: "退房", note: "行李預計寄放飯店", status: "tbd" },
              { time: "白天", text: "溫哥華市區觀光、購物"},
              { time: "晚上", text: "前往機場" }
            ] },
          { date: "10/24（六）– 10/25（日）", title: "回台灣",
            items: [
              { time: "00:55", text: "溫哥華起飛" },
              { time: "04:40", text: "10/25 抵達首爾，轉機" },
              { time: "11:00", text: "抵達台北" }
            ] }
        ],
        tips: [
          { text: "10/23 退房後到凌晨登機前沒有其他住宿點" }
        ]
      }

    ],
  },
};
