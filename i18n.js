/* 知って欲しい事ブック・そよぎ 多言語テーブル(そよぎアプリ・キット v1・12言語)
   ・window.SBOOK_I18N = { ja, en, de, fr, es, it, pt, nl, sv, ko, zh, ar }
   ・キー構造は全言語で完全一致(_check.js が ja を正として構造・配列要素数を機械照合)
   ・🔴 BUILDER: 文言は ja と en の両方に同じキーで足す。画面固有は screen.<画面id>.* に置く。
     de〜ar の10言語は、翻訳Workflowで差し替えるまで en を自動で流用する(末尾の仮置き)
   ・{n} などのプレースホルダは app.js/screens が実値に差し替える(訳文でも記号のまま残す)
   ・set.lang は言語切替ラベルなので全言語 'ことば / Language' 固定
   ・ar は RTL。app.js が document.dir='rtl' にする
   ・ひらがな: 本人が読む操作文言はひらがな主体。相手に見せる文(みせる画面等)は漢字で曖昧さを消す
   ・節(secs)の形: { t:入力画面の見出し(ひらがな主体), st:見せる画面の見出し(漢字), h:書き方の手がかり,
       q:{ <qid>:{ l:入力ラベル, s:見せるラベル(漢字), p:記入例(placeholder) } } }
   ・記入例はすべて架空。ブログの本文・47項目・図版は使わず、そよぎの言葉で書き下ろしたもの */
(function(){
'use strict';

/* ============ ja(正) ============ */
var ja = {
  app: { name:'知って欲しい事ブック・そよぎ', short:'知って欲しい事ブック', tagline:'要求ではなく、説明書です。' },
  nav: { home:'ホーム', book:'かく', give:'わたす', three:'きょうの3つ', set:'せってい' },
  common: {
    ok:'OK', cancel:'やめる', save:'ほぞんする', del:'けす', back:'もどる', close:'とじる',
    yes:'はい', no:'いいえ', add:'ついか', edit:'なおす', next:'つぎ', prev:'まえ', done:'できた',
    saved:'ほぞんしました ✓', saveFail:'ほぞんできませんでした', storageFull:'いっぱいで ほぞんできません',
    deleted:'けしました', delConfirm:'ほんとうに けしますか?', empty:'まだ なにも ありません',
    optional:'ぜんぶ 書かなくても だいじょうぶです。', today:'きょう',
    backConfirm:'書いたことは まだ ほぞんしていません。すてて もどりますか?',
    photo: {
      camera:'カメラで とる', roll:'しゃしんから えらぶ',
      cropTitle:'しゃしんを 切りとる', cropHint:'ゆびで うごかすか、やじるしで あわせて、スライダーで 大きさを かえます。',
      zoom:'大きさ', panUp:'うえへ', panDown:'したへ', panLeft:'ひだりへ', panRight:'みぎへ',
      make:'これで きめる', fail:'しゃしんを よみこめませんでした'
    }
  },
  set: {
    hNormal:'ふだんの せってい',
    hBackup:'きしゅへんこう(バックアップ)',
    fs:'もじの大きさ', fsSizes:['ふつう','大きい','とても大きい'],
    lang:'ことば / Language',
    theme:'いろ', themes:['みどり','みずいろ','しろ','くろ'],
    bgm:'BGM', bgms:['なし','みどりの音','あおの音'],
    sound:'タップ音', on:'ON', off:'OFF',
    bkHint:'あたらしい スマホに うつるときは、「かきだす」で ファイルを ほぞんして、あたらしい スマホで「よみこむ」を おしてください。サポートブックの 控え(JSON)も これと おなじです。',
    bkExport:'かきだす', bkImport:'よみこむ',
    exported:'かきだしました ✓', imported:'よみこみました ✓', importFail:'よみこめませんでした',
    importConfirm:'いまの ないようは、ファイルの ないように おきかわります。よみこみますか?',
    note:'書いたことは すべて この端末の中だけに ほぞんされます。どこにも 送られません。',
    privacy:'プライバシーポリシー',
    credit:'アプリ開発：介護と支援の相談どころ そよぎ'
  },
  /* はじめての つかいかた(app.js openGuide・初回に必ず出す・2026-09-30)。heads と bodies は同じ数。
     ボタン名は画面の文字と同じにする(変えたら ここも)。「いんさつ」は Web版だけのボタンなので書かない。
     隠れた入口は無い=GUIDE_AGAIN true(せっていから もう一度 見られる) */
  guide: {
    title:'つかいかた', step:'{n} / {m}', start:'はじめる', again:'もういちど 見る',
    heads:[
      '知って欲しい事ブック・そよぎ へ ようこそ',
      'まず「1まいめ」から',
      'せつを ひとつずつ 書く',
      '「わたす」は 相手に あわせて',
      'きょう いちばん 大事な 3つ',
      '「説明書です」の ページ',
      '書いた ことは この 端末の 中だけ',
      '見やすく する'
    ],
    bodies:[
      'このアプリは、本人と 家族で いっしょに 書く、本人の「説明書」です。要求では なく、説明書です。\n学校・あずけ先・びょういん・家族など、本人と かかわる 人に、知っていると たすかる ことを 相手に あわせて わたせます。\nわたすか どうか、何を 出すかは、いつでも 自分たちで きめられます。',
      '下の「かく」を おすと、11の せつが ならびます。\nまず いちばん 上の「1まいめ(いちばん さきに よんでほしいこと)」に、「ぜったいに しないでほしいこと」と「こうなったら れんらくを」を みじかく 書きます。ここは 相手に いちばん さきに、大きな 字で 出ます。\nぜんぶ 書かなくても だいじょうぶです。',
      '「かく」で せつを えらぶと、質問が 出ます。書くと 自動で ほぞんされ、あとから いつでも なおせます。\nほとんどの せつの 上に「書き方の 手がかり」が 出ます。「まえ」「つぎ」で となりの せつへ うつり、書きおわったら「せつの いちらんへ」を おします。\nもしもカードで かきだした ファイルが あれば、「かく」の 下の「もしもカードの ファイルを よみこむ」で 空いている らんに 入れられます。',
      '下の「わたす」で 相手(学校・あずけ先・びょういん・家族)を えらび、「出す せつ(タップで 切りかえ)」で 出す せつを えらびます。はじめは 1まいめ・つたえ方・パニックの ときの たいおう だけです。\n「みせる(大きな字)」で 画面を そのまま 見せられます。「1まいめを がぞうで ほぞん」も できます。\n出したものは 本人の 大切な 情報です。わたす 相手と 場所を きめてから 出してください。',
      '下の「きょうの3つ」は、引率する 人や きょう だけ 会う 人に 見せる、いちばん みじかい カードです。\n3行 だけ 書いて「大きく みせる」を おします。もどるときは「とじる」を おします。',
      'ホームに『「説明書です」の ページ』という ボタンが あります。おすと、相手に そのまま 見せる 文が 読めます。\n「この ページを 大きく みせる」で 見せられます。\n「わたす」で 見せるときも、いつも いちばん さきに みじかい 文が つきます。',
      '書いた ことは すべて この 端末の 中だけに ほぞんされ、どこにも 送られません。登録も いりません。\nスマホを かえるときは、「せってい」の「かきだす」で ファイルを のこし、あたらしい スマホで「よみこむ」を おします。\n見せた ものや がぞうに した ものは、あつかいに 気をつけて ください。',
      '「せってい」で「もじの大きさ」(ふつう・大きい・とても大きい)や「いろ」(みどり・みずいろ・しろ・くろ)を かえられます。\nことばは 右上の「Language」で えらべます。\nこの 案内は「せってい」の「つかいかた」の「もういちど 見る」で、いつでも もう一度 見られます。'
    ]
  },
  screen: {
    home: {
      title:'知って欲しい事ブック',
      intro:'本人と 家族で 書く、本人の「説明書」です。学校・預け先・病院・家族に、相手に あわせて 出せます。',
      write:'かく(11の せつに こたえる)',
      give:'わたす(相手に あわせて 出す)',
      three:'きょう いちばん 大事な 3つ',
      about:'「説明書です」の ページ',
      progress:'書いた らん: {n}',
      firstEmpty:'まず「1まいめ」から どうぞ。ぜんぶ 書かなくて だいじょうぶです。',
      firstHead:'1まいめ(いちばん さきに 読んでほしいこと)',
      privacyNote:'書いたことは この端末の中だけに あります。渡すときは 取り扱いに 気をつけてください。'
    },
    book: {
      title:'かく',
      intro:'せつを ひとつ えらんで、質問に こたえます。あとから いつでも なおせます。',
      filled:'{n}こ 書いた', filledNone:'まだ',
      moshimo:'もしもカードの ファイルを よみこむ',
      moshimoHint:'もしもカードで「かきだす」した JSON を よみこむと、名前・連絡先・アレルギーなどを 空いている らんに 入れます(二度 書かなくて すみます)。',
      moshimoDone:'{n} こ 入れました ✓',
      moshimoNone:'入れる らんは ありませんでした(もう 書いてあります)',
      moshimoFail:'もしもカードの ファイルでは ありません'
    },
    sec: {
      hintHead:'書き方の 手がかり',
      goBook:'せつの いちらんへ',
      autosave:'書くと 自動で ほぞんされます。'
    },
    secs: {
      first: {
        t:'1まいめ(いちばん さきに よんでほしいこと)', st:'1枚目 いちばん先に読んでほしいこと',
        h:'ここは 大きな字で いちばん さきに 出ます。みじかく、はっきり 書きます。',
        q: {
          never:{ l:'ぜったいに しないでほしいこと', s:'絶対にしないでほしいこと', p:'れい: 大勢の前で 叱らない。うしろから 急に さわらない。' },
          contact:{ l:'こうなったら れんらくを', s:'こうなったら連絡を', p:'れい: 30分 泣きやまないとき。口に 物を 入れたまま うごかないとき。れんらく先: 母 090-0000-0000' }
        }
      },
      profile: {
        t:'プロフィール', st:'プロフィール',
        h:'名前は 本名で なくても だいじょうぶです(渡す 相手に あわせて)。',
        q: {
          name:{ l:'なまえ(よび方)', s:'名前(呼び方)', p:'れい: そよ(「そよちゃん」と よばれると 安心します)' },
          age:{ l:'年れい・学年など', s:'年齢・学年など', p:'' },
          oneLine:{ l:'ひとことで いうと どんな人', s:'ひとことで言うと', p:'れい: 電車と 図鑑が 好きで、まじめに ルールを 守る人' },
          body:{ l:'からだのこと・くすり', s:'体のこと・薬', p:'れい: てんかんの くすりを 朝と 夜に のんでいます。くわしくは もしもカードに。' }
        }
      },
      likes: {
        t:'すき・にがて', st:'好きなこと・苦手なこと',
        h:'「どのくらい」は 数字や 記号で なく、ことばで 書きます(れい: とても 好き / 見るのも つらい)。',
        q: {
          like:{ l:'すきなこと・もの', s:'好きなこと・もの', p:'れい: 電車(とても 好き・見せると 落ち着く)、絵を かくこと' },
          dislike:{ l:'にがてなこと・もの', s:'苦手なこと・もの', p:'れい: 急な 予定の へんこう(見るのも つらい)、ざわざわした 音' },
          calm:{ l:'おちつく もの・こと', s:'落ち着くもの・こと', p:'れい: 図鑑を 見る、イヤーマフ、静かな 部屋で 5分' }
        }
      },
      daily: {
        t:'せいかつの どうさ', st:'生活の動作',
        h:'できる・できないを 記号で 分けずに、「一人で できる」「声かけが あれば できる」「いっしょに やれば できる」「手つだいが いる」のように ことばで 書きます。',
        q: {
          eat:{ l:'たべる', s:'食事', p:'れい: 一人で 食べられます。はしは 苦手で スプーンを つかいます。' },
          toilet:{ l:'トイレ', s:'トイレ', p:'れい: 声かけが あれば 行けます。知らない 場所では 場所を 先に 教えてください。' },
          dress:{ l:'きがえ・みじたく', s:'着替え・身支度', p:'れい: いっしょに やれば できます。ボタンは 手つだいが いります。' },
          move:{ l:'いどう・そとに でるとき', s:'移動・外出', p:'れい: 手を つないでいれば 安心です。信号は 一人では 待てません。' },
          other:{ l:'そのほか', s:'その他', p:'れい: くすりは 見ていて もらえれば 自分で のめます。' }
        }
      },
      comm: {
        t:'つたえ方', st:'伝え方',
        h:'「見えている行動 → 本当の理由 → してほしいこと」の じゅんに 書くと、相手に つたわります。',
        q: {
          from:{ l:'本人から つたえるとき', s:'本人からの伝え方', p:'れい: 話せますが、こまると 黙ります。紙に 書いて 見せると ことばが 出てきます。' },
          to:{ l:'本人に つたわる いい方', s:'本人に伝わる言い方', p:'れい: みじかく、ひとつずつ。「〜しない」より「〜する」で。' },
          sign:{ l:'見えている行動 → 本当の理由 → してほしいこと', s:'見えている行動と本当の理由、してほしいこと', p:'れい: 急に 教室を 出る → 音が つらくて 限界 → 「出てよい」と 先に 決めておいてほしい' },
          worked:{ l:'きいた かかわり', s:'うまくいった関わり', p:'れい: 予定の へんこうは 前の日に 紙で 見せる。それで 当日 落ち着いて いられました。' }
        }
      },
      panic: {
        t:'パニックの ときの たいおう', st:'パニックのときの対応',
        h:'ここも「見えている行動 → 本当の理由 → してほしいこと」で。「こまった行動」は、やっていい お手つだいに おきかえられないか 考えて 書きます。',
        q: {
          trigger:{ l:'きっかけに なりやすいこと', s:'きっかけになりやすいこと', p:'れい: 大きな音、予定の へんこう、負けること' },
          before:{ l:'まえぶれ(見えている行動)', s:'前ぶれ(見えている行動)', p:'れい: 耳を ふさぐ、同じ ことばを くり返す' },
          doThis:{ l:'してほしいこと', s:'してほしいこと', p:'れい: 声を かけず、静かな 場所へ。5分 見守る。おさまったら「よく もどれたね」と ひとこと。' },
          dont:{ l:'してほしくないこと', s:'してほしくないこと', p:'れい: うしろから さわる、大きな声で 名前を よぶ、その場で 理由を 聞く' },
          swap:{ l:'こまった行動を「やっていい お手つだい」に おきかえた案', s:'困った行動を「やっていいお手伝い」に置き換えた案', p:'れい: 物を 投げる → 重い 荷物を 運ぶ 係に。走り回る → プリントを 配る 係に。' },
          worked:{ l:'きいた かかわり', s:'うまくいった関わり', p:'れい: 「あと 3つで おわり」と 数えると 待てます。' }
        }
      },
      sense: {
        t:'かんかく', st:'感覚',
        h:'つよく 感じる・にぶく 感じる、どちらも 書きます。',
        q: {
          sound:{ l:'おと', s:'音', p:'れい: チャイム、ドライヤー、ざわめきが つらい。イヤーマフで だいぶ 楽。' },
          light:{ l:'ひかり・見えるもの', s:'光・見えるもの', p:'れい: 蛍光灯の ちらつきが 気になる。窓ぎわの 席が 楽。' },
          touch:{ l:'さわられること・ふく', s:'触れられること・衣類', p:'れい: 服の タグが 痛い。急に 肩を たたかれると おどろく。' },
          smell:{ l:'におい・あじ', s:'におい・味', p:'れい: 給食の においで 気分が 悪くなることが ある。' },
          other:{ l:'そのほか(いたみ・あつさ さむさ など)', s:'その他(痛み・暑さ寒さなど)', p:'れい: 痛みに 気づきにくい。けがを していても 言いません。' }
        }
      },
      food: {
        t:'たべられる 市販品', st:'食べられる市販品',
        h:'にている ものでも 食べられないことが あります。メーカー・商品名・味まで 書きます。アレルギーは もしもカードに 書いたものが 正です。',
        q: {
          ok:{ l:'たべられる 市販品', s:'食べられる市販品', p:'れい: 〇〇社の 塩おにぎり(のり なし)、△△の プレーンヨーグルト' },
          ng:{ l:'たべられない もの', s:'食べられないもの', p:'れい: まざった 料理(カレー・シチュー)、緑の 野菜' },
          allergy:{ l:'アレルギー(もしもカードと おなじに)', s:'アレルギー', p:'れい: そば、ペニシリン' },
          drink:{ l:'のみもの・すいぶん', s:'飲みもの・水分', p:'れい: 水しか のみません。ペットボトルの 形が ちがうと のまないことが あります。' }
        }
      },
      history: {
        t:'せいいくれき', st:'生育歴',
        h:'書きたくないことは 書かなくて だいじょうぶです。渡す 相手ごとに 出すかどうか えらべます。',
        q: {
          early:{ l:'小さいころの ようす', s:'小さいころの様子', p:'れい: ことばが 出たのは 3さいごろ。人見知りは 少なかった。' },
          schools:{ l:'これまでの 園・学校・通ったところ', s:'これまでの園・学校・通った所', p:'れい: 〇〇園 → △△小(通級あり) → 現在' },
          events:{ l:'大きな できごと', s:'大きな出来事', p:'れい: 小3で 転校。中1の 夏に 学校を 休んだ 時期が ある。' },
          now:{ l:'いまの ようす', s:'今の様子', p:'れい: 週3で 登校。放課後は 〇〇に 通っている。' }
        }
      },
      orgs: {
        t:'かんけい きかん', st:'関係機関',
        h:'つながっている ところと、たんとうの 人の 名前を 書きます。連絡先は 出す 相手を えらんで 出します。',
        q: {
          medical:{ l:'びょういん・クリニック', s:'病院・クリニック', p:'れい: 〇〇クリニック(月1回・たんとう ●●先生)' },
          welfare:{ l:'ふくしの まどぐち・じぎょうしょ', s:'福祉の窓口・事業所', p:'れい: 市の 相談窓口(たんとう ●●さん)、放課後の 事業所 △△' },
          school:{ l:'学校・園の たんとう', s:'学校・園の担当', p:'れい: 担任 ●●先生、コーディネーター ●●先生' },
          other:{ l:'そのほか', s:'その他', p:'れい: 祖父母(近くに 住んでいて 送迎を たのめる)' }
        }
      },
      free: {
        t:'じゆうきにゅう', st:'自由記入',
        h:'',
        q: {
          text:{ l:'つたえたいこと なんでも', s:'伝えたいこと', p:'れい: 本人が 自分で 書いた ひとことも ここに。' }
        }
      }
    },
    give: {
      title:'わたす',
      intro:'相手を えらんで、出す せつを えらびます。はじめは さいしょうげん(1まいめ・つたえ方・パニックの ときの たいおう)だけが 出ます。',
      presets:{ school:'学校', daycare:'あずけ先', medical:'びょういん', family:'家族' },
      secsHead:'出す せつ(タップで 切りかえ)',
      show:'みせる(大きな字)',
      print:'いんさつ',
      png:'1まいめを がぞうで ほぞん',
      caution:'出したものは 本人の 大切な 情報です。渡す 相手と 場所を きめてから 出してください。',
      nothing:'まだ 書いた らんが ありません。「かく」から どうぞ。',
      nothingInSecs:'えらんだ せつには まだ 書いた らんが ありません。出す せつを ふやすか、「かく」から どうぞ。',
      printHint:'いんさつは ブラウザの いんさつ画面が ひらきます。',
      pngDone:'がぞうを ほぞんしました ✓'
    },
    show: {
      title:'{name} のサポートブック',
      titleNoName:'サポートブック',
      lead:'これは要求ではなく、説明書です。本人と関わる方が、無理なく安心して一緒に過ごせるように、知っていると助かることをまとめました。',
      footer:'この本は個人の大切な情報です。読み終わったら、他の人の目に触れないように扱ってください。',
      by:'介護と支援の相談どころ「そよぎ」のアプリで作成(自治体の様式ではありません)'
    },
    three: {
      title:'きょう いちばん 大事な 3つ',
      intro:'引率する 人・きょう だけ 会う 人に 渡す ときの、いちばん みじかい カードです。3行 だけ 書きます。',
      line:'{n} つめ',
      p1:'れい: うしろから さわらないでください',
      p2:'れい: 耳を ふさいだら 静かな 場所へ',
      p3:'れい: おにぎりは のり なし',
      show:'大きく みせる',
      head:'今日いちばん大事な3つ',
      empty:'まだ 書いて いません。'
    },
    about: {
      title:'「説明書です」の ページ',
      intro:'この ページは 相手に そのまま 見せる 文です。「わたす」で 出すと、いつも いちばん さきに つきます。',
      body:[
        'これは要求ではなく、説明書です。',
        'この本は、本人と家族が、本人のことを知ってもらうために書きました。何かを強く求めるためのものではありません。本人と関わる方が、無理なく、安心して一緒に過ごせるように、知っていると助かることをまとめたものです。',
        'できないことの一覧でもありません。この人はこういう人で、こうすると通じます、という手がかりです。',
        '書いてあることは、家庭で見えていることです。場所が変われば違うこともあります。気づいたことがあれば、ぜひ教えてください。一緒に直していきます。',
        'この本は個人の大切な情報です。読み終わったら、他の人の目に触れないように扱ってください。'
      ],
      show:'この ページを 大きく みせる'
    }
  }
};

/* ============ en ============ */
var en = {
  app: { name:'Good-to-Know Book - SOYOGI', short:'Good-to-Know Book', tagline:'Not a list of demands. A manual for the people who meet us.' },
  nav: { home:'Home', book:'Write', give:'Hand over', three:'Today\'s 3', set:'Settings' },
  common: {
    ok:'OK', cancel:'Cancel', save:'Save', del:'Delete', back:'Back', close:'Close',
    yes:'Yes', no:'No', add:'Add', edit:'Edit', next:'Next', prev:'Previous', done:'Done',
    saved:'Saved ✓', saveFail:'Could not save', storageFull:'Storage is full, could not save',
    deleted:'Deleted', delConfirm:'Really delete this?', empty:'Nothing here yet',
    optional:'You do not have to fill in everything.', today:'Today',
    backConfirm:'What you wrote is not saved yet. Discard it and go back?',
    photo: {
      camera:'Take a photo', roll:'Choose from photos',
      cropTitle:'Crop the photo', cropHint:'Drag with a finger or use the arrows, then change the size with the slider.',
      zoom:'Size', panUp:'Up', panDown:'Down', panLeft:'Left', panRight:'Right',
      make:'Use this', fail:'Could not load the photo'
    }
  },
  set: {
    hNormal:'Everyday settings',
    hBackup:'Changing phones (backup)',
    fs:'Text size', fsSizes:['Normal','Large','Very large'],
    lang:'ことば / Language',
    theme:'Color', themes:['Green','Light blue','White','Black'],
    bgm:'Music', bgms:['None','Green tone','Blue tone'],
    sound:'Tap sound', on:'ON', off:'OFF',
    bkHint:'When you move to a new phone, tap "Export" to save a file, then tap "Import" on the new phone. The JSON copy of the support book is the same file.',
    bkExport:'Export', bkImport:'Import',
    exported:'Exported ✓', imported:'Imported ✓', importFail:'Could not import',
    importConfirm:'Your current entries will be replaced with the file\'s contents. Import it?',
    note:'Everything you write is stored only on this device. Nothing is sent anywhere.',
    privacy:'Privacy policy',
    credit:'Developed by SOYOGI, a care and support consultation service'
  },
  guide: {
    title:'How to use', step:'{n} / {m}', start:'Start', again:'Show again',
    heads:[
      'Welcome to Good-to-Know Book - SOYOGI',
      'Start with page one',
      'Write one section at a time',
      'Hand over: adjusted for each reader',
      'Today\'s 3 most important things',
      'The "this is a manual" page',
      'What you write stays on this device',
      'Make it easier to read'
    ],
    bodies:[
      'This app is a "manual" about a person, written together by the person and their family. It is not a list of demands.\nYou can hand it to people who spend time with the person, such as a school, a day service, a hospital or relatives, showing each of them what helps to know.\nWhether to hand it over, and what to show, is always up to you.',
      'Tap "Write" at the bottom to see the 11 sections.\nStart at the top with "Page one (read this first)" and briefly write "Please never do this" and "Contact us if this happens". This part is shown first, in large text.\nYou do not have to fill in everything.',
      'In "Write", choose a section to see its questions. What you type is saved automatically, and you can change it at any time.\nMost sections show "How to write it" hints at the top. Use "Previous" and "Next" to move between sections, and tap "Back to the sections" when you are done.\nIf you have a file exported from Moshimo Card, "Load a Moshimo Card file" at the bottom of "Write" fills in the empty fields.',
      'In "Hand over" at the bottom, choose the reader (School, Day service, Hospital or Family), then choose sections under "Sections to include (tap to toggle)". At first only the minimum is included: page one, communication and panic.\nTap "Show (large text)" to show the screen as it is. You can also use "Save page one as image".\nWhat you output is private information. Decide who gets it and where before you output it.',
      '"Today\'s 3" at the bottom is the shortest card, for someone who accompanies the person or meets them only today.\nWrite just three lines and tap "Show large". To go back, tap "Close".',
      'On Home, tap ‘The "this is a manual" page’ to read a text that you show to the reader as it is.\nTap "Show this page large" to show it.\nWhen you hand over, a short version of it always comes first.',
      'Everything you write is stored only on this device. Nothing is sent anywhere, and no sign-up is needed.\nWhen you change phones, tap "Export" in "Settings" to save a file, then tap "Import" on the new phone.\nTake care with anything you have shown or saved as an image.',
      'In "Settings" you can change "Text size" (Normal, Large, Very large) and "Color" (Green, Light blue, White, Black).\nChoose the language with "Language" at the top right.\nYou can see this guide again at any time with "Show again" next to "How to use" in "Settings".'
    ]
  },
  screen: {
    home: {
      title:'Good-to-Know Book',
      intro:'A "manual" about a person, written together by the person and their family. Hand it to school, day services, hospitals or relatives, adjusted for each.',
      write:'Write (answer 11 sections)',
      give:'Hand over (choose what to show)',
      three:'Today\'s 3 most important things',
      about:'The "this is a manual" page',
      progress:'Fields written: {n}',
      firstEmpty:'Start with "Page one". You do not have to fill in everything.',
      firstHead:'Page one (read this first)',
      privacyNote:'Everything stays on this device. Take care when you hand it over.'
    },
    book: {
      title:'Write',
      intro:'Pick a section and answer the questions. You can change anything later.',
      filled:'{n} written', filledNone:'Not yet',
      moshimo:'Load a Moshimo Card file',
      moshimoHint:'Load the JSON exported from Moshimo Card to fill empty fields (name, contact, allergy...) without typing twice.',
      moshimoDone:'Filled {n} fields ✓',
      moshimoNone:'Nothing to fill (already written)',
      moshimoFail:'This is not a Moshimo Card file'
    },
    sec: {
      hintHead:'How to write it',
      goBook:'Back to the sections',
      autosave:'Saved automatically as you type.'
    },
    secs: {
      first: {
        t:'Page one (read this first)', st:'Page one: please read this first',
        h:'This comes first, in large letters. Keep it short and clear.',
        q: {
          never:{ l:'Please never do this', s:'Please never do this', p:'e.g. Do not scold in front of a crowd. Do not touch suddenly from behind.' },
          contact:{ l:'Contact us if this happens', s:'Contact us if this happens', p:'e.g. Crying for more than 30 minutes. Not moving with food in the mouth. Contact: mother 090-0000-0000' }
        }
      },
      profile: {
        t:'Profile', st:'Profile',
        h:'The name does not have to be the legal name (choose what fits the reader).',
        q: {
          name:{ l:'Name (what to call them)', s:'Name (what to call them)', p:'e.g. Soyo (feels safe when called "Soyo-chan")' },
          age:{ l:'Age, grade etc.', s:'Age, grade etc.', p:'' },
          oneLine:{ l:'In one line, what kind of person', s:'In one line', p:'e.g. Loves trains and picture books, follows rules seriously' },
          body:{ l:'Body and medicine', s:'Body and medicine', p:'e.g. Takes epilepsy medicine morning and night. Details in Moshimo Card.' }
        }
      },
      likes: {
        t:'Likes and dislikes', st:'Likes and dislikes',
        h:'Write "how much" in words, not numbers or symbols (e.g. loves it / cannot even look at it).',
        q: {
          like:{ l:'Likes', s:'Likes', p:'e.g. Trains (loves them, calms down when shown), drawing' },
          dislike:{ l:'Dislikes', s:'Dislikes', p:'e.g. Sudden schedule changes (very hard), noisy places' },
          calm:{ l:'What calms them', s:'What calms them', p:'e.g. Looking at a picture book, ear muffs, 5 minutes in a quiet room' }
        }
      },
      daily: {
        t:'Daily activities', st:'Daily activities',
        h:'Instead of symbols, write in words: "can do alone", "can do with a prompt", "can do together", "needs help".',
        q: {
          eat:{ l:'Eating', s:'Meals', p:'e.g. Eats alone. Chopsticks are hard, uses a spoon.' },
          toilet:{ l:'Toilet', s:'Toilet', p:'e.g. Can go with a prompt. In a new place, show where it is first.' },
          dress:{ l:'Dressing', s:'Dressing', p:'e.g. Can do it together. Needs help with buttons.' },
          move:{ l:'Moving around, going out', s:'Moving around, going out', p:'e.g. Feels safe holding hands. Cannot wait at a signal alone.' },
          other:{ l:'Other', s:'Other', p:'e.g. Can take medicine alone if someone watches.' }
        }
      },
      comm: {
        t:'Communication', st:'Communication',
        h:'Writing in the order "what you see -> the real reason -> what we ask" gets the message across.',
        q: {
          from:{ l:'How they communicate', s:'How they communicate', p:'e.g. Can talk, but goes silent when stuck. Words come out when shown on paper.' },
          to:{ l:'What gets through to them', s:'What gets through to them', p:'e.g. Short, one thing at a time. "Do this" rather than "don\'t".' },
          sign:{ l:'What you see -> the real reason -> what we ask', s:'What you see, the real reason, and what we ask', p:'e.g. Suddenly leaves the classroom -> sound became unbearable -> please agree in advance that leaving is allowed' },
          worked:{ l:'What has worked', s:'What has worked', p:'e.g. Showing schedule changes on paper the day before. Stayed calm on the day.' }
        }
      },
      panic: {
        t:'When in a panic', st:'When in a panic',
        h:'Same order here: "what you see -> the real reason -> what we ask". For "troubling behavior", think whether it can be turned into a helpful job.',
        q: {
          trigger:{ l:'Likely triggers', s:'Likely triggers', p:'e.g. Loud noise, schedule changes, losing' },
          before:{ l:'Early signs (what you see)', s:'Early signs (what you see)', p:'e.g. Covers ears, repeats the same words' },
          doThis:{ l:'What we ask', s:'What we ask', p:'e.g. Without talking, move to a quiet place. Watch for 5 minutes. When over, one word: "good, you came back".' },
          dont:{ l:'What we ask you not to do', s:'What we ask you not to do', p:'e.g. Touch from behind, shout the name, ask why on the spot' },
          swap:{ l:'Troubling behavior turned into a helpful job', s:'Troubling behavior turned into a helpful job', p:'e.g. Throws things -> in charge of carrying heavy boxes. Runs around -> in charge of handing out papers.' },
          worked:{ l:'What has worked', s:'What has worked', p:'e.g. Counting "3 more and done" helps waiting.' }
        }
      },
      sense: {
        t:'Senses', st:'Senses',
        h:'Write both what feels too strong and what feels too weak.',
        q: {
          sound:{ l:'Sound', s:'Sound', p:'e.g. Bells, hair dryers, crowd noise are hard. Ear muffs help a lot.' },
          light:{ l:'Light, things seen', s:'Light, things seen', p:'e.g. Flickering lights bother them. A seat by the window is easier.' },
          touch:{ l:'Being touched, clothes', s:'Being touched, clothes', p:'e.g. Clothing tags hurt. Startles when tapped on the shoulder suddenly.' },
          smell:{ l:'Smell, taste', s:'Smell, taste', p:'e.g. Can feel sick from the smell of school lunch.' },
          other:{ l:'Other (pain, heat, cold...)', s:'Other (pain, heat, cold...)', p:'e.g. Hard to notice pain. Does not mention injuries.' }
        }
      },
      food: {
        t:'Store-bought food they can eat', st:'Store-bought food they can eat',
        h:'Similar products may not work. Write the maker, product name and flavor. For allergies, Moshimo Card is the source of truth.',
        q: {
          ok:{ l:'Store-bought food they can eat', s:'Store-bought food they can eat', p:'e.g. Brand X salt rice ball (no seaweed), Brand Y plain yogurt' },
          ng:{ l:'Food they cannot eat', s:'Food they cannot eat', p:'e.g. Mixed dishes (curry, stew), green vegetables' },
          allergy:{ l:'Allergies (same as Moshimo Card)', s:'Allergies', p:'e.g. Buckwheat, penicillin' },
          drink:{ l:'Drinks, fluids', s:'Drinks, fluids', p:'e.g. Drinks only water. May refuse if the bottle shape is different.' }
        }
      },
      history: {
        t:'Personal history', st:'Personal history',
        h:'You do not have to write what you do not want to. You can choose per reader whether to include it.',
        q: {
          early:{ l:'Early years', s:'Early years', p:'e.g. First words around age 3. Little shyness with strangers.' },
          schools:{ l:'Schools and places attended', s:'Schools and places attended', p:'e.g. X kindergarten -> Y elementary (with resource room) -> now' },
          events:{ l:'Major events', s:'Major events', p:'e.g. Changed schools in 3rd grade. Stayed home for a while in the summer of 7th grade.' },
          now:{ l:'Current situation', s:'Current situation', p:'e.g. Attends school 3 days a week. Goes to X after school.' }
        }
      },
      orgs: {
        t:'Related services', st:'Related services',
        h:'Write the places you are connected with and the names of the people in charge. Choose per reader whether to show contact details.',
        q: {
          medical:{ l:'Hospital, clinic', s:'Hospital, clinic', p:'e.g. X Clinic (monthly, Dr. Y)' },
          welfare:{ l:'Welfare office, service providers', s:'Welfare office, service providers', p:'e.g. City consultation desk (Ms. Y), after-school service Z' },
          school:{ l:'School contacts', s:'School contacts', p:'e.g. Homeroom teacher Y, coordinator Z' },
          other:{ l:'Other', s:'Other', p:'e.g. Grandparents (live nearby, can help with pick-up)' }
        }
      },
      free: {
        t:'Free notes', st:'Free notes',
        h:'',
        q: {
          text:{ l:'Anything else', s:'Anything else', p:'e.g. A line written by the person themselves can go here.' }
        }
      }
    },
    give: {
      title:'Hand over',
      intro:'Choose the reader, then choose which sections to include. The default is the minimum (page one, communication, panic).',
      presets:{ school:'School', daycare:'Day service', medical:'Hospital', family:'Family' },
      secsHead:'Sections to include (tap to toggle)',
      show:'Show (large text)',
      print:'Print',
      png:'Save page one as image',
      caution:'What you output is private information. Decide who gets it and where before you output it.',
      nothing:'Nothing written yet. Start from "Write".',
      nothingInSecs:'Nothing is written in the selected sections yet. Add sections, or start from "Write".',
      printHint:'Printing opens the browser print dialog.',
      pngDone:'Image saved ✓'
    },
    show: {
      title:'Support Book of {name}',
      titleNoName:'Support Book',
      lead:'This is not a list of demands. It is a manual, so that the people who meet this person can spend time together with ease.',
      footer:'This book contains private information. After reading, please keep it away from other eyes.',
      by:'Made with an app by SOYOGI, a care and support consultation service (not an official municipal form)'
    },
    three: {
      title:'Today\'s 3 most important things',
      intro:'The shortest card, for a chaperone or someone you meet only today. Write just 3 lines.',
      line:'No. {n}',
      p1:'e.g. Please do not touch from behind',
      p2:'e.g. If ears are covered, move to a quiet place',
      p3:'e.g. Rice balls without seaweed',
      show:'Show large',
      head:'Today\'s 3 most important things',
      empty:'Nothing written yet.'
    },
    about: {
      title:'The "this is a manual" page',
      intro:'This page is shown to the reader as it is. When you hand over, it always comes first.',
      body:[
        'This is not a list of demands. It is a manual.',
        'The person and their family wrote this book so that you can get to know them. It is not meant to push for anything. It gathers what is helpful to know, so that the people who meet this person can spend time together with ease.',
        'It is not a list of what they cannot do. It is a set of clues: this is who they are, and this is how things get through.',
        'What is written here is what we see at home. Things may differ in another place. If you notice something, please tell us. We will keep fixing it together.',
        'This book contains private information. After reading, please keep it away from other eyes.'
      ],
      show:'Show this page large'
    }
  }
};

var TBL = { ja: ja, en: en };
/* 翻訳の差し込み用: en の複製に訳を重ねる(足りないキーは en のまま) */
function mergeDeep(t, s){ for(var k in s){ if(s[k] && typeof s[k] === 'object' && !Array.isArray(s[k])){ if(!t[k] || typeof t[k] !== 'object') t[k] = {}; mergeDeep(t[k], s[k]); } else t[k] = s[k]; } return t; }
/* ---- de: 翻訳 ---- */
TBL.de = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Gut-zu-wissen-Buch - SOYOGI",
    "short": "Gut-zu-wissen-Buch",
    "tagline": "Keine Forderungen, sondern ein Leitfaden."
  },
  "nav": {
    "home": "Start",
    "book": "Schreiben",
    "give": "Teilen",
    "three": "3 für heute",
    "set": "Optionen"
  },
  "common": {
    "ok": "OK",
    "cancel": "Abbrechen",
    "save": "Speichern",
    "del": "Löschen",
    "back": "Zurück",
    "close": "Schließen",
    "yes": "Ja",
    "no": "Nein",
    "add": "Hinzufügen",
    "edit": "Ändern",
    "next": "Weiter",
    "prev": "Zurück",
    "done": "Fertig",
    "saved": "Gespeichert ✓",
    "saveFail": "Speichern nicht möglich",
    "storageFull": "Der Speicher ist voll. Speichern nicht möglich.",
    "deleted": "Gelöscht",
    "delConfirm": "Wirklich löschen?",
    "empty": "Noch nichts vorhanden",
    "optional": "Sie müssen nicht alles ausfüllen.",
    "today": "Heute",
    "backConfirm": "Was Sie geschrieben haben, ist noch nicht gespeichert. Verwerfen und zurückgehen?",
    "photo": {
      "camera": "Foto aufnehmen",
      "roll": "Aus Fotos wählen",
      "cropTitle": "Foto zuschneiden",
      "cropHint": "Mit dem Finger verschieben oder mit den Pfeilen ausrichten. Mit dem Schieberegler ändern Sie die Größe.",
      "zoom": "Größe",
      "panUp": "Nach oben",
      "panDown": "Nach unten",
      "panLeft": "Nach links",
      "panRight": "Nach rechts",
      "make": "So übernehmen",
      "fail": "Das Foto konnte nicht geladen werden"
    }
  },
  "set": {
    "hNormal": "Allgemeine Einstellungen",
    "hBackup": "Handywechsel (Sicherung)",
    "fs": "Schriftgröße",
    "fsSizes": [
      "Normal",
      "Groß",
      "Sehr groß"
    ],
    "lang": "ことば / Language",
    "theme": "Farbe",
    "themes": [
      "Grün",
      "Hellblau",
      "Weiß",
      "Schwarz"
    ],
    "bgm": "Musik",
    "bgms": [
      "Keine",
      "Grüner Klang",
      "Blauer Klang"
    ],
    "sound": "Tippton",
    "on": "EIN",
    "off": "AUS",
    "bkHint": "Wenn Sie auf ein neues Handy wechseln, speichern Sie mit „Exportieren“ eine Datei und tippen Sie auf dem neuen Handy auf „Importieren“. Die Kopie des Unterstützungsbuchs (JSON) ist dieselbe Datei.",
    "bkExport": "Exportieren",
    "bkImport": "Importieren",
    "exported": "Exportiert ✓",
    "imported": "Importiert ✓",
    "importFail": "Import nicht möglich",
    "importConfirm": "Ihre aktuellen Einträge werden durch den Inhalt der Datei ersetzt. Jetzt importieren?",
    "note": "Alles, was Sie schreiben, wird nur auf diesem Gerät gespeichert. Nichts wird irgendwohin gesendet.",
    "privacy": "Datenschutzerklärung",
    "credit": "App-Entwicklung: SOYOGI, Beratungsstelle für Pflege und Unterstützung"
  },
  "guide": {
    "title": "Anleitung",
    "step": "{n} / {m}",
    "start": "Loslegen",
    "again": "Noch einmal ansehen",
    "heads": [
      "Willkommen beim Gut-zu-wissen-Buch - SOYOGI",
      "Zuerst: Seite 1",
      "Einen Abschnitt nach dem anderen",
      "„Teilen“: passend für jeden Empfänger",
      "Die 3 wichtigsten Dinge für heute",
      "Die Seite „Das ist ein Leitfaden“",
      "Was Sie schreiben, bleibt auf diesem Gerät",
      "Besser lesbar machen"
    ],
    "bodies": [
      "Diese App ist ein „Leitfaden“ über eine Person, den die Person selbst und ihre Familie zusammen schreiben. Keine Forderungen, sondern ein Leitfaden.\nSie können ihn Menschen geben, die mit der Person zu tun haben, etwa Schule, Betreuung, Krankenhaus oder Familie, jeweils mit dem, was hilfreich zu wissen ist.\nOb Sie ihn weitergeben und was Sie zeigen, entscheiden immer Sie selbst.",
      "Tippen Sie unten auf „Schreiben“. Dann sehen Sie 11 Abschnitte.\nBeginnen Sie oben mit „Seite 1 (bitte zuerst lesen)“ und schreiben Sie kurz „Was bitte niemals getan werden soll“ und „In diesen Fällen bitte Kontakt aufnehmen“. Dieser Teil wird zuerst und in großer Schrift gezeigt.\nSie müssen nicht alles ausfüllen.",
      "Wählen Sie unter „Schreiben“ einen Abschnitt, dann erscheinen die Fragen. Was Sie schreiben, wird automatisch gespeichert und lässt sich jederzeit ändern.\nDie meisten Abschnitte zeigen oben „Hinweise zum Schreiben“. Mit „Zurück“ und „Weiter“ wechseln Sie zum Nachbarabschnitt, und wenn Sie fertig sind, tippen Sie auf „Zur Liste der Abschnitte“.\nWenn Sie eine aus der Moshimo-Karte exportierte Datei haben, füllt „Datei der Moshimo-Karte laden“ unten unter „Schreiben“ die leeren Felder aus.",
      "Wählen Sie unten unter „Teilen“ den Empfänger (Schule, Betreuung, Krankenhaus oder Familie) und bei „Abschnitte zum Mitgeben (zum Umschalten tippen)“ die Abschnitte. Zu Beginn ist nur das Nötigste dabei: Seite 1, Verständigung und Bei Panik.\nMit „Zeigen (große Schrift)“ zeigen Sie den Bildschirm direkt. Auch „Seite 1 als Bild speichern“ ist möglich.\nWas Sie weitergeben, sind wichtige Informationen über die Person. Legen Sie vorher fest, an wen und wo Sie es weitergeben.",
      "„3 für heute“ unten ist die kürzeste Karte, für Begleitpersonen oder Menschen, die die Person nur heute treffen.\nSchreiben Sie nur drei Zeilen und tippen Sie auf „Groß zeigen“. Zurück geht es mit „Schließen“.",
      "Unter „Start“ gibt es eine Schaltfläche mit der Aufschrift: Die Seite „Das ist ein Leitfaden“. Sie öffnet einen Text, den Sie dem Gegenüber direkt zeigen.\nMit „Diese Seite groß zeigen“ zeigen Sie ihn.\nWenn Sie etwas unter „Teilen“ zeigen, steht immer eine kurze Fassung davon am Anfang.",
      "Alles, was Sie schreiben, wird nur auf diesem Gerät gespeichert. Nichts wird irgendwohin gesendet, und Sie brauchen keine Anmeldung.\nWenn Sie das Telefon wechseln, tippen Sie unter „Optionen“ auf „Exportieren“, um eine Datei zu sichern, und auf dem neuen Telefon auf „Importieren“.\nGehen Sie mit dem, was Sie gezeigt oder als Bild gespeichert haben, sorgfältig um.",
      "Unter „Optionen“ ändern Sie die „Schriftgröße“ (Normal, Groß, Sehr groß) und die „Farbe“ (Grün, Hellblau, Weiß, Schwarz).\nDie Sprache wählen Sie oben rechts bei „Language“.\nDiese Anleitung sehen Sie jederzeit wieder: unter „Optionen“ bei „Anleitung“ mit „Noch einmal ansehen“."
    ]
  },
  "screen": {
    "home": {
      "title": "Gut-zu-wissen-Buch",
      "intro": "Ein „Leitfaden“ über die Person, geschrieben von der Person selbst und ihrer Familie. Sie können ihn passend für Schule, Betreuung, Krankenhaus oder Familie weitergeben.",
      "write": "Schreiben (11 Abschnitte beantworten)",
      "give": "Weitergeben (je nach Empfänger)",
      "three": "Die 3 wichtigsten Dinge für heute",
      "about": "Die Seite „Das ist ein Leitfaden“",
      "progress": "Ausgefüllte Felder: {n}",
      "firstEmpty": "Beginnen Sie gern mit „Seite 1“. Sie müssen nicht alles ausfüllen.",
      "firstHead": "Seite 1 (bitte zuerst lesen)",
      "privacyNote": "Was Sie schreiben, bleibt nur auf diesem Gerät. Bitte gehen Sie beim Weitergeben sorgsam damit um."
    },
    "book": {
      "title": "Schreiben",
      "intro": "Wählen Sie einen Abschnitt und beantworten Sie die Fragen. Sie können alles später jederzeit ändern.",
      "filled": "{n} ausgefüllt",
      "filledNone": "Noch nichts",
      "moshimo": "Datei der Moshimo-Karte laden",
      "moshimoHint": "Wenn Sie die mit der Moshimo-Karte exportierte JSON-Datei laden, werden Name, Kontakt, Allergien usw. in leere Felder eingetragen (so müssen Sie nichts doppelt schreiben).",
      "moshimoDone": "{n} Felder eingetragen ✓",
      "moshimoNone": "Keine Felder zum Eintragen (schon ausgefüllt)",
      "moshimoFail": "Das ist keine Datei der Moshimo-Karte"
    },
    "sec": {
      "hintHead": "Hinweise zum Schreiben",
      "goBook": "Zur Liste der Abschnitte",
      "autosave": "Beim Schreiben wird automatisch gespeichert."
    },
    "secs": {
      "first": {
        "t": "Seite 1 (bitte zuerst lesen)",
        "st": "Seite 1: Bitte zuerst lesen",
        "h": "Dies erscheint ganz vorne in großer Schrift. Schreiben Sie kurz und klar.",
        "q": {
          "never": {
            "l": "Was bitte niemals getan werden soll",
            "s": "Bitte niemals tun",
            "p": "z. B. Nicht vor vielen Menschen schimpfen. Nicht plötzlich von hinten berühren."
          },
          "contact": {
            "l": "In diesen Fällen bitte Kontakt aufnehmen",
            "s": "In diesen Fällen bitte Kontakt aufnehmen",
            "p": "z. B. Hört 30 Minuten lang nicht auf zu weinen. Hat etwas im Mund und bewegt sich nicht. Kontakt: Mutter 090-0000-0000"
          }
        }
      },
      "profile": {
        "t": "Profil",
        "st": "Profil",
        "h": "Es muss nicht der echte Name sein (je nachdem, wem Sie das Buch geben).",
        "q": {
          "name": {
            "l": "Name (Rufname)",
            "s": "Name (Rufname)",
            "p": "z. B. Soyo (die Anrede „Soyo-chan“ gibt Sicherheit)"
          },
          "age": {
            "l": "Alter, Klasse usw.",
            "s": "Alter, Klasse usw.",
            "p": ""
          },
          "oneLine": {
            "l": "In einem Satz: Was für ein Mensch?",
            "s": "In einem Satz",
            "p": "z. B. Mag Züge und Bildlexika, hält sich gewissenhaft an Regeln"
          },
          "body": {
            "l": "Körper und Medikamente",
            "s": "Körper und Medikamente",
            "p": "z. B. Nimmt morgens und abends ein Medikament gegen Epilepsie. Näheres auf der Moshimo-Karte."
          }
        }
      },
      "likes": {
        "t": "Vorlieben und Abneigungen",
        "st": "Vorlieben und Abneigungen",
        "h": "Beschreiben Sie „wie sehr“ mit Worten statt mit Zahlen oder Zeichen (z. B. mag es sehr / schon der Anblick ist schwer).",
        "q": {
          "like": {
            "l": "Was die Person mag",
            "s": "Was die Person mag",
            "p": "z. B. Züge (sehr gern, beruhigt sich, wenn man sie zeigt), Malen"
          },
          "dislike": {
            "l": "Was die Person nicht mag",
            "s": "Was die Person nicht mag",
            "p": "z. B. Plötzliche Planänderungen (schon der Anblick ist schwer), Stimmengewirr"
          },
          "calm": {
            "l": "Was beruhigt",
            "s": "Was beruhigt",
            "p": "z. B. Bildlexika anschauen, Gehörschutz, 5 Minuten in einem ruhigen Raum"
          }
        }
      },
      "daily": {
        "t": "Alltägliche Tätigkeiten",
        "st": "Alltägliche Tätigkeiten",
        "h": "Teilen Sie nicht mit Zeichen in „kann“ und „kann nicht“ ein. Beschreiben Sie es mit Worten, zum Beispiel: „kann es allein“, „kann es mit kurzem Hinweis“, „kann es gemeinsam“, „braucht Hilfe“.",
        "q": {
          "eat": {
            "l": "Essen",
            "s": "Mahlzeiten",
            "p": "z. B. Isst allein. Stäbchen sind schwierig, benutzt einen Löffel."
          },
          "toilet": {
            "l": "Toilette",
            "s": "Toilette",
            "p": "z. B. Geht mit kurzem Hinweis. An fremden Orten bitte zuerst zeigen, wo die Toilette ist."
          },
          "dress": {
            "l": "Anziehen, sich fertig machen",
            "s": "Anziehen, sich fertig machen",
            "p": "z. B. Klappt gemeinsam. Bei Knöpfen wird Hilfe gebraucht."
          },
          "move": {
            "l": "Sich fortbewegen, nach draußen gehen",
            "s": "Fortbewegung, Ausgehen",
            "p": "z. B. Fühlt sich an der Hand sicher. Kann an der Ampel nicht allein warten."
          },
          "other": {
            "l": "Sonstiges",
            "s": "Sonstiges",
            "p": "z. B. Kann Medikamente selbst nehmen, wenn jemand dabei zuschaut."
          }
        }
      },
      "comm": {
        "t": "Verständigung",
        "st": "Verständigung",
        "h": "Schreiben Sie in der Reihenfolge „sichtbares Verhalten → eigentlicher Grund → worum wir bitten“. So kommt es leichter an.",
        "q": {
          "from": {
            "l": "Wie sich die Person mitteilt",
            "s": "Wie sich die Person mitteilt",
            "p": "z. B. Kann sprechen, wird aber still, wenn etwas schwierig ist. Wenn man es auf Papier schreibt und zeigt, kommen Worte."
          },
          "to": {
            "l": "So versteht die Person es gut",
            "s": "So versteht die Person es gut",
            "p": "z. B. Kurz und eins nach dem anderen. Sagen, was zu tun ist, statt was nicht zu tun ist."
          },
          "sign": {
            "l": "Sichtbares Verhalten → eigentlicher Grund → worum wir bitten",
            "s": "Sichtbares Verhalten, eigentlicher Grund und worum wir bitten",
            "p": "z. B. Verlässt plötzlich das Klassenzimmer → die Geräusche sind zu viel geworden → bitte vorher vereinbaren, dass Hinausgehen erlaubt ist"
          },
          "worked": {
            "l": "Was geholfen hat",
            "s": "Was geholfen hat",
            "p": "z. B. Planänderungen am Vortag auf Papier zeigen. So konnte die Person am Tag selbst ruhig bleiben."
          }
        }
      },
      "panic": {
        "t": "Bei Panik",
        "st": "Was bei Panik zu tun ist",
        "h": "Auch hier: „sichtbares Verhalten → eigentlicher Grund → worum wir bitten“. Überlegen Sie bei „schwierigem Verhalten“, ob es sich durch eine erlaubte Hilfsaufgabe ersetzen lässt.",
        "q": {
          "trigger": {
            "l": "Was oft Auslöser ist",
            "s": "Was oft Auslöser ist",
            "p": "z. B. Laute Geräusche, Planänderungen, Verlieren"
          },
          "before": {
            "l": "Vorzeichen (sichtbares Verhalten)",
            "s": "Vorzeichen (sichtbares Verhalten)",
            "p": "z. B. Hält sich die Ohren zu, wiederholt dieselben Worte"
          },
          "doThis": {
            "l": "Worum wir bitten",
            "s": "Worum wir bitten",
            "p": "z. B. Nicht ansprechen, an einen ruhigen Ort gehen. 5 Minuten ruhig im Blick behalten. Wenn es vorbei ist, nur kurz: „Gut gemacht, wieder da.“"
          },
          "dont": {
            "l": "Was bitte nicht getan werden soll",
            "s": "Was bitte nicht getan werden soll",
            "p": "z. B. Von hinten berühren, laut beim Namen rufen, sofort nach dem Grund fragen"
          },
          "swap": {
            "l": "Schwieriges Verhalten als „erlaubte Hilfsaufgabe“ umgedacht",
            "s": "Schwieriges Verhalten als „erlaubte Hilfsaufgabe“ umgedacht",
            "p": "z. B. Wirft Dinge → übernimmt das Tragen schwerer Sachen. Läuft herum → übernimmt das Austeilen von Blättern."
          },
          "worked": {
            "l": "Was geholfen hat",
            "s": "Was geholfen hat",
            "p": "z. B. Mit Zählen wie „noch 3, dann ist Schluss“ kann die Person warten."
          }
        }
      },
      "sense": {
        "t": "Sinne",
        "st": "Sinneswahrnehmung",
        "h": "Schreiben Sie beides auf: was sehr stark und was nur schwach wahrgenommen wird.",
        "q": {
          "sound": {
            "l": "Geräusche",
            "s": "Geräusche",
            "p": "z. B. Gong, Föhn und Stimmengewirr sind schwer auszuhalten. Mit Gehörschutz ist es viel leichter."
          },
          "light": {
            "l": "Licht, Sichtbares",
            "s": "Licht, Sichtbares",
            "p": "z. B. Flackernde Neonröhren stören. Ein Platz am Fenster ist angenehmer."
          },
          "touch": {
            "l": "Berührung, Kleidung",
            "s": "Berührung, Kleidung",
            "p": "z. B. Etiketten in der Kleidung tun weh. Erschrickt, wenn jemand plötzlich auf die Schulter tippt."
          },
          "smell": {
            "l": "Geruch, Geschmack",
            "s": "Geruch, Geschmack",
            "p": "z. B. Vom Geruch des Schulessens wird der Person manchmal übel."
          },
          "other": {
            "l": "Sonstiges (Schmerz, Hitze, Kälte usw.)",
            "s": "Sonstiges (Schmerz, Hitze, Kälte usw.)",
            "p": "z. B. Bemerkt Schmerzen kaum. Sagt nichts, auch wenn eine Verletzung da ist."
          }
        }
      },
      "food": {
        "t": "Gekaufte Lebensmittel, die gegessen werden",
        "st": "Gekaufte Lebensmittel, die gegessen werden",
        "h": "Auch ähnliche Produkte werden manchmal nicht gegessen. Schreiben Sie Hersteller, Produktname und Geschmacksrichtung auf. Bei Allergien gilt, was auf der Moshimo-Karte steht.",
        "q": {
          "ok": {
            "l": "Gekaufte Lebensmittel, die gegessen werden",
            "s": "Gekaufte Lebensmittel, die gegessen werden",
            "p": "z. B. Reisbällchen mit Salz von Firma X (ohne Algenblatt), Naturjoghurt von Y"
          },
          "ng": {
            "l": "Was nicht gegessen wird",
            "s": "Was nicht gegessen wird",
            "p": "z. B. Gemischte Gerichte (Curry, Eintopf), grünes Gemüse"
          },
          "allergy": {
            "l": "Allergien (wie auf der Moshimo-Karte)",
            "s": "Allergien",
            "p": "z. B. Buchweizen, Penicillin"
          },
          "drink": {
            "l": "Getränke, Flüssigkeit",
            "s": "Getränke, Flüssigkeit",
            "p": "z. B. Trinkt nur Wasser. Trinkt manchmal nicht, wenn die Flasche eine andere Form hat."
          }
        }
      },
      "history": {
        "t": "Entwicklung und Lebensweg",
        "st": "Entwicklung und Lebensweg",
        "h": "Was Sie nicht aufschreiben möchten, müssen Sie nicht aufschreiben. Für jeden Empfänger können Sie wählen, ob dieser Teil mitgegeben wird.",
        "q": {
          "early": {
            "l": "Die ersten Lebensjahre",
            "s": "Die ersten Lebensjahre",
            "p": "z. B. Erste Worte mit etwa 3 Jahren. Wenig Scheu vor Fremden."
          },
          "schools": {
            "l": "Bisherige Einrichtungen, Schulen und besuchte Orte",
            "s": "Bisherige Einrichtungen, Schulen und besuchte Orte",
            "p": "z. B. Einrichtung X → Grundschule Y (mit Förderunterricht) → heute"
          },
          "events": {
            "l": "Wichtige Ereignisse",
            "s": "Wichtige Ereignisse",
            "p": "z. B. Schulwechsel in der 3. Klasse. Im Sommer der 7. Klasse eine Zeit lang nicht zur Schule gegangen."
          },
          "now": {
            "l": "Heutige Situation",
            "s": "Heutige Situation",
            "p": "z. B. Geht 3 Tage pro Woche zur Schule. Geht nach der Schule zu X."
          }
        }
      },
      "orgs": {
        "t": "Beteiligte Stellen",
        "st": "Beteiligte Stellen",
        "h": "Schreiben Sie auf, mit welchen Stellen Kontakt besteht, und die Namen der zuständigen Personen. Ob Kontaktdaten erscheinen, wählen Sie je nach Empfänger.",
        "q": {
          "medical": {
            "l": "Krankenhaus, Praxis",
            "s": "Krankenhaus, Praxis",
            "p": "z. B. Praxis X (einmal im Monat, zuständig: Dr. Y)"
          },
          "welfare": {
            "l": "Beratungsstellen und soziale Dienste",
            "s": "Beratungsstellen und soziale Dienste",
            "p": "z. B. Beratungsstelle der Stadt (zuständig: Y), Nachmittagsangebot Z"
          },
          "school": {
            "l": "Zuständige in Schule oder Einrichtung",
            "s": "Zuständige in Schule oder Einrichtung",
            "p": "z. B. Klassenlehrkraft Y, Förderkoordination Z"
          },
          "other": {
            "l": "Sonstiges",
            "s": "Sonstiges",
            "p": "z. B. Großeltern (wohnen in der Nähe, können beim Bringen und Abholen helfen)"
          }
        }
      },
      "free": {
        "t": "Freie Notizen",
        "st": "Freie Notizen",
        "h": "",
        "q": {
          "text": {
            "l": "Alles, was Sie noch mitteilen möchten",
            "s": "Was wir noch mitteilen möchten",
            "p": "z. B. Auch ein Satz, den die Person selbst geschrieben hat, passt hierher."
          }
        }
      }
    },
    "give": {
      "title": "Weitergeben",
      "intro": "Wählen Sie den Empfänger und dann die Abschnitte. Zu Beginn ist nur das Nötigste ausgewählt (Seite 1, Verständigung, Bei Panik).",
      "presets": {
        "school": "Schule",
        "daycare": "Betreuung",
        "medical": "Krankenhaus",
        "family": "Familie"
      },
      "secsHead": "Abschnitte zum Mitgeben (zum Umschalten tippen)",
      "show": "Zeigen (große Schrift)",
      "print": "Drucken",
      "png": "Seite 1 als Bild speichern",
      "caution": "Was Sie weitergeben, sind wichtige Informationen über die Person. Bitte legen Sie vorher fest, an wen und wo Sie es weitergeben.",
      "nothing": "Noch keine Felder ausgefüllt. Beginnen Sie gern bei „Schreiben“.",
      "nothingInSecs": "In den gewählten Abschnitten ist noch nichts ausgefüllt. Wählen Sie mehr Abschnitte oder beginnen Sie bei „Schreiben“.",
      "printHint": "Zum Drucken öffnet sich das Druckfenster des Browsers.",
      "pngDone": "Bild gespeichert ✓"
    },
    "show": {
      "title": "Unterstützungsbuch von {name}",
      "titleNoName": "Unterstützungsbuch",
      "lead": "Dies ist keine Forderung, sondern ein Leitfaden. Hier steht, was hilfreich zu wissen ist, damit alle, die mit der Person zu tun haben, ohne Druck und mit gutem Gefühl gemeinsam Zeit verbringen können.",
      "footer": "Dieses Buch enthält wichtige persönliche Informationen. Bitte bewahren Sie es nach dem Lesen so auf, dass andere es nicht sehen.",
      "by": "Erstellt mit einer App von SOYOGI, Beratungsstelle für Pflege und Unterstützung (kein Formular einer Behörde)"
    },
    "three": {
      "title": "Die 3 wichtigsten Dinge für heute",
      "intro": "Die kürzeste Karte, für Begleitpersonen oder Menschen, die Sie nur heute treffen. Sie schreiben nur 3 Zeilen.",
      "line": "Punkt {n}",
      "p1": "z. B. Bitte nicht von hinten berühren",
      "p2": "z. B. Hält sich die Ohren zu: an einen ruhigen Ort gehen",
      "p3": "z. B. Reisbällchen ohne Algenblatt",
      "show": "Groß zeigen",
      "head": "Die 3 wichtigsten Dinge für heute",
      "empty": "Noch nichts geschrieben."
    },
    "about": {
      "title": "Die Seite „Das ist ein Leitfaden“",
      "intro": "Diese Seite wird den Empfängern so gezeigt, wie sie ist. Beim „Weitergeben“ steht sie immer ganz vorne.",
      "body": [
        "Dies ist keine Forderung, sondern ein Leitfaden.",
        "Dieses Buch haben die Person und ihre Familie geschrieben, damit Sie die Person kennenlernen können. Es soll nichts mit Nachdruck einfordern. Es enthält, was hilfreich zu wissen ist, damit alle, die mit der Person zu tun haben, ohne Druck und mit gutem Gefühl gemeinsam Zeit verbringen können.",
        "Es ist auch keine Liste dessen, was die Person nicht kann. Es sind Hinweise: So ist dieser Mensch, und so gelingt die Verständigung.",
        "Was hier steht, sehen wir zu Hause. An einem anderen Ort kann manches anders sein. Wenn Ihnen etwas auffällt, sagen Sie es uns bitte gern. Wir passen es gemeinsam an.",
        "Dieses Buch enthält wichtige persönliche Informationen. Bitte bewahren Sie es nach dem Lesen so auf, dass andere es nicht sehen."
      ],
      "show": "Diese Seite groß zeigen"
    }
  }
});
/* ---- /de ---- */
/* ---- fr: 翻訳 ---- */
TBL.fr = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Livret bon à savoir - SOYOGI",
    "short": "Livret bon à savoir",
    "tagline": "Pas des exigences, un mode d'emploi."
  },
  "nav": {
    "home": "Accueil",
    "book": "Écrire",
    "give": "Remettre",
    "three": "Les 3 du jour",
    "set": "Réglages"
  },
  "common": {
    "ok": "OK",
    "cancel": "Annuler",
    "save": "Enregistrer",
    "del": "Supprimer",
    "back": "Retour",
    "close": "Fermer",
    "yes": "Oui",
    "no": "Non",
    "add": "Ajouter",
    "edit": "Modifier",
    "next": "Suivant",
    "prev": "Précédent",
    "done": "Terminé",
    "saved": "Enregistré ✓",
    "saveFail": "Impossible d'enregistrer",
    "storageFull": "Mémoire pleine, impossible d'enregistrer",
    "deleted": "Supprimé",
    "delConfirm": "Vraiment supprimer ?",
    "empty": "Rien pour l'instant",
    "optional": "Pas besoin de tout remplir.",
    "today": "Aujourd'hui",
    "backConfirm": "Ce que vous avez écrit n'est pas encore enregistré. L'abandonner et revenir en arrière ?",
    "photo": {
      "camera": "Prendre une photo",
      "roll": "Choisir une photo",
      "cropTitle": "Recadrer la photo",
      "cropHint": "Déplacez l'image avec le doigt ou avec les flèches, puis changez la taille avec le curseur.",
      "zoom": "Taille",
      "panUp": "Haut",
      "panDown": "Bas",
      "panLeft": "Gauche",
      "panRight": "Droite",
      "make": "Valider",
      "fail": "Impossible de charger la photo"
    }
  },
  "set": {
    "hNormal": "Réglages courants",
    "hBackup": "Changer de téléphone (sauvegarde)",
    "fs": "Taille du texte",
    "fsSizes": [
      "Normale",
      "Grande",
      "Très grande"
    ],
    "lang": "ことば / Language",
    "theme": "Couleur",
    "themes": [
      "Vert",
      "Bleu clair",
      "Blanc",
      "Noir"
    ],
    "bgm": "Musique",
    "bgms": [
      "Aucune",
      "Son vert",
      "Son bleu"
    ],
    "sound": "Son au toucher",
    "on": "ON",
    "off": "OFF",
    "bkHint": "Pour passer à un nouveau téléphone, appuyez sur \"Exporter\" pour enregistrer un fichier, puis sur \"Importer\" sur le nouveau téléphone. La copie (JSON) du carnet de soutien est ce même fichier.",
    "bkExport": "Exporter",
    "bkImport": "Importer",
    "exported": "Exporté ✓",
    "imported": "Importé ✓",
    "importFail": "Impossible d'importer",
    "importConfirm": "Ce que vous avez écrit sera remplacé par le contenu du fichier. Importer ?",
    "note": "Tout ce que vous écrivez reste uniquement sur cet appareil. Rien n'est envoyé nulle part.",
    "privacy": "Politique de confidentialité",
    "credit": "Application développée par SOYOGI, espace de conseil en aide et accompagnement"
  },
  "guide": {
    "title": "Guide d'utilisation",
    "step": "{n} / {m}",
    "start": "Commencer",
    "again": "Revoir",
    "heads": [
      "Bienvenue dans Livret bon à savoir - SOYOGI",
      "Commencez par la page 1",
      "Une section à la fois",
      "« Remettre » : adapté à chaque destinataire",
      "Les 3 choses les plus importantes aujourd'hui",
      "La page \"C'est un mode d'emploi\"",
      "Ce que vous écrivez reste sur cet appareil",
      "Rendre la lecture plus facile"
    ],
    "bodies": [
      "Cette application est le « mode d'emploi » d'une personne, écrit par elle et sa famille. Pas des exigences, un mode d'emploi.\nVous pouvez le remettre aux personnes qui l'accompagnent, comme l'école, le lieu d'accueil, l'hôpital ou la famille, avec ce qu'il est utile de savoir pour chacun.\nLe remettre ou non, et ce que vous montrez, c'est toujours vous qui décidez.",
      "Touchez « Écrire » en bas pour voir les 11 sections.\nCommencez en haut par « Page 1 (à lire en premier) » et écrivez brièvement « Merci de ne jamais faire cela » et « Si cela arrive, contactez-nous ». Cette partie s'affiche en premier, en grands caractères.\nPas besoin de tout remplir.",
      "Dans « Écrire », choisissez une section pour voir ses questions. Tout est enregistré automatiquement et reste modifiable à tout moment.\nLa plupart des sections affichent en haut des « Pistes pour écrire ». « Précédent » et « Suivant » mènent à la section voisine ; à la fin, touchez « Vers la liste des sections ».\nSi vous avez un fichier exporté depuis la carte Moshimo, « Charger un fichier de la carte Moshimo », en bas de « Écrire », remplit les champs vides.",
      "Dans « Remettre » en bas, choisissez le destinataire (École, Lieu d'accueil, Hôpital ou Famille), puis les sections sous « Sections à inclure (appuyez pour changer) ». Au début, seul le minimum est inclus : page 1, communication et panique.\n« Afficher (grands caractères) » montre l'écran tel quel. Vous pouvez aussi « Enregistrer la page 1 en image ».\nCe que vous affichez contient des informations importantes sur la personne. Décidez d'abord à qui et où vous le remettez.",
      "« Les 3 du jour » en bas est la carte la plus courte, pour une personne qui accompagne ou que l'on voit seulement aujourd'hui.\nÉcrivez seulement trois lignes et touchez « Afficher en grand ». Pour revenir, touchez « Fermer ».",
      "Dans Accueil, il y a un bouton intitulé : La page \"C'est un mode d'emploi\". Il ouvre un texte à montrer tel quel à votre interlocuteur.\nTouchez « Afficher cette page en grand » pour le montrer.\nQuand vous remettez le livret, une version courte de ce texte vient toujours en premier.",
      "Tout ce que vous écrivez reste uniquement sur cet appareil. Rien n'est envoyé ailleurs et aucune inscription n'est nécessaire.\nPour changer de téléphone, touchez « Exporter » dans « Réglages » pour enregistrer un fichier, puis « Importer » sur le nouveau téléphone.\nFaites attention à ce que vous avez montré ou enregistré en image.",
      "Dans « Réglages », vous pouvez changer la « Taille du texte » (Normale, Grande, Très grande) et la « Couleur » (Vert, Bleu clair, Blanc, Noir).\nChoisissez la langue avec « Language » en haut à droite.\nVous pouvez revoir ce guide à tout moment avec « Revoir », à la ligne « Guide d'utilisation » des « Réglages »."
    ]
  },
  "screen": {
    "home": {
      "title": "Livret bon à savoir",
      "intro": "Le \"mode d'emploi\" de la personne, écrit par elle et sa famille. Vous pouvez le remettre à l'école, au lieu d'accueil, à l'hôpital ou à la famille, en l'adaptant à chacun.",
      "write": "Écrire (répondre aux 11 sections)",
      "give": "Remettre (adapter au destinataire)",
      "three": "Les 3 choses les plus importantes aujourd'hui",
      "about": "La page \"C'est un mode d'emploi\"",
      "progress": "Champs remplis : {n}",
      "firstEmpty": "Commencez par la \"Page 1\". Pas besoin de tout remplir.",
      "firstHead": "Page 1 (à lire en premier)",
      "privacyNote": "Ce que vous écrivez reste uniquement sur cet appareil. Quand vous le remettez, prenez soin de ces informations."
    },
    "book": {
      "title": "Écrire",
      "intro": "Choisissez une section et répondez aux questions. Vous pourrez tout modifier plus tard.",
      "filled": "Remplis : {n}",
      "filledNone": "Pas encore",
      "moshimo": "Charger un fichier de la carte Moshimo",
      "moshimoHint": "En chargeant le fichier JSON exporté (\"Exporter\") depuis la carte Moshimo, le nom, les contacts, les allergies, etc. sont ajoutés dans les champs vides (pas besoin de les écrire deux fois).",
      "moshimoDone": "Champs remplis : {n} ✓",
      "moshimoNone": "Rien à ajouter (c'est déjà écrit)",
      "moshimoFail": "Ce n'est pas un fichier de la carte Moshimo"
    },
    "sec": {
      "hintHead": "Pistes pour écrire",
      "goBook": "Vers la liste des sections",
      "autosave": "Tout est enregistré automatiquement pendant que vous écrivez."
    },
    "secs": {
      "first": {
        "t": "Page 1 (à lire en premier)",
        "st": "Page 1 : à lire en tout premier",
        "h": "Cette page s'affiche en premier, en grands caractères. Écrivez court et clair.",
        "q": {
          "never": {
            "l": "Merci de ne jamais faire cela",
            "s": "Merci de ne jamais faire cela",
            "p": "Ex. : Ne pas gronder devant beaucoup de monde. Ne pas toucher brusquement par derrière."
          },
          "contact": {
            "l": "Si cela arrive, contactez-nous",
            "s": "Si cela arrive, contactez-nous",
            "p": "Ex. : Pleure plus de 30 minutes sans s'arrêter. Ne bouge plus avec quelque chose dans la bouche. Contact : mère 090-0000-0000"
          }
        }
      },
      "profile": {
        "t": "Profil",
        "st": "Profil",
        "h": "Le nom n'a pas besoin d'être le vrai nom (adaptez-le au destinataire).",
        "q": {
          "name": {
            "l": "Nom (comment l'appeler)",
            "s": "Nom (comment l'appeler)",
            "p": "Ex. : Soyo (se sent en confiance quand on l'appelle \"Soyo-chan\")"
          },
          "age": {
            "l": "Âge, classe, etc.",
            "s": "Âge, classe, etc.",
            "p": ""
          },
          "oneLine": {
            "l": "En une phrase, quel genre de personne",
            "s": "En une phrase",
            "p": "Ex. : Aime les trains et les encyclopédies illustrées, respecte les règles avec sérieux"
          },
          "body": {
            "l": "Santé et médicaments",
            "s": "Santé et médicaments",
            "p": "Ex. : Prend un médicament contre l'épilepsie matin et soir. Détails dans la carte Moshimo."
          }
        }
      },
      "likes": {
        "t": "Ce qui plaît, ce qui est difficile",
        "st": "Ce qui plaît et ce qui est difficile",
        "h": "Écrivez \"à quel point\" avec des mots, pas avec des chiffres ou des symboles (ex. : aime beaucoup / même le voir est pénible).",
        "q": {
          "like": {
            "l": "Ce qui plaît (activités, objets)",
            "s": "Ce qui plaît (activités, objets)",
            "p": "Ex. : Les trains (aime beaucoup, se calme quand on lui en montre), dessiner"
          },
          "dislike": {
            "l": "Ce qui est difficile (activités, objets)",
            "s": "Ce qui est difficile (activités, objets)",
            "p": "Ex. : Les changements de programme soudains (même les voir est pénible), le brouhaha"
          },
          "calm": {
            "l": "Ce qui apaise",
            "s": "Ce qui apaise",
            "p": "Ex. : Regarder une encyclopédie illustrée, un casque anti-bruit, 5 minutes dans une pièce calme"
          }
        }
      },
      "daily": {
        "t": "Gestes du quotidien",
        "st": "Gestes du quotidien",
        "h": "Plutôt que de trier avec des symboles, écrivez avec des mots : \"fait sans aide\", \"fait avec un petit rappel\", \"fait si on le fait ensemble\", \"a besoin d'aide\".",
        "q": {
          "eat": {
            "l": "Manger",
            "s": "Repas",
            "p": "Ex. : Mange sans aide. Les baguettes sont difficiles, utilise une cuillère."
          },
          "toilet": {
            "l": "Toilettes",
            "s": "Toilettes",
            "p": "Ex. : Y va avec un petit rappel. Dans un lieu inconnu, montrez d'abord où elles sont."
          },
          "dress": {
            "l": "S'habiller, se préparer",
            "s": "Habillage, préparation",
            "p": "Ex. : Y arrive si on le fait ensemble. A besoin d'aide pour les boutons."
          },
          "move": {
            "l": "Se déplacer, sortir",
            "s": "Déplacements, sorties",
            "p": "Ex. : Se sent en confiance en tenant la main. Ne peut pas attendre au feu sans quelqu'un."
          },
          "other": {
            "l": "Autre",
            "s": "Autre",
            "p": "Ex. : Peut prendre ses médicaments sans aide si quelqu'un regarde."
          }
        }
      },
      "comm": {
        "t": "Communication",
        "st": "Communication",
        "h": "Écrire dans l'ordre \"ce qu'on voit → la vraie raison → ce que nous souhaitons\" aide à se faire comprendre.",
        "q": {
          "from": {
            "l": "Quand la personne s'exprime",
            "s": "Comment la personne s'exprime",
            "p": "Ex. : Parle, mais se tait en cas de difficulté. Si on lui montre les choses écrites sur un papier, les mots viennent."
          },
          "to": {
            "l": "Façon de parler qui passe bien",
            "s": "Façon de parler qui passe bien",
            "p": "Ex. : Court, une chose à la fois. Dire ce qu'il faut faire plutôt que ce qu'il ne faut pas faire."
          },
          "sign": {
            "l": "Ce qu'on voit → la vraie raison → ce que nous souhaitons",
            "s": "Ce qu'on voit, la vraie raison, ce que nous souhaitons",
            "p": "Ex. : Quitte soudain la classe → le bruit est devenu insupportable → merci de convenir à l'avance qu'il est permis de sortir"
          },
          "worked": {
            "l": "Ce qui a bien marché",
            "s": "Ce qui a bien marché",
            "p": "Ex. : Montrer les changements de programme sur papier la veille. Ainsi, le jour même, la personne est restée calme."
          }
        }
      },
      "panic": {
        "t": "Que faire en cas de panique",
        "st": "Que faire en cas de panique",
        "h": "Ici aussi : \"ce qu'on voit → la vraie raison → ce que nous souhaitons\". Pour un \"comportement difficile\", voyez s'il peut être remplacé par une \"tâche utile\" permise, puis écrivez-le.",
        "q": {
          "trigger": {
            "l": "Ce qui déclenche souvent",
            "s": "Déclencheurs fréquents",
            "p": "Ex. : Bruits forts, changements de programme, le fait de perdre"
          },
          "before": {
            "l": "Signes avant-coureurs (ce qu'on voit)",
            "s": "Signes avant-coureurs (ce qu'on voit)",
            "p": "Ex. : Se bouche les oreilles, répète les mêmes mots"
          },
          "doThis": {
            "l": "Ce que nous souhaitons",
            "s": "Ce que nous souhaitons",
            "p": "Ex. : Sans parler, aller dans un endroit calme. Rester à côté et observer pendant 5 minutes. Quand c'est passé, juste une phrase : \"Bravo, te revoilà\"."
          },
          "dont": {
            "l": "Ce qu'il vaut mieux éviter",
            "s": "Ce qu'il vaut mieux éviter",
            "p": "Ex. : Toucher par derrière, appeler son prénom très fort, demander pourquoi sur le moment"
          },
          "swap": {
            "l": "Idée pour remplacer un comportement difficile par une \"tâche utile\" permise",
            "s": "Remplacer un comportement difficile par une \"tâche utile\" permise",
            "p": "Ex. : Lance des objets → lui confier le transport des charges lourdes. Court partout → lui confier la distribution des feuilles."
          },
          "worked": {
            "l": "Ce qui a bien marché",
            "s": "Ce qui a bien marché",
            "p": "Ex. : Compter \"encore 3 et c'est fini\" aide à attendre."
          }
        }
      },
      "sense": {
        "t": "Sensations",
        "st": "Sensations",
        "h": "Notez les deux : ce qui est ressenti très fortement et ce qui est peu ressenti.",
        "q": {
          "sound": {
            "l": "Sons",
            "s": "Sons",
            "p": "Ex. : La sonnerie, le sèche-cheveux, le brouhaha sont pénibles. Avec un casque anti-bruit, c'est beaucoup plus facile."
          },
          "light": {
            "l": "Lumière, ce qu'on voit",
            "s": "Lumière, ce qu'on voit",
            "p": "Ex. : Le scintillement des néons dérange. Une place près de la fenêtre est plus confortable."
          },
          "touch": {
            "l": "Contact physique, vêtements",
            "s": "Contact physique, vêtements",
            "p": "Ex. : Les étiquettes des vêtements font mal. Sursaute quand on lui tape soudain sur l'épaule."
          },
          "smell": {
            "l": "Odeurs, goûts",
            "s": "Odeurs, goûts",
            "p": "Ex. : L'odeur du repas de la cantine peut donner mal au cœur."
          },
          "other": {
            "l": "Autre (douleur, chaud, froid, etc.)",
            "s": "Autre (douleur, chaud, froid, etc.)",
            "p": "Ex. : Remarque difficilement la douleur. Ne dit rien, même en cas de blessure."
          }
        }
      },
      "food": {
        "t": "Aliments du commerce acceptés",
        "st": "Aliments du commerce acceptés",
        "h": "Même un produit semblable peut ne pas être accepté. Notez la marque, le nom du produit et le goût. Pour les allergies, c'est la carte Moshimo qui fait foi.",
        "q": {
          "ok": {
            "l": "Aliments du commerce acceptés",
            "s": "Aliments du commerce acceptés",
            "p": "Ex. : Onigiri au sel de la marque X (sans algue nori), yaourt nature de la marque Y"
          },
          "ng": {
            "l": "Aliments non acceptés",
            "s": "Aliments non acceptés",
            "p": "Ex. : Plats mélangés (curry, ragoût), légumes verts"
          },
          "allergy": {
            "l": "Allergies (comme sur la carte Moshimo)",
            "s": "Allergies",
            "p": "Ex. : Sarrasin, pénicilline"
          },
          "drink": {
            "l": "Boissons, hydratation",
            "s": "Boissons, hydratation",
            "p": "Ex. : Ne boit que de l'eau. Peut ne pas boire si la bouteille a une autre forme."
          }
        }
      },
      "history": {
        "t": "Parcours de vie",
        "st": "Parcours de vie",
        "h": "Pas besoin d'écrire ce que vous ne voulez pas écrire. Vous pouvez choisir, pour chaque destinataire, de l'inclure ou non.",
        "q": {
          "early": {
            "l": "Les premières années",
            "s": "Les premières années",
            "p": "Ex. : Premiers mots vers 3 ans. Peu de timidité avec les inconnus."
          },
          "schools": {
            "l": "Écoles et lieux fréquentés jusqu'ici",
            "s": "Écoles et lieux fréquentés jusqu'ici",
            "p": "Ex. : École maternelle X → école primaire Y (avec classe de soutien) → aujourd'hui"
          },
          "events": {
            "l": "Événements marquants",
            "s": "Événements marquants",
            "p": "Ex. : Changement d'école en 3e année de primaire. Une période d'absence scolaire l'été de la 1re année de collège."
          },
          "now": {
            "l": "Situation actuelle",
            "s": "Situation actuelle",
            "p": "Ex. : Va à l'école 3 jours par semaine. Après l'école, fréquente X."
          }
        }
      },
      "orgs": {
        "t": "Organismes en lien",
        "st": "Organismes en lien",
        "h": "Notez les lieux avec lesquels vous êtes en lien et le nom des personnes référentes. Les coordonnées ne s'affichent que pour les destinataires que vous choisissez.",
        "q": {
          "medical": {
            "l": "Hôpital, clinique",
            "s": "Hôpital, clinique",
            "p": "Ex. : Clinique X (1 fois par mois, Dr Y)"
          },
          "welfare": {
            "l": "Guichet social, services d'accompagnement",
            "s": "Guichet social, services d'accompagnement",
            "p": "Ex. : Guichet de consultation de la mairie (contact : Y), accueil après l'école Z"
          },
          "school": {
            "l": "Référents à l'école",
            "s": "Référents à l'école",
            "p": "Ex. : Professeur principal : Y, coordinateur : Z"
          },
          "other": {
            "l": "Autre",
            "s": "Autre",
            "p": "Ex. : Grands-parents (habitent tout près, peuvent aider pour les trajets)"
          }
        }
      },
      "free": {
        "t": "Notes libres",
        "st": "Notes libres",
        "h": "",
        "q": {
          "text": {
            "l": "Tout ce que vous voulez transmettre",
            "s": "À transmettre",
            "p": "Ex. : Une phrase écrite par la personne elle-même peut aussi aller ici."
          }
        }
      }
    },
    "give": {
      "title": "Remettre",
      "intro": "Choisissez le destinataire, puis les sections à inclure. Au départ, seul le minimum s'affiche (Page 1, Communication, Que faire en cas de panique).",
      "presets": {
        "school": "École",
        "daycare": "Lieu d'accueil",
        "medical": "Hôpital",
        "family": "Famille"
      },
      "secsHead": "Sections à inclure (appuyez pour changer)",
      "show": "Afficher (grands caractères)",
      "print": "Imprimer",
      "png": "Enregistrer la page 1 en image",
      "caution": "Ce que vous affichez ou imprimez contient des informations importantes sur la personne. Décidez d'abord à qui et où vous le remettez.",
      "nothing": "Aucun champ rempli pour l'instant. Commencez par \"Écrire\".",
      "nothingInSecs": "Les sections choisies n'ont encore aucun champ rempli. Ajoutez des sections ou commencez par \"Écrire\".",
      "printHint": "Pour imprimer, la fenêtre d'impression du navigateur s'ouvre.",
      "pngDone": "Image enregistrée ✓"
    },
    "show": {
      "title": "Carnet de soutien de {name}",
      "titleNoName": "Carnet de soutien",
      "lead": "Ce n'est pas une liste d'exigences, c'est un mode d'emploi. Nous y avons réuni ce qu'il est utile de savoir, pour que celles et ceux qui côtoient la personne puissent passer du temps avec elle sereinement, sans se forcer.",
      "footer": "Ce carnet contient des informations personnelles importantes. Après lecture, veillez à ce que d'autres personnes ne puissent pas le voir.",
      "by": "Créé avec une application de SOYOGI, espace de conseil en aide et accompagnement (ce n'est pas un formulaire officiel d'une collectivité)"
    },
    "three": {
      "title": "Les 3 choses les plus importantes aujourd'hui",
      "intro": "La carte la plus courte, à remettre à la personne qui accompagne une sortie ou à quelqu'un que l'on voit seulement aujourd'hui. Écrivez seulement 3 lignes.",
      "line": "Point {n}",
      "p1": "Ex. : Merci de ne pas toucher par derrière",
      "p2": "Ex. : Se bouche les oreilles → aller dans un endroit calme",
      "p3": "Ex. : Onigiri sans algue nori",
      "show": "Afficher en grand",
      "head": "Les 3 choses les plus importantes aujourd'hui",
      "empty": "Rien d'écrit pour l'instant."
    },
    "about": {
      "title": "La page \"C'est un mode d'emploi\"",
      "intro": "Cette page est un texte à montrer tel quel au destinataire. Quand vous utilisez \"Remettre\", elle est toujours placée en premier.",
      "body": [
        "Ce n'est pas une liste d'exigences, c'est un mode d'emploi.",
        "La personne et sa famille ont écrit ce carnet pour que vous puissiez mieux la connaître. Il ne sert pas à exiger quoi que ce soit. Il réunit ce qu'il est utile de savoir, pour que celles et ceux qui côtoient la personne puissent passer du temps avec elle sereinement, sans se forcer.",
        "Ce n'est pas non plus une liste de ce que la personne ne peut pas faire. Ce sont des repères : voici qui est cette personne, et voici comment bien communiquer avec elle.",
        "Ce qui est écrit ici, c'est ce que nous voyons à la maison. Dans un autre lieu, les choses peuvent être différentes. Si vous remarquez quelque chose, dites-le-nous. Nous l'ajusterons ensemble au fil du temps.",
        "Ce carnet contient des informations personnelles importantes. Après lecture, veillez à ce que d'autres personnes ne puissent pas le voir."
      ],
      "show": "Afficher cette page en grand"
    }
  }
});
/* ---- /fr ---- */
/* ---- es: 翻訳 ---- */
TBL.es = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Libro para conocerme - SOYOGI",
    "short": "Libro para conocerme",
    "tagline": "No es una lista de exigencias, sino un manual."
  },
  "nav": {
    "home": "Inicio",
    "book": "Escribir",
    "give": "Entregar",
    "three": "Las 3 de hoy",
    "set": "Ajustes"
  },
  "common": {
    "ok": "OK",
    "cancel": "Cancelar",
    "save": "Guardar",
    "del": "Borrar",
    "back": "Volver",
    "close": "Cerrar",
    "yes": "Sí",
    "no": "No",
    "add": "Añadir",
    "edit": "Editar",
    "next": "Siguiente",
    "prev": "Anterior",
    "done": "Listo",
    "saved": "Guardado ✓",
    "saveFail": "No se pudo guardar",
    "storageFull": "No queda espacio; no se pudo guardar",
    "deleted": "Borrado",
    "delConfirm": "¿Borrar de verdad?",
    "empty": "Todavía no hay nada",
    "optional": "No hace falta escribirlo todo.",
    "today": "Hoy",
    "backConfirm": "Lo escrito aún no se ha guardado. ¿Descartarlo y volver?",
    "photo": {
      "camera": "Usar la cámara",
      "roll": "Elegir de las fotos",
      "cropTitle": "Recortar la foto",
      "cropHint": "Mover con el dedo o con las flechas, y cambiar el tamaño con la barra deslizante.",
      "zoom": "Tamaño",
      "panUp": "Arriba",
      "panDown": "Abajo",
      "panLeft": "Izquierda",
      "panRight": "Derecha",
      "make": "Usar esta",
      "fail": "No se pudo cargar la foto"
    }
  },
  "set": {
    "hNormal": "Ajustes habituales",
    "hBackup": "Cambio de teléfono (copia de seguridad)",
    "fs": "Tamaño de letra",
    "fsSizes": [
      "Normal",
      "Grande",
      "Muy grande"
    ],
    "lang": "ことば / Language",
    "theme": "Color",
    "themes": [
      "Verde",
      "Azul claro",
      "Blanco",
      "Negro"
    ],
    "bgm": "Música",
    "bgms": [
      "Ninguna",
      "Sonido verde",
      "Sonido azul"
    ],
    "sound": "Sonido al tocar",
    "on": "ON",
    "off": "OFF",
    "bkHint": "Para pasar a un teléfono nuevo, tocar «Exportar» para guardar un archivo y, en el teléfono nuevo, tocar «Importar». La copia del libro de apoyo (JSON) es este mismo archivo.",
    "bkExport": "Exportar",
    "bkImport": "Importar",
    "exported": "Exportado ✓",
    "imported": "Importado ✓",
    "importFail": "No se pudo importar",
    "importConfirm": "Lo que está escrito ahora se sustituirá por el contenido del archivo. ¿Importar?",
    "note": "Todo lo escrito se guarda solo en este dispositivo. No se envía a ninguna parte.",
    "privacy": "Política de privacidad",
    "credit": "App desarrollada por SOYOGI, servicio de consulta sobre cuidados y apoyo"
  },
  "guide": {
    "title": "Cómo se usa",
    "step": "{n} / {m}",
    "start": "Empezar",
    "again": "Ver de nuevo",
    "heads": [
      "Esto es Libro para conocerme - SOYOGI",
      "Empezar por la primera página",
      "Una sección cada vez",
      "«Entregar»: adaptado a quien lo recibe",
      "Las 3 cosas más importantes de hoy",
      "La página «Esto es un manual»",
      "Lo que se escribe queda en este dispositivo",
      "Más fácil de leer"
    ],
    "bodies": [
      "Esta aplicación es un «manual» sobre la persona, escrito por ella misma y su familia. No es una lista de exigencias, sino un manual.\nSe puede entregar a quienes pasan tiempo con la persona, como la escuela, el centro de día, el hospital o la familia, con lo que conviene saber en cada caso.\nEntregarlo o no, y qué mostrar, siempre lo decide la propia persona con su familia.",
      "Al tocar «Escribir» abajo, aparecen 11 secciones.\nEmpezar arriba por «Primera página (para leer antes que nada)» y escribir brevemente «Por favor, no hacer nunca» y «Si pasa esto, avisar». Esta parte se muestra la primera, en letra grande.\nNo hace falta rellenarlo todo.",
      "En «Escribir», al elegir una sección aparecen sus preguntas. Lo escrito se guarda automáticamente y se puede cambiar en cualquier momento.\nLa mayoría de las secciones muestran arriba «Pistas para escribir». Con «Anterior» y «Siguiente» se pasa a la sección de al lado; al terminar, tocar «A la lista de secciones».\nSi hay un archivo exportado desde MOSHIMO Card, «Cargar un archivo de MOSHIMO Card», abajo en «Escribir», rellena los campos vacíos.",
      "En «Entregar», abajo, elegir a quién va (Escuela, Centro de día, Hospital o Familia) y las secciones en «Secciones que incluir (tocar para cambiar)». Al principio solo va lo mínimo: primera página, comunicación y crisis.\n«Mostrar (letra grande)» muestra la pantalla tal cual. También se puede «Guardar la primera página como imagen».\nLo que se muestra es información importante de la persona. Conviene decidir antes a quién se entrega y en qué lugar.",
      "«Las 3 de hoy», abajo, es la tarjeta más corta, para quien acompaña a la persona o la ve solo hoy.\nEscribir solo tres líneas y tocar «Mostrar en grande». Para volver, tocar «Cerrar».",
      "En Inicio hay un botón con el texto: La página «Esto es un manual». Abre un texto para mostrar tal cual a la otra persona.\nCon «Mostrar esta página en grande» se muestra.\nAl entregar, siempre va primero una versión corta de ese texto.",
      "Todo lo que se escribe se guarda solo en este dispositivo. No se envía a ningún lugar y no hace falta registrarse.\nAl cambiar de teléfono, tocar «Exportar» en «Ajustes» para guardar un archivo y luego «Importar» en el teléfono nuevo.\nConviene cuidar lo que se ha mostrado o guardado como imagen.",
      "En «Ajustes» se puede cambiar el «Tamaño de letra» (Normal, Grande, Muy grande) y el «Color» (Verde, Azul claro, Blanco, Negro).\nEl idioma se elige en «Language», arriba a la derecha.\nEsta guía se puede ver de nuevo en cualquier momento con «Ver de nuevo», en la fila «Cómo se usa» de «Ajustes»."
    ]
  },
  "screen": {
    "home": {
      "title": "Libro para conocerme",
      "intro": "Un «manual» sobre la persona, escrito por ella misma y su familia. Se puede entregar a la escuela, al centro de día, al hospital o a la familia, adaptado a cada uno.",
      "write": "Escribir (responder 11 secciones)",
      "give": "Entregar (adaptado a quien lo recibe)",
      "three": "Las 3 cosas más importantes de hoy",
      "about": "La página «Esto es un manual»",
      "progress": "Campos escritos: {n}",
      "firstEmpty": "Para empezar, la «Primera página». No hace falta escribirlo todo.",
      "firstHead": "Primera página (para leer antes que nada)",
      "privacyNote": "Lo escrito está solo en este dispositivo. Al entregarlo, conviene tratarlo con cuidado."
    },
    "book": {
      "title": "Escribir",
      "intro": "Elegir una sección y responder a las preguntas. Se puede corregir en cualquier momento.",
      "filled": "Escritos: {n}",
      "filledNone": "Aún no",
      "moshimo": "Cargar un archivo de MOSHIMO Card",
      "moshimoHint": "Al cargar el JSON exportado con «Exportar» en MOSHIMO Card, se completan los campos vacíos (nombre, contacto, alergias, etc.). Así no hay que escribir dos veces.",
      "moshimoDone": "{n} campos completados ✓",
      "moshimoNone": "No había campos que completar (ya estaban escritos)",
      "moshimoFail": "No es un archivo de MOSHIMO Card"
    },
    "sec": {
      "hintHead": "Pistas para escribir",
      "goBook": "A la lista de secciones",
      "autosave": "Se guarda automáticamente al escribir."
    },
    "secs": {
      "first": {
        "t": "Primera página (para leer antes que nada)",
        "st": "Primera página: para leer antes que nada",
        "h": "Esta parte aparece la primera y con letra grande. Escribir de forma breve y clara.",
        "q": {
          "never": {
            "l": "Por favor, no hacer nunca",
            "s": "Por favor, no hacer nunca",
            "p": "Ej.: No regañar delante de mucha gente. No tocar de repente por detrás."
          },
          "contact": {
            "l": "Si pasa esto, avisar",
            "s": "Si pasa esto, avisar",
            "p": "Ej.: Si llora más de 30 minutos sin parar. Si no se mueve y tiene algo en la boca. Contacto: madre 090-0000-0000"
          }
        }
      },
      "profile": {
        "t": "Perfil",
        "st": "Perfil",
        "h": "No hace falta poner el nombre real (según a quién se entregue).",
        "q": {
          "name": {
            "l": "Nombre (cómo se le llama)",
            "s": "Nombre (cómo se le llama)",
            "p": "Ej.: Soyo (le da tranquilidad que le llamen «Soyo-chan»)"
          },
          "age": {
            "l": "Edad, año escolar, etc.",
            "s": "Edad, año escolar, etc.",
            "p": ""
          },
          "oneLine": {
            "l": "Cómo es, en una frase",
            "s": "En una frase",
            "p": "Ej.: Le gustan los trenes y las enciclopedias ilustradas, y cumple las normas con mucha seriedad"
          },
          "body": {
            "l": "Salud y medicamentos",
            "s": "Salud y medicamentos",
            "p": "Ej.: Toma medicación para la epilepsia por la mañana y por la noche. Más detalles en MOSHIMO Card."
          }
        }
      },
      "likes": {
        "t": "Le gusta / le incomoda",
        "st": "Lo que le gusta y lo que le incomoda",
        "h": "Escribir el «cuánto» con palabras, no con números ni símbolos (ej.: le encanta / le cuesta incluso verlo).",
        "q": {
          "like": {
            "l": "Cosas que le gustan",
            "s": "Cosas que le gustan",
            "p": "Ej.: Los trenes (le encantan; se calma si se le muestran), dibujar"
          },
          "dislike": {
            "l": "Cosas que le incomodan",
            "s": "Cosas que le incomodan",
            "p": "Ej.: Los cambios de planes repentinos (le cuesta incluso verlos), el bullicio"
          },
          "calm": {
            "l": "Lo que ayuda a calmarse",
            "s": "Lo que ayuda a calmarse",
            "p": "Ej.: Mirar enciclopedias ilustradas, protectores auditivos, 5 minutos en una habitación tranquila"
          }
        }
      },
      "daily": {
        "t": "Vida diaria",
        "st": "Actividades de la vida diaria",
        "h": "En lugar de marcar con símbolos si puede o no, escribirlo con palabras: «lo hace sin ayuda», «lo hace si se le recuerda», «lo hace junto con alguien», «necesita ayuda».",
        "q": {
          "eat": {
            "l": "Comer",
            "s": "Comidas",
            "p": "Ej.: Come sin ayuda. Le cuestan los palillos y usa cuchara."
          },
          "toilet": {
            "l": "Baño",
            "s": "Baño",
            "p": "Ej.: Va si se le recuerda. En un lugar nuevo, conviene indicarle primero dónde está."
          },
          "dress": {
            "l": "Vestirse y arreglarse",
            "s": "Vestirse y arreglarse",
            "p": "Ej.: Lo hace junto con alguien. Necesita ayuda con los botones."
          },
          "move": {
            "l": "Desplazarse y salir",
            "s": "Desplazamientos y salidas",
            "p": "Ej.: Ir de la mano le da seguridad. No puede esperar en un semáforo sin compañía."
          },
          "other": {
            "l": "Otros",
            "s": "Otros",
            "p": "Ej.: Toma la medicación por su cuenta si alguien está mirando."
          }
        }
      },
      "comm": {
        "t": "Comunicación",
        "st": "Comunicación",
        "h": "Escribir en este orden: «lo que se ve → el motivo real → lo que pedimos». Así el mensaje llega mejor.",
        "q": {
          "from": {
            "l": "Cómo se expresa la persona",
            "s": "Cómo se expresa la persona",
            "p": "Ej.: Puede hablar, pero deja de hablar cuando no sabe qué hacer. Si se le muestra algo escrito en papel, le salen las palabras."
          },
          "to": {
            "l": "Formas de hablarle que entiende bien",
            "s": "Formas de hablarle que entiende bien",
            "p": "Ej.: Frases cortas, una cosa cada vez. Mejor decir qué hacer que qué no hacer."
          },
          "sign": {
            "l": "Lo que se ve → el motivo real → lo que pedimos",
            "s": "Lo que se ve, el motivo real y lo que pedimos",
            "p": "Ej.: Sale de clase de repente → el ruido le resulta insoportable → pedimos acordar de antemano que puede salir"
          },
          "worked": {
            "l": "Lo que ha funcionado",
            "s": "Lo que ha funcionado",
            "p": "Ej.: Mostrar en papel los cambios de planes el día anterior. Así, ese día pudo mantener la calma."
          }
        }
      },
      "panic": {
        "t": "Cómo actuar en una crisis",
        "st": "Cómo actuar en una crisis",
        "h": "Aquí también: «lo que se ve → el motivo real → lo que pedimos». Para las «conductas difíciles», pensar si se pueden cambiar por una tarea de ayuda que sí esté permitida, y escribirlo.",
        "q": {
          "trigger": {
            "l": "Lo que suele provocarla",
            "s": "Lo que suele provocarla",
            "p": "Ej.: Ruidos fuertes, cambios de planes, perder"
          },
          "before": {
            "l": "Señales previas (lo que se ve)",
            "s": "Señales previas (lo que se ve)",
            "p": "Ej.: Se tapa los oídos, repite las mismas palabras"
          },
          "doThis": {
            "l": "Lo que pedimos hacer",
            "s": "Lo que pedimos hacer",
            "p": "Ej.: Sin hablarle, ir a un lugar tranquilo. Observar durante 5 minutos. Cuando pase, decir solo: «Muy bien, ya de vuelta»."
          },
          "dont": {
            "l": "Lo que pedimos no hacer",
            "s": "Lo que pedimos no hacer",
            "p": "Ej.: Tocar por detrás, decir su nombre en voz alta, preguntar el motivo en ese momento"
          },
          "swap": {
            "l": "Idea para cambiar una conducta difícil por una «tarea de ayuda permitida»",
            "s": "Conducta difícil cambiada por una «tarea de ayuda permitida»",
            "p": "Ej.: Lanza objetos → encargarse de llevar cosas pesadas. Corre de un lado a otro → encargarse de repartir las hojas."
          },
          "worked": {
            "l": "Lo que ha funcionado",
            "s": "Lo que ha funcionado",
            "p": "Ej.: Contar «tres más y terminamos» le ayuda a esperar."
          }
        }
      },
      "sense": {
        "t": "Sentidos",
        "st": "Sentidos",
        "h": "Escribir tanto lo que se siente con demasiada intensidad como lo que apenas se nota.",
        "q": {
          "sound": {
            "l": "Sonidos",
            "s": "Sonidos",
            "p": "Ej.: Le resultan muy molestos el timbre, el secador de pelo y el murmullo de la gente. Con protectores auditivos se siente mucho mejor."
          },
          "light": {
            "l": "Luz y lo que se ve",
            "s": "Luz y lo que se ve",
            "p": "Ej.: Le molesta el parpadeo de los fluorescentes. Un asiento junto a la ventana le resulta más cómodo."
          },
          "touch": {
            "l": "Contacto físico y ropa",
            "s": "Contacto físico y ropa",
            "p": "Ej.: Las etiquetas de la ropa le hacen daño. Se sobresalta si le tocan el hombro de repente."
          },
          "smell": {
            "l": "Olores y sabores",
            "s": "Olores y sabores",
            "p": "Ej.: A veces el olor de la comida del comedor escolar le hace sentirse mal."
          },
          "other": {
            "l": "Otros (dolor, calor, frío, etc.)",
            "s": "Otros (dolor, calor, frío, etc.)",
            "p": "Ej.: Le cuesta darse cuenta del dolor. Aunque se haga daño, no lo dice."
          }
        }
      },
      "food": {
        "t": "Productos de tienda que puede comer",
        "st": "Productos de tienda que puede comer",
        "h": "Aunque un producto sea parecido, puede que no lo coma. Escribir la marca, el nombre del producto y hasta el sabor. Para las alergias, lo que vale es lo escrito en MOSHIMO Card.",
        "q": {
          "ok": {
            "l": "Productos de tienda que puede comer",
            "s": "Productos de tienda que puede comer",
            "p": "Ej.: Bola de arroz con sal de la marca X (sin alga), yogur natural de la marca Y"
          },
          "ng": {
            "l": "Lo que no puede comer",
            "s": "Lo que no puede comer",
            "p": "Ej.: Platos con todo mezclado (curry, guisos), verduras verdes"
          },
          "allergy": {
            "l": "Alergias (igual que en MOSHIMO Card)",
            "s": "Alergias",
            "p": "Ej.: Trigo sarraceno, penicilina"
          },
          "drink": {
            "l": "Bebidas y líquidos",
            "s": "Bebidas y líquidos",
            "p": "Ej.: Solo bebe agua. Si la botella tiene otra forma, puede que no la beba."
          }
        }
      },
      "history": {
        "t": "Historia personal",
        "st": "Historia personal",
        "h": "No hace falta escribir lo que no se quiera contar. Se puede elegir, para cada persona que lo recibe, si se incluye o no.",
        "q": {
          "early": {
            "l": "Primeros años",
            "s": "Primeros años",
            "p": "Ej.: Empezó a hablar hacia los 3 años. Apenas mostraba timidez con desconocidos."
          },
          "schools": {
            "l": "Centros, escuelas y otros lugares a los que ha ido",
            "s": "Centros, escuelas y otros lugares a los que ha ido",
            "p": "Ej.: Preescolar X → Primaria Y (con aula de apoyo) → ahora"
          },
          "events": {
            "l": "Acontecimientos importantes",
            "s": "Acontecimientos importantes",
            "p": "Ej.: Cambió de escuela en 3.º de primaria. En el verano de 1.º de secundaria dejó de ir a clase durante un tiempo."
          },
          "now": {
            "l": "Situación actual",
            "s": "Situación actual",
            "p": "Ej.: Va a clase 3 días por semana. Después de clase va a X."
          }
        }
      },
      "orgs": {
        "t": "Servicios relacionados",
        "st": "Servicios relacionados",
        "h": "Escribir los lugares con los que hay relación y el nombre de la persona responsable. Los datos de contacto se muestran solo a quien se elija.",
        "q": {
          "medical": {
            "l": "Hospital o clínica",
            "s": "Hospital o clínica",
            "p": "Ej.: Clínica X (1 vez al mes, responsable: Y)"
          },
          "welfare": {
            "l": "Servicios sociales y centros de atención",
            "s": "Servicios sociales y centros de atención",
            "p": "Ej.: Oficina de consultas del municipio (responsable: Y), centro de apoyo después de clase Z"
          },
          "school": {
            "l": "Responsables en el centro educativo",
            "s": "Responsables en el centro educativo",
            "p": "Ej.: Docente responsable del grupo: Y. Coordinación de apoyo: Z."
          },
          "other": {
            "l": "Otros",
            "s": "Otros",
            "p": "Ej.: Abuelos (viven cerca y pueden ayudar a llevar y recoger)"
          }
        }
      },
      "free": {
        "t": "Notas libres",
        "st": "Notas libres",
        "h": "",
        "q": {
          "text": {
            "l": "Cualquier cosa que se quiera contar",
            "s": "Lo que se quiere contar",
            "p": "Ej.: También puede ir aquí una frase escrita por la propia persona."
          }
        }
      }
    },
    "give": {
      "title": "Entregar",
      "intro": "Elegir a quién se entrega y qué secciones incluir. Al principio solo sale lo mínimo (Primera página, Comunicación y Cómo actuar en una crisis).",
      "presets": {
        "school": "Escuela",
        "daycare": "Centro de día",
        "medical": "Hospital",
        "family": "Familia"
      },
      "secsHead": "Secciones que incluir (tocar para cambiar)",
      "show": "Mostrar (letra grande)",
      "print": "Imprimir",
      "png": "Guardar la primera página como imagen",
      "caution": "Lo que se muestra es información importante de la persona. Conviene decidir antes a quién se entrega y en qué lugar.",
      "nothing": "Todavía no hay nada escrito. Se puede empezar desde «Escribir».",
      "nothingInSecs": "Las secciones elegidas aún no tienen nada escrito. Se pueden añadir más secciones o empezar desde «Escribir».",
      "printHint": "Al imprimir se abre la pantalla de impresión del navegador.",
      "pngDone": "Imagen guardada ✓"
    },
    "show": {
      "title": "Libro de apoyo de {name}",
      "titleNoName": "Libro de apoyo",
      "lead": "Esto no es una lista de exigencias, sino un manual. Reúne lo que ayuda saber para que quienes se relacionan con esta persona puedan compartir el tiempo con ella con tranquilidad y sin forzarse.",
      "footer": "Este libro contiene información personal importante. Después de leerlo, guardarlo donde no lo vean otras personas.",
      "by": "Hecho con una app de SOYOGI, servicio de consulta sobre cuidados y apoyo (no es un formulario oficial del municipio)"
    },
    "three": {
      "title": "Las 3 cosas más importantes de hoy",
      "intro": "La tarjeta más corta, para entregar a quien acompaña en una salida o a quien solo se ve hoy. Se escriben solo 3 líneas.",
      "line": "N.º {n}",
      "p1": "Ej.: Por favor, no tocar por detrás",
      "p2": "Ej.: Si se tapa los oídos, ir a un lugar tranquilo",
      "p3": "Ej.: Las bolas de arroz, sin alga",
      "show": "Mostrar en grande",
      "head": "Las 3 cosas más importantes de hoy",
      "empty": "Todavía no hay nada escrito."
    },
    "about": {
      "title": "La página «Esto es un manual»",
      "intro": "Este texto se muestra tal cual a quien lo recibe. Al usar «Entregar», siempre aparece al principio.",
      "body": [
        "Esto no es una lista de exigencias, sino un manual.",
        "Este libro lo escribieron la persona y su familia para que se la conozca mejor. No está pensado para exigir nada. Reúne lo que ayuda saber para que quienes se relacionan con esta persona puedan compartir el tiempo con ella con tranquilidad y sin forzarse.",
        "Tampoco es una lista de lo que no puede hacer. Son pistas: así es esta persona, y de esta manera la comunicación funciona.",
        "Lo que aquí se cuenta es lo que se ve en casa. En otro lugar puede ser distinto. Si se nota algo, nos encantaría saberlo. Lo iremos mejorando juntos.",
        "Este libro contiene información personal importante. Después de leerlo, guardarlo donde no lo vean otras personas."
      ],
      "show": "Mostrar esta página en grande"
    }
  }
});
/* ---- /es ---- */
/* ---- it: 翻訳 ---- */
TBL.it = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Libro per conoscermi - SOYOGI",
    "short": "Libro per conoscermi",
    "tagline": "Non è una richiesta, è una guida."
  },
  "nav": {
    "home": "Home",
    "book": "Scrivere",
    "give": "Consegnare",
    "three": "Le 3 di oggi",
    "set": "Opzioni"
  },
  "common": {
    "ok": "OK",
    "cancel": "Annulla",
    "save": "Salva",
    "del": "Elimina",
    "back": "Indietro",
    "close": "Chiudi",
    "yes": "Sì",
    "no": "No",
    "add": "Aggiungi",
    "edit": "Modifica",
    "next": "Avanti",
    "prev": "Precedente",
    "done": "Fatto",
    "saved": "Salvato ✓",
    "saveFail": "Impossibile salvare",
    "storageFull": "Memoria piena, impossibile salvare",
    "deleted": "Eliminato",
    "delConfirm": "Eliminare davvero?",
    "empty": "Non c'è ancora niente",
    "optional": "Non è necessario compilare tutto.",
    "today": "Oggi",
    "backConfirm": "Il testo scritto non è ancora salvato. Scartarlo e tornare indietro?",
    "photo": {
      "camera": "Scatta una foto",
      "roll": "Scegli dalle foto",
      "cropTitle": "Ritaglia la foto",
      "cropHint": "Sposti l'immagine con il dito o con le frecce, poi cambi la dimensione con il cursore.",
      "zoom": "Dimensione",
      "panUp": "Su",
      "panDown": "Giù",
      "panLeft": "Sinistra",
      "panRight": "Destra",
      "make": "Usa questa",
      "fail": "Impossibile caricare la foto"
    }
  },
  "set": {
    "hNormal": "Impostazioni generali",
    "hBackup": "Cambio di telefono (backup)",
    "fs": "Dimensione del testo",
    "fsSizes": [
      "Normale",
      "Grande",
      "Molto grande"
    ],
    "lang": "ことば / Language",
    "theme": "Colore",
    "themes": [
      "Verde",
      "Azzurro",
      "Bianco",
      "Nero"
    ],
    "bgm": "Musica",
    "bgms": [
      "Nessuna",
      "Suono verde",
      "Suono blu"
    ],
    "sound": "Suono al tocco",
    "on": "ON",
    "off": "OFF",
    "bkHint": "Quando passa a un nuovo telefono, tocchi «Esporta» per salvare un file, poi sul nuovo telefono tocchi «Importa». La copia del libretto di supporto (JSON) è lo stesso file.",
    "bkExport": "Esporta",
    "bkImport": "Importa",
    "exported": "Esportato ✓",
    "imported": "Importato ✓",
    "importFail": "Impossibile importare",
    "importConfirm": "Il contenuto attuale verrà sostituito da quello del file. Importare?",
    "note": "Tutto ciò che scrive viene salvato solo su questo dispositivo. Non viene inviato da nessuna parte.",
    "privacy": "Informativa sulla privacy",
    "credit": "App sviluppata da SOYOGI, servizio di consulenza su assistenza e sostegno"
  },
  "guide": {
    "title": "Come si usa",
    "step": "{n} / {m}",
    "start": "Inizia",
    "again": "Rivedi",
    "heads": [
      "Questo è Libro per conoscermi - SOYOGI",
      "Cominci dalla prima pagina",
      "Una sezione alla volta",
      "«Consegnare»: adattato a chi lo riceve",
      "Le 3 cose più importanti di oggi",
      "La pagina «Questa è una guida»",
      "Ciò che scrive resta su questo dispositivo",
      "Più facile da leggere"
    ],
    "bodies": [
      "Questa app è una «guida» sulla persona, scritta insieme dalla persona e dalla sua famiglia. Non è una richiesta, è una guida.\nSi può consegnare a chi passa del tempo con la persona, come la scuola, il centro diurno, l'ospedale o i familiari, con ciò che è utile sapere per ciascuno.\nSe consegnarla e cosa mostrare, lo decidete sempre voi.",
      "Tocchi «Scrivere» in basso per vedere le 11 sezioni.\nCominci in alto da «Prima pagina (da leggere prima di tutto)» e scriva in breve «Cose da non fare mai» e «Quando contattarci». Questa parte compare per prima, in caratteri grandi.\nNon serve compilare tutto.",
      "In «Scrivere», scelga una sezione per vedere le domande. Mentre scrive, viene salvato in automatico e può cambiarlo quando vuole.\nQuasi tutte le sezioni mostrano in alto dei «Suggerimenti per scrivere». Con «Precedente» e «Avanti» passa alla sezione accanto; alla fine tocchi «Torna all'elenco delle sezioni».\nSe ha un file esportato da Moshimo Card, «Carica un file di Moshimo Card», in fondo a «Scrivere», riempie i campi vuoti.",
      "In «Consegnare», in basso, scelga a chi va (Scuola, Centro diurno, Ospedale o Famiglia) e le sezioni in «Sezioni da includere (toccare per cambiare)». All'inizio c'è solo il minimo: prima pagina, comunicazione e crisi.\n«Mostra (caratteri grandi)» mostra lo schermo così com'è. Può anche usare «Salva la prima pagina come immagine».\nCiò che mostra contiene informazioni importanti della persona. Decida prima a chi darlo e in quale luogo.",
      "«Le 3 di oggi», in basso, è la scheda più breve, per chi accompagna la persona o la incontra solo oggi.\nScriva solo tre righe e tocchi «Mostra in grande». Per tornare, tocchi «Chiudi».",
      "In Home c'è un pulsante con la scritta: La pagina «Questa è una guida». Apre un testo da mostrare così com'è all'altra persona.\nCon «Mostra questa pagina in grande» lo mostra.\nQuando consegna, una versione breve di questo testo viene sempre per prima.",
      "Tutto ciò che scrive resta solo su questo dispositivo. Non viene inviato da nessuna parte e non serve registrarsi.\nQuando cambia telefono, tocchi «Esporta» in «Opzioni» per salvare un file, poi «Importa» sul nuovo telefono.\nFaccia attenzione a ciò che ha mostrato o salvato come immagine.",
      "In «Opzioni» può cambiare la «Dimensione del testo» (Normale, Grande, Molto grande) e il «Colore» (Verde, Azzurro, Bianco, Nero).\nLa lingua si sceglie con «Language» in alto a destra.\nPuò rivedere queste istruzioni in qualsiasi momento con «Rivedi», nella riga «Come si usa» delle «Opzioni»."
    ]
  },
  "screen": {
    "home": {
      "title": "Libro per conoscermi",
      "intro": "Una «guida» sulla persona, scritta insieme dalla persona e dalla sua famiglia. Si può consegnare a scuola, al centro diurno, in ospedale o ai familiari, adattandola a chi la riceve.",
      "write": "Scrivere (rispondere alle 11 sezioni)",
      "give": "Consegnare (adattato a chi lo riceve)",
      "three": "Le 3 cose più importanti di oggi",
      "about": "La pagina «Questa è una guida»",
      "progress": "Campi compilati: {n}",
      "firstEmpty": "Cominci dalla «Prima pagina». Non è necessario compilare tutto.",
      "firstHead": "Prima pagina (da leggere prima di tutto)",
      "privacyNote": "Ciò che scrive resta solo su questo dispositivo. Quando lo consegna, lo tratti con cura."
    },
    "book": {
      "title": "Scrivere",
      "intro": "Scelga una sezione e risponda alle domande. Può modificare tutto in qualsiasi momento.",
      "filled": "Compilati: {n}",
      "filledNone": "Non ancora",
      "moshimo": "Carica un file di Moshimo Card",
      "moshimoHint": "Caricando il JSON creato con «Esporta» in Moshimo Card, nome, contatti, allergie ecc. vengono inseriti nei campi vuoti (così non serve scriverli due volte).",
      "moshimoDone": "Campi inseriti: {n} ✓",
      "moshimoNone": "Nessun campo da inserire (sono già compilati)",
      "moshimoFail": "Questo non è un file di Moshimo Card"
    },
    "sec": {
      "hintHead": "Suggerimenti per scrivere",
      "goBook": "Torna all'elenco delle sezioni",
      "autosave": "Mentre scrive, viene salvato in automatico."
    },
    "secs": {
      "first": {
        "t": "Prima pagina (da leggere prima di tutto)",
        "st": "Prima pagina: da leggere prima di tutto",
        "h": "Questa parte appare per prima, a caratteri grandi. Scriva in modo breve e chiaro.",
        "q": {
          "never": {
            "l": "Cose da non fare mai",
            "s": "Cose da non fare mai",
            "p": "Es.: Non sgridare davanti a tante persone. Non toccare all'improvviso da dietro."
          },
          "contact": {
            "l": "Quando contattarci",
            "s": "Quando contattarci",
            "p": "Es.: Se piange per più di 30 minuti. Se resta immobile con qualcosa in bocca. Contatto: madre 090-0000-0000"
          }
        }
      },
      "profile": {
        "t": "Profilo",
        "st": "Profilo",
        "h": "Il nome non deve per forza essere quello vero (lo scelga in base a chi lo riceve).",
        "q": {
          "name": {
            "l": "Nome (come rivolgersi)",
            "s": "Nome (come rivolgersi)",
            "p": "Es.: Soyo (sentirsi chiamare «Soyo-chan» dà sicurezza)"
          },
          "age": {
            "l": "Età, classe ecc.",
            "s": "Età, classe ecc.",
            "p": ""
          },
          "oneLine": {
            "l": "In una frase, che persona è",
            "s": "In una frase",
            "p": "Es.: Ama i treni e i libri illustrati, rispetta le regole con serietà"
          },
          "body": {
            "l": "Salute e farmaci",
            "s": "Salute e farmaci",
            "p": "Es.: Prende il farmaco per l'epilessia mattina e sera. I dettagli sono nella Moshimo Card."
          }
        }
      },
      "likes": {
        "t": "Cosa piace e cosa no",
        "st": "Cose che piacciono e cose che non piacciono",
        "h": "Scriva «quanto» con le parole, non con numeri o simboli (es.: piace moltissimo / è difficile anche solo vederlo).",
        "q": {
          "like": {
            "l": "Cose che piacciono",
            "s": "Cose che piacciono",
            "p": "Es.: Treni (piacciono moltissimo, vederli calma), disegnare"
          },
          "dislike": {
            "l": "Cose che non piacciono",
            "s": "Cose che non piacciono",
            "p": "Es.: Cambi di programma improvvisi (è difficile anche solo vederli), rumori confusi"
          },
          "calm": {
            "l": "Cosa aiuta a calmarsi",
            "s": "Cosa aiuta a calmarsi",
            "p": "Es.: Guardare un libro illustrato, cuffie antirumore, 5 minuti in una stanza silenziosa"
          }
        }
      },
      "daily": {
        "t": "Attività quotidiane",
        "st": "Attività quotidiane",
        "h": "Invece di dividere con simboli ciò che si sa fare e ciò che non si sa fare, scriva a parole: «in autonomia», «con un invito a voce», «facendolo insieme», «serve aiuto».",
        "q": {
          "eat": {
            "l": "Mangiare",
            "s": "Pasti",
            "p": "Es.: Mangia in autonomia. Le bacchette sono difficili, usa il cucchiaio."
          },
          "toilet": {
            "l": "Bagno",
            "s": "Bagno",
            "p": "Es.: Ci va con un invito a voce. In un luogo nuovo, indicare prima dove si trova il bagno."
          },
          "dress": {
            "l": "Vestirsi e prepararsi",
            "s": "Vestirsi e prepararsi",
            "p": "Es.: Ci riesce facendolo insieme. Per i bottoni serve aiuto."
          },
          "move": {
            "l": "Spostamenti e uscite",
            "s": "Spostamenti e uscite",
            "p": "Es.: Tenendosi per mano si sente al sicuro. Al semaforo non riesce ad aspettare senza qualcuno accanto."
          },
          "other": {
            "l": "Altro",
            "s": "Altro",
            "p": "Es.: Se qualcuno guarda, prende le medicine in autonomia."
          }
        }
      },
      "comm": {
        "t": "Comunicazione",
        "st": "Comunicazione",
        "h": "Scrivendo nell'ordine «comportamento visibile → vero motivo → cosa chiediamo», il messaggio arriva meglio.",
        "q": {
          "from": {
            "l": "Come si esprime",
            "s": "Come si esprime",
            "p": "Es.: Sa parlare, ma quando è in difficoltà tace. Mostrando le cose scritte su un foglio, le parole escono più facilmente."
          },
          "to": {
            "l": "Come parlare perché capisca",
            "s": "Come parlare perché capisca",
            "p": "Es.: Frasi brevi, una cosa alla volta. Meglio «fai così» che «non fare»."
          },
          "sign": {
            "l": "Comportamento visibile → vero motivo → cosa chiediamo",
            "s": "Comportamento visibile, vero motivo e cosa chiediamo",
            "p": "Es.: Esce all'improvviso dall'aula → i rumori sono diventati insopportabili → decidere prima che uscire è permesso"
          },
          "worked": {
            "l": "Cosa ha funzionato",
            "s": "Cosa ha funzionato",
            "p": "Es.: Mostrare su carta i cambi di programma il giorno prima. Così il giorno stesso non c'è stata agitazione."
          }
        }
      },
      "panic": {
        "t": "In caso di crisi",
        "st": "Cosa fare in caso di crisi",
        "h": "Anche qui nell'ordine «comportamento visibile → vero motivo → cosa chiediamo». Per i «comportamenti problematici», pensi se si possono trasformare in «un aiuto che si può dare».",
        "q": {
          "trigger": {
            "l": "Cosa può far scattare una crisi",
            "s": "Cosa può far scattare una crisi",
            "p": "Es.: Rumori forti, cambi di programma, perdere"
          },
          "before": {
            "l": "Primi segnali (comportamento visibile)",
            "s": "Primi segnali (comportamento visibile)",
            "p": "Es.: Si copre le orecchie, ripete le stesse parole"
          },
          "doThis": {
            "l": "Cosa chiediamo di fare",
            "s": "Cosa chiediamo di fare",
            "p": "Es.: Senza rivolgere la parola, accompagnare in un luogo tranquillo. Osservare per 5 minuti. Quando è passata, una sola frase: «Ce l'hai fatta a tornare»."
          },
          "dont": {
            "l": "Cosa chiediamo di non fare",
            "s": "Cosa chiediamo di non fare",
            "p": "Es.: Toccare da dietro, chiamare per nome a voce alta, chiedere il motivo sul momento"
          },
          "swap": {
            "l": "Idee per trasformare un comportamento problematico in «un aiuto che si può dare»",
            "s": "Comportamento problematico trasformato in «un aiuto che si può dare»",
            "p": "Es.: Lancia oggetti → incarico di portare le cose pesanti. Corre in giro → incarico di distribuire i fogli."
          },
          "worked": {
            "l": "Cosa ha funzionato",
            "s": "Cosa ha funzionato",
            "p": "Es.: Contare «ancora 3 e abbiamo finito» aiuta ad aspettare."
          }
        }
      },
      "sense": {
        "t": "Sensi",
        "st": "Sensi",
        "h": "Scriva sia ciò che si percepisce in modo forte sia ciò che si percepisce poco.",
        "q": {
          "sound": {
            "l": "Suoni",
            "s": "Suoni",
            "p": "Es.: Campanelle, asciugacapelli e brusio sono difficili da sopportare. Con le cuffie antirumore va molto meglio."
          },
          "light": {
            "l": "Luce e ciò che si vede",
            "s": "Luce e ciò che si vede",
            "p": "Es.: Lo sfarfallio delle luci al neon dà fastidio. Il posto vicino alla finestra è più facile."
          },
          "touch": {
            "l": "Contatto fisico, vestiti",
            "s": "Contatto fisico e abbigliamento",
            "p": "Es.: Le etichette dei vestiti fanno male. Una pacca improvvisa sulla spalla fa spaventare."
          },
          "smell": {
            "l": "Odori, sapori",
            "s": "Odori e sapori",
            "p": "Es.: L'odore della mensa a volte fa stare male."
          },
          "other": {
            "l": "Altro (dolore, caldo, freddo ecc.)",
            "s": "Altro (dolore, caldo, freddo ecc.)",
            "p": "Es.: Fatica ad accorgersi del dolore. Anche se si fa male, non lo dice."
          }
        }
      },
      "food": {
        "t": "Cibi confezionati che può mangiare",
        "st": "Cibi confezionati che può mangiare",
        "h": "Anche prodotti simili a volte non vanno bene. Scriva marca, nome del prodotto e gusto. Per le allergie fa fede quanto scritto nella Moshimo Card.",
        "q": {
          "ok": {
            "l": "Cibi confezionati che può mangiare",
            "s": "Cibi confezionati che può mangiare",
            "p": "Es.: Onigiri al sale della marca X (senza alga), yogurt bianco della marca Y"
          },
          "ng": {
            "l": "Cibi che non può mangiare",
            "s": "Cibi che non può mangiare",
            "p": "Es.: Piatti con ingredienti mescolati (curry, stufato), verdure verdi"
          },
          "allergy": {
            "l": "Allergie (come nella Moshimo Card)",
            "s": "Allergie",
            "p": "Es.: Grano saraceno, penicillina"
          },
          "drink": {
            "l": "Bevande e liquidi",
            "s": "Bevande e liquidi",
            "p": "Es.: Beve solo acqua. Se la forma della bottiglia è diversa, a volte non beve."
          }
        }
      },
      "history": {
        "t": "Storia personale",
        "st": "Storia personale",
        "h": "Non è necessario scrivere ciò che non desidera scrivere. Per ogni destinatario si può scegliere se includerlo.",
        "q": {
          "early": {
            "l": "Primi anni di vita",
            "s": "Primi anni di vita",
            "p": "Es.: Le prime parole verso i 3 anni. Poca timidezza con gli sconosciuti."
          },
          "schools": {
            "l": "Scuole e luoghi frequentati finora",
            "s": "Scuole e luoghi frequentati finora",
            "p": "Es.: Scuola dell'infanzia X → primaria Y (con aula di sostegno) → oggi"
          },
          "events": {
            "l": "Eventi importanti",
            "s": "Eventi importanti",
            "p": "Es.: Cambio di scuola in terza elementare. Un periodo di assenza da scuola nell'estate della prima media."
          },
          "now": {
            "l": "Situazione attuale",
            "s": "Situazione attuale",
            "p": "Es.: Va a scuola 3 giorni a settimana. Dopo la scuola frequenta X."
          }
        }
      },
      "orgs": {
        "t": "Servizi di riferimento",
        "st": "Servizi di riferimento",
        "h": "Scriva i luoghi con cui è in contatto e i nomi dei referenti. I contatti si mostrano solo ai destinatari che sceglie.",
        "q": {
          "medical": {
            "l": "Ospedale, clinica",
            "s": "Ospedale e clinica",
            "p": "Es.: Clinica X (una volta al mese, medico di riferimento: Y)"
          },
          "welfare": {
            "l": "Sportelli sociali, servizi",
            "s": "Sportelli sociali e servizi",
            "p": "Es.: Sportello del comune (referente: Y), servizio pomeridiano Z"
          },
          "school": {
            "l": "Referenti a scuola",
            "s": "Referenti a scuola",
            "p": "Es.: Insegnante di classe Y, referente per l'inclusione Z"
          },
          "other": {
            "l": "Altro",
            "s": "Altro",
            "p": "Es.: Nonni (abitano vicino, possono accompagnare e riprendere)"
          }
        }
      },
      "free": {
        "t": "Note libere",
        "st": "Note libere",
        "h": "",
        "q": {
          "text": {
            "l": "Qualsiasi cosa da comunicare",
            "s": "Cose da comunicare",
            "p": "Es.: Anche una frase scritta dalla persona stessa può andare qui."
          }
        }
      }
    },
    "give": {
      "title": "Consegnare",
      "intro": "Scelga il destinatario, poi le sezioni da includere. All'inizio compare solo il minimo (prima pagina, comunicazione, in caso di crisi).",
      "presets": {
        "school": "Scuola",
        "daycare": "Centro diurno",
        "medical": "Ospedale",
        "family": "Famiglia"
      },
      "secsHead": "Sezioni da includere (toccare per cambiare)",
      "show": "Mostra (caratteri grandi)",
      "print": "Stampa",
      "png": "Salva la prima pagina come immagine",
      "caution": "Ciò che mostra o stampa contiene informazioni importanti della persona. Decida prima a chi darlo e in quale luogo.",
      "nothing": "Non c'è ancora nessun campo compilato. Cominci da «Scrivere».",
      "nothingInSecs": "Nelle sezioni scelte non c'è ancora nessun campo compilato. Aggiunga altre sezioni o cominci da «Scrivere».",
      "printHint": "La stampa apre la finestra di stampa del browser.",
      "pngDone": "Immagine salvata ✓"
    },
    "show": {
      "title": "Libretto di supporto di {name}",
      "titleNoName": "Libretto di supporto",
      "lead": "Questa non è una richiesta, è una guida. Raccoglie ciò che è utile sapere, perché chi sta con la persona possa passare il tempo insieme con serenità, senza forzature.",
      "footer": "Questo libretto contiene informazioni personali importanti. Dopo averlo letto, lo custodisca in modo che altre persone non possano vederlo.",
      "by": "Creato con un'app di SOYOGI, servizio di consulenza su assistenza e sostegno (non è un modulo ufficiale del comune)"
    },
    "three": {
      "title": "Le 3 cose più importanti di oggi",
      "intro": "È la scheda più breve, da dare a chi accompagna o a chi si incontra solo oggi. Si scrivono solo 3 righe.",
      "line": "Punto {n}",
      "p1": "Es.: Per favore, non toccare da dietro",
      "p2": "Es.: Se si copre le orecchie, accompagnare in un luogo tranquillo",
      "p3": "Es.: Onigiri senza alga",
      "show": "Mostra in grande",
      "head": "Le 3 cose più importanti di oggi",
      "empty": "Non è ancora stato scritto niente."
    },
    "about": {
      "title": "La pagina «Questa è una guida»",
      "intro": "Questa pagina è un testo da mostrare così com'è a chi riceve il libretto. Quando si consegna, compare sempre per prima.",
      "body": [
        "Questa non è una richiesta, è una guida.",
        "Questo libretto è stato scritto dalla persona e dalla sua famiglia, per farla conoscere meglio. Non serve a pretendere qualcosa. Raccoglie ciò che è utile sapere, perché chi sta con la persona possa passare il tempo insieme con serenità, senza forzature.",
        "Non è nemmeno un elenco di cose che non sa fare. Sono indizi: questa persona è così, e in questo modo ci si capisce.",
        "Ciò che è scritto qui è ciò che vediamo a casa. In un altro luogo le cose possono essere diverse. Se nota qualcosa, ce lo dica. Lo correggeremo insieme.",
        "Questo libretto contiene informazioni personali importanti. Dopo averlo letto, lo custodisca in modo che altre persone non possano vederlo."
      ],
      "show": "Mostra questa pagina in grande"
    }
  }
});
/* ---- /it ---- */
/* ---- pt: 翻訳 ---- */
TBL.pt = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Para me conhecer - SOYOGI",
    "short": "Para me conhecer",
    "tagline": "Não é uma lista de exigências. É um manual."
  },
  "nav": {
    "home": "Início",
    "book": "Escrever",
    "give": "Entregar",
    "three": "3 de hoje",
    "set": "Ajustes"
  },
  "common": {
    "ok": "OK",
    "cancel": "Cancelar",
    "save": "Guardar",
    "del": "Apagar",
    "back": "Voltar",
    "close": "Fechar",
    "yes": "Sim",
    "no": "Não",
    "add": "Adicionar",
    "edit": "Editar",
    "next": "Próximo",
    "prev": "Anterior",
    "done": "Concluído",
    "saved": "Guardado ✓",
    "saveFail": "Não foi possível guardar",
    "storageFull": "Sem espaço. Não foi possível guardar",
    "deleted": "Apagado",
    "delConfirm": "Apagar mesmo?",
    "empty": "Ainda não há nada",
    "optional": "Não é preciso preencher tudo.",
    "today": "Hoje",
    "backConfirm": "O texto escrito ainda não foi guardado. Descartar e voltar?",
    "photo": {
      "camera": "Tirar foto",
      "roll": "Escolher das fotos",
      "cropTitle": "Recortar a foto",
      "cropHint": "Mover com o dedo ou ajustar com as setas; mudar o tamanho com a barra deslizante.",
      "zoom": "Tamanho",
      "panUp": "Para cima",
      "panDown": "Para baixo",
      "panLeft": "Para a esquerda",
      "panRight": "Para a direita",
      "make": "Usar esta",
      "fail": "Não foi possível abrir a foto"
    }
  },
  "set": {
    "hNormal": "Ajustes do dia a dia",
    "hBackup": "Mudar de aparelho (cópia de segurança)",
    "fs": "Tamanho do texto",
    "fsSizes": [
      "Normal",
      "Grande",
      "Muito grande"
    ],
    "lang": "ことば / Language",
    "theme": "Cor",
    "themes": [
      "Verde",
      "Azul-claro",
      "Branco",
      "Preto"
    ],
    "bgm": "Música de fundo",
    "bgms": [
      "Nenhuma",
      "Som verde",
      "Som azul"
    ],
    "sound": "Som ao tocar",
    "on": "ON",
    "off": "OFF",
    "bkHint": "Ao mudar para um aparelho novo, tocar em \"Exportar\" para guardar uma cópia e, no aparelho novo, tocar em \"Importar\". A cópia do livro de apoio (JSON) é esta mesma.",
    "bkExport": "Exportar",
    "bkImport": "Importar",
    "exported": "Exportado ✓",
    "imported": "Importado ✓",
    "importFail": "Não foi possível importar",
    "importConfirm": "O que está escrito agora será substituído pelo conteúdo da cópia. Importar?",
    "note": "Tudo o que for escrito fica guardado apenas neste aparelho. Nada é enviado.",
    "privacy": "Política de privacidade",
    "credit": "Desenvolvimento: SOYOGI, serviço de consulta sobre cuidados e apoio"
  },
  "guide": {
    "title": "Como usar",
    "step": "{n} / {m}",
    "start": "Começar",
    "again": "Ver de novo",
    "heads": [
      "Isto é o Para me conhecer - SOYOGI",
      "Começar pela primeira página",
      "Uma parte de cada vez",
      "«Entregar»: conforme quem vai ler",
      "As 3 coisas mais importantes de hoje",
      "A página \"Isto é um manual\"",
      "O que se escreve fica neste aparelho",
      "Mais fácil de ler"
    ],
    "bodies": [
      "Esta aplicação é o «manual» da pessoa, escrito pela própria pessoa e pela família. Não é uma lista de exigências. É um manual.\nPode ser mostrado a quem convive com a pessoa, como a escola, o centro de dia, o hospital ou a família, com o que é útil saber em cada caso.\nEntregar ou não, e o que mostrar, é sempre a pessoa e a família que decidem.",
      "Ao tocar em «Escrever», em baixo, aparecem 11 partes.\nComeçar no topo por «Primeira página (o que ler antes de tudo)» e escrever em poucas palavras «O que pedimos que nunca se faça» e «Avisar se isto acontecer». Esta parte aparece primeiro, em letra grande.\nNão é preciso preencher tudo.",
      "Em «Escrever», ao escolher uma parte, aparecem as perguntas. O que se escreve fica guardado automaticamente e pode ser mudado a qualquer momento.\nA maioria das partes mostra em cima «Dicas para escrever». Com «Anterior» e «Próximo» passa-se à parte ao lado; no fim, tocar em «Voltar à lista de partes».\nSe houver um arquivo exportado do Moshimo Card, «Importar dados do Moshimo Card», em baixo em «Escrever», preenche os campos vazios.",
      "Em «Entregar», em baixo, escolher para quem é (Escola, Centro de dia, Hospital ou Família) e as partes em «Partes a incluir (tocar para alternar)». No início vai só o mínimo: primeira página, comunicação e crise.\n«Mostrar (letra grande)» mostra a página tal como está. Também se pode «Guardar a primeira página como imagem».\nO material gerado contém informações importantes da pessoa. Antes de gerar, decidir a quem entregar e onde.",
      "«3 de hoje», em baixo, é o cartão mais curto, para quem acompanha a pessoa ou a vê só hoje.\nEscrever só três linhas e tocar em «Mostrar em tamanho grande». Para voltar, tocar em «Fechar».",
      "No Início há um botão com o texto: A página \"Isto é um manual\". Abre um texto para mostrar tal como está à outra pessoa.\nCom «Mostrar esta página em tamanho grande» mostra-se.\nAo entregar, uma versão curta desse texto vem sempre primeiro.",
      "Tudo o que se escreve fica guardado só neste aparelho. Nada é enviado para fora e não é preciso criar conta.\nAo mudar de aparelho, tocar em «Exportar» nos «Ajustes» para guardar um arquivo e depois em «Importar» no aparelho novo.\nConvém ter cuidado com o que se mostrou ou guardou como imagem.",
      "Nos «Ajustes» pode-se mudar o «Tamanho do texto» (Normal, Grande, Muito grande) e a «Cor» (Verde, Azul-claro, Branco, Preto).\nO idioma escolhe-se em «Language», no canto superior direito.\nEste guia pode ser visto de novo a qualquer momento com «Ver de novo», na linha «Como usar» dos «Ajustes»."
    ]
  },
  "screen": {
    "home": {
      "title": "Para me conhecer",
      "intro": "O \"manual\" da pessoa, escrito pela própria pessoa e pela família. Pode ser mostrado à escola, ao centro de dia, ao hospital ou à família, de acordo com quem vai ler.",
      "write": "Escrever (responder às 11 partes)",
      "give": "Entregar (mostrar conforme quem vai ler)",
      "three": "As 3 coisas mais importantes de hoje",
      "about": "A página \"Isto é um manual\"",
      "progress": "Campos escritos: {n}",
      "firstEmpty": "Começar pela \"Primeira página\". Não é preciso preencher tudo.",
      "firstHead": "Primeira página (o que ler antes de tudo)",
      "privacyNote": "O que for escrito fica apenas neste aparelho. Ao entregar, tratar estas informações com cuidado."
    },
    "book": {
      "title": "Escrever",
      "intro": "Escolher uma parte e responder às perguntas. Tudo pode ser alterado depois.",
      "filled": "Escritos: {n}",
      "filledNone": "Ainda não",
      "moshimo": "Importar dados do Moshimo Card",
      "moshimoHint": "Ao importar o JSON exportado no Moshimo Card, o nome, a quem avisar, as alergias etc. vão para os campos vazios (sem escrever duas vezes).",
      "moshimoDone": "{n} campos preenchidos ✓",
      "moshimoNone": "Não havia campos para preencher (já estão escritos)",
      "moshimoFail": "Não é uma exportação do Moshimo Card"
    },
    "sec": {
      "hintHead": "Dicas para escrever",
      "goBook": "Voltar à lista de partes",
      "autosave": "O que se escreve fica guardado automaticamente."
    },
    "secs": {
      "first": {
        "t": "Primeira página (o que ler antes de tudo)",
        "st": "Primeira página: para ler antes de tudo",
        "h": "Esta parte aparece primeiro, em letras grandes. Escrever de forma curta e clara.",
        "q": {
          "never": {
            "l": "O que pedimos que nunca se faça",
            "s": "O que pedimos que nunca se faça",
            "p": "ex.: Não repreender diante de muitas pessoas. Não tocar de repente por trás."
          },
          "contact": {
            "l": "Avisar se isto acontecer",
            "s": "Avisar se isto acontecer",
            "p": "ex.: Quando chora sem parar por 30 minutos. Quando não se mexe com algo na boca. A quem avisar: mãe 090-0000-0000"
          }
        }
      },
      "profile": {
        "t": "Perfil",
        "st": "Perfil",
        "h": "Não é preciso usar o nome verdadeiro (conforme quem vai ler).",
        "q": {
          "name": {
            "l": "Nome (como chamar)",
            "s": "Nome (como chamar)",
            "p": "ex.: Soyo (ouvir \"Soyo-chan\" traz tranquilidade)"
          },
          "age": {
            "l": "Idade, ano escolar etc.",
            "s": "Idade, ano escolar etc.",
            "p": ""
          },
          "oneLine": {
            "l": "Em poucas palavras, como é esta pessoa",
            "s": "Em poucas palavras",
            "p": "ex.: Gosta de trens e de enciclopédias ilustradas, e cumpre as regras com seriedade"
          },
          "body": {
            "l": "Corpo e medicamentos",
            "s": "Corpo e medicamentos",
            "p": "ex.: Toma medicamento para a epilepsia de manhã e à noite. Detalhes no Moshimo Card."
          }
        }
      },
      "likes": {
        "t": "Do que gosta e o que é difícil",
        "st": "Do que gosta e o que é difícil",
        "h": "Escrever o \"quanto\" com palavras, não com números nem símbolos (ex.: gosta muito / até ver é difícil).",
        "q": {
          "like": {
            "l": "Do que gosta",
            "s": "Do que gosta",
            "p": "ex.: Trens (gosta muito; vê-los traz calma), desenhar"
          },
          "dislike": {
            "l": "O que é difícil",
            "s": "O que é difícil",
            "p": "ex.: Mudanças de planos de última hora (até ver é difícil), burburinho"
          },
          "calm": {
            "l": "O que traz calma",
            "s": "O que traz calma",
            "p": "ex.: Ver uma enciclopédia ilustrada, protetores auriculares, 5 minutos numa sala silenciosa"
          }
        }
      },
      "daily": {
        "t": "Atividades do dia a dia",
        "st": "Atividades do dia a dia",
        "h": "Em vez de usar símbolos para \"consegue / não consegue\", escrever com palavras, por exemplo: \"consegue sem ajuda\", \"consegue se alguém lembrar\", \"consegue se alguém fizer junto\", \"precisa de ajuda\".",
        "q": {
          "eat": {
            "l": "Comer",
            "s": "Refeições",
            "p": "ex.: Come sem ajuda. Tem dificuldade com pauzinhos e usa colher."
          },
          "toilet": {
            "l": "Sanitário",
            "s": "Uso do sanitário",
            "p": "ex.: Consegue ir se alguém lembrar. Num lugar desconhecido, mostrar primeiro onde fica."
          },
          "dress": {
            "l": "Troca de roupa e preparação",
            "s": "Troca de roupa e preparação",
            "p": "ex.: Consegue se alguém fizer junto. Precisa de ajuda com os botões."
          },
          "move": {
            "l": "Locomoção e saídas",
            "s": "Locomoção e saídas",
            "p": "ex.: Andar de mãos dadas traz segurança. Não consegue esperar no semáforo sem ninguém ao lado."
          },
          "other": {
            "l": "Outros",
            "s": "Outros",
            "p": "ex.: Consegue tomar os medicamentos por conta própria se alguém acompanhar."
          }
        }
      },
      "comm": {
        "t": "Comunicação",
        "st": "Comunicação",
        "h": "Escrever na ordem \"o que se vê → o verdadeiro motivo → o que se pede\" ajuda a mensagem a chegar.",
        "q": {
          "from": {
            "l": "Como a pessoa se expressa",
            "s": "Como a pessoa se expressa",
            "p": "ex.: Consegue falar, mas fica em silêncio quando se atrapalha. Quando se escreve num papel e se mostra, as palavras saem."
          },
          "to": {
            "l": "Formas de falar que a pessoa entende",
            "s": "Formas de falar que a pessoa entende",
            "p": "ex.: Frases curtas, uma coisa de cada vez. Dizer \"fazer...\" em vez de \"não fazer...\"."
          },
          "sign": {
            "l": "O que se vê → o verdadeiro motivo → o que se pede",
            "s": "O que se vê, o verdadeiro motivo e o que se pede",
            "p": "ex.: Sai da sala de repente → o som ficou insuportável → combinar antes que sair é permitido"
          },
          "worked": {
            "l": "O que funcionou",
            "s": "Formas de agir que funcionaram",
            "p": "ex.: Mostrar as mudanças de planos num papel na véspera. Assim, no dia, conseguiu manter a calma."
          }
        }
      },
      "panic": {
        "t": "Em momentos de crise",
        "st": "Como agir em momentos de crise",
        "h": "Aqui também: \"o que se vê → o verdadeiro motivo → o que se pede\". Para os \"comportamentos difíceis\", pensar se podem ser trocados por uma \"tarefa útil que pode fazer\".",
        "q": {
          "trigger": {
            "l": "O que costuma desencadear",
            "s": "O que costuma desencadear",
            "p": "ex.: Barulho alto, mudança de planos, perder"
          },
          "before": {
            "l": "Primeiros sinais (o que se vê)",
            "s": "Primeiros sinais (o que se vê)",
            "p": "ex.: Tapa os ouvidos, repete as mesmas palavras"
          },
          "doThis": {
            "l": "O que se pede",
            "s": "O que se pede",
            "p": "ex.: Sem falar, ir para um lugar tranquilo. Observar com calma durante 5 minutos. Quando passar, só uma frase: \"muito bem, conseguiu voltar\"."
          },
          "dont": {
            "l": "O que se pede para não fazer",
            "s": "O que se pede para não fazer",
            "p": "ex.: Tocar por trás, chamar o nome em voz alta, perguntar o motivo ali mesmo"
          },
          "swap": {
            "l": "Ideia: trocar o comportamento difícil por uma \"tarefa útil que pode fazer\"",
            "s": "Trocar o comportamento difícil por uma \"tarefa útil que pode fazer\"",
            "p": "ex.: Lança objetos → fica com a tarefa de carregar coisas pesadas. Corre pela sala → fica com a tarefa de distribuir os papéis."
          },
          "worked": {
            "l": "O que funcionou",
            "s": "Formas de agir que funcionaram",
            "p": "ex.: Contar \"mais 3 e acaba\" ajuda a esperar."
          }
        }
      },
      "sense": {
        "t": "Sentidos",
        "st": "Sentidos",
        "h": "Escrever tanto o que se sente com muita intensidade como o que se sente pouco.",
        "q": {
          "sound": {
            "l": "Sons",
            "s": "Sons",
            "p": "ex.: Campainhas, secador de cabelo e burburinho são difíceis. Com protetores auriculares, fica bem mais fácil."
          },
          "light": {
            "l": "Luz e o que se vê",
            "s": "Luz e o que se vê",
            "p": "ex.: O tremular das lâmpadas fluorescentes incomoda. Sentar junto à janela é mais confortável."
          },
          "touch": {
            "l": "Toque e roupas",
            "s": "Toque e roupas",
            "p": "ex.: As etiquetas da roupa causam dor. Um toque repentino no ombro causa susto."
          },
          "smell": {
            "l": "Cheiro e sabor",
            "s": "Cheiro e sabor",
            "p": "ex.: O cheiro do almoço da escola às vezes causa mal-estar."
          },
          "other": {
            "l": "Outros (dor, calor, frio etc.)",
            "s": "Outros (dor, calor, frio etc.)",
            "p": "ex.: Percebe pouco a dor. Mesmo com um ferimento, não diz nada."
          }
        }
      },
      "food": {
        "t": "Produtos de supermercado que consegue comer",
        "st": "Produtos de supermercado que consegue comer",
        "h": "Mesmo produtos parecidos podem não servir. Escrever o fabricante, o nome do produto e o sabor. Para alergias, vale o que está escrito no Moshimo Card.",
        "q": {
          "ok": {
            "l": "Produtos de supermercado que consegue comer",
            "s": "Produtos de supermercado que consegue comer",
            "p": "ex.: Bolinho de arroz (onigiri) só com sal da marca X (sem alga), iogurte natural da marca Y"
          },
          "ng": {
            "l": "O que não consegue comer",
            "s": "O que não consegue comer",
            "p": "ex.: Pratos com tudo misturado (curry, ensopados), vegetais verdes"
          },
          "allergy": {
            "l": "Alergias (igual ao Moshimo Card)",
            "s": "Alergias",
            "p": "ex.: Trigo-sarraceno, penicilina"
          },
          "drink": {
            "l": "Bebidas e hidratação",
            "s": "Bebidas e hidratação",
            "p": "ex.: Só bebe água. Se o formato da garrafa for diferente, às vezes não bebe."
          }
        }
      },
      "history": {
        "t": "História de vida",
        "st": "História de vida",
        "h": "Não é preciso escrever o que não se quer. Para cada leitor, é possível escolher se esta parte aparece.",
        "q": {
          "early": {
            "l": "Primeiros anos",
            "s": "Primeiros anos",
            "p": "ex.: As primeiras palavras vieram por volta dos 3 anos. Estranhava pouco as pessoas desconhecidas."
          },
          "schools": {
            "l": "Escolas e lugares frequentados até agora",
            "s": "Escolas e lugares frequentados",
            "p": "ex.: Pré-escola X → Escola Y (com apoio especializado) → hoje"
          },
          "events": {
            "l": "Acontecimentos importantes",
            "s": "Acontecimentos importantes",
            "p": "ex.: Mudou de escola no 3.º ano. No verão do 7.º ano, houve um período sem ir à escola."
          },
          "now": {
            "l": "Situação atual",
            "s": "Situação atual",
            "p": "ex.: Vai à escola 3 dias por semana. Depois das aulas, frequenta X."
          }
        }
      },
      "orgs": {
        "t": "Serviços envolvidos",
        "st": "Serviços envolvidos",
        "h": "Escrever os lugares com que há ligação e o nome de quem acompanha. Escolher, para cada leitor, se mostra telefones e endereços.",
        "q": {
          "medical": {
            "l": "Hospital, clínica",
            "s": "Hospital, clínica",
            "p": "ex.: Clínica X (uma vez por mês; médico(a) responsável: Y)"
          },
          "welfare": {
            "l": "Atendimento social e serviços de apoio",
            "s": "Atendimento social e serviços de apoio",
            "p": "ex.: Atendimento do município (responsável: Y), serviço de apoio depois das aulas Z"
          },
          "school": {
            "l": "Pessoas de referência na escola",
            "s": "Pessoas de referência na escola",
            "p": "ex.: Professor(a) responsável pela turma: Y; coordenador(a): Z"
          },
          "other": {
            "l": "Outros",
            "s": "Outros",
            "p": "ex.: Avós (moram perto e podem ajudar nas idas e vindas)"
          }
        }
      },
      "free": {
        "t": "Espaço livre",
        "st": "Espaço livre",
        "h": "",
        "q": {
          "text": {
            "l": "Qualquer coisa que se queira contar",
            "s": "O que queremos contar",
            "p": "ex.: Uma frase escrita pela própria pessoa também pode vir aqui."
          }
        }
      }
    },
    "give": {
      "title": "Entregar",
      "intro": "Escolher o leitor e depois as partes a incluir. No início, só aparece o mínimo (primeira página, comunicação e momentos de crise).",
      "presets": {
        "school": "Escola",
        "daycare": "Centro de dia",
        "medical": "Hospital",
        "family": "Família"
      },
      "secsHead": "Partes a incluir (tocar para alternar)",
      "show": "Mostrar (letra grande)",
      "print": "Imprimir",
      "png": "Guardar a primeira página como imagem",
      "caution": "O material gerado contém informações importantes da pessoa. Antes de gerar, decidir a quem entregar e onde.",
      "nothing": "Ainda não há campos escritos. Começar por \"Escrever\".",
      "nothingInSecs": "As partes escolhidas ainda não têm campos escritos. Incluir mais partes ou começar por \"Escrever\".",
      "printHint": "Para imprimir, o navegador abre a janela de impressão.",
      "pngDone": "Imagem guardada ✓"
    },
    "show": {
      "title": "Livro de apoio de {name}",
      "titleNoName": "Livro de apoio",
      "lead": "Isto não é uma lista de exigências. É um manual. Reunimos aqui o que é útil saber, para que quem convive com esta pessoa possa estar junto dela com tranquilidade e sem esforço.",
      "footer": "Este livro contém informações pessoais importantes. Depois de ler, tratar com cuidado para que outras pessoas não o vejam.",
      "by": "Criado com uma ferramenta de SOYOGI, serviço de consulta sobre cuidados e apoio (não é um formulário oficial do município)"
    },
    "three": {
      "title": "As 3 coisas mais importantes de hoje",
      "intro": "O cartão mais curto, para entregar a quem acompanha uma saída ou a quem se encontra só hoje. Escrever apenas 3 linhas.",
      "line": "Ponto {n}",
      "p1": "ex.: Por favor, não tocar por trás",
      "p2": "ex.: Se tapar os ouvidos, ir para um lugar tranquilo",
      "p3": "ex.: Bolinhos de arroz sem alga",
      "show": "Mostrar em tamanho grande",
      "head": "As 3 coisas mais importantes de hoje",
      "empty": "Ainda não foi escrito nada."
    },
    "about": {
      "title": "A página \"Isto é um manual\"",
      "intro": "Esta página é mostrada tal como está a quem vai ler. Ao entregar, aparece sempre em primeiro lugar.",
      "body": [
        "Isto não é uma lista de exigências. É um manual.",
        "A própria pessoa e a família escreveram este livro para dar a conhecer quem ela é. Não foi feito para exigir nada. Reúne o que é útil saber, para que quem convive com esta pessoa possa estar junto dela com tranquilidade e sem esforço.",
        "Também não é uma lista do que a pessoa não consegue fazer. São pistas: esta pessoa é assim, e desta forma a mensagem chega.",
        "O que está escrito aqui é o que vemos em casa. Num outro lugar, as coisas podem ser diferentes. Qualquer observação será muito bem-vinda. Vamos ajustando juntos.",
        "Este livro contém informações pessoais importantes. Depois de ler, tratar com cuidado para que outras pessoas não o vejam."
      ],
      "show": "Mostrar esta página em tamanho grande"
    }
  }
});
/* ---- /pt ---- */
/* ---- nl: 翻訳 ---- */
TBL.nl = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Goed om te weten - SOYOGI",
    "short": "Goed om te weten",
    "tagline": "Geen lijst met eisen, maar een handleiding."
  },
  "nav": {
    "home": "Start",
    "book": "Schrijven",
    "give": "Meegeven",
    "three": "3 voor vandaag",
    "set": "Instellingen"
  },
  "common": {
    "ok": "OK",
    "cancel": "Annuleren",
    "save": "Opslaan",
    "del": "Wissen",
    "back": "Terug",
    "close": "Sluiten",
    "yes": "Ja",
    "no": "Nee",
    "add": "Toevoegen",
    "edit": "Aanpassen",
    "next": "Volgende",
    "prev": "Vorige",
    "done": "Klaar",
    "saved": "Opgeslagen ✓",
    "saveFail": "Opslaan is niet gelukt",
    "storageFull": "Het geheugen is vol. Opslaan is niet gelukt.",
    "deleted": "Gewist",
    "delConfirm": "Weet u zeker dat u dit wilt wissen?",
    "empty": "Hier staat nog niets",
    "optional": "U hoeft niet alles in te vullen.",
    "today": "Vandaag",
    "backConfirm": "Wat u hebt geschreven, is nog niet opgeslagen. Weggooien en teruggaan?",
    "photo": {
      "camera": "Foto maken",
      "roll": "Kiezen uit foto's",
      "cropTitle": "Foto bijsnijden",
      "cropHint": "Verschuif met uw vinger of met de pijltjes, en verander de grootte met de schuifbalk.",
      "zoom": "Grootte",
      "panUp": "Omhoog",
      "panDown": "Omlaag",
      "panLeft": "Naar links",
      "panRight": "Naar rechts",
      "make": "Dit gebruiken",
      "fail": "De foto kon niet worden geladen"
    }
  },
  "set": {
    "hNormal": "Algemene instellingen",
    "hBackup": "Nieuwe telefoon (back-up)",
    "fs": "Tekstgrootte",
    "fsSizes": [
      "Normaal",
      "Groot",
      "Heel groot"
    ],
    "lang": "ことば / Language",
    "theme": "Kleur",
    "themes": [
      "Groen",
      "Lichtblauw",
      "Wit",
      "Zwart"
    ],
    "bgm": "Muziek",
    "bgms": [
      "Geen",
      "Groene klank",
      "Blauwe klank"
    ],
    "sound": "Tikgeluid",
    "on": "AAN",
    "off": "UIT",
    "bkHint": "Gaat u over naar een nieuwe telefoon? Bewaar dan een bestand met “Exporteren” en tik op de nieuwe telefoon op “Importeren”. De kopie (JSON) van het ondersteuningsboek werkt op dezelfde manier.",
    "bkExport": "Exporteren",
    "bkImport": "Importeren",
    "exported": "Geëxporteerd ✓",
    "imported": "Geïmporteerd ✓",
    "importFail": "Importeren is niet gelukt",
    "importConfirm": "Wat u nu hebt ingevuld, wordt vervangen door de inhoud van het bestand. Wilt u importeren?",
    "note": "Alles wat u schrijft, wordt alleen op dit apparaat bewaard. Er wordt niets verstuurd.",
    "privacy": "Privacybeleid",
    "credit": "App ontwikkeld door SOYOGI, adviespunt voor zorg en ondersteuning"
  },
  "guide": {
    "title": "Zo werkt het",
    "step": "{n} / {m}",
    "start": "Beginnen",
    "again": "Nog eens bekijken",
    "heads": [
      "Welkom bij Goed om te weten - SOYOGI",
      "Begin met pagina 1",
      "Eén onderdeel tegelijk",
      "\"Meegeven\": aangepast aan de ontvanger",
      "De 3 belangrijkste dingen van vandaag",
      "De pagina “Dit is een handleiding”",
      "Wat u schrijft, blijft op dit apparaat",
      "Makkelijker lezen"
    ],
    "bodies": [
      "Deze app is een “handleiding” over de persoon, geschreven door de persoon zelf en de familie. Geen lijst met eisen, maar een handleiding.\nU kunt hem meegeven aan mensen die met de persoon omgaan, zoals school, opvang, ziekenhuis of familie, met wat voor ieder handig is om te weten.\nOf u hem meegeeft en wat u laat zien, beslist u altijd zelf.",
      "Tik onderaan op \"Schrijven\" om de 11 onderdelen te zien.\nBegin bovenaan met \"Pagina 1 (graag als eerste lezen)\" en schrijf kort \"Doe dit alstublieft nooit\" en \"Neem contact op als dit gebeurt\". Dit deel wordt als eerste getoond, in grote letters.\nU hoeft niet alles in te vullen.",
      "Kies bij \"Schrijven\" een onderdeel om de vragen te zien. Wat u schrijft, wordt automatisch opgeslagen en kunt u altijd aanpassen.\nDe meeste onderdelen tonen bovenaan \"Tips voor het schrijven\". Met \"Vorige\" en \"Volgende\" gaat u naar het onderdeel ernaast; tik als u klaar bent op \"Naar de lijst met onderdelen\".\nHebt u een bestand dat uit Moshimo Card is geëxporteerd, dan vult \"Moshimo Card-bestand laden\" onderaan bij \"Schrijven\" de lege vakken in.",
      "Kies onderaan bij \"Meegeven\" de ontvanger (School, Opvang, Ziekenhuis of Familie) en de onderdelen bij \"Onderdelen die u meegeeft (tik om aan/uit te zetten)\". In het begin gaat alleen het minimum mee: pagina 1, communicatie en paniek.\nMet \"Tonen (grote letters)\" laat u het scherm meteen zien. U kunt ook \"Pagina 1 als afbeelding opslaan\".\nWat u meegeeft, is belangrijke informatie over de persoon. Bepaal eerst aan wie en op welke plek u het geeft.",
      "\"3 voor vandaag\" onderaan is de kortste kaart, voor wie de persoon begeleidt of alleen vandaag ziet.\nSchrijf maar drie regels en tik op \"Groot tonen\". Terug gaat met \"Sluiten\".",
      "Op Start staat een knop met de tekst: De pagina “Dit is een handleiding”. Die opent een tekst die u de ander zo kunt laten zien.\nMet \"Deze pagina groot tonen\" laat u hem zien.\nBij meegeven staat er altijd een korte versie van deze tekst vooraan.",
      "Alles wat u schrijft, wordt alleen op dit apparaat bewaard. Er wordt niets verstuurd en u hoeft zich niet aan te melden.\nBij een andere telefoon tikt u in \"Instellingen\" op \"Exporteren\" om een bestand te bewaren, en op de nieuwe telefoon op \"Importeren\".\nGa zorgvuldig om met wat u hebt laten zien of als afbeelding hebt opgeslagen.",
      "In \"Instellingen\" kunt u de \"Tekstgrootte\" (Normaal, Groot, Heel groot) en de \"Kleur\" (Groen, Lichtblauw, Wit, Zwart) veranderen.\nDe taal kiest u rechtsboven bij \"Language\".\nDeze uitleg ziet u altijd opnieuw via \"Nog eens bekijken\" bij \"Zo werkt het\" in \"Instellingen\"."
    ]
  },
  "screen": {
    "home": {
      "title": "Goed om te weten",
      "intro": "Een “handleiding” over de persoon, geschreven door de persoon zelf en de familie. U kunt deze per ontvanger aanpassen en meegeven aan school, opvang, ziekenhuis of familie.",
      "write": "Schrijven (11 onderdelen beantwoorden)",
      "give": "Meegeven (aangepast aan de ontvanger)",
      "three": "De 3 belangrijkste dingen van vandaag",
      "about": "De pagina “Dit is een handleiding”",
      "progress": "Ingevulde velden: {n}",
      "firstEmpty": "Begin gerust met “Pagina 1”. U hoeft niet alles in te vullen.",
      "firstHead": "Pagina 1 (graag als eerste lezen)",
      "privacyNote": "Wat u schrijft, staat alleen op dit apparaat. Ga zorgvuldig om met wat u meegeeft."
    },
    "book": {
      "title": "Schrijven",
      "intro": "Kies een onderdeel en beantwoord de vragen. U kunt alles later altijd aanpassen.",
      "filled": "{n} ingevuld",
      "filledNone": "Nog niet",
      "moshimo": "Moshimo Card-bestand laden",
      "moshimoHint": "Laadt u de JSON die u in Moshimo Card met “Exporteren” hebt bewaard, dan komen naam, contactgegevens, allergieën en dergelijke in de lege velden (zo hoeft u niets twee keer te schrijven).",
      "moshimoDone": "{n} veld(en) ingevuld ✓",
      "moshimoNone": "Er was niets in te vullen (alles staat er al)",
      "moshimoFail": "Dit is geen Moshimo Card-bestand"
    },
    "sec": {
      "hintHead": "Tips voor het schrijven",
      "goBook": "Naar de lijst met onderdelen",
      "autosave": "Wat u schrijft, wordt automatisch opgeslagen."
    },
    "secs": {
      "first": {
        "t": "Pagina 1 (graag als eerste lezen)",
        "st": "Pagina 1: graag als eerste lezen",
        "h": "Dit komt als eerste, in grote letters. Schrijf kort en duidelijk.",
        "q": {
          "never": {
            "l": "Doe dit alstublieft nooit",
            "s": "Doe dit alstublieft nooit",
            "p": "bijv. Niet berispen in het bijzijn van veel mensen. Niet plotseling van achteren aanraken."
          },
          "contact": {
            "l": "Neem contact op als dit gebeurt",
            "s": "Neem contact op als dit gebeurt",
            "p": "bijv. Blijft langer dan 30 minuten huilen. Blijft met iets in de mond stil zitten zonder te bewegen. Contact: moeder 090-0000-0000"
          }
        }
      },
      "profile": {
        "t": "Profiel",
        "st": "Profiel",
        "h": "De naam hoeft niet de echte naam te zijn (pas het aan de ontvanger aan).",
        "q": {
          "name": {
            "l": "Naam (hoe u de persoon noemt)",
            "s": "Naam (aanspreekvorm)",
            "p": "bijv. Soyo (voelt zich gerust bij de naam “Soyo-chan”)"
          },
          "age": {
            "l": "Leeftijd, klas enz.",
            "s": "Leeftijd, klas enz.",
            "p": ""
          },
          "oneLine": {
            "l": "In één zin: wat voor iemand",
            "s": "In één zin",
            "p": "bijv. Houdt van treinen en naslagboeken met plaatjes, houdt zich serieus aan regels"
          },
          "body": {
            "l": "Lichaam en medicijnen",
            "s": "Lichaam en medicijnen",
            "p": "bijv. Neemt 's ochtends en 's avonds epilepsiemedicatie. Meer details staan in Moshimo Card."
          }
        }
      },
      "likes": {
        "t": "Fijn en lastig",
        "st": "Wat fijn is en wat lastig is",
        "h": "Schrijf “hoeveel” in woorden, niet in cijfers of tekens (bijv. heel fijn / zelfs kijken is al moeilijk).",
        "q": {
          "like": {
            "l": "Waar de persoon van houdt",
            "s": "Waar de persoon van houdt",
            "p": "bijv. Treinen (heel fijn, wordt rustig als u ze laat zien), tekenen"
          },
          "dislike": {
            "l": "Wat de persoon lastig vindt",
            "s": "Wat de persoon lastig vindt",
            "p": "bijv. Plotselinge veranderingen in de planning (zelfs kijken is al moeilijk), rumoerige geluiden"
          },
          "calm": {
            "l": "Wat rust geeft",
            "s": "Wat rust geeft",
            "p": "bijv. In een naslagboek kijken, gehoorbeschermers, 5 minuten in een stille kamer"
          }
        }
      },
      "daily": {
        "t": "Dagelijkse handelingen",
        "st": "Dagelijkse handelingen",
        "h": "Deel het niet met tekens op in kan / kan niet, maar schrijf het in woorden, zoals “kan het alleen”, “kan het met een seintje”, “kan het samen” of “heeft hulp nodig”.",
        "q": {
          "eat": {
            "l": "Eten",
            "s": "Maaltijden",
            "p": "bijv. Eet zelfstandig. Stokjes zijn lastig, gebruikt een lepel."
          },
          "toilet": {
            "l": "Toilet",
            "s": "Toilet",
            "p": "bijv. Gaat met een seintje. Wilt u op een onbekende plek eerst laten zien waar het toilet is?"
          },
          "dress": {
            "l": "Aankleden en klaarmaken",
            "s": "Aankleden en verzorging",
            "p": "bijv. Lukt samen. Bij knopen is hulp nodig."
          },
          "move": {
            "l": "Verplaatsen en op pad gaan",
            "s": "Verplaatsen en op pad gaan",
            "p": "bijv. Voelt zich veilig aan de hand. Kan niet alleen wachten bij een verkeerslicht."
          },
          "other": {
            "l": "Overig",
            "s": "Overig",
            "p": "bijv. Kan zelf medicijnen innemen als iemand meekijkt."
          }
        }
      },
      "comm": {
        "t": "Communicatie",
        "st": "Communicatie",
        "h": "Schrijf in de volgorde “wat u ziet → de echte reden → wat we vragen”. Dan komt het goed over.",
        "q": {
          "from": {
            "l": "Hoe de persoon zelf iets duidelijk maakt",
            "s": "Hoe de persoon zich uit",
            "p": "bijv. Kan praten, maar wordt stil als het moeilijk wordt. Als iets op papier wordt geschreven en getoond, komen de woorden."
          },
          "to": {
            "l": "Wat goed overkomt bij de persoon",
            "s": "Hoe het goed overkomt",
            "p": "bijv. Kort, één ding tegelijk. Liever “doe dit” dan “doe dat niet”."
          },
          "sign": {
            "l": "Wat u ziet → de echte reden → wat we vragen",
            "s": "Wat u ziet, de echte reden en wat we vragen",
            "p": "bijv. Loopt plotseling de klas uit → het geluid wordt te veel → spreek graag vooraf af dat weggaan mag"
          },
          "worked": {
            "l": "Wat goed werkte",
            "s": "Aanpak die goed werkte",
            "p": "bijv. Veranderingen in de planning de dag ervoor op papier laten zien. Zo bleef het op de dag zelf rustig."
          }
        }
      },
      "panic": {
        "t": "Wat te doen bij paniek",
        "st": "Wat te doen bij paniek",
        "h": "Ook hier in de volgorde “wat u ziet → de echte reden → wat we vragen”. Bedenk bij “lastig gedrag” of het kan worden vervangen door een hulptaak die mag.",
        "q": {
          "trigger": {
            "l": "Wat het vaak uitlokt",
            "s": "Wat het vaak uitlokt",
            "p": "bijv. Harde geluiden, veranderingen in de planning, verliezen"
          },
          "before": {
            "l": "Voortekenen (wat u ziet)",
            "s": "Voortekenen (wat u ziet)",
            "p": "bijv. Handen op de oren, steeds dezelfde woorden herhalen"
          },
          "doThis": {
            "l": "Wat we u vragen",
            "s": "Wat we u vragen",
            "p": "bijv. Zonder iets te zeggen naar een rustige plek. 5 minuten rustig meekijken. Als het over is, één zin: “Goed dat je weer terug bent.”"
          },
          "dont": {
            "l": "Wat we u vragen niet te doen",
            "s": "Wat we u vragen niet te doen",
            "p": "bijv. Van achteren aanraken, de naam hard roepen, ter plekke naar de reden vragen"
          },
          "swap": {
            "l": "Lastig gedrag vervangen door een hulptaak die mag",
            "s": "Lastig gedrag vervangen door “een hulptaak die mag”",
            "p": "bijv. Gooit met dingen → taak: zware spullen dragen. Rent rond → taak: papieren uitdelen."
          },
          "worked": {
            "l": "Wat goed werkte",
            "s": "Aanpak die goed werkte",
            "p": "bijv. Met aftellen (“nog 3, dan is het klaar”) lukt het wachten."
          }
        }
      },
      "sense": {
        "t": "Zintuigen",
        "st": "Zintuigen",
        "h": "Schrijf beide op: wat heel sterk wordt gevoeld en wat juist weinig wordt gevoeld.",
        "q": {
          "sound": {
            "l": "Geluid",
            "s": "Geluid",
            "p": "bijv. De schoolbel, een föhn en geroezemoes zijn moeilijk. Met gehoorbeschermers gaat het een stuk makkelijker."
          },
          "light": {
            "l": "Licht en wat de persoon ziet",
            "s": "Licht en beelden",
            "p": "bijv. Het flikkeren van tl-lampen stoort. Een plek bij het raam is prettiger."
          },
          "touch": {
            "l": "Aangeraakt worden, kleding",
            "s": "Aangeraakt worden, kleding",
            "p": "bijv. Labels in kleding doen pijn. Schrikt als er plotseling op de schouder wordt getikt."
          },
          "smell": {
            "l": "Geur en smaak",
            "s": "Geur en smaak",
            "p": "bijv. Kan zich soms niet lekker voelen door de geur van het schooleten."
          },
          "other": {
            "l": "Overig (pijn, warmte en kou enz.)",
            "s": "Overig (pijn, warmte, kou enz.)",
            "p": "bijv. Merkt pijn niet snel op. Zegt niets, ook bij een verwonding."
          }
        }
      },
      "food": {
        "t": "Winkelproducten die de persoon eet",
        "st": "Winkelproducten die de persoon eet",
        "h": "Ook als iets erop lijkt, lukt het soms niet. Schrijf het merk, de productnaam en de smaak op. Voor allergieën geldt wat in Moshimo Card staat.",
        "q": {
          "ok": {
            "l": "Winkelproducten die de persoon eet",
            "s": "Winkelproducten die de persoon eet",
            "p": "bijv. Zoute rijstbal van merk X (zonder zeewier), yoghurt naturel van Y"
          },
          "ng": {
            "l": "Wat de persoon niet eet",
            "s": "Wat de persoon niet eet",
            "p": "bijv. Gemengde gerechten (curry, stoofpot), groene groenten"
          },
          "allergy": {
            "l": "Allergieën (hetzelfde als in Moshimo Card)",
            "s": "Allergieën",
            "p": "bijv. Boekweit, penicilline"
          },
          "drink": {
            "l": "Drinken en vocht",
            "s": "Drinken en vocht",
            "p": "bijv. Drinkt alleen water. Drinkt soms niet als de fles een andere vorm heeft."
          }
        }
      },
      "history": {
        "t": "Levensloop",
        "st": "Levensloop",
        "h": "U hoeft niet te schrijven wat u niet wilt schrijven. Per ontvanger kunt u kiezen of dit wordt meegegeven.",
        "q": {
          "early": {
            "l": "Hoe het ging in de eerste jaren",
            "s": "De eerste jaren",
            "p": "bijv. Begon rond 3 jaar te praten. Weinig verlegen bij onbekenden."
          },
          "schools": {
            "l": "Opvang, scholen en andere plekken tot nu toe",
            "s": "Opvang, scholen en andere plekken tot nu toe",
            "p": "bijv. Opvang X → basisschool Y (met extra begeleiding) → nu"
          },
          "events": {
            "l": "Grote gebeurtenissen",
            "s": "Grote gebeurtenissen",
            "p": "bijv. In het 3e jaar van de basisschool van school gewisseld. In de zomer van het 1e jaar middelbare school een tijd niet naar school gegaan."
          },
          "now": {
            "l": "Hoe het nu gaat",
            "s": "De situatie nu",
            "p": "bijv. Gaat 3 dagen per week naar school. Gaat na school naar X."
          }
        }
      },
      "orgs": {
        "t": "Betrokken instanties",
        "st": "Betrokken instanties",
        "h": "Schrijf de plekken waarmee u contact hebt en de namen van de contactpersonen. Per ontvanger kiest u of de contactgegevens worden getoond.",
        "q": {
          "medical": {
            "l": "Ziekenhuis, kliniek",
            "s": "Ziekenhuis, kliniek",
            "p": "bijv. Kliniek X (1 keer per maand, behandelaar: dr. Y)"
          },
          "welfare": {
            "l": "Sociaal loket, zorgaanbieders",
            "s": "Sociaal loket, zorgaanbieders",
            "p": "bijv. Loket van de gemeente (contactpersoon: Y), naschoolse begeleiding Z"
          },
          "school": {
            "l": "Contactpersoon school / opvang",
            "s": "Contactpersoon school / opvang",
            "p": "bijv. Leerkracht: Y, zorgcoördinator: Z"
          },
          "other": {
            "l": "Overig",
            "s": "Overig",
            "p": "bijv. Grootouders (wonen dichtbij, kunnen helpen met halen en brengen)"
          }
        }
      },
      "free": {
        "t": "Vrij invullen",
        "st": "Vrij invullen",
        "h": "",
        "q": {
          "text": {
            "l": "Alles wat u wilt vertellen",
            "s": "Wat we willen vertellen",
            "p": "bijv. Ook een zin die de persoon zelf heeft geschreven, kan hier."
          }
        }
      }
    },
    "give": {
      "title": "Meegeven",
      "intro": "Kies de ontvanger en daarna de onderdelen die u meegeeft. In het begin staat alleen het minimum aan (Pagina 1, Communicatie en Wat te doen bij paniek).",
      "presets": {
        "school": "School",
        "daycare": "Opvang",
        "medical": "Ziekenhuis",
        "family": "Familie"
      },
      "secsHead": "Onderdelen die u meegeeft (tik om aan/uit te zetten)",
      "show": "Tonen (grote letters)",
      "print": "Afdrukken",
      "png": "Pagina 1 als afbeelding opslaan",
      "caution": "Wat u meegeeft, is belangrijke informatie over de persoon. Bepaal eerst aan wie en op welke plek u het geeft.",
      "nothing": "Er zijn nog geen velden ingevuld. Begin gerust bij “Schrijven”.",
      "nothingInSecs": "In de gekozen onderdelen is nog niets ingevuld. Kies meer onderdelen, of begin bij “Schrijven”.",
      "printHint": "Bij afdrukken opent het afdrukvenster van de browser.",
      "pngDone": "Afbeelding opgeslagen ✓"
    },
    "show": {
      "title": "Ondersteuningsboek van {name}",
      "titleNoName": "Ondersteuningsboek",
      "lead": "Dit is geen lijst met eisen, maar een handleiding. We hebben opgeschreven wat handig is om te weten, zodat iedereen die met de persoon omgaat zonder moeite en met een gerust gevoel samen tijd kan doorbrengen.",
      "footer": "Dit boek bevat belangrijke persoonlijke informatie. Zorg er na het lezen voor dat anderen het niet te zien krijgen.",
      "by": "Gemaakt met een app van SOYOGI, adviespunt voor zorg en ondersteuning (geen officieel formulier van de gemeente)"
    },
    "three": {
      "title": "De 3 belangrijkste dingen van vandaag",
      "intro": "De kortste kaart, voor een begeleider of iemand die de persoon alleen vandaag ziet. U schrijft maar 3 regels.",
      "line": "Nr. {n}",
      "p1": "bijv. Graag niet van achteren aanraken",
      "p2": "bijv. Handen op de oren? Dan naar een rustige plek",
      "p3": "bijv. Rijstballen zonder zeewier",
      "show": "Groot tonen",
      "head": "De 3 belangrijkste dingen van vandaag",
      "empty": "Nog niets geschreven."
    },
    "about": {
      "title": "De pagina “Dit is een handleiding”",
      "intro": "Deze tekst is bedoeld om zo aan de ontvanger te laten zien. Bij “Meegeven” komt deze pagina altijd als eerste.",
      "body": [
        "Dit is geen lijst met eisen, maar een handleiding.",
        "Dit boek is geschreven door de persoon en de familie, zodat u de persoon beter leert kennen. Het is niet bedoeld om ergens sterk op aan te dringen. Het bevat wat handig is om te weten, zodat iedereen die met de persoon omgaat zonder moeite en met een gerust gevoel samen tijd kan doorbrengen.",
        "Het is ook geen lijst van wat de persoon niet kan. Het zijn aanknopingspunten: zo is deze persoon, en zo komt iets goed over.",
        "Wat hier staat, is wat we thuis zien. Op een andere plek kan het anders zijn. Als u iets opmerkt, laat het ons dan graag weten. Dan passen we het samen aan.",
        "Dit boek bevat belangrijke persoonlijke informatie. Zorg er na het lezen voor dat anderen het niet te zien krijgen."
      ],
      "show": "Deze pagina groot tonen"
    }
  }
});
/* ---- /nl ---- */
/* ---- sv: 翻訳 ---- */
TBL.sv = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "Bra att veta-boken - SOYOGI",
    "short": "Bra att veta-boken",
    "tagline": "Det här är inga krav. Det är en bruksanvisning."
  },
  "nav": {
    "home": "Hem",
    "book": "Skriv",
    "give": "Lämna över",
    "three": "Dagens 3",
    "set": "Alternativ"
  },
  "common": {
    "ok": "OK",
    "cancel": "Avbryt",
    "save": "Spara",
    "del": "Ta bort",
    "back": "Tillbaka",
    "close": "Stäng",
    "yes": "Ja",
    "no": "Nej",
    "add": "Lägg till",
    "edit": "Ändra",
    "next": "Nästa",
    "prev": "Föregående",
    "done": "Klar",
    "saved": "Sparat ✓",
    "saveFail": "Det gick inte att spara",
    "storageFull": "Minnet är fullt, det gick inte att spara",
    "deleted": "Borttaget",
    "delConfirm": "Vill du verkligen ta bort det här?",
    "empty": "Inget här ännu",
    "optional": "Du behöver inte fylla i allt.",
    "today": "Idag",
    "backConfirm": "Det du har skrivit är inte sparat än. Vill du slänga det och gå tillbaka?",
    "photo": {
      "camera": "Ta ett foto",
      "roll": "Välj bland bilder",
      "cropTitle": "Beskär bilden",
      "cropHint": "Flytta med fingret eller med pilarna och ändra storleken med reglaget.",
      "zoom": "Storlek",
      "panUp": "Upp",
      "panDown": "Ned",
      "panLeft": "Vänster",
      "panRight": "Höger",
      "make": "Använd den här",
      "fail": "Det gick inte att läsa in bilden"
    }
  },
  "set": {
    "hNormal": "Vanliga inställningar",
    "hBackup": "Byta telefon (säkerhetskopia)",
    "fs": "Textstorlek",
    "fsSizes": [
      "Normal",
      "Stor",
      "Mycket stor"
    ],
    "lang": "ことば / Language",
    "theme": "Färg",
    "themes": [
      "Grön",
      "Ljusblå",
      "Vit",
      "Svart"
    ],
    "bgm": "Musik",
    "bgms": [
      "Ingen",
      "Grön ton",
      "Blå ton"
    ],
    "sound": "Tryckljud",
    "on": "PÅ",
    "off": "AV",
    "bkHint": "När du byter till en ny telefon: tryck på ”Exportera” för att spara en fil, och tryck sedan på ”Importera” i den nya telefonen. JSON-kopian av stödboken är samma fil.",
    "bkExport": "Exportera",
    "bkImport": "Importera",
    "exported": "Exporterat ✓",
    "imported": "Importerat ✓",
    "importFail": "Det gick inte att importera",
    "importConfirm": "Det du har skrivit nu ersätts med innehållet i filen. Vill du importera?",
    "note": "Allt du skriver sparas bara i den här enheten. Inget skickas någonstans.",
    "privacy": "Integritetspolicy",
    "credit": "Utvecklad av SOYOGI, en rådgivning om omsorg och stöd"
  },
  "guide": {
    "title": "Så används appen",
    "step": "{n} / {m}",
    "start": "Börja",
    "again": "Visa igen",
    "heads": [
      "Välkommen till Bra att veta-boken - SOYOGI",
      "Börja med första sidan",
      "Ett avsnitt i taget",
      "”Lämna över”: anpassat efter mottagaren",
      "Dagens 3 viktigaste saker",
      "Sidan ”Det här är en bruksanvisning”",
      "Det du skriver stannar på den här enheten",
      "Lättare att läsa"
    ],
    "bodies": [
      "Appen är en ”bruksanvisning” om personen, som personen själv och familjen skriver tillsammans. Det här är inga krav. Det är en bruksanvisning.\nDu kan lämna den till dem som umgås med personen, till exempel skola, omsorg, sjukvård eller familj, med det som är bra för var och en att veta.\nOm ni lämnar över den och vad ni visar bestämmer ni alltid själva.",
      "Tryck på ”Skriv” längst ner så visas 11 avsnitt.\nBörja överst med ”Första sidan (det vi vill att du läser först)” och skriv kort under ”Detta ber vi dig att aldrig göra” och ”Kontakta oss om detta händer”. Den delen visas först, med stor text.\nDu behöver inte fylla i allt.",
      "Välj ett avsnitt under ”Skriv” så visas frågorna. Det du skriver sparas automatiskt och kan ändras när som helst.\nDe flesta avsnitt har ”Tips för att skriva” överst. Med ”Föregående” och ”Nästa” går du till avsnittet bredvid, och när du är klar trycker du på ”Till listan med avsnitt”.\nOm du har en fil som exporterats från Moshimo Card fyller ”Läs in en fil från Moshimo Card” längst ner under ”Skriv” i de tomma fälten.",
      "Välj mottagare under ”Lämna över” längst ner (Skola, Omsorg, Sjukvård eller Familj) och avsnitt under ”Avsnitt som visas (tryck för att växla)”. Från början är bara det minsta med: första sidan, kommunikation och panik.\nMed ”Visa (stor text)” visar du skärmen som den är. Du kan också välja ”Spara första sidan som bild”.\nDet du visar är personens viktiga uppgifter. Bestäm först vem som ska få dem och var.",
      "”Dagens 3” längst ner är det kortaste kortet, för den som följer med personen eller bara träffar hen i dag.\nSkriv bara tre rader och tryck på ”Visa stort”. Tillbaka kommer du med ”Stäng”.",
      "På Hem finns en knapp med texten: Sidan ”Det här är en bruksanvisning”. Den öppnar en text som du visar för mottagaren som den är.\nMed ”Visa den här sidan stort” visar du den.\nNär du lämnar över kommer alltid en kort version av texten först.",
      "Allt du skriver sparas bara på den här enheten. Inget skickas någonstans och du behöver inget konto.\nNär du byter telefon trycker du på ”Exportera” under ”Alternativ” för att spara en fil och sedan på ”Importera” i den nya telefonen.\nVar rädd om det du har visat eller sparat som bild.",
      "Under ”Alternativ” kan du ändra ”Textstorlek” (Normal, Stor, Mycket stor) och ”Färg” (Grön, Ljusblå, Vit, Svart).\nSpråket väljer du uppe till höger under ”Language”.\nDen här guiden kan du se igen när som helst med ”Visa igen” vid ”Så används appen” under ”Alternativ”."
    ]
  },
  "screen": {
    "home": {
      "title": "Bra att veta-boken",
      "intro": "En ”bruksanvisning” om personen, som personen själv och familjen skriver tillsammans. Du kan visa den för skola, omsorg, sjukvård och familj, anpassad efter vem som ska läsa.",
      "write": "Skriv (svara på 11 avsnitt)",
      "give": "Lämna över (anpassa efter mottagaren)",
      "three": "Dagens 3 viktigaste saker",
      "about": "Sidan ”Det här är en bruksanvisning”",
      "progress": "Ifyllda fält: {n}",
      "firstEmpty": "Börja gärna med ”Första sidan”. Du behöver inte fylla i allt.",
      "firstHead": "Första sidan (det vi vill att du läser först)",
      "privacyNote": "Det du skriver finns bara i den här enheten. Var försiktig när du lämnar över det."
    },
    "book": {
      "title": "Skriv",
      "intro": "Välj ett avsnitt och svara på frågorna. Du kan ändra när du vill.",
      "filled": "Ifyllda: {n}",
      "filledNone": "Inte än",
      "moshimo": "Läs in en fil från Moshimo Card",
      "moshimoHint": "Läs in JSON-filen som du har exporterat från Moshimo Card. Då fylls tomma fält som namn, kontaktuppgifter och allergier i, så att du slipper skriva två gånger.",
      "moshimoDone": "{n} fält ifyllda ✓",
      "moshimoNone": "Inga fält att fylla i (de är redan ifyllda)",
      "moshimoFail": "Det här är inte en fil från Moshimo Card"
    },
    "sec": {
      "hintHead": "Tips för att skriva",
      "goBook": "Till listan med avsnitt",
      "autosave": "Det du skriver sparas automatiskt."
    },
    "secs": {
      "first": {
        "t": "Första sidan (det vi vill att du läser först)",
        "st": "Första sidan: det vi vill att du läser först",
        "h": "Det här visas först, med stor text. Skriv kort och tydligt.",
        "q": {
          "never": {
            "l": "Detta ber vi dig att aldrig göra",
            "s": "Detta ber vi dig att aldrig göra",
            "p": "t.ex. Skäll inte på hen inför många människor. Rör inte vid hen plötsligt bakifrån."
          },
          "contact": {
            "l": "Kontakta oss om detta händer",
            "s": "Kontakta oss om detta händer",
            "p": "t.ex. Om hen inte slutar gråta på 30 minuter. Om hen blir stilla med något i munnen. Kontakt: mamma 090-0000-0000"
          }
        }
      },
      "profile": {
        "t": "Profil",
        "st": "Profil",
        "h": "Namnet behöver inte vara det riktiga namnet (anpassa efter mottagaren).",
        "q": {
          "name": {
            "l": "Namn (vad hen vill kallas)",
            "s": "Namn (tilltal)",
            "p": "t.ex. Soyo (känner sig trygg när hen kallas ”Soyo-chan”)"
          },
          "age": {
            "l": "Ålder, årskurs m.m.",
            "s": "Ålder, årskurs m.m.",
            "p": ""
          },
          "oneLine": {
            "l": "Med några ord: vem är hen?",
            "s": "Med några ord",
            "p": "t.ex. Tycker om tåg och faktaböcker och följer regler noggrant"
          },
          "body": {
            "l": "Kropp och mediciner",
            "s": "Kropp och mediciner",
            "p": "t.ex. Tar medicin mot epilepsi morgon och kväll. Mer information finns i Moshimo Card."
          }
        }
      },
      "likes": {
        "t": "Tycker om / har svårt för",
        "st": "Sådant hen tycker om och har svårt för",
        "h": "Skriv ”hur mycket” med ord, inte med siffror eller tecken (t.ex. tycker väldigt mycket om / jobbigt att ens titta på).",
        "q": {
          "like": {
            "l": "Sådant hen tycker om",
            "s": "Tycker om",
            "p": "t.ex. Tåg (tycker väldigt mycket om, blir lugn av att få se dem), att rita"
          },
          "dislike": {
            "l": "Sådant hen har svårt för",
            "s": "Har svårt för",
            "p": "t.ex. Plötsliga ändringar i planerna (jobbigt att ens titta på), sorl"
          },
          "calm": {
            "l": "Sådant som lugnar",
            "s": "Sådant som lugnar",
            "p": "t.ex. Att titta i en faktabok, hörselkåpor, 5 minuter i ett tyst rum"
          }
        }
      },
      "daily": {
        "t": "Vardagliga aktiviteter",
        "st": "Vardagliga aktiviteter",
        "h": "Dela inte in i kan/kan inte med tecken. Skriv med ord, till exempel ”klarar själv”, ”klarar om någon säger till”, ”klarar tillsammans med någon” eller ”behöver hjälp”.",
        "q": {
          "eat": {
            "l": "Äta",
            "s": "Måltider",
            "p": "t.ex. Äter själv. Har svårt med ätpinnar och använder sked."
          },
          "toilet": {
            "l": "Toalett",
            "s": "Toalett",
            "p": "t.ex. Klarar det om någon säger till. På nya ställen, visa gärna först var toaletten är."
          },
          "dress": {
            "l": "Klä på sig, göra sig i ordning",
            "s": "Påklädning, göra sig i ordning",
            "p": "t.ex. Klarar det tillsammans med någon. Behöver hjälp med knappar."
          },
          "move": {
            "l": "Förflytta sig, gå ut",
            "s": "Förflyttning, att gå ut",
            "p": "t.ex. Känner sig trygg när hen håller någon i handen. Klarar inte att vänta vid trafikljus på egen hand."
          },
          "other": {
            "l": "Övrigt",
            "s": "Övrigt",
            "p": "t.ex. Kan ta sin medicin själv om någon tittar på."
          }
        }
      },
      "comm": {
        "t": "Kommunikation",
        "st": "Kommunikation",
        "h": "Skriv i ordningen ”det man ser → den verkliga orsaken → det vi ber om”, så blir det lättare att förstå.",
        "q": {
          "from": {
            "l": "När personen själv vill säga något",
            "s": "Hur personen själv uttrycker sig",
            "p": "t.ex. Kan prata, men tystnar när det blir svårt. Om man skriver på ett papper och visar hen kommer orden lättare."
          },
          "to": {
            "l": "Sätt att säga saker som når fram",
            "s": "Sätt att säga saker som når fram",
            "p": "t.ex. Kort och en sak i taget. Säg hellre ”gör så här” än ”gör inte”."
          },
          "sign": {
            "l": "Det man ser → den verkliga orsaken → det vi ber om",
            "s": "Det man ser, den verkliga orsaken och det vi ber om",
            "p": "t.ex. Lämnar plötsligt klassrummet → ljuden blir för mycket → kom gärna överens i förväg om att det är okej att gå ut"
          },
          "worked": {
            "l": "Det som har fungerat",
            "s": "Det som har fungerat",
            "p": "t.ex. Visa ändringar i planerna på papper dagen innan. Då kunde hen vara lugn på dagen."
          }
        }
      },
      "panic": {
        "t": "Vid panik",
        "st": "Bemötande vid panik",
        "h": "Även här: ”det man ser → den verkliga orsaken → det vi ber om”. Fundera på om ett ”svårt beteende” kan bytas mot en hjälpuppgift som hen får göra, och skriv ner det.",
        "q": {
          "trigger": {
            "l": "Sådant som lätt kan utlösa",
            "s": "Sådant som lätt kan utlösa",
            "p": "t.ex. Höga ljud, ändrade planer, att förlora"
          },
          "before": {
            "l": "Förvarningar (det man ser)",
            "s": "Förvarningar (det man ser)",
            "p": "t.ex. Håller för öronen, upprepar samma ord"
          },
          "doThis": {
            "l": "Det vi ber om",
            "s": "Det vi ber om",
            "p": "t.ex. Säg ingenting, gå till en lugn plats. Håll uppsikt i 5 minuter. När det har gått över, säg bara: ”Bra att du hittade tillbaka.”"
          },
          "dont": {
            "l": "Det vi ber dig att inte göra",
            "s": "Det vi ber dig att inte göra",
            "p": "t.ex. Röra vid hen bakifrån, ropa hens namn högt, fråga varför just då"
          },
          "swap": {
            "l": "Förslag: byt ett svårt beteende mot en ”hjälpuppgift som hen får göra”",
            "s": "Svårt beteende utbytt mot en hjälpuppgift som hen får göra",
            "p": "t.ex. Kastar saker → får ansvar för att bära tunga saker. Springer runt → får ansvar för att dela ut papper."
          },
          "worked": {
            "l": "Det som har fungerat",
            "s": "Det som har fungerat",
            "p": "t.ex. Hen klarar att vänta om man räknar: ”tre till, sen är det klart”."
          }
        }
      },
      "sense": {
        "t": "Sinnen",
        "st": "Sinnen",
        "h": "Skriv både om sådant hen känner mycket starkt och sådant hen knappt känner.",
        "q": {
          "sound": {
            "l": "Ljud",
            "s": "Ljud",
            "p": "t.ex. Skolklockan, hårtorkar och sorl är jobbiga. Med hörselkåpor blir det mycket lättare."
          },
          "light": {
            "l": "Ljus, synintryck",
            "s": "Ljus, synintryck",
            "p": "t.ex. Flimmer från lysrör stör. En plats vid fönstret är lättare."
          },
          "touch": {
            "l": "Beröring, kläder",
            "s": "Beröring, kläder",
            "p": "t.ex. Klädlappar gör ont. Hajar till om någon plötsligt klappar hen på axeln."
          },
          "smell": {
            "l": "Lukt, smak",
            "s": "Lukt, smak",
            "p": "t.ex. Kan må illa av lukten från skolmaten."
          },
          "other": {
            "l": "Övrigt (smärta, värme, kyla m.m.)",
            "s": "Övrigt (smärta, värme, kyla m.m.)",
            "p": "t.ex. Märker inte lätt smärta. Säger inget även om hen har skadat sig."
          }
        }
      },
      "food": {
        "t": "Köpt mat som hen kan äta",
        "st": "Köpt mat som hen kan äta",
        "h": "Även en liknande produkt går ibland inte att äta. Skriv tillverkare, produktnamn och smak. För allergier gäller det som står i Moshimo Card.",
        "q": {
          "ok": {
            "l": "Köpt mat som hen kan äta",
            "s": "Köpt mat som hen kan äta",
            "p": "t.ex. Risboll med salt från X (utan sjögräs), naturell yoghurt från Y"
          },
          "ng": {
            "l": "Mat som hen inte kan äta",
            "s": "Mat som hen inte kan äta",
            "p": "t.ex. Blandade rätter (curry, gryta), gröna grönsaker"
          },
          "allergy": {
            "l": "Allergier (samma som i Moshimo Card)",
            "s": "Allergier",
            "p": "t.ex. Bovete, penicillin"
          },
          "drink": {
            "l": "Dryck, vätska",
            "s": "Dryck, vätska",
            "p": "t.ex. Dricker bara vatten. Dricker ibland inte om flaskan har en annan form."
          }
        }
      },
      "history": {
        "t": "Uppväxt",
        "st": "Uppväxt",
        "h": "Du behöver inte skriva det du inte vill. Du kan välja för varje mottagare om det ska visas.",
        "q": {
          "early": {
            "l": "Som liten",
            "s": "Som liten",
            "p": "t.ex. Började prata vid ungefär 3 års ålder. Var sällan blyg för nya människor."
          },
          "schools": {
            "l": "Förskolor, skolor och andra ställen hen har gått på",
            "s": "Förskolor, skolor och andra ställen",
            "p": "t.ex. X förskola → Y skola (med stöd i liten grupp en del av tiden) → nu"
          },
          "events": {
            "l": "Stora händelser",
            "s": "Stora händelser",
            "p": "t.ex. Bytte skola i årskurs 3. Var hemma från skolan en period sommaren i årskurs 7."
          },
          "now": {
            "l": "Hur det är nu",
            "s": "Hur det är nu",
            "p": "t.ex. Går till skolan 3 dagar i veckan. Går till X efter skolan."
          }
        }
      },
      "orgs": {
        "t": "Kontakter",
        "st": "Verksamheter och kontaktpersoner",
        "h": "Skriv de ställen ni har kontakt med och namnen på kontaktpersonerna. Du väljer för varje mottagare om kontaktuppgifterna ska visas.",
        "q": {
          "medical": {
            "l": "Sjukhus, mottagning",
            "s": "Sjukhus, mottagning",
            "p": "t.ex. X-mottagningen (en gång i månaden, läkare Y)"
          },
          "welfare": {
            "l": "Kommun och stödverksamheter",
            "s": "Kommun och stödverksamheter",
            "p": "t.ex. Kommunens rådgivning (kontaktperson Y), verksamheten Z efter skolan"
          },
          "school": {
            "l": "Kontaktpersoner i skola och förskola",
            "s": "Kontaktpersoner i skola och förskola",
            "p": "t.ex. Klasslärare Y, specialpedagog Z"
          },
          "other": {
            "l": "Övrigt",
            "s": "Övrigt",
            "p": "t.ex. Far- och morföräldrar (bor nära och kan hjälpa till att lämna och hämta)"
          }
        }
      },
      "free": {
        "t": "Fri text",
        "st": "Fri text",
        "h": "",
        "q": {
          "text": {
            "l": "Allt annat du vill berätta",
            "s": "Det vi vill berätta",
            "p": "t.ex. Några ord som personen själv har skrivit passar också här."
          }
        }
      }
    },
    "give": {
      "title": "Lämna över",
      "intro": "Välj mottagare och sedan vilka avsnitt som ska visas. Från början visas bara det minsta (första sidan, kommunikation och bemötande vid panik).",
      "presets": {
        "school": "Skola",
        "daycare": "Omsorg",
        "medical": "Sjukvård",
        "family": "Familj"
      },
      "secsHead": "Avsnitt som visas (tryck för att växla)",
      "show": "Visa (stor text)",
      "print": "Skriv ut",
      "png": "Spara första sidan som bild",
      "caution": "Det du visar eller skriver ut är personens viktiga uppgifter. Bestäm först vem som ska få dem och var.",
      "nothing": "Inget är ifyllt ännu. Börja gärna under ”Skriv”.",
      "nothingInSecs": "Inget är ifyllt i de valda avsnitten ännu. Välj fler avsnitt eller börja under ”Skriv”.",
      "printHint": "Vid utskrift öppnas webbläsarens utskriftsfönster.",
      "pngDone": "Bilden har sparats ✓"
    },
    "show": {
      "title": "Stödbok för {name}",
      "titleNoName": "Stödbok",
      "lead": "Det här är inga krav, utan en bruksanvisning. Vi har samlat sådant som är bra att veta, så att de som möter personen kan vara tillsammans med hen tryggt och utan onödig ansträngning.",
      "footer": "Den här boken innehåller viktiga personliga uppgifter. När du har läst den, förvara den så att ingen annan kan se den.",
      "by": "Skapad med en app från SOYOGI, en rådgivning om omsorg och stöd (inte en blankett från kommunen)"
    },
    "three": {
      "title": "Dagens 3 viktigaste saker",
      "intro": "Det kortaste kortet, att ge till den som leder en utflykt eller någon ni bara träffar idag. Skriv bara 3 rader.",
      "line": "Nr {n}",
      "p1": "t.ex. Rör inte vid hen bakifrån, tack",
      "p2": "t.ex. Om hen håller för öronen: gå till en lugn plats",
      "p3": "t.ex. Risbollar utan sjögräs",
      "show": "Visa stort",
      "head": "Dagens 3 viktigaste saker",
      "empty": "Inget skrivet ännu."
    },
    "about": {
      "title": "Sidan ”Det här är en bruksanvisning”",
      "intro": "Den här sidan visas för mottagaren precis som den är. När du tar fram något under ”Lämna över” kommer den alltid först.",
      "body": [
        "Det här är inga krav, utan en bruksanvisning.",
        "Den här boken har skrivits av personen och familjen, för att du ska få lära känna personen. Den är inte till för att kräva något. Vi har samlat sådant som är bra att veta, så att de som möter personen kan vara tillsammans med hen tryggt och utan onödig ansträngning.",
        "Det är inte heller en lista över vad hen inte kan. Det är ledtrådar: så här är hen, och så här når man fram.",
        "Det som står här är det vi ser hemma. På andra ställen kan det vara annorlunda. Om du märker något, berätta det gärna. Vi ändrar det tillsammans.",
        "Den här boken innehåller viktiga personliga uppgifter. När du har läst den, förvara den så att ingen annan kan se den."
      ],
      "show": "Visa den här sidan stort"
    }
  }
});
/* ---- /sv ---- */
/* ---- ko: 翻訳 ---- */
TBL.ko = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "알아 두셨으면 하는 것 - SOYOGI",
    "short": "알아 두셨으면 하는 것",
    "tagline": "요구가 아니라, 설명서예요."
  },
  "nav": {
    "home": "홈",
    "book": "쓰기",
    "give": "건네기",
    "three": "오늘의 3가지",
    "set": "설정"
  },
  "common": {
    "ok": "확인",
    "cancel": "취소",
    "save": "저장",
    "del": "삭제",
    "back": "뒤로",
    "close": "닫기",
    "yes": "네",
    "no": "아니요",
    "add": "추가",
    "edit": "수정",
    "next": "다음",
    "prev": "이전",
    "done": "완료",
    "saved": "저장했어요 ✓",
    "saveFail": "저장하지 못했어요",
    "storageFull": "저장 공간이 가득 차서 저장할 수 없어요",
    "deleted": "삭제했어요",
    "delConfirm": "정말 삭제할까요?",
    "empty": "아직 아무것도 없어요",
    "optional": "모두 적지 않아도 괜찮아요.",
    "today": "오늘",
    "backConfirm": "적은 내용이 아직 저장되지 않았어요. 버리고 돌아갈까요?",
    "photo": {
      "camera": "카메라로 찍기",
      "roll": "사진에서 고르기",
      "cropTitle": "사진 자르기",
      "cropHint": "손가락으로 움직이거나 화살표로 맞추고, 슬라이더로 크기를 바꿔요.",
      "zoom": "크기",
      "panUp": "위로",
      "panDown": "아래로",
      "panLeft": "왼쪽으로",
      "panRight": "오른쪽으로",
      "make": "이걸로 정하기",
      "fail": "사진을 불러오지 못했어요"
    }
  },
  "set": {
    "hNormal": "기본 설정",
    "hBackup": "기기 변경(백업)",
    "fs": "글자 크기",
    "fsSizes": [
      "보통",
      "크게",
      "아주 크게"
    ],
    "lang": "ことば / Language",
    "theme": "색",
    "themes": [
      "초록",
      "하늘색",
      "흰색",
      "검정"
    ],
    "bgm": "BGM",
    "bgms": [
      "없음",
      "초록의 소리",
      "파랑의 소리"
    ],
    "sound": "터치음",
    "on": "ON",
    "off": "OFF",
    "bkHint": "새 스마트폰으로 옮길 때는 “내보내기”로 파일을 저장하고, 새 스마트폰에서 “불러오기”를 눌러 주세요. 서포트북의 사본(JSON)도 이것과 같아요.",
    "bkExport": "내보내기",
    "bkImport": "불러오기",
    "exported": "내보냈어요 ✓",
    "imported": "불러왔어요 ✓",
    "importFail": "불러오지 못했어요",
    "importConfirm": "지금 적은 내용이 파일의 내용으로 바뀌어요. 불러올까요?",
    "note": "적은 내용은 모두 이 기기 안에만 저장돼요. 어디에도 보내지지 않아요.",
    "privacy": "개인정보 처리방침",
    "credit": "앱 개발: 돌봄과 지원 상담소 SOYOGI"
  },
  "guide": {
    "title": "사용 방법",
    "step": "{n} / {m}",
    "start": "시작하기",
    "again": "다시 보기",
    "heads": [
      "알아 두셨으면 하는 것 - SOYOGI에 오신 것을 환영해요",
      "먼저 \"첫 장\"부터",
      "항목을 하나씩 쓰기",
      "\"건네기\"는 상대에 맞춰",
      "오늘 가장 중요한 3가지",
      "“설명서예요” 페이지",
      "적은 내용은 이 기기 안에만",
      "보기 편하게 하기"
    ],
    "bodies": [
      "이 앱은 본인과 가족이 함께 쓰는, 본인의 “설명서”예요. 요구가 아니라, 설명서예요.\n학교·돌봄 기관·병원·가족 등 본인과 함께 지내는 사람에게, 알아 두면 도움이 되는 것을 상대에 맞춰 건넬 수 있어요.\n건넬지 말지, 무엇을 보여 줄지는 언제나 스스로 정할 수 있어요.",
      "아래의 \"쓰기\"를 누르면 11개 항목이 나와요.\n먼저 맨 위 \"첫 장 (가장 먼저 읽어 주었으면 하는 것)\"에 \"절대로 하지 않았으면 하는 것\"과 \"이럴 때는 연락해 주세요\"를 짧게 적어요. 이 부분은 상대에게 가장 먼저, 큰 글씨로 나와요.\n다 적지 않아도 괜찮아요.",
      "\"쓰기\"에서 항목을 고르면 질문이 나와요. 적으면 자동으로 저장되고, 나중에 언제든 고칠 수 있어요.\n대부분의 항목 위에는 \"쓰는 요령\"이 나와요. \"이전\" \"다음\"으로 옆 항목으로 옮기고, 다 적으면 \"항목 목록으로\"를 눌러요.\n모시모 카드에서 내보낸 파일이 있으면, \"쓰기\" 아래쪽의 \"모시모 카드 파일 불러오기\"로 빈칸을 채울 수 있어요.",
      "아래의 \"건네기\"에서 상대(학교·돌봄 기관·병원·가족)를 고르고, \"보여 줄 항목 (탭해서 바꾸기)\"에서 항목을 골라요. 처음에는 첫 장·소통 방법·패닉일 때의 대응만 들어 있어요.\n\"보여 주기 (큰 글씨)\"로 화면을 그대로 보여 줄 수 있어요. \"첫 장을 이미지로 저장\"도 할 수 있어요.\n보여 주는 내용은 본인의 소중한 정보예요. 건넬 상대와 장소를 정한 다음에 보여 주세요.",
      "아래의 \"오늘의 3가지\"는 함께 다니는 사람이나 오늘만 만나는 사람에게 보여 주는, 가장 짧은 카드예요.\n세 줄만 적고 \"크게 보여 주기\"를 눌러요. 돌아갈 때는 \"닫기\"를 눌러요.",
      "홈의 “설명서예요” 페이지 버튼을 누르면, 상대에게 그대로 보여 주는 글을 읽을 수 있어요.\n\"이 페이지를 크게 보여 주기\"로 보여 줄 수 있어요.\n\"건네기\"로 보여 줄 때도 언제나 맨 앞에 짧은 글이 붙어요.",
      "적은 내용은 모두 이 기기 안에만 저장되고, 어디에도 보내지 않아요. 가입도 필요 없어요.\n휴대폰을 바꿀 때는 \"설정\"의 \"내보내기\"로 파일을 남기고, 새 휴대폰에서 \"불러오기\"를 눌러요.\n보여 준 것이나 이미지로 저장한 것은 조심해서 다뤄 주세요.",
      "\"설정\"에서 \"글자 크기\"(보통 · 크게 · 아주 크게)와 \"색\"(초록 · 하늘색 · 흰색 · 검정)을 바꿀 수 있어요.\n언어는 오른쪽 위의 \"Language\"에서 골라요.\n이 안내는 \"설정\"의 \"사용 방법\"에서 \"다시 보기\"를 누르면 언제든 다시 볼 수 있어요."
    ]
  },
  "screen": {
    "home": {
      "title": "알아 두셨으면 하는 것",
      "intro": "본인과 가족이 함께 쓰는, 본인의 “설명서”예요. 학교·돌봄 기관·병원·가족에게 상대에 맞춰 보여 줄 수 있어요.",
      "write": "쓰기 (11개 항목에 답하기)",
      "give": "건네기 (상대에 맞춰 보여 주기)",
      "three": "오늘 가장 중요한 3가지",
      "about": "“설명서예요” 페이지",
      "progress": "적은 칸: {n}",
      "firstEmpty": "먼저 “첫 장”부터 시작해 보세요. 모두 적지 않아도 괜찮아요.",
      "firstHead": "첫 장 (가장 먼저 읽어 주었으면 하는 것)",
      "privacyNote": "적은 내용은 이 기기 안에만 있어요. 건넬 때는 취급에 주의해 주세요."
    },
    "book": {
      "title": "쓰기",
      "intro": "항목을 하나 골라 질문에 답해요. 나중에 언제든지 고칠 수 있어요.",
      "filled": "{n}개 작성",
      "filledNone": "아직",
      "moshimo": "모시모 카드 파일 불러오기",
      "moshimoHint": "모시모 카드에서 “내보내기”한 JSON을 불러오면 이름·연락처·알레르기 등을 비어 있는 칸에 넣어요(두 번 적지 않아도 돼요).",
      "moshimoDone": "{n}개 넣었어요 ✓",
      "moshimoNone": "넣을 칸이 없었어요(이미 적혀 있어요)",
      "moshimoFail": "모시모 카드 파일이 아니에요"
    },
    "sec": {
      "hintHead": "쓰는 요령",
      "goBook": "항목 목록으로",
      "autosave": "적으면 자동으로 저장돼요."
    },
    "secs": {
      "first": {
        "t": "첫 장 (가장 먼저 읽어 주었으면 하는 것)",
        "st": "첫 장 · 가장 먼저 읽어 주었으면 하는 것",
        "h": "이 부분은 큰 글씨로 가장 먼저 나와요. 짧고 분명하게 적어요.",
        "q": {
          "never": {
            "l": "절대로 하지 않았으면 하는 것",
            "s": "절대로 하지 않았으면 하는 것",
            "p": "예: 여러 사람 앞에서 꾸짖지 않기. 뒤에서 갑자기 만지지 않기."
          },
          "contact": {
            "l": "이럴 때는 연락해 주세요",
            "s": "이럴 때는 연락해 주세요",
            "p": "예: 30분 동안 울음을 그치지 않을 때. 입에 무언가를 넣은 채 움직이지 않을 때. 연락처: 어머니 090-0000-0000"
          }
        }
      },
      "profile": {
        "t": "프로필",
        "st": "프로필",
        "h": "이름은 본명이 아니어도 괜찮아요(건넬 상대에 맞춰서).",
        "q": {
          "name": {
            "l": "이름 (부르는 법)",
            "s": "이름 (호칭)",
            "p": "예: 소요 (“소요야”라고 불러 주면 안심해요)"
          },
          "age": {
            "l": "나이·학년 등",
            "s": "나이·학년 등",
            "p": ""
          },
          "oneLine": {
            "l": "한마디로 말하면 어떤 사람",
            "s": "한마디로 말하면",
            "p": "예: 전철과 도감을 좋아하고, 규칙을 성실하게 지키는 사람"
          },
          "body": {
            "l": "몸에 관한 것·약",
            "s": "몸에 관한 것·약",
            "p": "예: 뇌전증 약을 아침과 밤에 먹고 있어요. 자세한 내용은 모시모 카드에."
          }
        }
      },
      "likes": {
        "t": "좋아하는 것·힘들어하는 것",
        "st": "좋아하는 것·힘들어하는 것",
        "h": "“얼마나”는 숫자나 기호가 아니라 말로 적어요(예: 아주 좋아해요 / 보는 것조차 힘들어요).",
        "q": {
          "like": {
            "l": "좋아하는 것",
            "s": "좋아하는 것",
            "p": "예: 전철(아주 좋아해요·보여 주면 차분해져요), 그림 그리기"
          },
          "dislike": {
            "l": "힘들어하는 것",
            "s": "힘들어하는 것",
            "p": "예: 갑작스러운 일정 변경(보는 것조차 힘들어요), 웅성거리는 소리"
          },
          "calm": {
            "l": "마음이 차분해지는 것",
            "s": "마음이 차분해지는 것",
            "p": "예: 도감 보기, 이어머프, 조용한 방에서 5분"
          }
        }
      },
      "daily": {
        "t": "일상생활 동작",
        "st": "일상생활 동작",
        "h": "할 수 있다·없다를 기호로 나누지 말고, “혼자 할 수 있어요” “말로 알려 주면 할 수 있어요” “함께 하면 할 수 있어요” “도움이 필요해요”처럼 말로 적어요.",
        "q": {
          "eat": {
            "l": "먹기",
            "s": "식사",
            "p": "예: 혼자 먹을 수 있어요. 젓가락은 어려워서 숟가락을 써요."
          },
          "toilet": {
            "l": "화장실",
            "s": "화장실",
            "p": "예: 말로 알려 주면 갈 수 있어요. 처음 가는 곳에서는 화장실 위치를 먼저 알려 주세요."
          },
          "dress": {
            "l": "옷 갈아입기·몸단장",
            "s": "옷 갈아입기·몸단장",
            "p": "예: 함께 하면 할 수 있어요. 단추는 도움이 필요해요."
          },
          "move": {
            "l": "이동·밖에 나갈 때",
            "s": "이동·외출",
            "p": "예: 손을 잡고 있으면 안심해요. 신호는 혼자서 기다리지 못해요."
          },
          "other": {
            "l": "그 밖에",
            "s": "기타",
            "p": "예: 약은 누가 지켜봐 주면 스스로 먹을 수 있어요."
          }
        }
      },
      "comm": {
        "t": "소통 방법",
        "st": "소통 방법",
        "h": "“보이는 행동 → 진짜 이유 → 해 주었으면 하는 것” 순서로 적으면 상대에게 잘 전해져요.",
        "q": {
          "from": {
            "l": "본인이 전할 때",
            "s": "본인이 전하는 방법",
            "p": "예: 말은 할 수 있지만, 곤란하면 말이 없어져요. 종이에 적어서 보여 주면 말이 나와요."
          },
          "to": {
            "l": "본인에게 잘 전해지는 말투",
            "s": "본인에게 잘 전해지는 말투",
            "p": "예: 짧게, 하나씩. “~하지 않기”보다 “~하기”로."
          },
          "sign": {
            "l": "보이는 행동 → 진짜 이유 → 해 주었으면 하는 것",
            "s": "보이는 행동과 진짜 이유, 해 주었으면 하는 것",
            "p": "예: 갑자기 교실을 나가요 → 소리가 힘들어서 한계예요 → “나가도 된다”고 미리 정해 두면 좋겠어요"
          },
          "worked": {
            "l": "잘 통했던 방법",
            "s": "잘 통했던 방법",
            "p": "예: 일정 변경은 전날에 종이로 보여 줘요. 그랬더니 당일에 차분하게 지낼 수 있었어요."
          }
        }
      },
      "panic": {
        "t": "패닉일 때의 대응",
        "st": "패닉일 때의 대응",
        "h": "여기도 “보이는 행동 → 진짜 이유 → 해 주었으면 하는 것” 순서로 적어요. “곤란한 행동”은 “해도 되는 도움 역할”로 바꿀 수 없을지 생각해서 적어요.",
        "q": {
          "trigger": {
            "l": "계기가 되기 쉬운 것",
            "s": "계기가 되기 쉬운 것",
            "p": "예: 큰 소리, 일정 변경, 지는 것"
          },
          "before": {
            "l": "조짐 (보이는 행동)",
            "s": "조짐 (보이는 행동)",
            "p": "예: 귀를 막기, 같은 말을 되풀이하기"
          },
          "doThis": {
            "l": "해 주었으면 하는 것",
            "s": "해 주었으면 하는 것",
            "p": "예: 말을 걸지 말고 조용한 곳으로. 5분 동안 지켜봐 주세요. 가라앉으면 “잘 돌아왔네” 하고 한마디."
          },
          "dont": {
            "l": "하지 않았으면 하는 것",
            "s": "하지 않았으면 하는 것",
            "p": "예: 뒤에서 만지기, 큰 소리로 이름 부르기, 그 자리에서 이유 묻기"
          },
          "swap": {
            "l": "곤란한 행동을 “해도 되는 도움 역할”로 바꿔 본 방안",
            "s": "곤란한 행동을 “해도 되는 도움 역할”로 바꿔 본 방안",
            "p": "예: 물건을 던져요 → 무거운 짐을 나르는 역할로. 뛰어다녀요 → 유인물을 나눠 주는 역할로."
          },
          "worked": {
            "l": "잘 통했던 방법",
            "s": "잘 통했던 방법",
            "p": "예: “3개만 더 하면 끝”이라고 세어 주면 기다릴 수 있어요."
          }
        }
      },
      "sense": {
        "t": "감각",
        "st": "감각",
        "h": "강하게 느끼는 것·둔하게 느끼는 것, 둘 다 적어요.",
        "q": {
          "sound": {
            "l": "소리",
            "s": "소리",
            "p": "예: 종소리, 드라이기, 웅성거림이 힘들어요. 이어머프를 쓰면 훨씬 편해요."
          },
          "light": {
            "l": "빛·보이는 것",
            "s": "빛·보이는 것",
            "p": "예: 형광등이 깜빡이는 게 신경 쓰여요. 창가 자리가 편해요."
          },
          "touch": {
            "l": "몸에 닿는 것·옷",
            "s": "몸에 닿는 것·옷",
            "p": "예: 옷의 태그가 따가워요. 갑자기 어깨를 두드리면 깜짝 놀라요."
          },
          "smell": {
            "l": "냄새·맛",
            "s": "냄새·맛",
            "p": "예: 급식 냄새 때문에 속이 안 좋아질 때가 있어요."
          },
          "other": {
            "l": "그 밖에 (통증·더위와 추위 등)",
            "s": "기타 (통증·더위와 추위 등)",
            "p": "예: 통증을 잘 알아차리지 못해요. 다쳐도 말하지 않아요."
          }
        }
      },
      "food": {
        "t": "먹을 수 있는 시판 식품",
        "st": "먹을 수 있는 시판 식품",
        "h": "비슷한 것이라도 먹지 못할 때가 있어요. 제조사·상품명·맛까지 적어요. 알레르기는 모시모 카드에 적은 내용이 기준이에요.",
        "q": {
          "ok": {
            "l": "먹을 수 있는 시판 식품",
            "s": "먹을 수 있는 시판 식품",
            "p": "예: ○○사의 소금 주먹밥(김 없음), △△의 플레인 요구르트"
          },
          "ng": {
            "l": "먹지 못하는 것",
            "s": "먹지 못하는 것",
            "p": "예: 섞인 요리(카레·스튜), 초록 채소"
          },
          "allergy": {
            "l": "알레르기 (모시모 카드와 똑같이)",
            "s": "알레르기",
            "p": "예: 메밀, 페니실린"
          },
          "drink": {
            "l": "음료·수분",
            "s": "음료·수분",
            "p": "예: 물만 마셔요. 페트병 모양이 다르면 마시지 않을 때가 있어요."
          }
        }
      },
      "history": {
        "t": "성장 과정",
        "st": "성장 과정",
        "h": "적고 싶지 않은 것은 적지 않아도 괜찮아요. 건넬 상대마다 보여 줄지 고를 수 있어요.",
        "q": {
          "early": {
            "l": "어릴 때의 모습",
            "s": "어릴 때의 모습",
            "p": "예: 말이 나온 것은 3살쯤. 낯가림은 적었어요."
          },
          "schools": {
            "l": "지금까지 다닌 유치원·학교·기관",
            "s": "지금까지 다닌 유치원·학교·기관",
            "p": "예: ○○유치원 → △△초등학교(도움반 이용) → 현재"
          },
          "events": {
            "l": "있었던 주요한 일",
            "s": "있었던 주요한 일",
            "p": "예: 초등학교 3학년 때 전학. 중학교 1학년 여름에 학교를 쉰 시기가 있어요."
          },
          "now": {
            "l": "지금의 모습",
            "s": "지금의 모습",
            "p": "예: 주 3일 등교. 방과 후에는 ○○에 다니고 있어요."
          }
        }
      },
      "orgs": {
        "t": "관계 기관",
        "st": "관계 기관",
        "h": "연결되어 있는 곳과 담당자 이름을 적어요. 연락처는 보여 줄 상대를 골라서 보여 줘요.",
        "q": {
          "medical": {
            "l": "병원·의원",
            "s": "병원·의원",
            "p": "예: ○○의원(한 달에 1번·담당 ●● 선생님)"
          },
          "welfare": {
            "l": "복지 창구·서비스 기관",
            "s": "복지 창구·서비스 기관",
            "p": "예: 시청 상담 창구(담당 ●● 님), 방과 후 서비스 기관 △△"
          },
          "school": {
            "l": "학교·유치원 담당자",
            "s": "학교·유치원 담당자",
            "p": "예: 담임 ●● 선생님, 코디네이터 ●● 선생님"
          },
          "other": {
            "l": "그 밖에",
            "s": "기타",
            "p": "예: 조부모(근처에 살아서 데려다주고 데려오는 것을 부탁할 수 있어요)"
          }
        }
      },
      "free": {
        "t": "자유롭게 적기",
        "st": "자유 기록",
        "h": "",
        "q": {
          "text": {
            "l": "전하고 싶은 것 무엇이든",
            "s": "전하고 싶은 것",
            "p": "예: 본인이 직접 적은 한마디도 여기에."
          }
        }
      }
    },
    "give": {
      "title": "건네기",
      "intro": "상대를 고르고, 보여 줄 항목을 골라요. 처음에는 최소한(첫 장·소통 방법·패닉일 때의 대응)만 나와요.",
      "presets": {
        "school": "학교",
        "daycare": "돌봄 기관",
        "medical": "병원",
        "family": "가족"
      },
      "secsHead": "보여 줄 항목 (탭해서 바꾸기)",
      "show": "보여 주기 (큰 글씨)",
      "print": "인쇄",
      "png": "첫 장을 이미지로 저장",
      "caution": "보여 주는 내용은 본인의 소중한 정보예요. 건넬 상대와 장소를 정한 다음에 보여 주세요.",
      "nothing": "아직 적은 칸이 없어요. “쓰기”에서 시작해 보세요.",
      "nothingInSecs": "고른 항목에는 아직 적은 칸이 없어요. 보여 줄 항목을 늘리거나 “쓰기”에서 시작해 보세요.",
      "printHint": "인쇄를 누르면 브라우저의 인쇄 화면이 열려요.",
      "pngDone": "이미지를 저장했어요 ✓"
    },
    "show": {
      "title": "{name}의 서포트북",
      "titleNoName": "서포트북",
      "lead": "이것은 요구가 아니라 설명서예요. 본인을 대하는 분들이 무리 없이, 안심하고 함께 지낼 수 있도록, 알아 두면 도움이 되는 것을 정리했어요.",
      "footer": "이 책자는 개인의 소중한 정보예요. 다 읽은 뒤에는 다른 사람의 눈에 띄지 않도록 다뤄 주세요.",
      "by": "돌봄과 지원 상담소 “SOYOGI”의 앱으로 작성(지자체 양식이 아니에요)"
    },
    "three": {
      "title": "오늘 가장 중요한 3가지",
      "intro": "인솔하는 사람이나 오늘만 만나는 사람에게 건넬 때 쓰는, 가장 짧은 카드예요. 3줄만 적어요.",
      "line": "{n}번째",
      "p1": "예: 뒤에서 만지지 말아 주세요",
      "p2": "예: 귀를 막으면 조용한 곳으로",
      "p3": "예: 주먹밥은 김 없이",
      "show": "크게 보여 주기",
      "head": "오늘 가장 중요한 3가지",
      "empty": "아직 적지 않았어요."
    },
    "about": {
      "title": "“설명서예요” 페이지",
      "intro": "이 페이지는 상대에게 그대로 보여 주는 글이에요. “건네기”에서 보여 주면 항상 맨 앞에 들어가요.",
      "body": [
        "이것은 요구가 아니라 설명서예요.",
        "이 책자는 본인을 알아 주셨으면 하는 마음으로 본인과 가족이 적었어요. 무언가를 강하게 요구하기 위한 것이 아니에요. 본인을 대하는 분들이 무리 없이, 안심하고 함께 지낼 수 있도록, 알아 두면 도움이 되는 것을 정리한 것이에요.",
        "할 수 없는 것의 목록도 아니에요. 이 사람은 이런 사람이고, 이렇게 하면 통해요, 라는 실마리예요.",
        "적혀 있는 내용은 가정에서 보이는 모습이에요. 장소가 바뀌면 다를 수도 있어요. 알게 된 것이 있으면 꼭 알려 주세요. 함께 고쳐 나갈게요.",
        "이 책자는 개인의 소중한 정보예요. 다 읽은 뒤에는 다른 사람의 눈에 띄지 않도록 다뤄 주세요."
      ],
      "show": "이 페이지를 크게 보여 주기"
    }
  }
});
/* ---- /ko ---- */
/* ---- zh: 翻訳 ---- */
TBL.zh = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "希望您了解的事 - SOYOGI",
    "short": "希望您了解的事",
    "tagline": "不是要求，而是一份说明书。"
  },
  "nav": {
    "home": "首页",
    "book": "填写",
    "give": "交给",
    "three": "今天的3件",
    "set": "设置"
  },
  "common": {
    "ok": "确定",
    "cancel": "取消",
    "save": "保存",
    "del": "删除",
    "back": "返回",
    "close": "关闭",
    "yes": "是",
    "no": "否",
    "add": "添加",
    "edit": "修改",
    "next": "下一个",
    "prev": "上一个",
    "done": "完成",
    "saved": "已保存 ✓",
    "saveFail": "无法保存",
    "storageFull": "存储空间已满，无法保存",
    "deleted": "已删除",
    "delConfirm": "确定要删除吗？",
    "empty": "还没有任何内容",
    "optional": "不必全部填写，也没关系。",
    "today": "今天",
    "backConfirm": "写的内容还没有保存。要放弃并返回吗？",
    "photo": {
      "camera": "拍照",
      "roll": "从照片中选择",
      "cropTitle": "裁剪照片",
      "cropHint": "用手指拖动，或用箭头调整位置，再用滑块改变大小。",
      "zoom": "大小",
      "panUp": "向上",
      "panDown": "向下",
      "panLeft": "向左",
      "panRight": "向右",
      "make": "就用这张",
      "fail": "无法读取照片"
    }
  },
  "set": {
    "hNormal": "日常设置",
    "hBackup": "更换手机（备份）",
    "fs": "文字大小",
    "fsSizes": [
      "普通",
      "大",
      "特大"
    ],
    "lang": "ことば / Language",
    "theme": "颜色",
    "themes": [
      "绿色",
      "浅蓝色",
      "白色",
      "黑色"
    ],
    "bgm": "背景音乐",
    "bgms": [
      "无",
      "绿之音",
      "蓝之音"
    ],
    "sound": "点按音",
    "on": "ON",
    "off": "OFF",
    "bkHint": "换到新手机时，请点“导出”保存文件，然后在新手机上点“导入”。支援手册的副本（JSON）也是同样的做法。",
    "bkExport": "导出",
    "bkImport": "导入",
    "exported": "已导出 ✓",
    "imported": "已导入 ✓",
    "importFail": "无法导入",
    "importConfirm": "现在的内容会被文件里的内容替换。要导入吗？",
    "note": "写下的内容全部只保存在这台设备里，不会发送到任何地方。",
    "privacy": "隐私政策",
    "credit": "应用开发：护理与支援咨询处 SOYOGI"
  },
  "guide": {
    "title": "使用方法",
    "step": "{n} / {m}",
    "start": "开始",
    "again": "再看一次",
    "heads": [
      "欢迎使用 希望您了解的事 - SOYOGI",
      "先从“第1页”开始",
      "一个部分一个部分地填写",
      "“交给”：按对方调整",
      "今天最重要的3件事",
      "“这是说明书”页面",
      "写下的内容只留在这台设备里",
      "让画面更容易看"
    ],
    "bodies": [
      "这个应用是由本人和家人一起写的、关于本人的“说明书”。不是要求，而是一份说明书。\n可以按照对方的需要，把了解后会有帮助的事交给学校、托管机构、医院、家人等与本人相处的人。\n交不交、给对方看什么，始终由你们自己决定。",
      "点下方的“填写”，会列出11个部分。\n先在最上面的“第1页（最希望先读的内容）”里，简短地写下“请绝对不要做的事”和“出现这些情况时请联系”。这部分会最先用大字给对方看。\n不必全部填写。",
      "在“填写”里选一个部分，就会出现问题。写下的内容会自动保存，以后随时可以修改。\n大多数部分的上方都有“填写提示”。用“上一个”“下一个”可以切换到相邻的部分，写完后点“返回部分列表”。\n如果有从 MOSHIMO Card 导出的文件，可以用“填写”下方的“读取 MOSHIMO Card 的文件”填入空着的栏。",
      "在下方的“交给”里选择对象（学校、托管机构、医院或家人），再在“出示的部分（点按切换）”里选择部分。一开始只有最少的内容：第1页、沟通方式和恐慌时的应对。\n点“展示（大字）”可以直接给对方看画面。也可以“把第1页存为图片”。\n输出的内容是本人的重要信息。请先决定交给谁、在什么场合使用，再输出。",
      "下方的“今天的3件”是最短的卡片，给陪同的人或只在今天见面的人看。\n只写三行，然后点“放大展示”。返回时点“关闭”。",
      "点首页上的“这是说明书”页面按钮，可以读到直接给对方看的文字。\n点“放大展示这一页”就能给对方看。\n用“交给”出示时，最前面也总会附上一段简短的文字。",
      "写下的内容全部只保存在这台设备里，不会发送到任何地方，也不需要注册。\n换手机时，在“设置”里点“导出”保存文件，然后在新手机上点“导入”。\n给别人看过或存成图片的内容，请注意妥善处理。",
      "在“设置”里可以更改“文字大小”（普通、大、特大）和“颜色”（绿色、浅蓝色、白色、黑色）。\n语言在右上角的“Language”中选择。\n在“设置”的“使用方法”里点“再看一次”，随时可以再看一遍这份介绍。"
    ]
  },
  "screen": {
    "home": {
      "title": "希望您了解的事",
      "intro": "由本人和家人一起写的、关于本人的“说明书”。可以按照对方的需要，交给学校、托管机构、医院或家人。",
      "write": "填写（回答11个部分）",
      "give": "交给（按对方调整内容）",
      "three": "今天最重要的3件事",
      "about": "“这是说明书”页面",
      "progress": "已填写的栏：{n}",
      "firstEmpty": "请先从“第1页”开始。不必全部填写，也没关系。",
      "firstHead": "第1页（最希望先读的内容）",
      "privacyNote": "写下的内容只在这台设备里。交给别人时，请注意妥善处理。"
    },
    "book": {
      "title": "填写",
      "intro": "选择一个部分，回答问题。之后随时都可以修改。",
      "filled": "已写 {n} 栏",
      "filledNone": "还没写",
      "moshimo": "读取 MOSHIMO Card 的文件",
      "moshimoHint": "读取从 MOSHIMO Card（紧急卡片）“导出”的 JSON，就能把姓名、联系方式、过敏等填入空着的栏里（不用写两遍）。",
      "moshimoDone": "已填入 {n} 栏 ✓",
      "moshimoNone": "没有可以填入的栏（已经写过了）",
      "moshimoFail": "这不是 MOSHIMO Card 的文件"
    },
    "sec": {
      "hintHead": "填写提示",
      "goBook": "返回部分列表",
      "autosave": "填写后会自动保存。"
    },
    "secs": {
      "first": {
        "t": "第1页（最希望先读的内容）",
        "st": "第1页 最希望先读的内容",
        "h": "这里会用大字最先显示。请写得简短、清楚。",
        "q": {
          "never": {
            "l": "请绝对不要做的事",
            "s": "请绝对不要做的事",
            "p": "例：不要在很多人面前训斥。不要突然从背后触碰。"
          },
          "contact": {
            "l": "出现这些情况时请联系",
            "s": "出现这些情况时请联系",
            "p": "例：哭了30分钟还停不下来时。嘴里含着东西一动不动时。联系人：母亲 090-0000-0000"
          }
        }
      },
      "profile": {
        "t": "个人资料",
        "st": "个人资料",
        "h": "名字不一定要写本名（可以按交给的对象来决定）。",
        "q": {
          "name": {
            "l": "名字（称呼）",
            "s": "名字（称呼）",
            "p": "例：Soyo（被叫作“小Soyo”会感到安心）"
          },
          "age": {
            "l": "年龄、年级等",
            "s": "年龄、年级等",
            "p": ""
          },
          "oneLine": {
            "l": "用一句话说，是怎样的人",
            "s": "一句话介绍",
            "p": "例：喜欢电车和图鉴，认真遵守规则的人"
          },
          "body": {
            "l": "身体情况、药",
            "s": "身体情况、药",
            "p": "例：早晚服用癫痫的药。详细内容写在 MOSHIMO Card 里。"
          }
        }
      },
      "likes": {
        "t": "喜欢的、受不了的",
        "st": "喜欢的事、受不了的事",
        "h": "“程度”不用数字或符号，而是用文字来写（例：非常喜欢／连看都难受）。",
        "q": {
          "like": {
            "l": "喜欢的事和东西",
            "s": "喜欢的事和东西",
            "p": "例：电车（非常喜欢，看到就会平静下来）、画画"
          },
          "dislike": {
            "l": "受不了的事和东西",
            "s": "受不了的事和东西",
            "p": "例：突然改变安排（连看都难受）、嘈杂的声音"
          },
          "calm": {
            "l": "能平静下来的东西和事",
            "s": "能平静下来的东西和事",
            "p": "例：看图鉴、隔音耳罩、在安静的房间待5分钟"
          }
        }
      },
      "daily": {
        "t": "日常生活动作",
        "st": "日常生活动作",
        "h": "不用符号区分能不能做，而是用文字来写，比如“能独自做到”“有人提醒就能做到”“一起做就能做到”“需要帮忙”。",
        "q": {
          "eat": {
            "l": "吃饭",
            "s": "饮食",
            "p": "例：能独自吃饭。不太会用筷子，用勺子。"
          },
          "toilet": {
            "l": "上厕所",
            "s": "如厕",
            "p": "例：有人提醒就能去。在不熟悉的地方，请先告诉厕所在哪里。"
          },
          "dress": {
            "l": "换衣服、打理自己",
            "s": "更衣、打理仪容",
            "p": "例：一起做就能做到。扣扣子需要帮忙。"
          },
          "move": {
            "l": "移动、外出时",
            "s": "移动、外出",
            "p": "例：牵着手就会安心。无法独自等红绿灯。"
          },
          "other": {
            "l": "其他",
            "s": "其他",
            "p": "例：只要有人在旁边看着，就能自己吃药。"
          }
        }
      },
      "comm": {
        "t": "沟通方式",
        "st": "沟通方式",
        "h": "按“看到的行为 → 真正的原因 → 希望的做法”的顺序来写，更容易让对方明白。",
        "q": {
          "from": {
            "l": "本人表达的时候",
            "s": "本人的表达方式",
            "p": "例：能说话，但遇到困难时会沉默。写在纸上给本人看，就能说出话来。"
          },
          "to": {
            "l": "本人容易明白的说法",
            "s": "本人容易明白的说法",
            "p": "例：简短，一次一件事。与其说“不要……”，不如说“要……”。"
          },
          "sign": {
            "l": "看到的行为 → 真正的原因 → 希望的做法",
            "s": "看到的行为、真正的原因、希望的做法",
            "p": "例：突然离开教室 → 声音太难受，已经到了极限 → 希望事先说好“可以出去”"
          },
          "worked": {
            "l": "有效的相处方式",
            "s": "顺利的相处方式",
            "p": "例：安排有变时，前一天写在纸上给本人看。这样当天就能保持平静。"
          }
        }
      },
      "panic": {
        "t": "恐慌时的应对",
        "st": "恐慌时的应对",
        "h": "这里也按“看到的行为 → 真正的原因 → 希望的做法”来写。对于“让人为难的行为”，想一想能不能换成“可以做的帮忙”，再写下来。",
        "q": {
          "trigger": {
            "l": "容易成为起因的事",
            "s": "容易成为起因的事",
            "p": "例：很大的声音、安排改变、输了"
          },
          "before": {
            "l": "前兆（看到的行为）",
            "s": "前兆（看到的行为）",
            "p": "例：捂住耳朵、反复说同样的话"
          },
          "doThis": {
            "l": "希望的做法",
            "s": "希望的做法",
            "p": "例：不要搭话，带到安静的地方。在旁边守候5分钟。平静下来后，说一句“能回来，真不错”。"
          },
          "dont": {
            "l": "希望不要做的事",
            "s": "希望不要做的事",
            "p": "例：从背后触碰、大声叫名字、当场问原因"
          },
          "swap": {
            "l": "把让人为难的行为换成“可以做的帮忙”的方案",
            "s": "把让人为难的行为换成“可以做的帮忙”的方案",
            "p": "例：扔东西 → 负责搬重物。到处跑 → 负责分发资料。"
          },
          "worked": {
            "l": "有效的相处方式",
            "s": "顺利的相处方式",
            "p": "例：数着“还有3个就结束”，就能等待。"
          }
        }
      },
      "sense": {
        "t": "感觉",
        "st": "感觉",
        "h": "感觉很强烈的、感觉很迟钝的，两种都写下来。",
        "q": {
          "sound": {
            "l": "声音",
            "s": "声音",
            "p": "例：铃声、吹风机、嘈杂声让人难受。戴上隔音耳罩会轻松很多。"
          },
          "light": {
            "l": "光、看到的东西",
            "s": "光、看到的东西",
            "p": "例：会在意日光灯的闪烁。靠窗的座位比较轻松。"
          },
          "touch": {
            "l": "被触碰、衣服",
            "s": "被触碰、衣物",
            "p": "例：衣服的标签会觉得痛。突然被拍肩膀会吓一跳。"
          },
          "smell": {
            "l": "气味、味道",
            "s": "气味、味道",
            "p": "例：有时会因为学校午餐的气味而感到不舒服。"
          },
          "other": {
            "l": "其他（疼痛、冷热等）",
            "s": "其他（疼痛、冷热等）",
            "p": "例：不容易察觉疼痛。受了伤也不会说。"
          }
        }
      },
      "food": {
        "t": "能吃的市售食品",
        "st": "能吃的市售食品",
        "h": "即使是相似的东西，也可能吃不了。请写到厂家、商品名和口味。过敏以写在 MOSHIMO Card 里的为准。",
        "q": {
          "ok": {
            "l": "能吃的市售食品",
            "s": "能吃的市售食品",
            "p": "例：〇〇公司的盐饭团（不要海苔）、△△的原味酸奶"
          },
          "ng": {
            "l": "不能吃的东西",
            "s": "不能吃的东西",
            "p": "例：混在一起的菜（咖喱、炖菜）、绿色蔬菜"
          },
          "allergy": {
            "l": "过敏（与 MOSHIMO Card 一致）",
            "s": "过敏",
            "p": "例：荞麦、青霉素"
          },
          "drink": {
            "l": "饮品、水分",
            "s": "饮品、水分",
            "p": "例：只喝水。瓶子的形状不一样时，有时会不喝。"
          }
        }
      },
      "history": {
        "t": "成长经历",
        "st": "成长经历",
        "h": "不想写的可以不写。可以按交给的对象，选择要不要出示。",
        "q": {
          "early": {
            "l": "小时候的情况",
            "s": "小时候的情况",
            "p": "例：3岁左右开始说话。很少认生。"
          },
          "schools": {
            "l": "至今上过的幼儿园、学校和去过的地方",
            "s": "至今的幼儿园、学校、去过的地方",
            "p": "例：〇〇幼儿园 → △△小学（使用资源教室） → 现在"
          },
          "events": {
            "l": "重大的事",
            "s": "重大的事",
            "p": "例：小学3年级转学。初中一年级的夏天，有一段时间没去上学。"
          },
          "now": {
            "l": "现在的情况",
            "s": "现在的情况",
            "p": "例：每周上学3天。放学后去〇〇。"
          }
        }
      },
      "orgs": {
        "t": "相关机构",
        "st": "相关机构",
        "h": "写下有联系的地方和负责人的名字。联系方式可以按对象选择是否出示。",
        "q": {
          "medical": {
            "l": "医院、诊所",
            "s": "医院、诊所",
            "p": "例：〇〇诊所（每月1次，负责医生 ●●）"
          },
          "welfare": {
            "l": "福利窗口、服务机构",
            "s": "福利窗口、服务机构",
            "p": "例：市里的咨询窗口（负责人 ●●）、放学后的服务机构 △△"
          },
          "school": {
            "l": "学校、幼儿园的负责人",
            "s": "学校、幼儿园的负责人",
            "p": "例：班主任 ●●老师、协调员 ●●老师"
          },
          "other": {
            "l": "其他",
            "s": "其他",
            "p": "例：祖父母（住在附近，可以拜托接送）"
          }
        }
      },
      "free": {
        "t": "自由填写",
        "st": "自由填写",
        "h": "",
        "q": {
          "text": {
            "l": "想传达的任何事",
            "s": "想传达的事",
            "p": "例：本人亲自写的一句话，也可以写在这里。"
          }
        }
      }
    },
    "give": {
      "title": "交给",
      "intro": "选择对象，再选择要出示的部分。一开始只出示最少的内容（第1页、沟通方式、恐慌时的应对）。",
      "presets": {
        "school": "学校",
        "daycare": "托管机构",
        "medical": "医院",
        "family": "家人"
      },
      "secsHead": "出示的部分（点按切换）",
      "show": "展示（大字）",
      "print": "打印",
      "png": "把第1页存为图片",
      "caution": "输出的内容是本人的重要信息。请先决定交给谁、在什么场合使用，再输出。",
      "nothing": "还没有填写任何栏。请从“填写”开始。",
      "nothingInSecs": "选中的部分里还没有填写的栏。请增加要出示的部分，或从“填写”开始。",
      "printHint": "打印时会打开浏览器的打印画面。",
      "pngDone": "图片已保存 ✓"
    },
    "show": {
      "title": "{name} 的支援手册",
      "titleNoName": "支援手册",
      "lead": "这不是要求，而是一份说明书。为了让和本人相处的人能不勉强、安心地一起度过，这里整理了知道后会有帮助的事。",
      "footer": "这本手册是个人的重要信息。读完后，请妥善处理，不要让其他人看到。",
      "by": "使用护理与支援咨询处“SOYOGI”的应用制作（不是地方政府的规定格式）"
    },
    "three": {
      "title": "今天最重要的3件事",
      "intro": "交给带队的人、或只在今天见面的人时使用的最简短卡片。只写3行。",
      "line": "第{n}件",
      "p1": "例：请不要从背后触碰",
      "p2": "例：捂住耳朵时，请带到安静的地方",
      "p3": "例：饭团不要海苔",
      "show": "放大展示",
      "head": "今天最重要的3件事",
      "empty": "还没有写。"
    },
    "about": {
      "title": "“这是说明书”页面",
      "intro": "这一页是直接给对方看的文字。用“交给”输出时，它总是排在最前面。",
      "body": [
        "这不是要求，而是一份说明书。",
        "这本手册，是本人和家人为了让大家了解本人而写的。它不是用来强烈要求什么的。为了让和本人相处的人能不勉强、安心地一起度过，这里整理了知道后会有帮助的事。",
        "这也不是一份“做不到的事”的清单。而是一些线索：这个人是这样的人，这样做就能沟通。",
        "这里写的，是在家里看到的样子。换了地方，也可能会不一样。如果注意到什么，请一定告诉我们。我们会一起修改。",
        "这本手册是个人的重要信息。读完后，请妥善处理，不要让其他人看到。"
      ],
      "show": "放大展示这一页"
    }
  }
});
/* ---- /zh ---- */
/* ---- ar: 翻訳 ---- */
TBL.ar = mergeDeep(JSON.parse(JSON.stringify(en)), {
  "app": {
    "name": "ما نود أن تعرفوه - SOYOGI",
    "short": "ما نود أن تعرفوه",
    "tagline": "ليس قائمة مطالب، بل دليل تعريفي."
  },
  "nav": {
    "home": "الرئيسية",
    "book": "كتابة",
    "give": "تسليم",
    "three": "أهم 3 لليوم",
    "set": "الإعدادات"
  },
  "common": {
    "ok": "موافق",
    "cancel": "إلغاء",
    "save": "حفظ",
    "del": "حذف",
    "back": "رجوع",
    "close": "إغلاق",
    "yes": "نعم",
    "no": "لا",
    "add": "إضافة",
    "edit": "تعديل",
    "next": "التالي",
    "prev": "السابق",
    "done": "تم",
    "saved": "تم الحفظ ✓",
    "saveFail": "تعذّر الحفظ",
    "storageFull": "المساحة ممتلئة، تعذّر الحفظ",
    "deleted": "تم الحذف",
    "delConfirm": "هل تريد الحذف حقًا؟",
    "empty": "لا يوجد شيء بعد",
    "optional": "لا داعي لكتابة كل شيء.",
    "today": "اليوم",
    "backConfirm": "ما كتبته لم يُحفظ بعد. هل تريد تجاهله والرجوع؟",
    "photo": {
      "camera": "التقاط صورة",
      "roll": "اختيار من الصور",
      "cropTitle": "قصّ الصورة",
      "cropHint": "حرّك الصورة بإصبعك أو بالأسهم، وغيّر الحجم بالمنزلق.",
      "zoom": "الحجم",
      "panUp": "إلى الأعلى",
      "panDown": "إلى الأسفل",
      "panLeft": "إلى اليسار",
      "panRight": "إلى اليمين",
      "make": "اعتماد هذه الصورة",
      "fail": "تعذّر تحميل الصورة"
    }
  },
  "set": {
    "hNormal": "الإعدادات العادية",
    "hBackup": "تغيير الجهاز (نسخة احتياطية)",
    "fs": "حجم الخط",
    "fsSizes": [
      "عادي",
      "كبير",
      "كبير جدًا"
    ],
    "lang": "ことば / Language",
    "theme": "اللون",
    "themes": [
      "أخضر",
      "أزرق فاتح",
      "أبيض",
      "أسود"
    ],
    "bgm": "موسيقى الخلفية",
    "bgms": [
      "بدون",
      "نغمة خضراء",
      "نغمة زرقاء"
    ],
    "sound": "صوت اللمس",
    "on": "تشغيل",
    "off": "إيقاف",
    "bkHint": "عند الانتقال إلى هاتف جديد، اضغط «تصدير» لحفظ ملف، ثم اضغط «استيراد» على الهاتف الجديد. نسخة كتيّب الدعم (JSON) هي الملف نفسه أيضًا.",
    "bkExport": "تصدير",
    "bkImport": "استيراد",
    "exported": "تم التصدير ✓",
    "imported": "تم الاستيراد ✓",
    "importFail": "تعذّر الاستيراد",
    "importConfirm": "سيُستبدل المحتوى الحالي بمحتوى الملف. هل تريد الاستيراد؟",
    "note": "كل ما تكتبه يُحفظ على هذا الجهاز فقط، ولا يُرسل إلى أي مكان.",
    "privacy": "سياسة الخصوصية",
    "credit": "تطوير التطبيق: SOYOGI، خدمة استشارات في الرعاية والدعم"
  },
  "guide": {
    "title": "طريقة الاستخدام",
    "step": "{n} / {m}",
    "start": "ابدأ",
    "again": "عرض مرة أخرى",
    "heads": [
      "مرحبًا بك في ما نود أن تعرفوه - SOYOGI",
      "ابدأ بالصفحة الأولى",
      "قسم واحد في كل مرة",
      "«تسليم»: بما يناسب كل جهة",
      "أهم 3 أشياء اليوم",
      "صفحة «هذا دليل»",
      "ما تكتبه يبقى على هذا الجهاز",
      "قراءة أسهل"
    ],
    "bodies": [
      "هذا التطبيق «دليل» عن الشخص، يكتبه الشخص نفسه مع عائلته. ليس قائمة مطالب، بل دليل تعريفي.\nيمكنك تقديمه لمن يقضون وقتًا مع الشخص، مثل المدرسة ومكان الرعاية والمستشفى والعائلة، مع ما يفيد كل جهة أن تعرفه.\nتقديمه من عدمه، وما يُعرض منه، قرارٌ يعود إليكم دائمًا.",
      "اضغط «كتابة» في الأسفل لتظهر 11 قسمًا.\nابدأ من الأعلى بـ«الصفحة الأولى (أهم ما نرجو قراءته أولًا)»، واكتب باختصار في «أمور نرجو ألّا تفعلوها أبدًا» و«تواصلوا معنا إذا حدث هذا». يظهر هذا الجزء أولًا وبخط كبير.\nلا يلزم ملء كل شيء.",
      "في «كتابة» اختر قسمًا لتظهر أسئلته. يُحفظ ما تكتبه تلقائيًا، ويمكنك تعديله في أي وقت.\nفي أعلى معظم الأقسام توجد «إرشادات للكتابة». انتقل إلى القسم المجاور بـ«السابق» و«التالي»، وعند الانتهاء اضغط «إلى قائمة الأقسام».\nإذا كان لديك ملف مُصدَّر من Moshimo Card، فاستخدم «استيراد ملف Moshimo Card» في أسفل «كتابة» لملء الخانات الفارغة.",
      "في «تسليم» في الأسفل، اختر الجهة (المدرسة أو مكان الرعاية أو المستشفى أو العائلة)، ثم اختر الأقسام في «الأقسام المعروضة (اضغط للتبديل)». في البداية يُعرض الحد الأدنى فقط: الصفحة الأولى وطرق التواصل والتعامل عند الانفعال الشديد.\nاضغط «عرض (خط كبير)» لعرض الشاشة كما هي. ويمكنك أيضًا «حفظ الصفحة الأولى كصورة».\nما تُخرجه معلومات مهمة تخص الشخص. يُرجى تحديد الجهة التي ستتسلّمه والمكان قبل إخراجه.",
      "«أهم 3 لليوم» في الأسفل هي أقصر بطاقة، لمن يرافق الشخص أو يلقاه اليوم فقط.\nاكتب ثلاثة أسطر فقط ثم اضغط «عرض بحجم كبير». للرجوع اضغط «إغلاق».",
      "في «الرئيسية»، يفتح زر صفحة «هذا دليل» نصًا تعرضه على الشخص الآخر كما هو.\nاضغط «عرض هذه الصفحة بحجم كبير» لعرضه.\nوعند التسليم، تأتي نسخة قصيرة من هذا النص في البداية دائمًا.",
      "كل ما تكتبه يُحفظ على هذا الجهاز فقط، ولا يُرسل إلى أي مكان، ولا حاجة إلى تسجيل.\nعند تغيير الهاتف، اضغط «تصدير» في «الإعدادات» لحفظ ملف، ثم اضغط «استيراد» على الهاتف الجديد.\nتعامل بحذر مع ما عرضته أو حفظته كصورة.",
      "في «الإعدادات» يمكنك تغيير «حجم الخط» (عادي، كبير، كبير جدًا) و«اللون» (أخضر، أزرق فاتح، أبيض، أسود).\nاختر اللغة من «Language» في أعلى الشاشة.\nيمكنك رؤية هذا الشرح مرة أخرى في أي وقت بالضغط على «عرض مرة أخرى» في سطر «طريقة الاستخدام» داخل «الإعدادات»."
    ]
  },
  "screen": {
    "home": {
      "title": "ما نود أن تعرفوه",
      "intro": "«دليل» عن الشخص، يكتبه الشخص نفسه مع عائلته. يمكن تقديمه للمدرسة ومكان الرعاية والمستشفى والعائلة، بما يناسب كل جهة.",
      "write": "كتابة (الإجابة عن 11 قسمًا)",
      "give": "تسليم (اختيار ما يُعرض حسب الجهة)",
      "three": "أهم 3 أشياء اليوم",
      "about": "صفحة «هذا دليل»",
      "progress": "الخانات المكتوبة: {n}",
      "firstEmpty": "ابدأ من «الصفحة الأولى». لا داعي لكتابة كل شيء.",
      "firstHead": "الصفحة الأولى (أهم ما نرجو قراءته أولًا)",
      "privacyNote": "ما تكتبه موجود على هذا الجهاز فقط. عند التسليم، يُرجى الانتباه إلى طريقة التعامل معه."
    },
    "book": {
      "title": "كتابة",
      "intro": "اختر قسمًا وأجب عن الأسئلة. يمكنك التعديل في أي وقت لاحقًا.",
      "filled": "المكتوب: {n}",
      "filledNone": "ليس بعد",
      "moshimo": "استيراد ملف Moshimo Card",
      "moshimoHint": "عند استيراد ملف JSON الذي صدّرته من Moshimo Card عبر «تصدير»، تُملأ الخانات الفارغة مثل الاسم وجهة الاتصال والحساسية (فلا تحتاج إلى الكتابة مرتين).",
      "moshimoDone": "تمت تعبئة الخانات: {n} ✓",
      "moshimoNone": "لا توجد خانات للتعبئة (مكتوبة بالفعل)",
      "moshimoFail": "هذا ليس ملف Moshimo Card"
    },
    "sec": {
      "hintHead": "إرشادات للكتابة",
      "goBook": "إلى قائمة الأقسام",
      "autosave": "يُحفظ ما تكتبه تلقائيًا."
    },
    "secs": {
      "first": {
        "t": "الصفحة الأولى (أهم ما نرجو قراءته أولًا)",
        "st": "الصفحة الأولى: أهم ما نرجو قراءته أولًا",
        "h": "يظهر هذا القسم أولًا بخط كبير. اكتب باختصار ووضوح.",
        "q": {
          "never": {
            "l": "أمور نرجو ألّا تفعلوها أبدًا",
            "s": "أمور نرجو ألّا تفعلوها أبدًا",
            "p": "مثال: لا توبّخوه أمام جمع من الناس. لا تلمسوه فجأة من الخلف."
          },
          "contact": {
            "l": "تواصلوا معنا إذا حدث هذا",
            "s": "تواصلوا معنا إذا حدث هذا",
            "p": "مثال: إذا لم يتوقف عن البكاء لمدة 30 دقيقة. إذا بقي بلا حركة وفي فمه شيء. للتواصل: الأم 090-0000-0000"
          }
        }
      },
      "profile": {
        "t": "الملف الشخصي",
        "st": "الملف الشخصي",
        "h": "لا يلزم أن يكون الاسم هو الاسم الحقيقي (حسب الجهة التي تتسلّمه).",
        "q": {
          "name": {
            "l": "الاسم (طريقة المناداة)",
            "s": "الاسم (طريقة المناداة)",
            "p": "مثال: سويو (يطمئن عندما يُنادى «سويو-تشان»)"
          },
          "age": {
            "l": "العمر والصف الدراسي وغيرهما",
            "s": "العمر والصف الدراسي وغيرهما",
            "p": ""
          },
          "oneLine": {
            "l": "وصف الشخص في جملة واحدة",
            "s": "في جملة واحدة",
            "p": "مثال: يحب القطارات والموسوعات المصوّرة، ويلتزم بالقواعد بجدية."
          },
          "body": {
            "l": "الجسم والدواء",
            "s": "الجسم والدواء",
            "p": "مثال: يتناول دواء الصرع صباحًا ومساءً. التفاصيل في Moshimo Card."
          }
        }
      },
      "likes": {
        "t": "المفضَّل والصعب",
        "st": "الأشياء المفضَّلة والأشياء الصعبة",
        "h": "اكتب «إلى أي حد» بالكلمات، لا بالأرقام أو الرموز (مثال: يحبه كثيرًا / يصعب عليه حتى النظر إليه).",
        "q": {
          "like": {
            "l": "الأشياء والأنشطة المفضَّلة",
            "s": "الأشياء والأنشطة المفضَّلة",
            "p": "مثال: القطارات (يحبها كثيرًا، ويهدأ عند رؤيتها)، الرسم"
          },
          "dislike": {
            "l": "الأشياء والمواقف الصعبة",
            "s": "الأشياء والمواقف الصعبة",
            "p": "مثال: التغيير المفاجئ في الجدول (يصعب عليه حتى النظر إليه)، الضجيج والأصوات المتداخلة"
          },
          "calm": {
            "l": "ما يساعد على الهدوء",
            "s": "ما يساعد على الهدوء",
            "p": "مثال: تصفّح موسوعة مصوّرة، واقيات الأذن، 5 دقائق في غرفة هادئة"
          }
        }
      },
      "daily": {
        "t": "أنشطة الحياة اليومية",
        "st": "أنشطة الحياة اليومية",
        "h": "بدلًا من تقسيم «يستطيع / لا يستطيع» بالرموز، اكتب بالكلمات مثل: «يستطيع وحده»، «يستطيع مع التذكير»، «يستطيع إذا فعلناه معًا»، «يحتاج إلى مساعدة».",
        "q": {
          "eat": {
            "l": "الأكل",
            "s": "الوجبات",
            "p": "مثال: يأكل وحده. يصعب عليه استخدام عيدان الأكل، فيستخدم الملعقة."
          },
          "toilet": {
            "l": "الحمّام",
            "s": "الحمّام",
            "p": "مثال: يستطيع الذهاب مع التذكير. في مكان لا يعرفه، يُرجى إرشاده إلى مكان الحمّام أولًا."
          },
          "dress": {
            "l": "تبديل الملابس والاستعداد",
            "s": "تبديل الملابس والاستعداد",
            "p": "مثال: يستطيع إذا فعلناه معًا. يحتاج إلى مساعدة في الأزرار."
          },
          "move": {
            "l": "التنقل والخروج",
            "s": "التنقل والخروج",
            "p": "مثال: يطمئن إذا أمسك أحد بيده. لا يستطيع الانتظار عند إشارة المرور وحده."
          },
          "other": {
            "l": "غير ذلك",
            "s": "غير ذلك",
            "p": "مثال: يستطيع تناول دوائه بنفسه إذا راقبه أحد."
          }
        }
      },
      "comm": {
        "t": "طرق التواصل",
        "st": "طرق التواصل",
        "h": "الكتابة بترتيب «السلوك الظاهر ← السبب الحقيقي ← ما نرجوه» تساعد على إيصال الفكرة.",
        "q": {
          "from": {
            "l": "حين يعبّر الشخص عن نفسه",
            "s": "طريقة تعبير الشخص عن نفسه",
            "p": "مثال: يستطيع الكلام، لكنه يصمت عندما يرتبك. عندما يُكتب له على ورقة ويُعرض عليه، تبدأ الكلمات بالخروج."
          },
          "to": {
            "l": "طريقة الكلام التي تصل إليه",
            "s": "طريقة الكلام التي تصل إليه",
            "p": "مثال: جمل قصيرة، شيء واحد في كل مرة. «افعل كذا» بدلًا من «لا تفعل كذا»."
          },
          "sign": {
            "l": "السلوك الظاهر ← السبب الحقيقي ← ما نرجوه",
            "s": "السلوك الظاهر والسبب الحقيقي وما نرجوه",
            "p": "مثال: يخرج من الفصل فجأة ← لم يعد يحتمل الأصوات ← نرجو الاتفاق مسبقًا على أنه «يجوز له الخروج»"
          },
          "worked": {
            "l": "طرق تعامل نجحت",
            "s": "طرق تعامل نجحت",
            "p": "مثال: عرض تغييرات الجدول على ورقة في اليوم السابق. وبذلك استطاع أن يبقى هادئًا في ذلك اليوم."
          }
        }
      },
      "panic": {
        "t": "التعامل عند الانفعال الشديد",
        "st": "التعامل عند نوبة الانفعال الشديد",
        "h": "هنا أيضًا بترتيب «السلوك الظاهر ← السبب الحقيقي ← ما نرجوه». وبالنسبة إلى «السلوك المُربك»، فكّر هل يمكن استبداله بـ«مهمة مساعدة مسموح بها»، ثم اكتب.",
        "q": {
          "trigger": {
            "l": "ما قد يكون سببًا في الغالب",
            "s": "ما قد يكون سببًا في الغالب",
            "p": "مثال: الأصوات العالية، تغيير الجدول، الخسارة"
          },
          "before": {
            "l": "العلامات المبكرة (السلوك الظاهر)",
            "s": "العلامات المبكرة (السلوك الظاهر)",
            "p": "مثال: يسدّ أذنيه، يكرّر الكلمات نفسها"
          },
          "doThis": {
            "l": "ما نرجو فعله",
            "s": "ما نرجو فعله",
            "p": "مثال: دون أن تكلّموه، انتقلوا به إلى مكان هادئ. راقبوه 5 دقائق. عندما يهدأ، قولوا كلمة واحدة: «أحسنت، لقد عدت»."
          },
          "dont": {
            "l": "ما نرجو ألّا تفعلوه",
            "s": "ما نرجو ألّا تفعلوه",
            "p": "مثال: اللمس من الخلف، مناداة اسمه بصوت عالٍ، سؤاله عن السبب في اللحظة نفسها"
          },
          "swap": {
            "l": "اقتراح لاستبدال السلوك المُربك بـ«مهمة مساعدة مسموح بها»",
            "s": "اقتراح لاستبدال السلوك المُربك بـ«مهمة مساعدة مسموح بها»",
            "p": "مثال: يرمي الأشياء ← مسؤول عن حمل الأغراض الثقيلة. يركض في المكان ← مسؤول عن توزيع الأوراق."
          },
          "worked": {
            "l": "طرق تعامل نجحت",
            "s": "طرق تعامل نجحت",
            "p": "مثال: عندما نعدّ «بقي 3 وننتهي» يستطيع الانتظار."
          }
        }
      },
      "sense": {
        "t": "الحواس",
        "st": "الحواس",
        "h": "اكتب الحالتين: ما يشعر به بقوة، وما يشعر به بضعف.",
        "q": {
          "sound": {
            "l": "الأصوات",
            "s": "الأصوات",
            "p": "مثال: جرس المدرسة ومجفف الشعر وضجيج الناس أمور صعبة عليه. يرتاح كثيرًا مع واقيات الأذن."
          },
          "light": {
            "l": "الضوء وما يُرى",
            "s": "الضوء وما يُرى",
            "p": "مثال: يزعجه وميض مصابيح الفلورسنت. المقعد بجانب النافذة أريح له."
          },
          "touch": {
            "l": "اللمس والملابس",
            "s": "اللمس والملابس",
            "p": "مثال: ملصقات الملابس تؤلمه. يفزع إذا رُبّت على كتفه فجأة."
          },
          "smell": {
            "l": "الروائح والمذاق",
            "s": "الروائح والمذاق",
            "p": "مثال: قد يشعر بتوعّك من رائحة الوجبة المدرسية."
          },
          "other": {
            "l": "غير ذلك (الألم، الحر والبرد، إلخ)",
            "s": "غير ذلك (الألم، الحر والبرد، إلخ)",
            "p": "مثال: لا ينتبه للألم بسهولة. لا يخبر أحدًا حتى إذا أُصيب."
          }
        }
      },
      "food": {
        "t": "أطعمة جاهزة يستطيع تناولها",
        "st": "أطعمة جاهزة يستطيع تناولها",
        "h": "حتى المنتجات المتشابهة قد لا يستطيع تناولها. اكتب الشركة المصنّعة واسم المنتج والنكهة. وبالنسبة إلى الحساسية، فالمرجع الصحيح هو ما كُتب في Moshimo Card.",
        "q": {
          "ok": {
            "l": "أطعمة جاهزة يستطيع تناولها",
            "s": "أطعمة جاهزة يستطيع تناولها",
            "p": "مثال: كرة أرز بالملح من شركة «س» (بدون أعشاب بحرية)، زبادي سادة من «ص»"
          },
          "ng": {
            "l": "أطعمة لا يستطيع تناولها",
            "s": "أطعمة لا يستطيع تناولها",
            "p": "مثال: الأطباق المخلوطة (الكاري، اليخنة)، الخضروات الخضراء"
          },
          "allergy": {
            "l": "الحساسية (مطابقة لما في Moshimo Card)",
            "s": "الحساسية",
            "p": "مثال: الحنطة السوداء، البنسلين"
          },
          "drink": {
            "l": "المشروبات والسوائل",
            "s": "المشروبات والسوائل",
            "p": "مثال: لا يشرب إلا الماء. قد يرفض الشرب إذا اختلف شكل الزجاجة."
          }
        }
      },
      "history": {
        "t": "تاريخ النشأة",
        "st": "تاريخ النشأة",
        "h": "لا داعي لكتابة ما لا تريد كتابته. ويمكنك أن تختار لكل جهة هل تعرضه أم لا.",
        "q": {
          "early": {
            "l": "الحال في الصغر",
            "s": "الحال في الصغر",
            "p": "مثال: بدأ الكلام في عمر 3 سنوات تقريبًا. لم يكن يخجل كثيرًا من الغرباء."
          },
          "schools": {
            "l": "الأماكن التي ارتادها حتى الآن (الروضة والمدارس وغيرها)",
            "s": "الأماكن التي ارتادها حتى الآن (الروضة والمدارس وغيرها)",
            "p": "مثال: روضة «س» ← مدرسة «ص» الابتدائية (مع حصص في غرفة الدعم) ← الآن"
          },
          "events": {
            "l": "أحداث مهمة",
            "s": "أحداث مهمة",
            "p": "مثال: انتقل إلى مدرسة أخرى في الصف الثالث الابتدائي. في صيف الصف الأول المتوسط، مرّت فترة غاب فيها عن المدرسة."
          },
          "now": {
            "l": "الحال الآن",
            "s": "الحال الآن",
            "p": "مثال: يذهب إلى المدرسة 3 أيام في الأسبوع. وبعد المدرسة يرتاد «س»."
          }
        }
      },
      "orgs": {
        "t": "الجهات ذات الصلة",
        "st": "الجهات ذات الصلة",
        "h": "اكتب الجهات التي تتواصل معها وأسماء المسؤولين فيها. أما بيانات الاتصال، فتختار الجهة التي تُعرض لها.",
        "q": {
          "medical": {
            "l": "المستشفى والعيادة",
            "s": "المستشفى والعيادة",
            "p": "مثال: عيادة «س» (مرة في الشهر، الطبيب المسؤول د. «ص»)"
          },
          "welfare": {
            "l": "مكاتب الرعاية الاجتماعية ومقدّمو الخدمات",
            "s": "مكاتب الرعاية الاجتماعية ومقدّمو الخدمات",
            "p": "مثال: مكتب الاستشارات في البلدية (المسؤول: «ص»)، مركز خدمات ما بعد المدرسة «ع»"
          },
          "school": {
            "l": "المسؤولون في المدرسة أو الروضة",
            "s": "المسؤولون في المدرسة أو الروضة",
            "p": "مثال: المعلّم المسؤول عن الفصل «ص»، المنسّق «ع»"
          },
          "other": {
            "l": "غير ذلك",
            "s": "غير ذلك",
            "p": "مثال: الجدّان (يسكنان قريبًا، ويمكن طلب المساعدة منهما في التوصيل)"
          }
        }
      },
      "free": {
        "t": "ملاحظات حرة",
        "st": "ملاحظات حرة",
        "h": "",
        "q": {
          "text": {
            "l": "أي شيء تودّ إيصاله",
            "s": "ما تودّ إيصاله",
            "p": "مثال: يمكن أيضًا وضع جملة كتبها الشخص بنفسه هنا."
          }
        }
      }
    },
    "give": {
      "title": "تسليم",
      "intro": "اختر الجهة، ثم اختر الأقسام التي تُعرض. في البداية يُعرض الحد الأدنى فقط (الصفحة الأولى، طرق التواصل، التعامل عند الانفعال الشديد).",
      "presets": {
        "school": "المدرسة",
        "daycare": "مكان الرعاية",
        "medical": "المستشفى",
        "family": "العائلة"
      },
      "secsHead": "الأقسام المعروضة (اضغط للتبديل)",
      "show": "عرض (خط كبير)",
      "print": "طباعة",
      "png": "حفظ الصفحة الأولى كصورة",
      "caution": "ما تُخرجه معلومات مهمة تخص الشخص. يُرجى تحديد الجهة التي ستتسلّمه والمكان قبل إخراجه.",
      "nothing": "لا توجد خانات مكتوبة بعد. ابدأ من «كتابة».",
      "nothingInSecs": "لا توجد خانات مكتوبة في الأقسام المختارة بعد. أضف أقسامًا أخرى، أو ابدأ من «كتابة».",
      "printHint": "عند الطباعة تُفتح شاشة الطباعة في المتصفح.",
      "pngDone": "تم حفظ الصورة ✓"
    },
    "show": {
      "title": "كتيّب الدعم الخاص بـ {name}",
      "titleNoName": "كتيّب الدعم",
      "lead": "هذا ليس قائمة مطالب، بل دليل تعريفي. جمعنا فيه ما يفيد معرفته، حتى يتمكّن من يتعامل مع هذا الشخص من قضاء الوقت معه براحة وطمأنينة ودون عناء.",
      "footer": "يحتوي هذا الكتيّب على معلومات شخصية مهمة. بعد قراءته، يُرجى التعامل معه بحيث لا يطّلع عليه الآخرون.",
      "by": "أُعدّ بتطبيق من SOYOGI، خدمة استشارات في الرعاية والدعم (ليس نموذجًا رسميًا من البلدية)"
    },
    "three": {
      "title": "أهم 3 أشياء اليوم",
      "intro": "أقصر بطاقة، تُعطى للمرافق في النشاط أو لمن يلتقيه اليوم فقط. اكتب 3 أسطر فقط.",
      "line": "رقم {n}",
      "p1": "مثال: يُرجى عدم اللمس من الخلف",
      "p2": "مثال: إذا سدّ أذنيه، انتقلوا إلى مكان هادئ",
      "p3": "مثال: كرة الأرز بدون أعشاب بحرية",
      "show": "عرض بحجم كبير",
      "head": "أهم 3 أشياء اليوم",
      "empty": "لم يُكتب شيء بعد."
    },
    "about": {
      "title": "صفحة «هذا دليل»",
      "intro": "هذه الصفحة نص يُعرض على الجهة كما هو. عند الإخراج من «تسليم»، تأتي دائمًا في المقدمة.",
      "body": [
        "هذا ليس قائمة مطالب، بل دليل تعريفي.",
        "كتب هذا الكتيّب الشخصُ نفسه وعائلته، لتتعرّفوا عليه. وليس الغرض منه المطالبة بشيء بإلحاح، بل جمعنا فيه ما يفيد معرفته، حتى يتمكّن من يتعامل مع هذا الشخص من قضاء الوقت معه براحة وطمأنينة ودون عناء.",
        "وليس قائمة بما لا يستطيع فعله، بل هو مجموعة من المفاتيح: هذا الشخص هكذا، وبهذه الطريقة يصل إليه الكلام.",
        "ما كُتب هنا هو ما نراه في البيت، وقد يختلف الأمر في مكان آخر. إذا لاحظتم شيئًا، فنرجو أن تخبرونا، وسنصحّحه معًا.",
        "يحتوي هذا الكتيّب على معلومات شخصية مهمة. بعد قراءته، يُرجى التعامل معه بحيث لا يطّلع عليه الآخرون."
      ],
      "show": "عرض هذه الصفحة بحجم كبير"
    }
  }
});
/* ---- /ar ---- */
/* 翻訳前の仮置き: de〜ar は en を流用する(翻訳Workflowで各言語を書いたらこの行より上に追加し、ここは残してよい) */
['de','fr','es','it','pt','nl','sv','ko','zh','ar'].forEach(function(l){
  if(!TBL[l]) TBL[l] = JSON.parse(JSON.stringify(en));
});
window.SBOOK_I18N = TBL;
})();
