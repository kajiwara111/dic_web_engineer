//名前空間定義(global変数を避けるため)
var MYAPP = MYAPP || {};

//-------------------------------------------------------
// 関数定義部
//-------------------------------------------------------

// A~Dまでの成績取得関数定義
MYAPP.get_acheivement = function(points, num_subject) {
    
    // 合計得点取得
    let total_score = 0;
    for (let i = 0; i < num_subject; i++) {
        total_score = total_score + points[i];
    }
    
    // 成績判定
    let perfect_score = 100 * num_subject;
    
    // 成績格納変数作成
    let judge;
    
    // 成績判定
    if (total_score >= perfect_score * 0.8) {
        judge = "A";
    }
    else if (total_score >= perfect_score * 0.6) {
        judge = "B";
    }
    else if (total_score >= perfect_score * 0.4) {
        judge = "C";
    }
    else {
        judge = "D";
    }
    
    return judge;
}

// 合否判定関数定義
MYAPP.get_pass_or_failure = function(points, num_subject) {
    // 合否判定フラグ作成
    let isPass = true;
    
    // 合格or不合格メッセージ格納変数作成
    let pass_message;
    
    // 1教科でも60点未満であれば合否判定フラグを不合格へ変更
    for (let i = 0; i < num_subject; i++) {
        if (points[i] < 60) {
            isPass = false;
            break;
        }
    }
    // 練習としてあえてswitch文で判定
    switch (isPass) {
        case true:
            pass_message = "合格";
            break; // breakしないと次のcase式が実行されるので注意
        case false:
            pass_message = "不合格";
    }
    return pass_message;
}

// メッセージ出力関数定義
MYAPP.judgement = function(points, num_subject) {
    
    // 入力エラーチェック
    // 得点は0~100までの整数値のみに制限
    for(let i = 0; i < num_subject; i++){
        if (points[i] < 0 || points[i] > 100 || Number.isInteger(points[i]) == false){
            return `点数${points[i]}は不正な得点です。訂正してください。`;
        }
    }
    
    let achivement = MYAPP.get_acheivement(points, num_subject);
    let pass_or_failure = MYAPP.get_pass_or_failure(points, num_subject);
    return `あなたの成績は${achivement}です。${pass_or_failure}です。`;
}

//------------------------------------
// 実行部
//------------------------------------


//得点配列
MYAPP.points = [60, 80, 90, 100, 100];

//配列要素数取得
MYAPP.num_subject = MYAPP.points.length;

console.log(MYAPP.judgement(MYAPP.points, MYAPP.num_subject));