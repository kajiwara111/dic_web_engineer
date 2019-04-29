/* global $*/
$(document).ready(function(){
  
  /*名前空間定義*/
  var MYAPP = MYAPP || {};

  MYAPP.score_indicate = function (){
    //-------------------------------------------------------------
    // 各科目の合計、平均を計算しイベント発生時にhtmlへ書き込む処理関数
    //-------------------------------------------------------------
    
    // 他の処理でも参照する変数はMYAPP下に作成
    MYAPP.sum = 0;
    MYAPP.average = 0;
    MYAPP.subject_points = [];

    // subject_points配列作成
    // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]。
     
    MYAPP.subject_points = [Number($('#national_language').val()),
                            Number($('#english').val()),
                            Number($('#mathematics').val()),
                            Number($('#science').val()),
                            Number($('#society').val())
                            ];

    // 合計点の取得 
    for(let i = 0, len = MYAPP.subject_points.length; i < len; i++) {
      MYAPP.sum = MYAPP.sum + MYAPP.subject_points[i];
    };

    // 平均点取得
    MYAPP.average = MYAPP.sum / MYAPP.subject_points.length;

    $("#sum_indicate").text(MYAPP.sum); // 合計得点書き込み
    $("#avarage_indicate").text(MYAPP.average); // 平均点書き込み
    
  };

  MYAPP.get_achievement = function (average_score){
    //---------------------------------------------------------------------------------
    // ランクの値の文字列 イベント発生時に以下の処理を実施
    //（平均点が80点以上なら"A"、60点以上なら"B"、40点以上なら"C"、それ以下なら"D"）を出力
    //---------------------------------------------------------------------------------

    let score_rank
    if (average_score >= 80) {
      score_rank = "A";
    }
    else if (average_score >= 60) {
      score_rank = "B";
    }
    else if (average_score >= 40) {
      score_rank = "C";
    }
    else {
      score_rank = "D";
    }
  
    return score_rank;
  };

  MYAPP.get_pass_or_failure = function (subject_points){
    // -----------------------------------------------------------
    // イベント発生時に以下の処理を行う関数 
    // 全ての教科が60点以上なら"合格"の文字列、
    // 一つでも60点未満の教科があったら"不合格"の文字列を出力
    //------------------------------------------------------------
    let judge = "合格";  
    for (let i = 0, len = subject_points.length; i < len; i++) {
      if (subject_points[i] < 60) {
        judge = "不合格";
        break;
      }
    }
    
    return judge;

  };

  MYAPP.judgement = function (){
    //------------------------------------------------------------------------------------
    // イベント発生時に以下の処理を実施する関数
    // 「最終ジャッジ」のボタンを押したら「あなたの成績はAです。合格です」といった内容を出力する
    //-------------------------------------------------------------------------------------
    
    /*ランクと合否取得*/  
    let score_rank = MYAPP.get_achievement(score_average = MYAPP.average);
    let judge = MYAPP.get_pass_or_failure(subject_points = MYAPP.subject_points);
    
    /*出力がすでに存在した場合、削除*/
    if ($('#alert-indicate').length) { /*要素の存在判定 length or size()使用*/
      $('#alert-indicate').remove();
    };

    /*出力をhtmlに追加*/
    $('#declaration').append(
      `<label id="alert-indicate" class="alert alert-info">
        あなたの成績は${score_rank}です。${judge}です
       </label>`
    );
  };

  //-------------------------------------------
  // イベント処理
  //-------------------------------------------

  // 各科目得点入力欄に変化があった場合の処理
  $('#national_language, #english, #mathematics, #science, #society').change(function() {
    MYAPP.score_indicate();
  });

  // ランクボタンを押した場合の処理
  $('#btn-evaluation').click(function() {
    let score_rank = MYAPP.get_achievement(score_average = MYAPP.average);
    $('#evaluation').text(score_rank); /*manupiration, textメソッドでランクをhtmlに追加*/
  });

  // 判定ボタンを押した場合の処理
  $('#btn-judge').click(function() {
    // 判定結果取得
    let judge = MYAPP.get_pass_or_failure(subject_points = MYAPP.subject_points);
    
    //htmlへ書き込み
    $('#judge').text(judge);
  });

  // 最終ジャッジボタンを押した場合の処理
  $('#btn-declaration').click(function() {
    // 以下の関数でhtmlへ要素追加
    MYAPP.judgement();
  });
});
